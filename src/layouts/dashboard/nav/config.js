// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'budgets',
    path: '/dashboard/app',
    icon: icon('ic_budgets'),
  },
  {
    title: 'crew list',
    path: '/dashboard/crew',
    icon: icon('ic_crew'),
  },
  {
    title: 'clients',
    path: '/dashboard/clients',
    icon: icon('ic_clients'),
  },
  {
    title: 'items',
    path: '/dashboard/items',
    icon: icon('ic_items'),
  },
  {
    title: 'expenses',
    path: '/dashboard/expenses',
    icon: icon('ic_expenses'),
  },
  {
    title: 'reports',
    path: '/dashboard/report',
    icon: icon('ic_reports'),
  },
  
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
