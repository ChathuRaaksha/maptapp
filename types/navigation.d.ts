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
    Onboarding1: undefined;
    Onboarding2: undefined;
    Onboarding3: undefined;
    Map:undefined;
    ARCamera:undefined;
    Contributions:undefined;
    RestaurantDetail: { itemId: string };
    Review: { restaurantId: string };
    ThankYou: undefined;
  };
  