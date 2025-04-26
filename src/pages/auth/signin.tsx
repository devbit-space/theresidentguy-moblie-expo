import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  TextInput, 
  Dimensions, 
  ScrollView 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as WebBrowser from 'expo-web-browser';

import Icon from "../../components/icon";
import { emailValidator, showToast, strongPasswordValidator } from "../../context/helper";
import { restApi } from "../../context/restApi";
import { config, useGlobalContext } from "../../context";
import Loader from "../../components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

type RootStackParamList = {
  "Home": undefined;
  "SignUp": undefined;
  "ForgotPassword": undefined;
  "Started": undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignIn = () => {
  const navigation = useNavigation<NavigationProp>();
  const [_, { dispatch }]: any = useGlobalContext();
  const [stepIndex, setStepIndex] = useState(0);
  const [isPwdVisible, setPwdVisible] = useState(false);

  const [status, setStatus] = useState({
    email: "",
    password: "",
    isLoading: false
  });

  const [validate, setValidate] = useState({
    isValidEmail: { status: false, msg: "" },
  });

  const onNext = () => {
    if (validate.isValidEmail.status) {
      setStepIndex(1);
      dispatch({ type: "userEmail", payload: status.email });
    } else {
      showToast(!validate.isValidEmail.msg ? "Email is required!" : validate.isValidEmail.msg, "error");
    }
  };

  const onInput = (value: string, k: string, v: string) => {
    const validation = () => {
      if (k === "email") return emailValidator(value);
      if (k === 'password') return strongPasswordValidator(value);
      return { status: false, msg: "" };
    };
    
    setStatus({ ...status, [k]: value });
    if (v) setValidate({ ...validate, [v]: validation() });
  };

  const onSignIn = async () => {
    if (status.isLoading || !status.password) {
      return showToast("Password is required!", "error");
    }
    
    setStatus({ ...status, isLoading: true });
    
    const res = await restApi.postRequest("login", { 
      email: status.email, 
      password: status.password 
    });

    if (res === undefined) {
      showToast('An error has occurred during communication with backend.', 'error');
      setStatus({ ...status, isLoading: false });
    } else if (res.status === 200) {
      dispatch({ type: "access_token", payload: res.data.token });
      
      // Store token in AsyncStorage instead of cookies
      await AsyncStorage.setItem("access_token", res.data.token);
      
      navigation.navigate("Started");
      showToast("User logged in successfully, please continue.", "success");
    } else {
      showToast(res.msg, "error");
    }
    
    setStatus({ ...status, isLoading: false });
  };

  const onGoogle = async () => {
    dispatch({ type: "authType", payload: "signin" });
    await WebBrowser.openBrowserAsync(`${config.BACKEND_URL}/api/google-login`);
    showToast("Google authentication would be implemented with Expo AuthSession", "info");
  };

  const onFacebook = async () => {
    dispatch({ type: "authType", payload: "signin" });
    await WebBrowser.openBrowserAsync(`${config.BACKEND_URL}/api/facebook-login`);
    showToast("Facebook authentication would be implemented with Expo AuthSession", "info");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContent}>
        <TouchableOpacity 
          style={styles.headerLogoContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.logoText}>Theresidentguy</Text>
          <Image 
            source={require("../../assets/image/icons/logo.png")} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </TouchableOpacity>

        {stepIndex === 0 ? (
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Sign in to Theresidentguy</Text>
              <Text style={styles.subtitleText}>Welcome back! Please sign in to continue</Text>
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton} onPress={onFacebook}>
                <Image source={require("../../assets/image/icons/facebook.png")} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={onGoogle}>
                <Image source={require("../../assets/image/icons/google.png")} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require("../../assets/image/icons/linkedin.png")} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require("../../assets/image/icons/microsoft.png")} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.inputsContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                  value={status.email}
                  onChangeText={(text) => onInput(text, "email", "isValidEmail")}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter your email"
                />
                {!validate.isValidEmail.status && status.email.length > 0 && (
                  <Text style={styles.errorText}>{validate.isValidEmail.msg}</Text>
                )}
              </View>

              <TouchableOpacity 
                style={styles.continueButton}
                onPress={onNext}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Enter your password</Text>
              <Text style={styles.subtitleText}>Enter the password associated with your account.</Text>
            </View>

            <View style={styles.emailContainer}>
              <Text style={styles.emailText}>{status.email}</Text>
              <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => setStepIndex(0)}
              >
                <Icon icon="Edit" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputsContainer}>
              <View style={styles.inputGroup}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.label}>Password</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.inputWrapper}>
                  <TextInput
                    secureTextEntry={!isPwdVisible}
                    value={status.password}
                    onChangeText={(text) => onInput(text, "password", "")}
                    style={styles.input}
                    placeholder="Enter your password"
                  />
                  <TouchableOpacity 
                    style={styles.visibilityToggle}
                    onPress={() => setPwdVisible(!isPwdVisible)}
                  >
                    <Image 
                      source={isPwdVisible ? 
                        require("../../assets/image/icons/visible.svg") : 
                        require("../../assets/image/icons/invisible.svg")
                      } 
                      style={styles.visibilityIcon} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.continueButton}
                onPress={onSignIn}
                disabled={status.isLoading}
              >
                {status.isLoading ? (
                  <Loader color="white" />
                ) : (
                  <Text style={styles.continueText}>Continue</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // bg-slate-50
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  headerLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  logoText: {
    fontSize: 22,
    color: "#4F46E5", // text-primary
    fontWeight: "600",
  },
  logo: {
    width: 25,
    height: 25,
    marginLeft: 8,
  },
  formContainer: {
    width: isLargeScreen ? 430 : "90%",
    paddingHorizontal: 20,
  },
  titleContainer: {
    paddingTop: 40,
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitleText: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.6,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },
  socialButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E2E8F0", // border-slate-200
    borderRadius: 6,
    width: "23%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
  },
  dividerLine: {
    height: 1,
    width: 50,
    backgroundColor: "#CBD5E1", // bg-slate-300
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#94A3B8", // text-slate-400
  },
  inputsContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E2E8F0", // border-slate-200
    borderRadius: 6,
    padding: 12,
  },
  visibilityToggle: {
    position: "absolute",
    right: 12,
  },
  visibilityIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: "#F97316", // text-orange-500
    fontSize: 13,
    marginTop: 4,
  },
  continueButton: {
    width: "100%",
    backgroundColor: "#0090FF", 
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "white",
    fontSize: 18,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 8,
  },
  signUpText: {
    fontSize: 14,
    opacity: 0.8,
  },
  signUpLink: {
    fontSize: 14,
    color: "#4F46E5", // text-primary
    fontWeight: "600",
  },
  emailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 16,
    gap: 8,
  },
  emailText: {
    fontSize: 14,
    opacity: 0.6,
  },
  editButton: {
    opacity: 0.7,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B", // text-slate-500
  },
});

export default SignIn;