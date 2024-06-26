import {Navigate, useRoutes} from 'react-router-dom';
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
import Services from './pages/Service';
import ClientsPage from './pages/Clients';
import ClientDetailsPage from './pages/ClientDetail';
import BudgetDetailsPage from './pages/BudgetDetails';
import BudgetDetailsPageOLD from './pages/BudgetDetailsOLD';
import CrewDetails from './pages/CrewDetails';

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to="/dashboard/app"/>, index: true},
                {path: 'app', element: <DashboardAppPage/>},
                {path: 'crew', element: <CrewPage/>},
                {path: 'items', element: <ItemsPage/>},
                {path: 'expenses', element: <ExpensesPage/>},
                {path: 'addcrew', element: <AddCrewForm/>},
                {path: 'create-item', element: <CreateNewLineItem/>},
                {path: 'drop-down', element: <MyDropdown/>},
                {path: 'add-budget', element: <AddBudget/>},
                {path: 'dropdown', element: <CustomDropdown/>},
                {path: 'report', element: <Reports/>},
                {path: 'pay', element: <PaymentForm/>},
                {path: 'service', element: <Services/>},
                {path: 'clients', element: <ClientsPage/>},
                {path: 'client-details/:clientId', element: <ClientDetailsPage/>}, // Remove the leading slash '/'
                {path: 'budget-details/:budgetId', element: <BudgetDetailsPage/>}, // Remove the leading slash '/'
                // OLD BudgetDetailsPage
                // {path: 'budget-details-old/:budgetId', element: <BudgetDetailsPageOLD/>}, // Remove the leading slash '/'
                {path: 'crew-details/:crewId', element: <CrewDetails/>}, // Remove the leading slash '/'

            ],
        },

        {
            path: 'login',
            element: <LoginPage/>,
        },
        {
            path: 'signup',
            element: <SignupPage/>,
        },
        {
            element: <SimpleLayout/>,
            children: [
                {element: <Navigate to="/dashboard/app"/>, index: true},
                {path: '404', element: <Page404/>},
                {path: '*', element: <Navigate to="/404"/>},
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);

    return routes;
}


