import {
  ApertureIcon,
  CopyIcon,
  LayoutDashboardIcon,
  LoginIcon,
  MoodHappyIcon,
  TypographyIcon,
  UserPlusIcon,
  BooksIcon,
  BooksOffIcon,
  CloudComputingIcon,
  BuildingCommunityIcon,
  CalendarEventIcon,
  BrandOpenSourceIcon,
  BrowserIcon
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "Home" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/",
  },
  { header: "Training Data" },
  {
    title: "Training Data",
    icon: CloudComputingIcon,
    to: "/training",
  },
  { header: "Master Data" },
  {
    title: "News",
    icon: BooksIcon,
    to: "/news",
  },
  {
    title: "Debunking",
    icon: BooksOffIcon,
    to: "/debunking",
  },
  {
    title: "Community",
    icon: BuildingCommunityIcon,
    to: "/community",
  },
  {
    title: "Event",
    icon: CalendarEventIcon,
    to: "/event",
  },
  {
    title: "Trusted Source",
    icon: BrandOpenSourceIcon,
    to: "/trusted Source",
  },
  {
    title: "Url Request",
    icon: BrowserIcon,
    to: "/url-req",
  },
  {
    title: "Users",
    icon: UserPlusIcon,
    to: "/users",
  },
  // { header: 'utilities' },
  // {
  //     title: 'Typography',
  //     icon: TypographyIcon,
  //     to: '/ui/typography'
  // },
  // {
  //     title: 'Shadow',
  //     icon: CopyIcon,
  //     to: '/ui/shadow'
  // },
  // { header: 'auth' },
  // {
  //     title: 'Login',
  //     icon: LoginIcon,
  //     to: '/auth/login'
  // },
  // {
  //     title: 'Register',
  //     icon: UserPlusIcon,
  //     to: '/auth/register'
  // },
  // { header: 'Extra' },
  // {
  //     title: 'Icons',
  //     icon: MoodHappyIcon,
  //     to: '/icons'
  // },
  // {
  //     title: 'Sample Page',
  //     icon: ApertureIcon,
  //     to: '/sample-page'
  // },
];

export default sidebarItem;
