import React, { useState, useEffect, useRef } from "react";
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
import { restApi } from "../../context/restApi";
import { useGlobalContext } from "../../context";
import { showToast } from "../../context/helper";
import Loader from "../../components/loader";

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

type RootStackParamList = {
  Home: undefined;
  "SignUp": undefined;
  "SignIn": undefined;
  "ResetPassword": undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Custom verification code input
const VerificationCodeInput = ({ 
  value, 
  onChange, 
  isWrongCode,
  length = 6 
}: { 
  value: string; 
  onChange: (text: string) => void; 
  isWrongCode: boolean;
  length?: number;
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  
  const handleCodeChange = (text: string, index: number) => {
    const newCode = value.split('');
    newCode[index] = text;
    const newValue = newCode.join('');
    onChange(newValue);
    
    // Auto advance to next input
    if (text.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && value[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.verificationContainer}>
      {[...Array(length)].map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.codeInput,
            isWrongCode && styles.codeInputError
          ]}
          value={value[index] || ''}
          onChangeText={(text) => handleCodeChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          maxLength={1}
          keyboardType="number-pad"
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const VerifyCode = () => {
  const navigation = useNavigation<NavigationProp>();
  const [state, { dispatch }]: any = useGlobalContext();
  const [status, setStatus] = useState({
    code: "",
    isWrongCode: false,
    isLoading: false,
    count: 30
  });

  useEffect(() => {
    if (status.count === 0) return;

    const timer = setInterval(() => {
      setStatus(prev => ({ ...prev, count: prev.count - 1 }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [status.count]);

  const onSend = async () => {
    if (status.isLoading || !status.code) return;
    
    setStatus({ ...status, isLoading: true });
    
    const res = await restApi.postRequest("verify-email", { 
      email: state.userEmail, 
      code: status.code, 
      type: state.verifyCodeType 
    });
    
    if (res === undefined) {
      showToast('An error has occurred during communication with backend.', 'error');
    } else if (res.status === 200) {
      if (state.verifyCodeType === "forgotPassword") {
        navigation.navigate("ResetPassword");
      } else {
        navigation.navigate("SignIn");
        showToast("User registered successfully, please login to continue.", "success");
      }
    } else {
      setStatus({ ...status, isWrongCode: true, isLoading: false });
      showToast(res.msg, "error");
      return;
    }
    
    setStatus({ ...status, isLoading: false });
  };

  const onResend = async () => {
    if (status.count > 0) return;
    
    setStatus({ ...status, count: 30 });
    // Uncomment when ready to implement
    // const res = await restApi.postRequest("send-code", { email: state.userEmail });
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
            <Text style={styles.titleText}>Let Verify you</Text>
            <Text style={styles.subtitleText}>Verification code was sent to your email.</Text>
          </View>

          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>{state.userEmail}</Text>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => navigation.navigate("SignUp")}
            >
              <Icon icon="Edit" />
            </TouchableOpacity>
          </View>

          <View style={styles.verificationSection}>
            <VerificationCodeInput
              value={status.code}
              onChange={(code) => setStatus({ ...status, code, isWrongCode: false })}
              isWrongCode={status.isWrongCode}
            />

            <View style={styles.resendContainer}>
              <TouchableOpacity 
                onPress={onResend}
                disabled={status.count > 0}
                style={[
                  styles.resendButton,
                  status.count > 0 && styles.resendButtonDisabled
                ]}
              >
                <Text style={[
                  styles.resendText,
                  status.count > 0 && styles.resendTextDisabled
                ]}>
                  Resend code
                </Text>
              </TouchableOpacity>
              <Text style={styles.countText}>{status.count}s</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.continueButton}
            onPress={onSend}
            disabled={status.isLoading || !status.code || status.code.length < 6}
          >
            {status.isLoading ? (
              <Loader color="white" />
            ) : (
              <Text style={styles.continueText}>Continue</Text>
            )}
          </TouchableOpacity>
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
  emailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 40,
    gap: 8,
  },
  emailText: {
    fontSize: 14,
    opacity: 0.6,
  },
  editButton: {
    opacity: 0.7,
  },
  verificationSection: {
    width: "100%",
  },
  verificationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  codeInput: {
    width: width > 350 ? 45 : 35,
    height: width > 350 ? 45 : 35,
    borderRadius: 8,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  codeInputError: {
    borderWidth: 1,
    borderColor: "#EF4444", // red-500
    color: "#EF4444",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  resendButton: {
    padding: 4,
  },
  resendButtonDisabled: {
    opacity: 0.6,
  },
  resendText: {
    fontSize: 14,
  },
  resendTextDisabled: {
    opacity: 0.6,
  },
  countText: {
    fontSize: 14,
    opacity: 0.6,
  },
  continueButton: {
    width: "100%",
    backgroundColor: "#0090FF", 
    padding: 12,
    borderRadius: 6,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "white",
    fontSize: 18,
  },
});

export default VerifyCode;