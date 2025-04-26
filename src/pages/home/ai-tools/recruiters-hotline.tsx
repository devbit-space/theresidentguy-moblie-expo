import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth >= 768; // md breakpoint

// Mock data for companies - replace with actual data source
const companies = [
  { name: 'Apple', logo: 'https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG&height=32&width=32' },
  { name: 'NVIDIA', logo: 'https://cdn.brandfetch.io/idXoj5DuCE/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32' },
  { name: 'Oracle', logo: 'https://cdn.brandfetch.io/idnq7H7qT0/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32' },
  { name: 'Amazon', logo: 'https://cdn.brandfetch.io/idawOgYOsG/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32' },
  { name: 'Google', logo: 'https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32' },
  { name: 'Tesla', logo: 'https://cdn.brandfetch.io/id2S-kXbuK/theme/dark/symbol.svg?k=bfHSJFAPEG&height=32&width=32' },
];

// Simple arrow component to replace the Icon component
const ArrowIcon = () => (
  <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: 'transparent' }}>
    {/* Simple right arrow shape */}
  </View>
);

const ArrowUpIcon = () => (
  <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: 'transparent' }}>
    {/* Simple up arrow shape */}
  </View>
);

// Company item component
const CompanyItem = ({ company, isSelected }: { company: { name: string; logo: string }; isSelected: boolean }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.companyItem,
        isSelected && styles.companyItemSelected
      ]}
    >
      <Image 
        source={{ uri: company.logo }} 
        style={styles.companyLogo} 
      />
      <Text style={styles.companyName}>{company.name}</Text>
    </TouchableOpacity>
  );
};

const CompanyCard = ({ company }: { company: { name: string; logo: string } }) => {
  return (
    <View style={styles.companyCard}>
      <View style={styles.companyCardHeader}>
        <Image source={{ uri: company.logo }} style={styles.companyCardLogo} />
        <Text style={styles.companyCardName}>{company.name}</Text>
      </View>
      <TouchableOpacity style={styles.speakButton}>
        <Text style={styles.speakButtonText}>Speak with Recruiters</Text>
      </TouchableOpacity>
    </View>
  );
};

const FindMoreButton = () => (
  <TouchableOpacity style={styles.findMoreButton}>
    <Text style={styles.findMoreText}>Find More</Text>
    <ArrowIcon />
  </TouchableOpacity>
);

const ChatMessage = ({ message, isUser }: { message: string; isUser: boolean }) => {
  return (
    <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
      {!isUser && (
        <Image 
          source={{ uri: 'https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG&height=40&width=40' }} 
          style={styles.avatarImage} 
        />
      )}
      <View style={[
        styles.messageBubble, 
        isUser ? styles.userMessageBubble : styles.botMessageBubble
      ]}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
};

const RecruitersHotline = () => {
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
                    <Text style={styles.tagText}>Recruiters Hotline</Text>
                  </View>
                  <Text style={styles.heading}>
                    Speak with Recruiters from Fortune 500 Companies
                  </Text>
                  <Text style={styles.subheading}>
                    Connect with top recruiters and unlock global job opportunities, anytime
                    and anywhere. Shape your future—start chatting now!
                  </Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../../assets/image/home/recruiters-hotline.png")}
                    style={styles.heroImage}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={styles.mainContent}>
                <View style={styles.sidebar}>
                  <View style={styles.companiesList}>
                    {companies.map((company, index) => (
                      <CompanyItem 
                        key={index} 
                        company={company} 
                        isSelected={index === 0} 
                      />
                    ))}
                    <FindMoreButton />
                  </View>
                </View>

                <View style={styles.chatContainer}>
                  <View style={styles.chatMessages}>
                    <ChatMessage 
                      message="Hello, I am a recruiter at Apple, and I am more than happy to answer any questions you may have regarding our company's recruitment, interviews, and workplace-related matters." 
                      isUser={false} 
                    />
                    <ChatMessage 
                      message="kl" 
                      isUser={true} 
                    />
                    <ChatMessage 
                      message="I'm sorry, but I didn't understand your message. Could you please provide more details or ask a specific question about job applications, recruitment, interviews, or the workplace at Apple?" 
                      isUser={false} 
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Type a message..."
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
                    Don't Miss Out: Engage with Top Recruiters from Fortune 500 Companies!
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

              {/* Companies Section */}
              <View style={styles.companiesSection}>
                <Text style={styles.companiesSectionTitle}>
                  Find more exciting companies below
                </Text>
                <Text style={styles.companiesSectionSubtitle}>
                  They are ready to chat with you, chose one and chat now
                </Text>

                {/* Companies Categories */}
                <View style={styles.categoriesContainer}>
                  <TouchableOpacity style={styles.categoryButtonActive}>
                    <Text style={styles.categoryButtonActiveText}>17</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>Startup</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>Consumer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>Professional Services</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryButtonText}>Healthcare</Text>
                  </TouchableOpacity>
                </View>

                {/* Companies Grid */}
                <View style={styles.companiesGrid}>
                  {companies.map((company, index) => (
                    <CompanyCard key={index} company={company} />
                  ))}
                </View>

                <TouchableOpacity style={styles.loadMoreButton}>
                  <Text style={styles.loadMoreButtonText}>+ Load More</Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
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
            </View>
          )}

          {/* Mobile Version */}
          {!isLargeScreen && (
            <View style={styles.mobileContent}>
              <View style={styles.mobileHeaderSection}>
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>Recruiters Hotline</Text>
                </View>
                <Text style={styles.mobileHeading}>
                  Speak with Recruiters from Fortune 500 Companies
                </Text>
                <Text style={styles.mobileSubheading}>
                  Connect with top recruiters and unlock global job opportunities, anytime
                  and anywhere. Shape your future—start chatting now!
                </Text>
                <View style={styles.mobileImageContainer}>
                  <Image
                    source={require("../../../assets/image/home/recruiters-hotline.png")}
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
    width: 229,
    height: 266,
    maxWidth: 229,
  },
  // Main content area
  mainContent: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 24,
    marginTop: 24,
  },
  sidebar: {
    width: isLargeScreen ? 292 : '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  companiesList: {
    gap: 12,
  },
  companyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0', // border-gray-300
    borderRadius: 8,
    gap: 8,
  },
  companyItemSelected: {
    borderColor: '#0EA5E9', // border-sky-500
    backgroundColor: 'rgba(14, 165, 233, 0.17)', // bg-sky-500/[0.17]
  },
  companyLogo: {
    width: 32,
    height: 32,
  },
  companyName: {
    fontSize: 16,
  },
  findMoreButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0', // border-gray-300
    borderRadius: 8,
    gap: 8,
  },
  findMoreText: {
    fontSize: 16,
  },
  // Chat section
  chatContainer: {
    flex: 1,
    height: 516,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  chatMessages: {
    flex: 1,
    gap: 24,
    marginBottom: 32,
  },
  messageContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  userMessageBubble: {
    backgroundColor: '#E9E5FF',
    borderBottomRightRadius: 0,
  },
  botMessageBubble: {
    backgroundColor: '#F1F5F9',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 18,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF', // bg-sky-50
    borderWidth: 1,
    borderColor: '#7DD3FC', // border-sky-300
    borderRadius: 9999,
    padding: 8,
    marginTop: 16,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#000000',
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
    marginTop: 64,
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
  // Companies Section
  companiesSection: {
    marginTop: 200,
    alignItems: 'center',
  },
  companiesSectionTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  companiesSectionSubtitle: {
    fontSize: 20,
    color: '#64748B', // text-slate-500
    textAlign: 'center',
    marginTop: 24,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 64,
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  categoryButtonText: {
    color: '#334155', // text-slate-700
    fontSize: 18,
  },
  categoryButtonActive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#E0F2FE', // bg-sky-100
    borderWidth: 1,
    borderColor: '#0EA5E9', // border-sky-500
  },
  categoryButtonActiveText: {
    color: '#0EA5E9', // text-sky-500
    fontSize: 18,
  },
  companiesGrid: {
    marginTop: 48,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 24,
  },
  companyCard: {
    width: isLargeScreen ? '30%' : '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0', // border-gray-300
    padding: 24,
  },
  companyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  companyCardLogo: {
    width: 32,
    height: 32,
  },
  companyCardName: {
    fontSize: 16,
  },
  speakButton: {
    marginTop: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0', // border-gray-300
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  speakButtonText: {
    fontSize: 14,
  },
  loadMoreButton: {
    marginTop: 48,
    backgroundColor: '#7DD3FC', // bg-sky-300
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  loadMoreButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  // Footer section
  footerSection: {
    height: isLargeScreen ? 384 : 458,
    marginVertical: 200,
    position: 'relative',
  },
  footerGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  footerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: isLargeScreen ? 'flex-start' : 'center',
    paddingHorizontal: 24,
    marginLeft: isLargeScreen ? 112 : 0,
    maxWidth: isLargeScreen ? 720 : '100%',
  },
  footerHeading: {
    fontSize: isLargeScreen ? 48 : 30,
    lineHeight: isLargeScreen ? 56 : 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: isLargeScreen ? 'left' : 'center',
  },
  footerButton: {
    marginTop: 24,
    height: 48,
    width: 240,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 18,
    color: '#000000',
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
    width: 229,
    height: 266,
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
  },
});

export default RecruitersHotline; 