import React from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { interviewCopilot } from "../components/data.d";

const { width: screenWidth } = Dimensions.get("window");
const isLargeScreen = screenWidth >= 768; // md breakpoint

type ItemProps = {
  i: { logo: string; position: string };
};

const Item: React.FC<ItemProps> = ({ i }) => {
    return (
    <View style={styles.itemCard}>
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: i.logo }} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>
      <Text style={styles.positionText} numberOfLines={3}>
        {i.position}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Interview Copilot™</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Mock Interview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AtsResumeMaker = () => {
  const navigation = useNavigation();

    return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Main content area */}
        <LinearGradient
          colors={['#91c2fd', 'rgba(255,255,255,0)']}
          style={styles.gradientBackground}
        >
          {/* Desktop/Tablet Version */}
          {isLargeScreen && (
            <View style={styles.desktopContent}>
              <View style={styles.headerSection}>
                <View style={styles.headerTextContainer}>
                  <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>ATS Resume Maker</Text>
                  </View>
                  <Text style={styles.heading}>
                                    Optimize your resume for Applicant Tracking Systems (ATS)
                  </Text>
                  <Text style={styles.subheading}>
                    Create a resume that's tailored to pass through ATS filters with the right keywords, 
                    structure, and formatting, ensuring your application reaches hiring managers.
                  </Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../../assets/image/home/ats-resume-maker.png")}
                    style={styles.heroImage}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={styles.chatContainer}>
                <View style={styles.chatContent}>
                  <View style={styles.chatMessages}>
                    <View style={styles.userMessageContainer}>
                      <View style={styles.userMessage}>
                        <Text style={styles.messageText}>
                                                    Get tips to make your resume talk the talk for job listings.
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.assistantMessageContainer}>
                      <Image 
                        // source={require("../../../assets/image/icons/system-logo.svg")}
                        style={styles.assistantAvatar}
                      />
                      <View style={styles.assistantMessage}>
                        <Text style={styles.messageText}>
                                                        Absolutely, I can provide you with tips to enhance your resume.
                                                        However, to give you the most tailored advice, it would be best if you
                                                        could upload your current resume in PDF format. This way, I can review
                                                        it and offer specific suggestions for improvement. Please upload your
                                                        resume when you're ready.
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.attachmentButton}>
                      {/* Attachment icon would go here */}
                    </TouchableOpacity>
                    <TextInput
                      style={styles.input}
                      placeholder="Send a message to coach"
                      placeholderTextColor="#94A3B8"
                      multiline
                    />
                    <TouchableOpacity style={styles.sendButton}>
                      {/* Arrow icon would go here */}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Mobile Version */}
          {!isLargeScreen && (
            <View style={styles.mobileContent}>
              <View style={styles.mobileHeaderSection}>
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>ATS Resume Maker</Text>
                </View>
                <Text style={styles.mobileHeading}>
                                        Optimize your resume for Applicant Tracking Systems (ATS)
                </Text>
                <Text style={styles.mobileSubheading}>
                  Create a resume that's tailored to pass through ATS filters with the right keywords, 
                  structure, and formatting, ensuring your application reaches hiring managers.
                </Text>
                <View style={styles.mobileImageContainer}>
                  <Image
                    source={require("../../../assets/image/home/ats-resume-maker.png")}
                    style={styles.mobileHeroImage}
                    resizeMode="contain"
                  />
                </View>
                <TouchableOpacity style={styles.mobilePrimaryButton}>
                  <Text style={styles.mobilePrimaryButtonText}>Try Now</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.mobileSecondaryButton}
                  onPress={() => {
                    // Navigate to sign in screen
                  }}
                >
                  <Text style={styles.mobileSecondaryButtonText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </LinearGradient>

        {/* CTAs and other sections visible on larger screens */}
        {isLargeScreen && (
          <>
            <View style={styles.ctaGradient}>
              <View style={styles.ctaContainer}>
                <Text style={styles.ctaText}>
                                Unlock your AI superpower and land your dream job!
                </Text>
                <TouchableOpacity 
                  style={styles.ctaButton}
                  onPress={() => {
                    // Navigate to sign in screen
                  }}
                >
                  <Text style={styles.ctaButtonText}>Get Started Free</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.interviewSection}>
              <Text style={styles.interviewHeading}>
                                    Use Interview Copilot™️ for your interview questions
              </Text>
              <Text style={styles.interviewSubheading}>
                Mock interviews or live interviews. Theresidentguy is here to help you succeed.
              </Text>
              
              <View style={styles.itemsContainer}>
                {interviewCopilot.map((item, index) => (
                  <Item key={index} i={item} />
                ))}
              </View>
              
              <View style={styles.interviewButtonsContainer}>
                <TouchableOpacity style={styles.tryButton}>
                  <Text style={styles.tryButtonText}>Try Interview Copilot for free</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.learnButton}>
                  <Text style={styles.learnButtonText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footerSection}>
              <LinearGradient
                colors={['#0090FF', '#00F7FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.footerGradient}
              >
                <View style={styles.footerContent}>
                  <Text style={styles.footerHeading}>
                                        Join millions worldwide who crush their interviews with Theresidentguy
                  </Text>
                  <TouchableOpacity 
                    style={styles.footerButton}
                    onPress={() => {
                      // Navigate to sign in screen
                    }}
                  >
                    <Text style={styles.footerButtonText}>Get started for free</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF", // bg-blue-100
  },
  scrollView: {
    flex: 1,
  },
  gradientBackground: {
    minHeight: Dimensions.get("window").height,
    width: "100%",
  },
  desktopContent: {
    width: "90%",
    maxWidth: 1200,
    alignSelf: "center",
    paddingTop: 64,
  },
  headerSection: {
    flexDirection: isLargeScreen ? "row" : "column",
    alignItems: isLargeScreen ? "flex-end" : "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: isLargeScreen ? 40 : 0,
    gap: 40,
  },
  headerTextContainer: {
    alignItems: isLargeScreen ? "flex-start" : "center",
    justifyContent: "center",
  },
  tagContainer: {
    borderWidth: 1,
    borderColor: "#075985", // border-sky-800
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: isLargeScreen ? "flex-start" : "center",
  },
  tagText: {
    color: "#075985", // text-sky-800
    fontSize: 14,
    fontWeight: "500",
  },
  heading: {
    fontSize: isLargeScreen ? 48 : 32,
    lineHeight: isLargeScreen ? 48 : 32,
    color: "#0C4A6E", // text-sky-900
    marginTop: 24,
    fontWeight: "bold",
    textAlign: isLargeScreen ? "left" : "center",
    maxWidth: isLargeScreen ? 600 : "100%",
  },
  subheading: {
    fontSize: isLargeScreen ? 18 : 16,
    lineHeight: isLargeScreen ? 24 : 18,
    color: "#0369A1", // text-sky-700
    marginTop: 16,
    textAlign: isLargeScreen ? "left" : "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: 280,
    height: 264,
    maxWidth: 280,
  },
  chatContainer: {
    height: 492,
    borderWidth: 1,
    borderColor: "#BAE6FD", // border-sky-200
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatContent: {
    flex: 1,
    maxWidth: 800,
    alignSelf: "center",
  },
  chatMessages: {
    flex: 1,
    gap: 24,
  },
  userMessageContainer: {
    alignItems: "flex-end",
  },
  userMessage: {
    backgroundColor: "#BAE6FD", // bg-sky-200
    borderRadius: 16,
    borderBottomRightRadius: 0,
    padding: 12,
    maxWidth: "80%",
  },
  assistantMessageContainer: {
    flexDirection: "row",
    gap: 8,
  },
  assistantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F8FAFC", // bg-white-background
  },
  assistantMessage: {
    backgroundColor: "#BAE6FD", // bg-sky-200
    borderRadius: 16,
    borderTopLeftRadius: 0,
    padding: 12,
    flex: 1,
  },
  messageText: {
    fontSize: 18,
    color: "#64748B", // text-slate-500
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF", // bg-sky-50
    borderWidth: 1,
    borderColor: "#7DD3FC", // border-sky-300
    borderRadius: 9999,
    padding: 8,
    marginTop: 24,
  },
  attachmentButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#64748B", // text-slate-500
    paddingHorizontal: 8,
  },
  sendButton: {
    backgroundColor: "#06B6D4", // bg-cyan-500
    width: 32,
    height: 32,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Mobile specific styles
  mobileContent: {
    paddingTop: 64,
    height: "100%",
    width: "92%",
    alignSelf: "center",
  },
  mobileHeaderSection: {
    alignItems: "center",
    paddingTop: 40,
  },
  mobileHeading: {
    fontSize: 32,
    lineHeight: 32,
    color: "#0C4A6E", // text-sky-900
    marginTop: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  mobileSubheading: {
    fontSize: 16,
    lineHeight: 18,
    color: "#0369A1", // text-sky-700
    marginTop: 16,
    textAlign: "center",
  },
  mobileImageContainer: {
    position: "absolute",
    bottom: 144,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  mobileHeroImage: {
    width: 280,
    height: 264,
    maxWidth: "91%",
  },
  mobilePrimaryButton: {
    position: "absolute",
    bottom: 96,
    backgroundColor: "#0EA5E9", // bg-sky-500
    height: 52,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  mobilePrimaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  mobileSecondaryButton: {
    position: "absolute",
    bottom: 24,
    height: 52,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0EA5E9", // border-sky-500
    alignItems: "center",
    justifyContent: "center",
  },
  mobileSecondaryButtonText: {
    color: "#000000",
    fontSize: 18,
  },
  
  // CTA section
  ctaGradient: {
    minHeight: 80,
    backgroundColor: "#0EA5E9", // Using backgroundColor as fallback
    // Linear gradient will be applied in the component
  },
  ctaContainer: {
    flexDirection: isLargeScreen ? "row" : "column",
    alignItems: "center",
    justifyContent: isLargeScreen ? "space-between" : "center",
    maxWidth: 1200,
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignSelf: "center",
    width: "100%",
  },
  ctaText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginRight: isLargeScreen ? 64 : 0,
    textAlign: isLargeScreen ? "left" : "center",
    maxWidth: isLargeScreen ? 892 : "100%",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    width: 158,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginTop: isLargeScreen ? 0 : 24,
  },
  ctaButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  
  // Interview section
  interviewSection: {
    paddingTop: isLargeScreen ? 200 : 100,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  interviewHeading: {
    fontSize: isLargeScreen ? 48 : 32,
    lineHeight: isLargeScreen ? 48 : 32,
    textAlign: "center",
    maxWidth: 983,
    fontWeight: "bold",
  },
  interviewSubheading: {
    fontSize: 18,
    lineHeight: 24,
    color: "#64748B", // text-slate-500
    textAlign: "center",
    marginTop: isLargeScreen ? 24 : 16,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
    maxWidth: 1240,
    marginTop: 24,
  },
  itemCard: {
    minHeight: isLargeScreen ? 201 : 172,
    maxWidth: isLargeScreen ? 384 : 350,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0", // border-slate-200
    padding: 24,
    marginTop: 24,
    justifyContent: "space-between",
  },
  logoContainer: {
    marginBottom: 12,
  },
  logo: {
    width: 100,
    height: 33,
  },
  positionText: {
    fontSize: 20,
    lineHeight: 30,
    height: isLargeScreen ? 89 : 60,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  primaryButton: {
    height: 40,
    minWidth: 181,
    borderWidth: 1,
    borderColor: "#94A3B8", // border-slate-400
    borderRadius: 6,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 14,
  },
  secondaryButton: {
    height: 40,
    minWidth: 107,
    marginLeft: 24,
    borderRadius: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    color: "#64748B", // text-slate-500
  },
  interviewButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 358,
    marginTop: isLargeScreen ? 48 : 32,
    alignSelf: "center",
  },
  tryButton: {
    backgroundColor: "#0EA5E9", // bg-sky-500
    width: isLargeScreen ? 234 : 225,
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tryButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  learnButton: {
    width: 102,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CBD5E1", // border-slate-300
    justifyContent: "center",
    alignItems: "center",
  },
  learnButtonText: {
    fontSize: 14,
  },
  
  // Footer section
  footerSection: {
    height: isLargeScreen ? 384 : 458,
    marginVertical: 200,
    position: "relative",
  },
  footerGradient: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  footerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: isLargeScreen ? "flex-start" : "center",
    paddingHorizontal: 24,
    marginLeft: isLargeScreen ? 112 : 0,
    maxWidth: isLargeScreen ? 720 : "100%",
  },
  footerHeading: {
    fontSize: isLargeScreen ? 48 : 30,
    lineHeight: isLargeScreen ? 56 : 36,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: isLargeScreen ? "left" : "center",
  },
  footerButton: {
    marginTop: 24,
    height: 48,
    width: 240,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonText: {
    fontSize: 18,
    color: "#000000",
  },
});

export default AtsResumeMaker;