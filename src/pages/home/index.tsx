import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeIndex from "./home"
import InterviewCopilot from "./interview-copilot"
// import AiResumeBuilder from "./ai-resume-builder"
import AiMockInterview from "./ai-mock-interview"
import AiTools from "./ai-tools"
import Guide from "./tutorial"
import FaqComponent from "./components/faq"
import { faqs } from "./components/data.d";

import SignIn from '../auth/signin';
import SignUp from '../auth/signup';
import VerifyCode from '../auth/verify-code';
import ForgotPassword from '../auth/forgot-password';
import ResetPassword from '../auth/reset-password';

import App from '../app';
import AppScreen from '../app/app-screen';

// Define the stack navigator param list type
export type RootStackParamList = {
    Home: undefined;
    InterviewCopilot: undefined;
    AiMockInterview: undefined;
    AiTools: { screen?: string } | undefined;
    Guide: undefined;
    Faq: undefined;
    // auth
    SignIn: undefined;
    SignUp: undefined;
    VerifyCode: undefined;
    ForgotPassword: undefined;
    ResetPassword: undefined;
    // app
    Onboarding: undefined;
    Started: undefined;
    LiveInterview: undefined;
    MockInterview: undefined;
    PermissionSetting: undefined;
    Role: undefined;
    Resume: undefined;
    AiGenerator: undefined;
    InterviewCoach: undefined;
    ChatWithRecruiters: undefined;
    Question: undefined;
    Subscription: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Faq = () => {
    return (
        <FaqComponent title="FAQ: Everything You Need to Know About Mock Interviews" data={faqs} />
    )
}

const AppNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={HomeIndex} />
            <Stack.Screen name="InterviewCopilot" component={InterviewCopilot} />
            <Stack.Screen name="AiMockInterview" component={AiMockInterview} />
            <Stack.Screen name="AiTools" component={AiTools} />
            <Stack.Screen name="Guide" component={Guide} />
            <Stack.Screen name="Faq" component={Faq} />
            {/* auth */}
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="VerifyCode" component={VerifyCode} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            {/* app */}
            {/* <Stack.Screen name="App" component={App} /> */}
            <Stack.Screen name="Started" component={AppScreen.Started} />
            <Stack.Screen name="Onboarding" component={AppScreen.Onboarding} />
            <Stack.Screen name="LiveInterview" component={AppScreen.Interview} />
            <Stack.Screen name="MockInterview" component={AppScreen.MockInterview} />
            <Stack.Screen name="PermissionSetting" component={AppScreen.PermissionSetting} />
            <Stack.Screen name="Role" component={AppScreen.Role} />
            <Stack.Screen name="Resume" component={AppScreen.Resume} />
            <Stack.Screen name="AiGenerator" component={AppScreen.AiGenerater} />
            <Stack.Screen name="InterviewCoach" component={AppScreen.InterviewCoach} />
            <Stack.Screen name="ChatWithRecruiters" component={AppScreen.ChatWithRecruiters} />
            <Stack.Screen name="Question" component={AppScreen.Question} />
            <Stack.Screen name="Subscription" component={AppScreen.Subscription} />
        </Stack.Navigator>
    );
};

const Home = () => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
};

export default Home