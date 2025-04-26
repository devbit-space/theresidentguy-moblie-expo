import React, { useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";

import HomeIndex from "./home"
import InterviewRoom from "./interview-room"
import AppScreen from '../app-screen';

import { useGlobalContext } from "../../../context/index";
import { restApi } from "../../../context/restApi";
import { showToast } from "../../../context/helper";

// Define the stack param list
type InterviewStackParamList = {
  Home: undefined;
  LiveInterview : undefined;
  InterviewRoom: { callId: string };
};

// Create stack navigator
const Stack = createStackNavigator<InterviewStackParamList>();

const Interview = () => {
    const navigation = useNavigation<any>();
    const [state, { dispatch }] = useGlobalContext();

    useEffect(() => {
        // fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log('state ==========================================>', JSON.parse(state));
            const res = await restApi.postRequest("get-user");

            if (res === undefined) {
                showToast('An error has occurred during communication with backend.', 'error');
            } else if (res.status === 200) {
                const data = res.data.data;
                const user = { 
                    id: data._id, 
                    email: data.email, 
                    fullName: data.full_name, 
                    pfp: data.pfp, 
                    isPasswordSet: data.is_password_set 
                };
                console.log("user =====>", user);
                dispatch({ type: "user", payload: user });
                
                if (state.authType !== "signup") {
                    navigation.navigate("Started");
                } else {
                    navigation.navigate("Onboarding");
                }
            } else {
                navigation.navigate("SignIn");
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            navigation.navigate("SignIn");
        }
    };
    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{ 
                headerShown: false 
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={HomeIndex} 
            />
            <Stack.Screen 
                name="InterviewRoom" 
                component={InterviewRoom} 
            />
            <Stack.Screen name="LiveInterview" component={AppScreen.Interview} />
        </Stack.Navigator>
    )
}

export default Interview