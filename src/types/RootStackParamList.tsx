import {ProductType} from './ProductType';
import {ReviewType} from './ReviewType';

export type RootStackParamList = {
  Filter: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Checkout: {appliedVoucher: boolean};
  MyAddress: undefined;
  Onboarding: undefined;
  Splash: undefined;
  EditProfile: undefined;
  NewPassword: undefined;
  OrderFailed: undefined;
  AddANewCard: undefined;
  OrderHistory: undefined;
  LeaveAReview: undefined;
  MyPromocodes: undefined;
  TabNavigator: undefined;
  Notifications: undefined;
  PaymentMethod: undefined;
  ForgotPassword: undefined;
  TrackYourOrder: undefined;
  AddANewAddress: undefined;
  OrderSuccessful: undefined;
  ConfirmationCode: undefined;
  Product: {item: any};
  SignUpAccountCreated: undefined;
  VerifyYourPhoneNumber: undefined;
  Reviews: {reviews: ReviewType[]};
  Description: {description: string};
  ForgotPasswordSentEmail: undefined;
  Shop: {products?: ProductType[]; title?: string};
  Categories: undefined;
  TopCategories: undefined;
  SuccessOrder:undefined
};
