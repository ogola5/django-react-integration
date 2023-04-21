import React from 'react';
import HeroSection from './HeroSection';
import BankingSection from './BankingSection';
import BusinessSection from './BusinessSection';
import PaymentSection from './PaymentSection';
import About from './About';
import Footer from './Footer';
import Products from './Products';

const Homepage = () => {
  return (
    <div>
      <HeroSection/>
      <Products/>
      <BankingSection />
      <BusinessSection />
      <PaymentSection />
      <About />
      <Footer />
    </div>
  );
}

export default Homepage;







  
