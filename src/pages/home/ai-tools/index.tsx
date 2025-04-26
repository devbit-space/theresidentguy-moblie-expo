import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecruitersHotline from "./recruiters-hotline"
import ResumeOptimizer from "./resume-optimizer"
import ResumeGrader from "./resume-grader"
import ResumeChecker from "./resume-checker"
import ResumeScore from "./resume-score"
import ResumeMakerForAts from "./resume-maker-for-ats"
import AtsResumeMaker from "./ats-resume-maker"

// Define the navigation parameters type
export type AiToolsStackParamList = {
  RecruitersHotline: undefined;
  ResumeOptimizer: undefined;
  ResumeGrader: undefined;
  ResumeChecker: undefined;
  ResumeScore: undefined;
  ResumeMakerForAts: undefined;
  AtsResumeMaker: undefined;
};

const Stack = createNativeStackNavigator<AiToolsStackParamList>();

const AiTools = () => {
    return (
        <Stack.Navigator 
            initialRouteName="RecruitersHotline"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
            }}
        >
            <Stack.Screen name="RecruitersHotline" component={RecruitersHotline} />
            <Stack.Screen name="ResumeOptimizer" component={ResumeOptimizer} />
            <Stack.Screen name="ResumeGrader" component={ResumeGrader} />
            <Stack.Screen name="ResumeChecker" component={ResumeChecker} />
            <Stack.Screen name="ResumeScore" component={ResumeScore} />
            <Stack.Screen name="ResumeMakerForAts" component={ResumeMakerForAts} />
            <Stack.Screen name="AtsResumeMaker" component={AtsResumeMaker} />
        </Stack.Navigator>
    )
}

export default AiTools