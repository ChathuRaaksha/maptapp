// types/navigation.d.ts
export type RootStackParamList = {
    Splash: undefined;
    Splash2: undefined;
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    AuthCode:undefined;
    CreateProfile:undefined;
    PersonalizeInterests: { 
      profileImage?: string | null;
      username?: string;
    };
    CreateNewPassword:undefined;
    Forgot_password: undefined;
    Settings: undefined;
    Map:undefined;
    ARCamera:undefined;
    Contributions:undefined;
    RestaurantDetail: { itemId: string };
    Review: { restaurantId: string };
    ThankYou: undefined;
    Profile:undefined;
    EditProfile:undefined;
    ChangePassword:undefined;
    AdjustPreferences:undefined;
    Community:undefined;
    Saved:undefined;
    ContactUs:undefined;
    Subscription:undefined;
  };
  