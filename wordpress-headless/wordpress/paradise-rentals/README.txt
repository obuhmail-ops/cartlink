=== Paradise Rentals Headless API ===
Contributors: paradise
Tags: headless, rest-api, golf-cart, booking
Requires at least: 5.6
Tested up to: 6.5
Stable tag: 1.0.0
License: GPL-2.0+

Self-contained backend for the Paradise Rentals headless React frontend.
No third-party plugins required.

== Installation ==
1. Copy the `paradise-rentals` folder into `wp-content/plugins/`.
2. (Recommended) Add to wp-config.php:
   define('PR_JWT_SECRET', 'a-long-random-secret-string');
3. Activate the plugin in wp-admin → Plugins.
4. Create an Administrator user for managing carts/bookings (wp-admin → Users → Add New).

== Endpoints ==
- POST   /wp-json/paradise/v1/login        { username, password } -> { token, user }
- GET    /wp-json/paradise/v1/me           (Bearer) -> user
- POST   /wp-json/paradise/v1/register     { email, password, name }
- POST   /wp-json/paradise/v1/reset        { email }
- POST   /wp-json/paradise/v1/reset/confirm { login, token, password }
- GET    /wp-json/paradise/v1/carts
- GET    /wp-json/paradise/v1/carts/{id}
- POST   /wp-json/paradise/v1/carts        (admin) create
- POST   /wp-json/paradise/v1/carts/{id}   (admin) update
- DELETE /wp-json/paradise/v1/carts/{id}   (admin) delete
- POST   /wp-json/paradise/v1/bookings     (public) create booking
- GET    /wp-json/paradise/v1/bookings     (admin) list, ?cart_id=&status=
- POST   /wp-json/paradise/v1/bookings/{id}/cancel (admin)

== Adding carts ==
In wp-admin → Golf Carts → Add New, set a title (the cart name) and fill the
custom fields in the "Cart Details" meta box: seats, hourly_rate, daily_rate,
battery_range, top_speed, total_inventory, status, image_url, description.