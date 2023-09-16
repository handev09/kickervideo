
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigBottom = [
  {
    title: 'my profile',
    path: '/dashboard/me',
    icon: icon('ic_profile'),
  },
  
];

export default navConfigBottom;
