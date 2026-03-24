import React from 'react';
import Header from '../components/Sections/Header';
import Hero from '../components/Sections/Hero';

import Credibility from '../components/Sections/Credibility';
import StatsSection from '../components/Sections/StatsSection';
import SystemSection from '../components/Sections/SystemSection';
import Features from '../components/Sections/Features';
import ForWhom from '../components/Sections/ForWhom';
import Testimonials from '../components/Sections/Testimonials';
import OfferSection from '../components/Sections/OfferSection';
import Footer from '../components/Sections/Footer';
import FAQ from '../components/Sections/FAQ';

const HomePage: React.FC = () => {
    return (
        <div className="bg-roasell-black min-h-screen text-white selection:bg-roasell-gold selection:text-black">
            <Header />
            <main>
                <Hero variant="B" />

                <Credibility />
                <StatsSection />
                <SystemSection />
                <div className="relative">
                    {/* Visual separator between system/features */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-roasell-gold/30"></div>
                    <Features />
                </div>
                <ForWhom />
                <Testimonials />
                <OfferSection />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
