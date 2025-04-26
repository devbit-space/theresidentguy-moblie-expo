import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useGlobalContext } from "../../../../context";

// Custom Icon component
interface IconProps {
  icon: string;
  style?: any;
  size?: number;
  color?: string;
}

const Icon = ({ icon, style, size = 24, color = "#000" }: IconProps) => {
  switch (icon) {
    case "Lock":
      return <MaterialIcons name="lock" size={size} color={color} style={style} />;
    default:
      return <MaterialIcons name="error" size={size} color={color} style={style} />;
  }
};

// Custom Rating component
const Rating = ({ 
  onClick, 
  initialValue, 
  size, 
  iconsCount, 
  fillColorArray 
}: { 
  onClick: (rate: number) => void, 
  initialValue: number, 
  size: number, 
  iconsCount: number, 
  fillColorArray: string[] 
}) => {
  const [rating, setRating] = useState(initialValue);

  const handleRating = (rate: number) => {
    setRating(rate);
    onClick(rate);
  };

  return (
    <View style={styles.ratingContainer}>
      {[...Array(iconsCount)].map((_, index) => {
        const rateValue = index + 1;
        return (
          <TouchableOpacity 
            key={index} 
            onPress={() => handleRating(rateValue)}
            style={styles.starButton}
          >
            <FontAwesome 
              name={rating >= rateValue ? "star" : "star-o"} 
              size={size} 
              color={rating >= rateValue ? fillColorArray[index] : "#CCC"} 
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Custom Radio component
const Radio = ({ 
  value, 
  isChecked, 
  onChangeRadio 
}: { 
  value: string, 
  isChecked: boolean, 
  onChangeRadio: () => void 
}) => {
  return (
    <TouchableOpacity 
      style={styles.radioContainer} 
      onPress={onChangeRadio}
    >
      <View style={[styles.radioOuter, isChecked && styles.radioOuterSelected]}>
        {isChecked && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioText}>{value}</Text>
    </TouchableOpacity>
  );
};

// Mock data for the component
const mockInterviewData = {
  problems: [
    "Preparing for job interviews",
    "Improving communication skills",
    "Building confidence in interviews",
    "Practicing specific interview questions",
    "Getting feedback on my responses"
  ],
  feelings: [
    "Too slow",
    "Perfect pace",
    "Too fast",
    "Inconsistent"
  ],
  satisfaction: [
    "Very satisfied",
    "Satisfied",
    "Neutral",
    "Dissatisfied",
    "Very dissatisfied"
  ]
};

// Define navigation type
type RootStackParamList = {
  LiveInterview: undefined;
};

const ReviewSection = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [_, { dispatch }] = useGlobalContext();

  const [status, setStatus] = useState({
    rate: 0,
    problem: "",
    feeling: "",
    satisfaction: "",
    suggestion: "",
    tabIdx: 0
  });

  const [isClose, setIsClose] = useState(false);

  const handleReturnHome = () => {
    dispatch({
      type: "isLeaveInterview",
      payload: {
        status: false,
        link: ""
      }
    });
    navigation.navigate("Home");
  };

  const fillColorArray = [
    "#f17a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045"
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.emoji}>🚀</Text>
          <Text style={styles.title}>
            Well done! You finished your interview with our AI Copilot!
          </Text>
          <Text style={styles.subtitle}>
            View the interview report approximately 5 minutes later.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={handleReturnHome}
            >
              <Text style={styles.buttonText}>Return Home</Text>
            </TouchableOpacity>
          </View>

          {!isClose && (
            <View style={styles.feedbackCard}>
              {status.tabIdx === 0 && (
                <View style={styles.tabContent}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionNumber}>1.</Text>
                    <Text style={styles.questionText}>
                      How likely are you to recommend our Mock Interview to a friend?
                    </Text>
                  </View>
                  <View style={styles.ratingWrapper}>
                    <Rating
                      onClick={(rate) => setStatus({ ...status, rate })}
                      initialValue={0}
                      size={30}
                      iconsCount={10}
                      fillColorArray={fillColorArray}
                    />
                  </View>
                  <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => setStatus({ ...status, tabIdx: 1 })}
                    >
                      <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {status.tabIdx === 1 && (
                <View style={styles.tabContent}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionNumber}>2.</Text>
                    <Text style={styles.questionText}>
                      What problem do you want the Mock Interview to help with?
                    </Text>
                  </View>
                  <View style={styles.radioGroupContainer}>
                    {mockInterviewData.problems.map((problem, index) => (
                      <Radio
                        key={index}
                        value={problem}
                        isChecked={status.problem === problem}
                        onChangeRadio={() => setStatus({ ...status, problem })}
                      />
                    ))}
                  </View>
                  <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => setStatus({ ...status, tabIdx: 2 })}
                    >
                      <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {status.tabIdx === 2 && (
                <View style={styles.tabContent}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionNumber}>3.</Text>
                    <Text style={styles.questionText}>
                      How do you feel about the pacing of the interaction with the copilot avatar?
                    </Text>
                  </View>
                  <View style={styles.radioGroupContainer}>
                    {mockInterviewData.feelings.map((feeling, index) => (
                      <Radio
                        key={index}
                        value={feeling}
                        isChecked={status.feeling === feeling}
                        onChangeRadio={() => setStatus({ ...status, feeling })}
                      />
                    ))}
                  </View>
                  <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => setStatus({ ...status, tabIdx: 3 })}
                    >
                      <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {status.tabIdx === 3 && (
                <View style={styles.tabContent}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionNumber}>4.</Text>
                    <Text style={styles.questionText}>
                      How satisfied are you with the responses the copilot provides?
                    </Text>
                  </View>
                  <View style={styles.radioGroupContainer}>
                    {mockInterviewData.satisfaction.map((satisfaction, index) => (
                      <Radio
                        key={index}
                        value={satisfaction}
                        isChecked={status.satisfaction === satisfaction}
                        onChangeRadio={() => setStatus({ ...status, satisfaction: satisfaction })}
                      />
                    ))}
                  </View>
                  <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => setStatus({ ...status, tabIdx: 4 })}
                    >
                      <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {status.tabIdx === 4 && (
                <View style={styles.tabContent}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionNumber}>5.</Text>
                    <Text style={styles.questionText}>
                      Do you have any additional comments or suggestions?
                    </Text>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    value={status.suggestion}
                    onChangeText={(text) => setStatus({ ...status, suggestion: text })}
                    placeholder="Type anything you wish to share (e.g. bug report, feature request...)"
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                  <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => setStatus({ ...status, tabIdx: 5 })}
                    >
                      <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {status.tabIdx === 5 && (
                <View style={styles.tabContent}>
                  <Text style={styles.thankYouText}>
                    Thank you for your feedback!
                  </Text>
                  <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                      style={styles.nextButton}
                      onPress={() => setIsClose(true)}
                    >
                      <Text style={styles.nextButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.securityBanner}>
        <Icon icon="Lock" size={16} color="#166534" />
        <Text style={styles.securityText}>
          Secured by 256-bit AES and 256-bit SSL/TLS encryption
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // bg-design-light
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 70, // Space for security banner
  },
  content: {
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A", // text-slate-900
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#4B5563", // text-gray-600
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  returnButton: {
    backgroundColor: "#0EA5E9", // bg-sky-500
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  feedbackCard: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tabContent: {
    width: "100%",
  },
  questionContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A", // text-slate-900
    marginRight: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A", // text-slate-900
    flex: 1,
  },
  ratingWrapper: {
    alignItems: "center",
    marginVertical: 16,
  },
  radioGroupContainer: {
    width: "100%",
    marginVertical: 16,
    paddingLeft: 20,
  },
  nextButtonContainer: {
    alignItems: "flex-end",
    marginTop: 16,
  },
  nextButton: {
    backgroundColor: "#0EA5E9", // bg-sky-500
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0", // border-slate-200
    borderRadius: 8,
    padding: 16,
    height: 120,
    width: "100%",
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    color: "#0F172A", // text-slate-900
  },
  thankYouText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A", // text-slate-900
    marginBottom: 16,
  },
  securityBanner: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BBFAD3", // bg-green-200
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
    borderRadius: 6,
    marginHorizontal: 20,
  },
  securityText: {
    fontSize: 14,
    color: "#166534", // text-green-900
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  starButton: {
    padding: 4,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CBD5E1", // border-slate-300
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioOuterSelected: {
    borderColor: "#0EA5E9", // border-sky-500
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#0EA5E9", // bg-sky-500
  },
  radioText: {
    fontSize: 14,
    color: "#0F172A", // text-slate-900
  },
});

export default ReviewSection;
