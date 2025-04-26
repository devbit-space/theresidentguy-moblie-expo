import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeIndex from "./home";
import MockRoom from "./mock-room";

// Define the types for route parameters
export type MockInterviewStackParamList = {
  Home: undefined;
  MockRoom: { callId: string };
};

// Create the stack navigator
const Stack = createStackNavigator<MockInterviewStackParamList>();

const MockInterview = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeIndex} />
      <Stack.Screen name="MockRoom" component={MockRoom} />
    </Stack.Navigator>
  );
};

export default MockInterview;
