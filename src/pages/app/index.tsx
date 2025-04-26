import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import Onboarding from "./onboarding";
import Started from "./started";
import Interview from "./interview";
import MockInterview from "./mock-interview";
import PermissionSetting from "./permission-setting";
import Role from "./role";
import Resume from "./resume";
import AiGenerater from "./ai-generator";
import InterviewCoach from "./interview-coach";
import ChatWithRecruiters from "./chat-with-recruiters";
import Question from "./question";
import Subscription from "./subscription";
import { useGlobalContext } from "../../context";
import { restApi } from "../../context/restApi";
import { showToast } from "../../context/helper";

// Define stack navigator parameter list
export type AppStackParamList = {
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

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppIndex = () => {
    const navigation = useNavigation<any>();
    const [state, { dispatch }] = useGlobalContext();

    useEffect(() => {
        fetchData();
    }, []);

    console.log('appstack ===>')

    const fetchData = async () => {
        try {
            console.log('state.access_token ===>', state.access_token);
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
            // initialRouteName="Started"
            initialRouteName="Started"
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Started" component={Started} />
            <Stack.Screen name="Started" component={Started} />
            <Stack.Screen name="LiveInterview" component={Interview} />
            <Stack.Screen name="MockInterview" component={MockInterview} />
            <Stack.Screen name="PermissionSetting" component={PermissionSetting} />
            <Stack.Screen name="Role" component={Role} />
            <Stack.Screen name="Resume" component={Resume} />
            <Stack.Screen name="AiGenerator" component={AiGenerater} />
            <Stack.Screen name="InterviewCoach" component={InterviewCoach} />
            <Stack.Screen name="ChatWithRecruiters" component={ChatWithRecruiters} />
            <Stack.Screen name="Question" component={Question} />
            <Stack.Screen name="Subscription" component={Subscription} /> */}
        </Stack.Navigator>
    );
};

export default AppIndex;