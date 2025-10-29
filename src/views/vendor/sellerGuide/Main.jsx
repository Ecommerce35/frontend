import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from './parts/AppAppBar';
// import Hero from './components/Hero';
// import LogoCollection from './components/LogoCollection';
// import Highlights from './components/Highlights';
import Pricing from './parts/Pricing';
// import Features from './components/Features';
// import Testimonials from './components/Testimonials';
import FAQ from './parts/FAQ';
import Footer from './parts/Footer';
import IntroSection from './parts/SellerGuide';
import AppTheme from '../shared-theme/AppTheme';

export default function SellerGuide(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <IntroSection />
      <div>
        {/* <LogoCollection /> */}
        {/* <Features /> */}
        <Divider />
        {/* <Testimonials /> */}
        {/* <Divider /> */}
        {/* <Highlights /> */}
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        {/* <Divider /> */}
        <Footer />
      </div>
    </AppTheme>
  );
}