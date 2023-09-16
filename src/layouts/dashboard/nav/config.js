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
    path: '/dashboard/user',
    icon: icon('ic_crew'),
  },
  {
    title: 'items',
    path: '/dashboard/products',
    icon: icon('ic_items'),
  },
  {
    title: 'expenses',
    path: '/dashboard/blog',
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
