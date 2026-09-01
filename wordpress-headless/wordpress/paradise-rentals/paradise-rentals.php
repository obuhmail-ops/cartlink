<?php
/**
 * Plugin Name:       Paradise Rentals Headless API
 * Description:       Registers Cart & Booking content types, exposes them over the WP REST API, and provides JWT-style auth + booking endpoints for the headless React frontend.
 * Version:           1.0.0
 * Author:            Paradise Rentals
 * License:           GPL-2.0+
 *
 * This plugin is intentionally self-contained: no third-party plugins are required.
 * It implements a minimal HS256 token (login) and public booking creation so the
 * React frontend can run fully headless against a plain WordPress install.
 */

if (!defined('ABSPATH')) { exit; }

define('PR_API_NS', 'paradise/v1');

// ----------------------------------------------------------------------------
// 1. SECRET KEY (set this in wp-config.php: define('PR_JWT_SECRET', 'your-long-random-string');)
//    Falls back to a derived value so the plugin works out of the box, but you
//    SHOULD set a stable secret in wp-config.php for production.
// ----------------------------------------------------------------------------
function pr_jwt_secret() {
  if (defined('PR_JWT_SECRET') && PR_JWT_SECRET) { return PR_JWT_SECRET; }
  return hash_hmac('sha256', 'paradise-rentals', wp_salt('auth'));
}

// ----------------------------------------------------------------------------
// 2. CUSTOM POST TYPES
// ----------------------------------------------------------------------------
add_action('init', function () {
  register_post_type('pr_cart', [
    'labels' => ['name' => 'Golf Carts', 'singular_name' => 'Cart'],
    'public' => true,
    'has_archive' => false,
    'show_in_rest' => true,
    'rest_base' => 'carts',
    'menu_icon' => 'dashicons-car',
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
    'rewrite' => false,
  ]);

  register_post_type('pr_booking', [
    'labels' => ['name' => 'Bookings', 'singular_name' => 'Booking'],
    'public' => false,
    'show_in_rest' => true,
    'rest_base' => 'bookings',
    'show_ui' => true,
    'menu_icon' => 'dashicons-calendar-alt',
    'supports' => ['title', 'custom-fields'],
    'rewrite' => false,
  ]);
});

// ----------------------------------------------------------------------------
// 3. META FIELDS (registered so they show up in the REST API automatically)
// ----------------------------------------------------------------------------
add_action('init', function () {
  $cart_fields = [
    'description'     => 'string',
    'image_url'       => 'string',
    'seats'           => 'integer',
    'hourly_rate'     => 'number',
    'daily_rate'      => 'number',
    'battery_range'   => 'string',
    'top_speed'       => 'string',
    'total_inventory' => 'integer',
    'status'          => 'string',
  ];
  foreach ($cart_fields as $key => $type) {
    register_post_meta('pr_cart', $key, [
      'type' => $type,
      'single' => true,
      'show_in_rest' => true,
      'sanitize_callback' => $type === 'integer' ? 'absint' : ($type === 'number' ? 'floatval' : 'sanitize_text_field'),
      'auth_callback' => function () { return current_user_can('edit_posts'); },
    ]);
  }

  $booking_fields = [
    'cart_id'         => 'string',
    'cart_name'       => 'string',
    'customer_name'   => 'string',
    'customer_email'  => 'string',
    'customer_phone'  => 'string',
    'start_datetime'  => 'string',
    'end_datetime'    => 'string',
    'rate_type'       => 'string',
    'total_price'     => 'number',
    'status'          => 'string',
  ];
  foreach ($booking_fields as $key => $type) {
    register_post_meta('pr_booking', $key, [
      'type' => $type,
      'single' => true,
      'show_in_rest' => true,
      'sanitize_callback' => $type === 'number' ? 'floatval' : 'sanitize_text_field',
      'auth_callback' => function () { return true; }, // bookings are created publicly
    ]);
  }
});

// ----------------------------------------------------------------------------
// 4. JWT HELPERS (HS256)
// ----------------------------------------------------------------------------
function pr_base64url_encode($data) {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}
function pr_base64url_decode($data) {
  return base64_decode(strtr($data, '-_', '+/'));
}
function pr_jwt_encode($payload) {
  $header = ['alg' => 'HS256', 'typ' => 'JWT'];
  $segments = [
    pr_base64url_encode(wp_json_encode($header)),
    pr_base64url_encode(wp_json_encode($payload)),
  ];
  $signing_input = implode('.', $segments);
  $sig = hash_hmac('sha256', $signing_input, pr_jwt_secret(), true);
  $segments[] = pr_base64url_encode($sig);
  return implode('.', $segments);
}
function pr_jwt_decode($token) {
  $parts = explode('.', $token);
  if (count($parts) !== 3) { return null; }
  list($h, $p, $sig) = $parts;
  $expected = pr_base64url_encode(hash_hmac('sha256', "$h.$p", pr_jwt_secret(), true));
  if (!hash_equals($expected, $sig)) { return null; }
  $payload = json_decode(pr_base64url_decode($p), true);
  if (!is_array($payload) || (isset($payload['exp']) && time() > $payload['exp'])) { return null; }
  return $payload;
}

// Pull the bearer token from the request.
function pr_bearer_token($request) {
  $hdr = $request->get_header('authorization');
  if ($hdr && preg_match('/Bearer\s+(.+)/i', $hdr, $m)) { return trim($m[1]); }
  return null;
}

// Authenticate a request via bearer token; sets the current user on success.
function pr_authenticate_request($request) {
  $token = pr_bearer_token($request);
  if (!$token) { return null; }
  $payload = pr_jwt_decode($token);
  if (!$payload || empty($payload['uid'])) { return null; }
  $user = get_user_by('ID', $payload['uid']);
  if (!$user) { return null; }
  wp_set_current_user($user->ID);
  return $user;
}

// ----------------------------------------------------------------------------
// 5. REST ROUTES
// ----------------------------------------------------------------------------
add_action('rest_api_init', function () {

  // POST /paradise/v1/login  { username, password } -> { token, user }
  register_rest_route(PR_API_NS, '/login', [
    'methods' => 'POST',
    'permission_callback' => '__return_true',
    'callback' => function ($request) {
      $username = sanitize_user($request->get_param('username'));
      $password = (string) $request->get_param('password');
      $user = wp_authenticate($username, $password);
      if (is_wp_error($user)) {
        return new WP_Error('invalid_credentials', 'Invalid email or password', ['status' => 401]);
      }
      $token = pr_jwt_encode([
        'uid' => $user->ID,
        'email' => $user->user_email,
        'role' => $user->roles[0] ?? 'subscriber',
        'exp' => time() + (60 * 60 * 24 * 14), // 14 days
      ]);
      return [
        'token' => $token,
        'user' => [
          'id' => $user->ID,
          'email' => $user->user_email,
          'full_name' => $user->display_name,
          'role' => $user->roles[0] ?? 'subscriber',
        ],
      ];
    },
  ]);

  // GET /paradise/v1/me  (Bearer) -> current user
  register_rest_route(PR_API_NS, '/me', [
    'methods' => 'GET',
    'permission_callback' => '__return_true',
    'callback' => function ($request) {
      $user = pr_authenticate_request($request);
      if (!$user) {
        return new WP_Error('unauthenticated', 'Not logged in', ['status' => 401]);
      }
      return [
        'id' => $user->ID,
        'email' => $user->user_email,
        'full_name' => $user->display_name,
        'role' => $user->roles[0] ?? 'subscriber',
      ];
    },
  ]);

  // POST /paradise/v1/register  { email, password, name } -> creates a user (does NOT log in)
  register_rest_route(PR_API_NS, '/register', [
    'methods' => 'POST',
    'permission_callback' => '__return_true',
    'callback' => function ($request) {
      $email = sanitize_email($request->get_param('email'));
      $password = (string) $request->get_param('password');
      $name = sanitize_text_field($request->get_param('name') ?: '');
      if (!is_email($email) || strlen($password) < 6) {
        return new WP_Error('invalid_input', 'Invalid email or password too short', ['status' => 400]);
      }
      if (get_user_by('email', $email)) {
        return new WP_Error('exists', 'An account with that email already exists', ['status' => 409]);
      }
      $uid = wp_insert_user([
        'user_login' => $email,
        'user_email' => $email,
        'user_pass' => $password,
        'display_name' => $name ?: $email,
        'role' => 'subscriber',
      ]);
      if (is_wp_error($uid)) {
        return new WP_Error('register_failed', $uid->get_error_message(), ['status' => 500]);
      }
      return ['id' => $uid, 'email' => $email, 'message' => 'Account created. Please log in.'];
    },
  ]);

  // POST /paradise/v1/reset  { email } -> always returns generic success
  register_rest_route(PR_API_NS, '/reset', [
    'methods' => 'POST',
    'permission_callback' => '__return_true',
    'callback' => function ($request) {
      $email = sanitize_email($request->get_param('email'));
      if ($email && ($user = get_user_by('email', $email))) {
        $key = get_password_reset_key($user);
        if (!is_wp_error($key)) {
          // In a real deployment, send this via wp_mail() with a link to your frontend reset page.
          $reset_url = add_query_arg(['token' => rawurlencode($key), 'login' => rawurlencode($user->user_login)], site_url('/wp-login.php?action=rp'));
          wp_mail($user->user_email, 'Paradise Rentals — Password Reset', "Reset your password: $reset_url");
        }
      }
      return ['sent' => true];
    },
  ]);

  // POST /paradise/v1/reset/confirm  { login, token, password } -> resets password
  register_rest_route(PR_API_NS, '/reset/confirm', [
    'methods' => 'POST',
    'permission_callback' => '__return_true',
    'callback' => function ($request) {
      $login = sanitize_user($request->get_param('login'));
      $token = (string) $request->get_param('token');
      $password = (string) $request->get_param('password');
      $user = get_user_by('login', $login) ?: get_user_by('email', $login);
      if (!$user) { return new WP_Error('no_user', 'No such user', ['status' => 400]); }
      $check = check_password_reset_key($token, $user->user_login);
      if (is_wp_error($check)) { return new WP_Error('bad_token', 'Invalid or expired reset link', ['status' => 400]); }
      wp_set_password($password, $user->ID);
      return ['reset' => true];
    },
  ]);

  // POST /paradise/v1/bookings  (public) -> create a booking from the checkout form
  register_rest_route(PR_API_NS, '/bookings', [
    'methods' => 'POST',
    'permission_callback' => '__return_true',
    'callback' => function ($request) {
      $cart_id = sanitize_text_field($request->get_param('cart_id'));
      $cart_name = sanitize_text_field($request->get_param('cart_name'));
      $customer_name = sanitize_text_field($request->get_param('customer_name'));
      $customer_email = sanitize_email($request->get_param('customer_email'));
      $customer_phone = sanitize_text_field($request->get_param('customer_phone'));
      $start = sanitize_text_field($request->get_param('start_datetime'));
      $end = sanitize_text_field($request->get_param('end_datetime'));
      $rate_type = sanitize_text_field($request->get_param('rate_type'));
      $total = floatval($request->get_param('total_price'));

      if (!$customer_name || !is_email($customer_email) || !$start || !$end) {
        return new WP_Error('invalid_booking', 'Missing required fields', ['status' => 400]);
      }

      $post_id = wp_insert_post([
        'post_type' => 'pr_booking',
        'post_status' => 'publish',
        'post_title' => sprintf('%s — %s', $customer_name, $cart_name ?: 'Cart'),
      ], true);
      if (is_wp_error($post_id)) {
        return new WP_Error('create_failed', $post_id->get_error_message(), ['status' => 500]);
      }

      update_post_meta($post_id, 'cart_id', $cart_id);
      update_post_meta($post_id, 'cart_name', $cart_name);
      update_post_meta($post_id, 'customer_name', $customer_name);
      update_post_meta($post_id, 'customer_email', $customer_email);
      update_post_meta($post_id, 'customer_phone', $customer_phone);
      update_post_meta($post_id, 'start_datetime', $start);
      update_post_meta($post_id, 'end_datetime', $end);
      update_post_meta($post_id, 'rate_type', $rate_type);
      update_post_meta($post_id, 'total_price', $total);
      update_post_meta($post_id, 'status', 'confirmed');

      return pr_map_booking($post_id);
    },
  ]);

  // GET /paradise/v1/bookings?cart_id=...&status=...  (auth) -> list bookings
  register_rest_route(PR_API_NS, '/bookings', [
    'methods' => 'GET',
    'permission_callback' => function ($request) {
      return (bool) pr_authenticate_request($request) && current_user_can('edit_posts');
    },
    'callback' => function ($request) {
      $args = [
        'post_type' => 'pr_booking',
        'posts_per_page' => 100,
        'orderby' => 'date',
        'order' => 'DESC',
        'meta_query' => [],
      ];
      if ($cart_id = $request->get_param('cart_id')) {
        $args['meta_query'][] = ['key' => 'cart_id', 'value' => $cart_id];
      }
      if ($status = $request->get_param('status')) {
        $args['meta_query'][] = ['key' => 'status', 'value' => $status];
      }
      $posts = get_posts($args);
      return array_map('pr_map_booking', $posts);
    },
  ]);

  // POST /paradise/v1/bookings/{id}/cancel  (auth) -> set status cancelled
  register_rest_route(PR_API_NS, '/bookings/(?P<id>\d+)/cancel', [
    'methods' => 'POST',
    'permission_callback' => function ($request) {
      return (bool) pr_authenticate_request($request) && current_user_can('edit_posts');
    },
    'callback' => function ($request) {
      $id = absint($request['id']);
      if (get_post_type($id) !== 'pr_booking') {
        return new WP_Error('not_found', 'Booking not found', ['status' => 404]);
      }
      update_post_meta($id, 'status', 'cancelled');
      return pr_map_booking($id);
    },
  ]);
});

// ----------------------------------------------------------------------------
// 6. MAPPERS (WP post -> the JSON shape the React app expects)
// ----------------------------------------------------------------------------
function pr_map_cart($post_id) {
  $p = get_post($post_id);
  return [
    'id' => strval($p->ID),
    'name' => $p->post_title,
    'description' => get_post_meta($p->ID, 'description', true),
    'image_url' => get_post_meta($p->ID, 'image_url', true) ?: get_the_post_thumbnail_url($p->ID, 'large'),
    'seats' => intval(get_post_meta($p->ID, 'seats', true)),
    'hourly_rate' => floatval(get_post_meta($p->ID, 'hourly_rate', true)),
    'daily_rate' => floatval(get_post_meta($p->ID, 'daily_rate', true)),
    'battery_range' => get_post_meta($p->ID, 'battery_range', true),
    'top_speed' => get_post_meta($p->ID, 'top_speed', true),
    'total_inventory' => intval(get_post_meta($p->ID, 'total_inventory', true)),
    'status' => get_post_meta($p->ID, 'status', true) ?: 'available',
    'created_date' => mysql2date('c', $p->post_date),
    'updated_date' => mysql2date('c', $p->post_modified),
  ];
}
function pr_map_booking($post_id) {
  $p = is_object($post_id) ? $post_id : get_post($post_id);
  return [
    'id' => strval($p->ID),
    'cart_id' => get_post_meta($p->ID, 'cart_id', true),
    'cart_name' => get_post_meta($p->ID, 'cart_name', true),
    'customer_name' => get_post_meta($p->ID, 'customer_name', true),
    'customer_email' => get_post_meta($p->ID, 'customer_email', true),
    'customer_phone' => get_post_meta($p->ID, 'customer_phone', true),
    'start_datetime' => get_post_meta($p->ID, 'start_datetime', true),
    'end_datetime' => get_post_meta($p->ID, 'end_datetime', true),
    'rate_type' => get_post_meta($p->ID, 'rate_type', true),
    'total_price' => floatval(get_post_meta($p->ID, 'total_price', true)),
    'status' => get_post_meta($p->ID, 'status', true) ?: 'confirmed',
    'created_date' => mysql2date('c', $p->post_date),
  ];
}

// Expose a clean GET /paradise/v1/carts endpoint (mapped) for the frontend.
add_action('rest_api_init', function () {
  register_rest_route(PR_API_NS, '/carts', [
    'methods' => 'GET',
    'permission_callback' => '__return_true',
    'callback' => function () {
      $posts = get_posts([
        'post_type' => 'pr_cart',
        'posts_per_page' => 100,
        'orderby' => 'date',
        'order' => 'DESC',
        'post_status' => 'publish',
      ]);
      return array_map('pr_map_cart', wp_list_pluck($posts, 'ID'));
    },
  ]);
  register_rest_route(PR_API_NS, '/carts/(?P<id>\d+)', [
    'methods' => 'GET',
    'permission_callback' => '__return_true',
    'callback' => function ($request) {
      $id = absint($request['id']);
      if (get_post_type($id) !== 'pr_cart') {
        return new WP_Error('not_found', 'Cart not found', ['status' => 404]);
      }
      return pr_map_cart($id);
    },
  ]);
  // Admin write endpoints for carts
  register_rest_route(PR_API_NS, '/carts', [
    'methods' => 'POST',
    'permission_callback' => function ($r) {
      return (bool) pr_authenticate_request($r) && current_user_can('edit_posts');
    },
    'callback' => function ($request) {
      $id = wp_insert_post([
        'post_type' => 'pr_cart',
        'post_status' => 'publish',
        'post_title' => sanitize_text_field($request->get_param('name') ?: 'New Cart'),
      ], true);
      if (is_wp_error($id)) { return new WP_Error('create_failed', $id->get_error_message(), ['status' => 500]); }
      pr_save_cart_meta($id, $request);
      return pr_map_cart($id);
    },
  ]);
  register_rest_route(PR_API_NS, '/carts/(?P<id>\d+)', [
    'methods' => 'POST',
    'permission_callback' => function ($r) {
      return (bool) pr_authenticate_request($r) && current_user_can('edit_posts');
    },
    'callback' => function ($request) {
      $id = absint($request['id']);
      if (get_post_type($id) !== 'pr_cart') {
        return new WP_Error('not_found', 'Cart not found', ['status' => 404]);
      }
      if ($name = $request->get_param('name')) {
        wp_update_post(['ID' => $id, 'post_title' => sanitize_text_field($name)]);
      }
      pr_save_cart_meta($id, $request);
      return pr_map_cart($id);
    },
  ]);
  register_rest_route(PR_API_NS, '/carts/(?P<id>\d+)', [
    'methods' => 'DELETE',
    'permission_callback' => function ($r) {
      return (bool) pr_authenticate_request($r) && current_user_can('edit_posts');
    },
    'callback' => function ($request) {
      $id = absint($request['id']);
      if (get_post_type($id) !== 'pr_cart') {
        return new WP_Error('not_found', 'Cart not found', ['status' => 404]);
      }
      wp_delete_post($id, true);
      return ['deleted' => true];
    },
  ]);
});

function pr_save_cart_meta($id, $request) {
  $fields = ['description','image_url','seats','hourly_rate','daily_rate','battery_range','top_speed','total_inventory','status'];
  foreach ($fields as $f) {
    $v = $request->get_param($f);
    if ($v !== null) {
      $clean = in_array($f, ['seats','total_inventory'], true) ? intval($v)
        : (in_array($f, ['hourly_rate','daily_rate'], true) ? floatval($v) : sanitize_text_field($v));
      update_post_meta($id, $f, $clean);
    }
  }
}

// Allow CORS so the headless frontend (on a different domain) can call the API.
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($value) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
    header('Access-Control-Allow-Credentials: true');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      http_response_code(204);
      exit;
    }
    return $value;
  });
}, 15);