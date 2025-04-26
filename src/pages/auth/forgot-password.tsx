import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Dimensions, 
  ScrollView 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Icon from "../../components/icon";
import { useGlobalContext } from "../../context";
import { restApi } from "../../context/restApi";
import { showToast } from "../../context/helper";
import Loader from "../../components/loader";

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

type RootStackParamList = {
  Home: undefined;
  "SignIn": undefined;
  "VerifyCode": undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SetPassword = () => {
  const navigation = useNavigation<NavigationProp>();
  const [state, { dispatch }]: any = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const onVerifyCode = async () => {
    if (isLoading) return;
    dispatch({ type: "verifyCodeType", payload: "forgotPassword" });
    setIsLoading(true);
    const res = await restApi.postRequest("send-code", { email: state.userEmail });
    if (res === undefined) {
      showToast("An error has occurred during communication with backend.", "error");
      setIsLoading(false);
    } else if (res.status === 200) {
      navigation.navigate("VerifyCode");
      setIsLoading(false);
    }
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

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Forgot Password?</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[styles.optionButton, isLoading && styles.disabledButton]} 
            onPress={onVerifyCode}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader color="border-slate-500" />
            ) : (
              <View style={styles.optionContent}>
                {/* <Icon icon="Email" /> */}
                <Text style={styles.optionText}>Email code to {state.userEmail}</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.orText}>Or, sign in with another method</Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require("../../assets/image/icons/facebook.png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require("../../assets/image/icons/google.png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require("../../assets/image/icons/linkedin.png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require("../../assets/image/icons/microsoft.svg")} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>Don't have any of these?</Text>
            <TouchableOpacity>
              <Text style={styles.getHelpText}>Get help</Text>
            </TouchableOpacity>
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
    marginBottom: 20,
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
  titleContainer: {
    paddingTop: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  optionsContainer: {
    width: isLargeScreen ? 430 : "90%",
    marginTop: 20,
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0", // border-slate-200
    borderRadius: 8,
    padding: 12,
  },
  disabledButton: {
    opacity: 0.7,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionText: {
    fontSize: 16,
  },
  orText: {
    fontSize: 14,
    textAlign: "center",
    paddingTop: 12,
    fontWeight: "600",
    color: "#64748B", // text-slate-500
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginTop: 40,
    // flexWrap: "wrap",
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
  backButton: {
    alignItems: "center",
    marginTop: 24,
  },
  backText: {
    fontWeight: "600",
    color: "#64748B", // text-slate-500
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingTop: 12,
    marginBottom: 30,
  },
  helpText: {
    color: "#64748B", // text-slate-500
  },
  getHelpText: {
    color: "#4F46E5", // text-primary
    fontWeight: "600",
  },
});

export default SetPassword;