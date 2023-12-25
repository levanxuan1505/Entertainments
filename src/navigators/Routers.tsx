import {createStackNavigator} from '@react-navigation/stack';
export type RootStackParams = {
  openDrawer(): any;
  User;
  Home;
  Actor;
  LogIn;
  Movies: {
    item: Object;
  };
  Drawer;
  Search;
  SeeAll;
  MyList;
  LogInTV;
  Settings;
  Register;
  Watching;
  Animation;
  SeeAllHBO: {
    title: string;
    data: any;
    firstItem: number;
  };
  VideoFull;
  TermsOfUse;
  OnBoarding;
  Transaction;
  MoviesOphim;
  ManageDevices;
  PrivacyPolicy;
  SeeAllCoreAPIS;
};
// const Stack = createStackNavigator<RootStackParams>();
// //
