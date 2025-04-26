// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';

// import SignUp from "./signup"
// import SignIn from "./signin"
// import VerifyCode from "./verify-code"
// import ForgotPassword from "./forgot-password"
// import ResetPassword from "./reset-password"

// // Define the authentication stack navigator param list type
// export type AuthStackParamList = {
//   SignUp: undefined;
//   SignIn: undefined;
//   VerifyCode: undefined;
//   ForgotPassword: undefined;
//   ResetPassword: undefined;
// };

// const Stack = createNativeStackNavigator<AuthStackParamList>();

// const AuthNavigator = () => {
//     return (
//         <Stack.Navigator
//             initialRouteName="SignIn"
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >
//             <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
//             <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
//             <Stack.Screen name="VerifyCode" component={VerifyCode} options={{ headerShown: false }} />
//             <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
//             <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
//         </Stack.Navigator>
//     )
// }

// const Auth = () => {
//     return (
//         <NavigationContainer>
//             <AuthNavigator />
//         </NavigationContainer>
//     )
// }

// export default Auth