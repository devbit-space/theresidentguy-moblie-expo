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

import Icon from "../../components/icon";
import { emailValidator, passwordMatch, showToast, strongPasswordValidator } from "../../context/helper";
import { restApi } from "../../context/restApi";
import { useGlobalContext } from "../../context";
import Loader from "../../components/loader";

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

type RootStackParamList = {
  Home: undefined;
  "SignIn": undefined;
  "SignUp": undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ResetPassword = () => {
  const navigation = useNavigation<NavigationProp>();
  const [state]: any = useGlobalContext();
  const [isPwdVisible, setPwdVisible] = useState(false);

  const [status, setStatus] = useState({
    password: "",
    confPassword: "",
    isLoading: false
  });

  const [validate, setValidate] = useState({
    isStrongPassword: { status: false, msg: "" },
    isPasswordMatch: { status: false, msg: "" }
  });

  const onInput = (value: string, k: string, v: string) => {
    const validation = () => {
      if (k === 'password') return strongPasswordValidator(value);
      if (k === 'confPassword') return passwordMatch(status.password, value);
      return { status: false, msg: "" };
    };
    
    setStatus({ ...status, [k]: value });
    setValidate({ ...validate, [v]: validation() });
  };

  const onResetPassword = async () => {
    if (status.isLoading || !status.password) {
      return showToast("Password is required!", "error");
    }
    
    setStatus({ ...status, isLoading: true });
    
    const res = await restApi.postRequest("reset-password", { 
      email: state.userEmail, 
      password: status.password, 
      conf_password: status.confPassword 
    });

    if (res === undefined) {
      showToast('An error has occurred during communication with backend.', 'error');
      setStatus({ ...status, isLoading: false });
    } else if (res.status === 200) {
      navigation.navigate("SignIn");
      showToast("Password reset successfully, please login to continue.", "success");
    } else {
      showToast(res.msg, "error");
    }
    
    setStatus({ ...status, isLoading: false });
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

        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Reset Your Password</Text>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  secureTextEntry={!isPwdVisible}
                  value={status.password}
                  onChangeText={(text) => onInput(text, "password", "isStrongPassword")}
                  style={styles.input}
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
              {!validate.isStrongPassword.status && status.password.length > 0 && (
                <Text style={styles.errorText}>{validate.isStrongPassword.msg}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  secureTextEntry={!isPwdVisible}
                  value={status.confPassword}
                  onChangeText={(text) => onInput(text, "confPassword", "isPasswordMatch")}
                  style={styles.input}
                />
              </View>
              {!validate.isPasswordMatch.status && status.confPassword.length > 0 && (
                <Text style={styles.errorText}>{validate.isPasswordMatch.msg}</Text>
              )}
            </View>

            <TouchableOpacity 
              style={styles.continueButton}
              onPress={onResetPassword}
              disabled={status.isLoading}
            >
              {status.isLoading ? (
                <Loader color="white" />
              ) : (
                <Text style={styles.continueText}>Continue</Text>
              )}
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  inputsContainer: {
    marginTop: 40,
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
    borderColor: "#E2E8F0",
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
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 8,
  },
  signupText: {
    fontSize: 14,
    opacity: 0.8,
  },
  signupLink: {
    fontSize: 14,
    color: "#4F46E5", // text-primary
    fontWeight: "600",
  },
});

export default ResetPassword;