import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from 'next-themes';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Rentals from './pages/Rentals';
import Gallery from './pages/Gallery';
import Delivery from './pages/Delivery';
import Faq from './pages/Faq';
import FourPassenger from './pages/FourPassenger';
import ExploreKeyWest from './pages/ExploreKeyWest';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import CancellationPolicy from './pages/CancellationPolicy';
import RentalRequirements from './pages/RentalRequirements';
import FourPassengerRentals from './pages/FourPassengerRentals';
import SixPassengerRentals from './pages/SixPassengerRentals';
import KeyWestAirportGolfCartRentals from './pages/KeyWestAirportGolfCartRentals';
import KeyWestCruisePortGolfCartRentals from './pages/KeyWestCruisePortGolfCartRentals';
import KeyWestExpressGolfCartRentals from './pages/KeyWestExpressGolfCartRentals';
// Add page imports here

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/golf-cart-delivery-key-west" element={<Delivery />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/4-passenger" element={<FourPassenger />} />
      <Route path="/explore-key-west" element={<ExploreKeyWest />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsConditions />} />
      <Route path="/cancellation-policy" element={<CancellationPolicy />} />
      <Route path="/rental-requirements" element={<RentalRequirements />} />
      <Route path="/4-passenger-golf-cart-rentals-key-west" element={<FourPassengerRentals />} />
      <Route path="/6-passenger-golf-cart-rentals-key-west" element={<SixPassengerRentals />} />
      <Route path="/key-west-airport-golf-cart-rentals" element={<KeyWestAirportGolfCartRentals />} />
      <Route path="/key-west-cruise-port-golf-cart-rentals" element={<KeyWestCruisePortGolfCartRentals />} />
      <Route path="/key-west-express-golf-cart-rentals" element={<KeyWestExpressGolfCartRentals />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App