import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Calculator, Moon, Sun, Users, Star, Cog, BookOpen, ArrowRight, Sparkles, Compass, Heart, Brain } from 'lucide-react';
import RisingSignCalculator from './pages/RisingSignCalculator';
import MoonSignCalculator from './pages/MoonSign';
import SunSignCalculator from './pages/SunSign';
import KundliMilanCalculator from './pages/KundliMilan';
import NameCompatibilityCalculator from './pages/NameCompatibility';
import UpapadaLagnaCalculator from './pages/UpapadaLagna';
import NakshatraCalculator from './pages/Nakshatra';
import DashaCalculator from './pages/Dasha';
import AtmakarakaCalculator from './pages/Atmakaraka';
import YogaCalculator from './pages/Yoga';
import HomePage from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Sitemap from './pages/Sitemap';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rising-sign-calculator" element={<RisingSignCalculator />} />
        <Route path="/moon-sign-calculator" element={<MoonSignCalculator />} />
        <Route path="/sun-sign-calculator" element={<SunSignCalculator />} />
        <Route path="/kundli-milan-calculator" element={<KundliMilanCalculator />} />
        <Route path="/name-compatibility-calculator" element={<NameCompatibilityCalculator />} />
        <Route path="/upapada-lagna-calculator" element={<UpapadaLagnaCalculator />} />
        <Route path="/nakshatra-calculator" element={<NakshatraCalculator />} />
        <Route path="/dasha-calculator" element={<DashaCalculator />} />
        <Route path="/atmakaraka-calculator" element={<AtmakarakaCalculator />} />
        <Route path="/yoga-calculator" element={<YogaCalculator />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;