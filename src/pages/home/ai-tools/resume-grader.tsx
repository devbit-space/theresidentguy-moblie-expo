import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth >= 768; // md breakpoint

// Simple attachment and arrow up icon components as placeholders
const AttachmentIcon = () => (
  <View style={styles.iconPlaceholder}>
    {/* Placeholder for attachment icon */}
  </View>
);

const ArrowUpIcon = () => (
  <View style={styles.iconPlaceholder}>
    {/* Placeholder for arrow up icon */}
  </View>
);

const FeatureCard = ({ emoji, text }: { emoji: string; text: string }) => {
  return (
    <TouchableOpacity style={styles.featureCard}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </TouchableOpacity>
  );
};

const ResumeGrader = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
                    <Text style={styles.tagText}>Resume Grader</Text>
                  </View>
                  <Text style={styles.heading}>
                    Get personalized feedback to elevate your resume
                  </Text>
                  <Text style={styles.subheading}>
                    Our AI-powered Resume Grader analyzes your resume's content, structure, and keywords, providing detailed feedback to make it stand out to employers
                  </Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../../assets/image/home/resume-grader.png")}
                    style={styles.heroImage}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={styles.toolContainer}>
                <View style={styles.toolContent}>
                  <View style={styles.featuresGrid}>
                    <FeatureCard 
                      emoji="🔍" 
                      text="Spot what's great and what needs fixing in your resume."
                    />
                    <FeatureCard 
                      emoji="✨" 
                      text="Get tips to make your resume talk the talk for job listings."
                    />
                    <FeatureCard 
                      emoji="🛠️" 
                      text="Pack in those must-have keywords for ATS love."
                    />
                    <FeatureCard 
                      emoji="📄" 
                      text="Make your resume look sharp and easy on the eyes."
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <AttachmentIcon />
                    <TextInput
                      style={styles.input}
                      placeholder="Send a message to coach"
                      placeholderTextColor="#94A3B8"
                      multiline
                    />
                    <TouchableOpacity style={styles.sendButton}>
                      <ArrowUpIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* CTA Section */}
              <LinearGradient
                colors={['#0090FF', '#00F7FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaSection}
              >
                <View style={styles.ctaContent}>
                  <Text style={styles.ctaText}>
                    Boost your resume now and increase your chances of getting hired!
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
              </LinearGradient>

              {/* Note: Experience and RecruitingTools components would be included here
                 if they were converted to React Native components */}
            </View>
          )}

          {/* Mobile Version */}
          {!isLargeScreen && (
            <View style={styles.mobileContent}>
              <View style={styles.mobileHeaderSection}>
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>Resume Grader</Text>
                </View>
                <Text style={styles.mobileHeading}>
                  Get personalized feedback to elevate your resume
                </Text>
                <Text style={styles.mobileSubheading}>
                  Our AI-powered Resume Grader analyzes your resume's content, structure, and keywords, providing detailed feedback to make it stand out to employers
                </Text>
                <View style={styles.mobileImageContainer}>
                  <Image
                    source={require("../../../assets/image/home/resume-grader.png")}
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
    minHeight: Dimensions.get('window').height,
    width: '100%',
  },
  // Desktop/Tablet Styles
  desktopContent: {
    width: '90%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingTop: 64,
  },
  headerSection: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    alignItems: isLargeScreen ? 'flex-end' : 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: isLargeScreen ? 40 : 0,
    gap: 40,
  },
  headerTextContainer: {
    alignItems: isLargeScreen ? 'flex-start' : 'center',
    justifyContent: 'center',
  },
  tagContainer: {
    borderWidth: 1,
    borderColor: '#075985', // border-sky-800
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: isLargeScreen ? 'flex-start' : 'center',
  },
  tagText: {
    color: '#075985', // text-sky-800
    fontSize: 14,
    fontWeight: '500',
  },
  heading: {
    fontSize: isLargeScreen ? 48 : 32,
    lineHeight: isLargeScreen ? 48 : 32,
    color: '#0C4A6E', // text-sky-900
    marginTop: 24,
    fontWeight: 'bold',
    textAlign: isLargeScreen ? 'left' : 'center',
    maxWidth: isLargeScreen ? 600 : '100%',
  },
  subheading: {
    fontSize: isLargeScreen ? 18 : 16,
    lineHeight: isLargeScreen ? 24 : 18,
    color: '#0369A1', // text-sky-700
    marginTop: 16,
    textAlign: isLargeScreen ? 'left' : 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: 280,
    height: 264,
    maxWidth: 280,
  },
  // Tool container
  toolContainer: {
    height: 492,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFE2E4',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 20,
  },
  toolContent: {
    flex: 1,
    maxWidth: 800,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: isLargeScreen ? 40 : 16,
    gap: 24,
  },
  featureCard: {
    width: isLargeScreen ? '23%' : '48%',
    backgroundColor: '#F0F9FF', // bg-sky-100
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 16,
    color: '#334155', // text-slate-700
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF', // bg-sky-50
    borderWidth: 1,
    borderColor: '#7DD3FC', // border-sky-300
    borderRadius: 9999,
    padding: 8,
    marginTop: 'auto',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#1E293B', // text-content-primary
    paddingHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#06B6D4', // bg-cyan-500
    width: 32,
    height: 32,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // CTA Section
  ctaSection: {
    minHeight: 80,
    marginTop: 48,
    padding: 24,
  },
  ctaContent: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: isLargeScreen ? 'space-between' : 'center',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  ctaText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: isLargeScreen ? 64 : 0,
    textAlign: isLargeScreen ? 'left' : 'center',
    maxWidth: isLargeScreen ? 892 : '100%',
    marginBottom: isLargeScreen ? 0 : 24,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    width: 158,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  ctaButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  // Mobile specific styles
  mobileContent: {
    paddingTop: 64,
    height: '100%',
    width: '92%',
    alignSelf: 'center',
  },
  mobileHeaderSection: {
    alignItems: 'center',
    paddingTop: 40,
  },
  mobileHeading: {
    fontSize: 32,
    lineHeight: 32,
    color: '#0C4A6E', // text-sky-900
    marginTop: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mobileSubheading: {
    fontSize: 16,
    lineHeight: 18,
    color: '#0369A1', // text-sky-700
    marginTop: 16,
    textAlign: 'center',
  },
  mobileImageContainer: {
    position: 'absolute',
    bottom: 144,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mobileHeroImage: {
    width: 280,
    height: 264,
    maxWidth: '91%',
  },
  mobilePrimaryButton: {
    position: 'absolute',
    bottom: 96,
    backgroundColor: '#0EA5E9', // bg-sky-500
    height: 52,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobilePrimaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  mobileSecondaryButton: {
    position: 'absolute',
    bottom: 24,
    height: 52,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0EA5E9', // border-sky-500
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileSecondaryButtonText: {
    color: '#000000',
    fontSize: 18,
  }
});

export default ResumeGrader; 