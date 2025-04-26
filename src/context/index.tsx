import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { config } from "../config/config";
import { restApi } from "./restApi";

export { config }

// Define the missing TypeScript interfaces
interface InitStateObject {
    access_token: string;
    userEmail: string;
    verifyCodeType: string;
    isSharedScreen: boolean;
    authType: string;
    isLeaveInterview: {
        status: boolean;
        link: string;
    };
    user: {
        id: string;
        email: string;
        fullName: string;
        pfp: string;
        isPasswordSet: boolean;
    };
}

interface ReducerObject {
    type: keyof InitStateObject;
    payload: any;
}

const INIT_STATE: InitStateObject = {
    access_token: "",
    userEmail: "",
    verifyCodeType: "",
    isSharedScreen: false,
    authType: "",
    isLeaveInterview: {
        status: false,
        link: ""
    },
    user: {
        id: "",
        email: "",
        fullName: "",
        pfp: "",
        isPasswordSet: false
    }
}

const GlobalContext = React.createContext<any>(null);
const reducer = (state: InitStateObject, { type, payload }: ReducerObject) => {
    return { ...state, [type]: payload };
}

function useGlobalContext() {
    const context = React.useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
}

const storeData = async (value: any) => {
    try {
        await AsyncStorage.setItem("access_token", JSON.stringify(value));
    } catch (error) {
        console.error("Error storing access token:", error);
    }
}

const getStoredToken = async () => {
    try {
        const value = await AsyncStorage.getItem("access_token");
        console.log('value =====>', value);
        return value !== null ? JSON.parse(value) : null;
    } catch (error) {
        // console.error("Error retrieving access token:", error);
        return null;
    }
}

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, INIT_STATE);

    React.useEffect(() => {
        initSessionSetting();
    }, []);

    const initSessionSetting = async () => {
        try {
            // Instead of using Cookies, we retrieve the token from AsyncStorage
            const access_token = await getStoredToken();

            if (access_token) {
                const res = await restApi.postRequest("get-user");
                const data = res.data.data;

                dispatch({ type: "access_token", payload: access_token });
                dispatch({ 
                    type: "user", 
                    payload: {
                        id: data._id,
                        email: data.email,
                        fullName: data.full_name,
                        pfp: data.pfp,
                        isPasswordSet: data.is_password_set
                    } 
                });
            }
        } catch (error) {
            console.error("Session initialization error:", error);
        }
    }

    return (
        <GlobalContext.Provider
            value={React.useMemo(() => [
                state, { dispatch, storeData }
            ], [state])}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export { useGlobalContext, GlobalContextProvider };
