import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import ExpensesPage from './pages/Expenses';
import CrewPage from './pages/Crew';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ItemsPage from './pages/Items';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './pages/SignupPage';
import AddCrewForm from './pages/AddCrewForm';
import CreateNewLineItem from './pages/CreateNewLineItem';
import MyDropdown from './pages/DropDown';
import AddBudget from './pages/AddBudget';
// import MainComponent from './pages/test/dialog-page-data/MainComponent';
import CustomDropdown from './components/item-price-dropdown/DropDown';
import Reports from './pages/Report';
import PaymentForm from './components/stripe/stripe';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <CrewPage /> },
        { path: 'products', element: <ItemsPage /> },
        { path: 'blog', element: <ExpensesPage /> },
        { path: 'addcrew', element: <AddCrewForm /> },
        { path: 'create-item', element: <CreateNewLineItem /> },
        { path: 'drop-down', element: <MyDropdown /> },
        { path: 'add-budget', element: <AddBudget /> },
        // { path: 'dialog', element: <MainComponent /> },
        { path: 'dropdown', element: <CustomDropdown /> },
        { path: 'report', element: <Reports /> },
        { path: 'pay', element: <PaymentForm /> },


      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}





// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// // Import your components and layouts here

// import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
// //
// import BlogPage from './pages/BlogPage';
// import UserPage from './pages/UserPage';
// import LoginPage from './pages/LoginPage';
// import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
// import DashboardAppPage from './pages/DashboardAppPage';

// export default function Router() {
//   return (
//     // <BrowserRouter>
//       <Routes>
//         <Route
//           path="/dashboard/*"
//           element={
//             <>
//               <DashboardLayout />
//               <Routes>
//                 <Route path="/" element={<Navigate to="/dashboard/app" />} />
//                 <Route path="app" element={<DashboardAppPage />} />
//                 <Route path="user" element={<UserPage />} />
//                 <Route path="products" element={<ProductsPage />} />
//                 <Route path="blog" element={<BlogPage />} />
//               </Routes>
//             </>
//           }
//         />

//         <Route
//           path="/login"
//           element={<LoginPage />}
//         />

//         <Route
//           path="/*"
//           element={
//             <SimpleLayout>
//               <Routes>
//                 <Route path="/" element={<Navigate to="/dashboard/app" />} />
//                 <Route path="404" element={<Page404 />} />
//                 <Route path="*" element={<Navigate to="/404" />} />
//               </Routes>
//             </SimpleLayout>
//           }
//         />
        
//         <Route
//           path="/404"
//           element={<Page404 />}
//         />

//         <Route
//           path="*"
//           element={<Navigate to="/404" replace />}
//         />
//       </Routes>
//     // </BrowserRouter>
//   );
// }

