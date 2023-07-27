import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './pages/SignupPage';
import AddCrewForm from './pages/AddCrewForm';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'addcrew', element: <AddCrewForm /> },
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

