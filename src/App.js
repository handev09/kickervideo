// import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// // routes
// import Router from './routes';
// // theme
// import ThemeProvider from './theme';
// // components
// import { StyledChart } from './components/chart';
// import ScrollToTop from './components/scroll-to-top';
// import React from 'react';

// function App() {
//   return (
//     <HelmetProvider>
//     <BrowserRouter>
//       <ThemeProvider>
//         <ScrollToTop />
//         <StyledChart />
//         <Router />
//       </ThemeProvider>
//     </BrowserRouter>
//   </HelmetProvider>
//   );
// }

// export default App;


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './theme';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import Router from './routes'; // Make sure to import Router from the correct location
import React from 'react';

function App() {
  // Load your Stripe public key
  const stripePromise = loadStripe('pk_test_51M0O2dGJ2TF8KMOz1bO6h24Pcqf06HmRvS4H1rKL9C1xQdjwXhW6snIkN9fmMFzShzbcoBwDlWWeyNVDl3BEeQlk00OzCHev3s');

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Elements stripe={stripePromise}>
            <Router />
          </Elements>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
