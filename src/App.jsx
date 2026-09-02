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
import SixPassenger from './pages/SixPassenger';
import AirportRental from './pages/AirportRental';
// Add page imports here

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/4-passenger" element={<FourPassenger />} />
      <Route path="/6-passenger" element={<SixPassenger />} />
      <Route path="/airport-rental" element={<AirportRental />} />
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