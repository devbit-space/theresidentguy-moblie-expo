import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "../../../components/icon";
import { w, h } from "../../../theme/services";

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Resume: undefined;
  MockInterview: undefined;
  Question: undefined;
  LiveInterview: undefined;
};

const Bubble = ({ color }: { color: string }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: true,
        })
      ])
    );
    
    animation.start();
    
    return () => {
      animation.stop();
    };
  }, []);
  
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50]
  });
  
  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1]
  });
  
  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          backgroundColor: color,
          transform: [{ translateY }, { scale }]
        }
      ]}
    />
  );
};

const BubblesBackground = () => {
  return (
    <View style={styles.bubblesWrapper}>
      <View style={styles.blurOverlay} />
      <Bubble color="#54b3f3" />
      <Bubble color="#00c3ff" />
      <Bubble color="#10B981" />
    </View>
  );
};

const LinkButton = ({ title, onPress, style }: { title: string; onPress: () => void; style?: any }) => {
  return (
    <TouchableOpacity 
      style={[styles.linkButton, style]} 
      onPress={onPress}
    >
      <Text style={styles.linkText}>{title}</Text>
    </TouchableOpacity>
  );
};

const SectionTitle = ({ title, number }: { title: string; number: string }) => {
  return (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionNumber}>{number}</Text>
    </View>
  );
};

const ServiceItem = ({ title, description, isActive = false }: { title: string; description: string; isActive?: boolean }) => {
  return (
    <View style={[styles.serviceItem, isActive && styles.serviceItemActive]}>
      <Text style={styles.serviceItemTitle}>{title}</Text>
      <Text style={styles.serviceItemDescription}>{description}</Text>
    </View>
  );
};

const Progress = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
    return (
    <ScrollView style={styles.container}>
      <View style={styles.stickySection}>
        <View style={styles.whiteBg}>
          <BubblesBackground />
          
          <View style={styles.headerContent}>
            <Text style={styles.subheading}>
                            From Day One to Theresidentguys
            </Text>
            <Text style={styles.heading}>
              A suite of AI tools to navigate through this difficult recruiting season
            </Text>
          </View>
          
          <View style={styles.progressStages}>
            {/* Before Interviews */}
            <View style={styles.stageColumn}>
              <SectionTitle title="Before Interviews" number="1" />
              <LinkButton 
                title="AI Resume Builder" 
                onPress={() => navigation.navigate('Resume')} 
              />
              <LinkButton 
                title="AI Mock Interview" 
                onPress={() => navigation.navigate('MockInterview')} 
              />
            </View>
            
            <View style={styles.divider} />
            
            {/* During Interviews */}
            <View style={styles.stageColumn}>
              <SectionTitle title="During Interviews" number="2" />
              <LinkButton 
                title="🚀 Interview Copilot™" 
                onPress={() => navigation.navigate('MockInterview')} 
              />
              <LinkButton 
                title="Real-Time Transcription" 
                onPress={() => navigation.navigate('MockInterview')} 
              />
              <LinkButton 
                title="Coding Copilot" 
                onPress={() => navigation.navigate('MockInterview')} 
              />
            </View>
            
            <View style={styles.divider} />
            
            {/* After Interviews */}
            <View style={styles.stageColumn}>
              <SectionTitle title="After Interviews" number="3" />
              <LinkButton 
                title="Interview Summary" 
                onPress={() => navigation.navigate('MockInterview')} 
              />
              <LinkButton 
                title="Interview Analytics" 
                onPress={() => navigation.navigate('MockInterview')} 
              />
              <LinkButton 
                title="Sentiment Assessment" 
                onPress={() => navigation.navigate('MockInterview')} 
              />
            </View>
          </View>
        </View>
      </View>
      
      {/* Mock Interview Section */}
      <View style={styles.stickySection}>
        <View style={styles.whiteBg}>
          <View style={styles.featureSection}>
            <View style={styles.featureHeader}>
              <View style={styles.featureBadge}>
                {/* <Icon icon="AiMockInterview" /> */}
                <Text style={styles.featureBadgeText}>AI Mock Interview</Text>
              </View>
            </View>
            
            <View style={styles.featureTitleRow}>
              <Text style={styles.featureTitle}>
                Prepare your session with the most immersive mock interview powered by AI
              </Text>
              <View style={styles.desktopButtonContainer}>
                <TouchableOpacity 
                  style={styles.blackButton}
                  onPress={() => navigation.navigate('MockInterview')}
                >
                  <Text style={styles.blackButtonText}>Launch Mock Interview</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.featureImageContainer}>
              <BubblesBackground />
              <Image
                source={require('../../../assets/image/home/mock-interview.png')}
                style={styles.featureImage}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.servicesList}>
              <View style={styles.serviceItemContainer}>
                <ServiceItem 
                  title="Industry-Specific Scenarios"
                  description="Get a competitive edge by practicing with questions designed to reflect the latest industry trends and expectations."
                  isActive={true}
                />
              </View>
              
              <View style={styles.serviceItemContainer}>
                <ServiceItem 
                  title="Real-Time Feedback"
                  description="Facilitates accessibility by allowing individuals with hearing impairments to follow along with spoken content in real-time, enhancing inclusivity and understanding."
                />
              </View>
            </View>
            
            <View style={styles.mobileButtonContainer}>
              <TouchableOpacity 
                style={styles.blackButton}
                onPress={() => navigation.navigate('MockInterview')}
              >
                <Text style={styles.blackButtonText}>Launch Mock Interview</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      {/* Question Bank Section */}
      <View style={styles.stickySection}>
        <View style={styles.whiteBg}>
          <View style={styles.featureSection}>
            <View style={styles.featureHeader}>
              <View style={[styles.featureBadge, styles.orangeBadge]}>
                            {/* <Icon icon="QuestionBank" /> */}
                <Text style={styles.featureOrangeBadgeText}>Question Bank</Text>
              </View>
            </View>
            
            <View style={styles.featureTitleRow}>
              <Text style={styles.featureTitle}>
                Review top interview questions and learn AI-empowered answers to optimize your preparation.
              </Text>
              <View style={styles.desktopButtonContainer}>
                <TouchableOpacity 
                  style={styles.blackButton}
                  onPress={() => navigation.navigate('Question')}
                >
                  <Text style={styles.blackButtonText}>Try Question Bank</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.featureImageContainer}>
              <BubblesBackground />
              <Image
                source={require('../../../assets/image/home/question-bank.png')}
                style={styles.featureImage}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.servicesList}>
              <View style={styles.serviceItemContainer}>
                <ServiceItem 
                  title="Verified Question Database"
                  description="featuring real interview questions collected directly from recruiters and successful candidates. Ensure you're prepared for what employers really ask, backed by insights from industry experts."
                  isActive={true}
                />
              </View>
              
              <View style={styles.serviceItemContainer}>
                <ServiceItem 
                  title="AI-enabled best practices"
                  description="Get optimal answers for each question in our verified database. Get expert-level guidance on crafting responses that align with industry standards and impress your interviewers."
                />
              </View>
            </View>
            
            <View style={styles.mobileButtonContainer}>
              <TouchableOpacity 
                style={styles.blackButton}
                onPress={() => navigation.navigate('Question')}
              >
                <Text style={styles.blackButtonText}>Try Question Bank</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      {/* Interview Report Section */}
      <View style={styles.stickySection}>
        <View style={styles.whiteBg}>
          <View style={styles.featureSection}>
            <View style={styles.featureHeader}>
              <View style={[styles.featureBadge, styles.pinkBadge]}>
                                        {/* <Icon icon="File" /> */}
                <Text style={styles.featureBadgeText}>Interview Report</Text>
              </View>
            </View>
            
            <View style={styles.featureContent}>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>
                  Receive comprehensive interview report after each session. Understand your performance so that you can always improve.
                </Text>
                
                <View style={styles.mobileImageContainer}>
                  <BubblesBackground />
                  <Image
                    source={require('../../../assets/image/home/interview-report.png')}
                    style={styles.reportImage}
                    resizeMode="contain"
                  />
                </View>
                
                <View style={styles.servicesList}>
                  <ServiceItem 
                    title="Detailed Performance Analysis"
                    description="Discover your strengths and areas for improvement with metrics and feedback that help you refine your approach."
                    isActive={true}
                  />
                  <View style={{ paddingTop: h(3) }} />
                  <ServiceItem 
                    title="Customized Improvement Recommendations"
                    description="Get tailored advice on communication skills, technical question handling, and behavioral responses to ensure you're fully prepared for the real thing."
                  />
                </View>
                
                <View style={styles.desktopButtonContainer}>
                  <TouchableOpacity 
                    style={styles.blackButton}
                    onPress={() => navigation.navigate('MockInterview')}
                  >
                    <Text style={styles.blackButtonText}>Get Interview Report</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.desktopImageContainer}>
                <BubblesBackground />
                <Image
                  source={require('../../../assets/image/home/interview-report.png')}
                  style={styles.desktopReportImage}
                  resizeMode="contain"
                />
              </View>
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
    backgroundColor: '#000000',
  },
  stickySection: {
    minHeight: height,
    padding: h(2.2),
  },
  whiteBg: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: h(2.2),
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  bubblesWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 2,
  },
  bubble: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    opacity: 0.3,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: h(7),
    paddingBottom: h(2),
    zIndex: 10,
    // marginBottom: 40,
  },
  subheading: {
    fontSize: w(5),
    color: 'rgba(0, 0, 0, 0.3)',
    marginBottom: h(5),
    textAlign: 'center',
  },
  heading: {
    fontSize: w(7),
    // fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '80%',
  },
  progressStages: {
    flexDirection: 'column',
    zIndex: 10,
    paddingHorizontal: 16,
    width: '100%',
  },
  stageColumn: {
    marginBottom: 24,
  },
  sectionTitleContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: h(4),
    // fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionNumber: {
    position: 'absolute',
    right: w(5.5),
    bottom: h(2.7),
    fontSize: w(4.5),
    color: 'rgba(0, 0, 0, 0.5)',
  },
  linkButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: h(1.8),
    paddingHorizontal: w(8),
    marginBottom: h(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: '75%',
    alignSelf: 'center',
  },
  linkText: {
    fontSize: h(2),
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginVertical: 24,
  },
  featureSection: {
    flex: 1,
    zIndex: 10,
  },
  featureHeader: {
    marginBottom: 24,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A78BFA', // Violet-400
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
    alignSelf: 'flex-start',
  },
  orangeBadge: {
    backgroundColor: '#FB923C', // Orange-400
  },
  pinkBadge: {
    backgroundColor: '#F472B6', // Pink-400
  },
  featureBadgeText: {
    fontSize: w(4.5),
    marginLeft: w(2),
    color: '#FFFFFF',
  },
  featureOrangeBadgeText: {
    fontSize: w(4.5),
    marginLeft: w(2),
    color: '#000000',
  },
  featureTitleRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: h(1),
  },
  featureTitle: {
    fontSize: w(6),
    // fontWeight: 'bold',
    marginBottom: 16,
    maxWidth: '100%',
    // textAlign: 'center',
    paddingHorizontal: w(6.5),
  },
  desktopButtonContainer: {
    display: 'none', // Hide on mobile, show on larger screens with media queries
  },
  featureImageContainer: {
    height: h(35),
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: h(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureImage: {
    width: '90%',
    height: '80%',
    position: 'absolute',
    zIndex: 10,
  },
  servicesList: {
    marginBottom: h(2),
  },
  serviceItemContainer: {
    marginBottom: 24,
  },
  serviceItem: {
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB', // gray-quinary
  },
  serviceItemActive: {
    borderTopColor: '#E5E7EB',
  },
  serviceItemTitle: {
    fontSize: w(4),
    marginBottom: w(2),
    fontWeight: '500',
  },
  serviceItemDescription: {
    fontSize: w(3.5),
    color: '#4B5563', // text-gray-tertiary
  },
  mobileButtonContainer: {
    width: '100%',
    alignItems: 'center',
    // marginTop: 24,
  },
  blackButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: h(2),
    paddingHorizontal: w(4),
    width: '100%',
    // maxWidth: 320,
  },
  blackButtonText: {
    color: '#FFFFFF',
    fontSize: w(4),
    textAlign: 'center',
  },
  featureContent: {
    flexDirection: 'column',
  },
  featureTextContainer: {
    flex: 1,
  },
  mobileImageContainer: {
    height: h(35),
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: h(5),
  },
  reportImage: {
    width: '70%',
    height: '90%',
    position: 'absolute',
    top: '25%',
    left: '40%',
    transform: [{ rotate: '-13deg' }],
    zIndex: 10,
  },
  desktopImageContainer: {
    display: 'none', // Hidden on mobile
  },
  desktopReportImage: {
    width: '80%',
    height: '80%',
    position: 'absolute',
    bottom: 0,
    left: '10%',
    transform: [{ rotate: '-13deg' }],
    zIndex: 10,
  },
  // Media query styles would be handled in React Native using conditional styling
  // or a library like react-native-responsive-screen
});

export default Progress;