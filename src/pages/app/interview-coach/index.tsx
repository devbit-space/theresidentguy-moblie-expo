import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Layout from "../components/layout";

// Custom Icon component for React Native
interface IconProps {
  icon: string;
  color?: string;
  size?: number;
}

const Icon = ({ icon, color = "#fff", size = 24 }: IconProps) => {
  switch (icon) {
    case "ArrowUp":
      return <Ionicons name="arrow-up" size={size} color={color} />;
    default:
      return <Ionicons name="help-circle" size={size} color={color} />;
  }
};

const InterviewCoach = () => {
  const [message, setMessage] = useState("");

  // Sample questions
  const sampleQuestions = [
    {
      emoji: "🔥",
      text: "How do I transition from my current career to a new field without taking a step back in salary?"
    },
    {
      emoji: "📄",
      text: "How can I make my resume stand out for a data analyst position?"
    },
    {
      emoji: "🖊️",
      text: "What are the best ways to prepare for a leadership role in my industry?"
    },
    {
      emoji: "💰",
      text: "What are some strategies for negotiating a higher salary during a job offer?"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Career Coach</Text>
          <Text style={styles.subtitle}>
            Our AI Career Coach provides personalized, real-time guidance on career growth, 
            job search strategies, and professional development tailored to your unique goals 
            and industry.
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.innerContent}>
                <Text style={styles.mainPrompt}>
                  Ask me any questions about recruiting, interviews, and careers development
                </Text>

                {/* Sample Questions Grid */}
                <View style={styles.questionsGrid}>
                  {sampleQuestions.map((question, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.questionCard}
                      onPress={() => setMessage(question.text)}
                    >
                      <Text style={styles.questionEmoji}>{question.emoji}</Text>
                      <Text style={styles.questionText}>{question.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Message Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Send a message to coach"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                />
                <TouchableOpacity 
                  style={styles.sendButton} 
                  onPress={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Icon icon="ArrowUp" />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Layout>
  );
};

const { width } = Dimensions.get("window");
const numColumns = width > 600 ? 4 : 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748b",
  },
  contentContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContent: {
    flex: 1,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
    paddingBottom: 80, // Space for the input
  },
  mainPrompt: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
    marginVertical: 24,
  },
  questionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  questionCard: {
    width: `${100 / numColumns - 2}%`,
    backgroundColor: "#e0f2fe",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  questionText: {
    fontSize: 14,
    color: "#64748b",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#7dd3fc",
    backgroundColor: "#f0f9ff",
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    backgroundColor: "transparent",
    maxHeight: 100,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0ea5e9",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});

export default InterviewCoach;