import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Layout from '../../components/layout';

import GoogleMeetIcon from '../../assets/image/icons/google-meeting.svg';
import WebexIcon from '../../assets/image/icons/webex.svg';
import TeamIcon from '../../assets/image/icons/team.svg';
import RingCentralIcon from '../../assets/image/icons/ring-central.svg';
import SkypeIcon from '../../assets/image/icons/skype.svg';
import ChimeIcon from '../../assets/image/icons/chime.svg';
import ZoomIcon from '../../assets/image/icons/zoom.svg';
import BlueJeansIcon from '../../assets/image/icons/blue-jeans.svg';
import WhatsupIcon from '../../assets/image/icons/whatsup.svg';
import GotoMeetingIcon from '../../assets/image/icons/goto-meeting.svg';
import BigblueIcon from '../../assets/image/icons/bigblue.svg';
import SlackIcon from '../../assets/image/icons/slack.svg';
import JitsiIcon from '../../assets/image/icons/jitsi.svg';
import WherebyIcon from '../../assets/image/icons/whereby.svg';
import FlowerIcon from '../../assets/image/icons/flower.svg';
import MessageIcon from '../../assets/image/icons/message.svg';
import LarkIcon from '../../assets/image/icons/lark.svg';
import HeadIcon from '../../assets/image/icons/head.svg';
import MIcon from '../../assets/image/icons/m.svg';

import LoaderLineIcon from '../../assets/image/icons/loader-line.svg';
import StarsIcon from '../../assets/image/icons/stars.svg';
import AwarenessIcon from '../../assets/image/icons/awareness.svg';
import PersonalIcon from '../../assets/image/icons/personal.svg';
import PreparationIcon from '../../assets/image/icons/preparation.svg';
import LatencyIcon from '../../assets/image/icons/latency.svg';
import LightClockIcon from '../../assets/image/icons/light-clock.svg';
import ATextIcon from '../../assets/image/icons/a-text.svg';
import { w } from '../../theme/services';

const { width } = Dimensions.get('window');

// const ArrowNarrowRight = () => (
//     <Image 
//         source={require('../../../assets/image/icons/arrow-right.svg')}
//         style={{ width: 20, height: 20, marginLeft: 5 }}
//     />
// );

const InterviewCopilot = () => {
    const navigation = useNavigation<any>();

    const navigateToSignIn = () => {
        navigation.navigate('SignIn');
    };

    return (
      <Layout>
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={require('../../assets/image/home/common-bg.png')} 
                    style={styles.headerBackground} 
                    resizeMode="cover"
                />
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>
                        Struggling to answer tough questions during interviews?
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        Interview Copilot™ has your back with AI-powered responses that keep you calm and collected, even when the pressure's on.
                    </Text>
                </View>
            </View>

            {/* Desktop Dashboard Preview - Not showing on mobile */}
            {width > 768 && (
                <View style={styles.dashboardPreview}>
                    <View style={styles.dashboardContainer}>
                        <View style={styles.interviewerSection}>
                            <View style={styles.interviewerHeader}>
                                <Image
                                    source={require('../../assets/image/icons/user.png')}
                                    style={styles.interviewerAvatar}
                                />
                                <View style={styles.interviewerInfo}>
                                    <Text style={styles.interviewerTitle}>Interviewer</Text>
                                    <LinearGradient
                                        colors={['#0090FF', '#00F7FF']}
                                        style={styles.transcribingBadgeGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    >
                                        <View style={styles.transcribingBadgeInner}>
                                            <LoaderLineIcon width={16} height={16} style={[styles.loaderIcon, { transform: [{ rotate: '720deg' }] }]} />
                                            <Text style={styles.transcribingText}>Transcribing</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </View>
                            <View style={styles.interviewerQuestions}>
                                <View style={styles.questionItem}>
                                    <Text style={styles.timestamp}>00:02:58</Text>
                                    <Text style={styles.questionText}>
                                        Why do you want to work as a software engineer at our company?
                                    </Text>
                                </View>
                                <View style={styles.questionItem}>
                                    <Text style={styles.timestamp}>00:02:58</Text>
                                    <Text style={styles.questionText}>
                                        Can you describe your software development process?
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <LinearGradient
                            colors={['#0090FF', '#00F7FF']}
                            style={styles.copilotSection}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={styles.copilotHeader}>
                                <Text style={styles.copilotTitle}>Interview Copilot™ & You</Text>
                                <View style={styles.generatingBadge}>
                                    <StarsIcon width={16} height={16} style={styles.starsIcon} />
                                    <Text style={styles.generatingText}>AI Generating</Text>
                                </View>
                            </View>
                            <View style={styles.responseList}>
                                <View style={styles.responseItem}>
                                    <Text style={styles.timestamp}>00:02:58</Text>
                                    <Text style={styles.responseText}>
                                        admire your innovative tech solutions and collaborative culture.
                                        My skills in software development and passion for creating efficient
                                        code align perfectly with your company's mission, and I'm eager to
                                        contribute to your team's success.
                                    </Text>
                                </View>
                                <View style={styles.responseItem}>
                                    <Text style={styles.timestamp}>00:02:58</Text>
                                    <Text style={styles.responseText}>
                                        gather requirements, design architecture, develop, test, iterate
                                        based on feedback, and ensure high-quality deliverables through
                                        reviews and testing.
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
            )}

            {/* Mobile Video Preview */}
            {width <= 768 && (
                <View style={styles.mobileVideoContainer}>
                    <Video
                        source={{ uri: "https://d12araoe7z5xxk.cloudfront.net/landing-page/video/interview-copilot.mp4" }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode={ResizeMode.COVER}
                        shouldPlay
                        isLooping
                        style={styles.mobileVideo}
                    />
                </View>
            )}

            {/* Get Started Banner */}
            <LinearGradient
                colors={['#0090FF', '#00F7FF']}
                style={styles.getStartedBanner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <View style={styles.getStartedContent}>
                    <Text style={styles.getStartedText}>
                        Your Theresidentguy of interview, your AI Interview Copilot!
                    </Text>
                    <TouchableOpacity 
                        style={styles.getStartedButton}
                        onPress={navigateToSignIn}
                    >
                        <Text style={styles.getStartedButtonText}>Get Started Free</Text>
                        {/* <ArrowNarrowRight /> */}
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* Features Section */}
            <View style={styles.featuresSection}>
                <Text style={styles.sectionTitle}>Real-time AI Suggestions</Text>
                <Text style={styles.sectionSubtitle}>
                    Interview Copilot™ generating actionable guidance in real-time
                </Text>

                <View style={styles.featuresGrid}>
                    <View style={styles.featureItem}>
                        <AwarenessIcon width={width > 768 ? 64 : 48} height={width > 768 ? 64 : 48} style={styles.featureIcon} />
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>Contextual Awareness</Text>
                            <Text style={styles.featureDescription}>
                                Generates tailored responses by analyzing job descriptions and company details for each interview.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.featureItem}>
                        <PersonalIcon width={width > 768 ? 64 : 48} height={width > 768 ? 64 : 48} style={styles.featureIcon} />
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>Personalized Responses</Text>
                            <Text style={styles.featureDescription}>
                                Craft personalized answers that highlight your background, skills, and
                                experiences to meet interviewers' expectations.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.featureItem}>
                        <PreparationIcon width={width > 768 ? 64 : 48} height={width > 768 ? 64 : 48} style={styles.featureIcon} />
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>Customizable Preparation</Text>
                            <Text style={styles.featureDescription}>
                                Train and customize your copilot with your materials, like pre-prepared Q&A, for tailored performance
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Support Section */}
            <View style={styles.supportSection}>
                <Text style={styles.supportTitle}>Support All Meeting Softwares</Text>
                <View style={styles.logoGrid}>
                    <GoogleMeetIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <WebexIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <TeamIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <RingCentralIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <SkypeIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <ChimeIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <ZoomIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <BlueJeansIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <WhatsupIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <GotoMeetingIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <BigblueIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <SlackIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <JitsiIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <WherebyIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <FlowerIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <MessageIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <LarkIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <HeadIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                    <MIcon width={width > 768 ? 140 : '25%'} height={width > 768 ? 70 : 40} style={styles.logoItem} />
                </View>
            </View>

            {/* Transcription Section */}
            <View style={styles.transcriptionSection}>
                <View style={styles.sectionContent}>
                    <View style={styles.sectionTextContent}>
                        <Text style={styles.sectionTitle}>Real-time Transcription</Text>
                        <Text style={styles.sectionSubtitle}>
                            Understand every question sharply
                        </Text>

                        <View style={styles.benefitsList}>
                            <View style={styles.benefitItem}>
                                <View style={styles.benefitHeader}>
                                    <LatencyIcon width={width > 768 ? 36 : 32} height={width > 768 ? 36 : 32} style={styles.benefitIcon} />
                                    <Text style={styles.benefitTitle}>Super-low Latency.</Text>
                                </View>
                                <Text style={styles.benefitDescription}>
                                    Recognizes text nuances, creating synthetic, human voices with
                                    accurate intonation and resonance.
                                </Text>
                            </View>

                            <View style={styles.benefitItem}>
                                <View style={styles.benefitHeader}>
                                    <LightClockIcon width={width > 768 ? 36 : 32} height={width > 768 ? 36 : 32} style={styles.benefitIcon} />
                                    <Text style={styles.benefitTitle}>Exceptional Accuracy</Text>
                                </View>
                                <Text style={styles.benefitDescription}>
                                    Meticulous attention to detail and high fidelity in capturing spoken
                                    questions and conversations correctly.
                                </Text>
                            </View>

                            <View style={styles.benefitItem}>
                                <View style={styles.benefitHeader}>
                                    <ATextIcon width={width > 768 ? 36 : 32} height={width > 768 ? 36 : 32} style={styles.benefitIcon} />
                                    <Text style={styles.benefitTitle}>Multilingual Capability</Text>
                                </View>
                                <Text style={styles.benefitDescription}>
                                    Support up to 29 languages and accents. More to come!
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={styles.launchButton}
                            onPress={navigateToSignIn}
                        >
                            <Text style={styles.launchButtonText}>Launch Interview Copilot</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Image
                        source={
                            width > 768 
                            ? require('../../assets/image/home/real-time-transcription-1.png')
                            : require('../../assets/image/home/real-time-transcription-2.png')
                        }
                        style={styles.sectionImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* Feedback Section */}
            <View style={styles.feedbackSection}>
                <View style={[styles.sectionContent, styles.reversedSection]}>
                    <View style={styles.sectionTextContent}>
                        <Text style={styles.sectionTitle}>Real-time Feedback</Text>
                        <Text style={styles.sectionSubtitle}>
                            Generate an interview summary report after each Interview Copilot
                            session to helps candidates understand their strengths and pinpoint
                            areas for improvement, making each interview a valuable learning
                            experience.
                        </Text>

                        <View style={styles.benefitsList}>
                            <View style={styles.benefitItem}>
                                <View style={styles.benefitHeader}>
                                    <Image
                                        source={{ uri: "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/interviewCopilot/analysis.svg" }}
                                        style={styles.benefitIcon}
                                    />
                                    <Text style={styles.benefitTitle}>Insightful Analysis</Text>
                                </View>
                                <Text style={styles.benefitDescription}>
                                    generates a detailed report that highlights key moments, evaluates
                                    responses, and provides actionable feedback.
                                </Text>
                            </View>

                            <View style={styles.benefitItem}>
                                <View style={styles.benefitHeader}>
                                    <Image
                                        source={{ uri: "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/interviewCopilot/utility.svg" }}
                                        style={styles.benefitIcon}
                                    />
                                    <Text style={styles.benefitTitle}>Versatile Utility</Text>
                                </View>
                                <Text style={styles.benefitDescription}>
                                    Designed for both practice sessions and real interview and support
                                    continuous improvement and personal growth in the interview process.
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={styles.launchButton}
                            onPress={navigateToSignIn}
                        >
                            <Text style={styles.launchButtonText}>Launch Interview Copilot</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* {width > 768 && ( */}
                        <Image
                            source={require('../../assets/image/home/real-time-feedback.png')}
                            style={styles.sectionImage}
                            resizeMode="contain"
                        />
                    {/* )} */}
                </View>
            </View>
        </ScrollView>
      </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingTop: 30,
        position: 'relative',
    },
    headerBackground: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        zIndex: -1,
    },
    headerContent: {
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Albra',
        fontSize: width > 768 ? 40 : 32,
        lineHeight: width > 768 ? 48 : 40,
        textAlign: 'center',
        letterSpacing: -0.5,
        fontWeight: '600',
    },
    headerSubtitle: {
        marginTop: width > 768 ? 24 : 16,
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        color: '#000000',
        maxWidth: 600,
    },
    dashboardPreview: {
        marginTop: 48,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    dashboardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 24,
        padding: 24,
    },
    interviewerSection: {
        minWidth: 350,
        borderRightWidth: 1,
        borderColor: '#E5E7EB',
        paddingRight: 24,
    },
    interviewerHeader: {
        flexDirection: 'row',
        height: 80,
    },
    interviewerAvatar: {
        width: 80,
        height: 80,
        borderRadius: 16,
    },
    interviewerInfo: {
        marginLeft: 24,
    },
    interviewerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    transcribingBadgeGradient: {
        marginTop: 16,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
    },
    transcribingBadgeInner: {
        flexDirection: 'row',
        height: 26,
        width: '100%',
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    loaderIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    transcribingText: {
        fontSize: 13,
        color: '#0090FF',
    },
    interviewerQuestions: {
        marginTop: 24,
        backgroundColor: '#F1F5F9',
        borderRadius: 16,
        padding: 24,
        minHeight: 156,
    },
    questionItem: {
        marginBottom: 16,
    },
    timestamp: {
        fontSize: 14,
        color: '#94A3B8',
    },
    questionText: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 22,
    },
    copilotSection: {
        marginLeft: 24,
        flex: 1,
        borderRadius: 16,
        padding: 16,
        minHeight: 260,
    },
    copilotHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    copilotTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    generatingBadge: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: 28,
        paddingHorizontal: 10,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    starsIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    generatingText: {
        fontSize: 13,
        color: '#FFFFFF',
    },
    responseList: {
        marginTop: 12,
    },
    responseItem: {
        marginBottom: 8,
        backgroundColor: 'rgba(255, 250, 248, 0.9)',
        borderRadius: 16,
        padding: 16,
        minHeight: 100,
    },
    responseText: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: '400',
        lineHeight: 22,
    },
    mobileVideoContainer: {
        marginTop: 48,
        paddingHorizontal: 16,
    },
    mobileVideo: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    getStartedBanner: {
        marginTop: 48,
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    getStartedContent: {
        flexDirection: width > 768 ? 'row' : 'column',
        justifyContent: width > 768 ? 'space-between' : 'center',
        alignItems: 'center',
        maxWidth: 1200,
        marginHorizontal: 'auto',
    },
    getStartedText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: width > 768 ? 'left' : 'center',
        maxWidth: 892,
    },
    getStartedButton: {
        marginTop: width > 768 ? 0 : 24,
        flexDirection: 'row',
        height: 36,
        paddingHorizontal: 20,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    getStartedButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    featuresSection: {
        paddingTop: width > 768 ? 200 : 100,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    sectionTitle: {
        fontFamily: 'Albra',
        fontSize: width > 768 ? w(7) : w(7),
        textAlign: 'center',
        fontWeight: '600',
    },
    sectionSubtitle: {
        marginTop: width > 768 ? 24 : 16,
        fontSize: w(5),
        lineHeight: w(6),
        textAlign: 'center',
        color: '#94A3B8',
    },
    featuresGrid: {
        flexDirection: width > 768 ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 1200,
        marginTop: width > 768 ? 64 : 16,
    },
    featureItem: {
        flex: width > 768 ? 1 : 0,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width > 768 ? 0 : 16,
    },
    featureIcon: {
        width: width > 768 ? 64 : 48,
        height: width > 768 ? 64 : 48,
    },
    featureContent: {
        marginTop: width > 768 ? 32 : 16,
        alignItems: 'center',
    },
    featureTitle: {
        fontFamily: 'Albra',
        fontSize: width > 768 ? 24 : 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    featureDescription: {
        marginTop: width > 768 ? 24 : 12,
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',
        color: '#95989B',
    },
    supportSection: {
        marginTop: 100,
        marginHorizontal: 16,
        padding: 24,
        borderRadius: 24,
        backgroundColor: width > 768 ? '#E0F7FA' : '#FFFFFF',
        borderWidth: width > 768 ? 0 : 1,
        borderColor: '#E3E5EB',
        alignItems: 'center',
    },
    supportTitle: {
        fontFamily: 'Albra',
        fontSize: 24,
        fontWeight: '500',
        color: '#64748B',
        textAlign: 'center',
    },
    logoGrid: {
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    logoItem: {
        width: width > 768 ? 140 : '25%',
        height: width > 768 ? 70 : 40,
        marginTop: 8,
    },
    transcriptionSection: {
        marginTop: width > 768 ? 200 : 124,
        // paddingHorizontal: 16,
    },
    sectionContent: {
        flexDirection: width > 768 ? 'row' : 'column-reverse',
        maxWidth: 1200,
        width: '100%',
        marginHorizontal: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reversedSection: {
        flexDirection: width > 768 ? 'row-reverse' : 'column-reverse',
    },
    sectionTextContent: {
        maxWidth: width > 768 ? 560 : '100%',
        marginTop: width > 768 ? 0 : 48,
    },
    benefitsList: {
        marginTop: width > 768 ? 64 : 48,
    },
    benefitItem: {
        marginTop: width > 768 ? 0 : 24,
        display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: width > 768 ? 'flex-start' : 'center',
    },
    benefitHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: width > 768 ? 'flex-start' : 'center',
    },
    benefitIcon: {
        width: width > 768 ? 36 : 32,
        height: width > 768 ? 36 : 32,
    },
    benefitTitle: {
        marginLeft: 16,
        fontFamily: 'Albra',
        fontSize: width > 768 ? w(6) : w(5),
        fontWeight: '600',
    },
    benefitDescription: {
        marginTop: 8,
        fontSize: w(5),
        lineHeight: w(6),
        color: '#94A3B8',
        // marginLeft: 52,
        width: '90%',
        textAlign: width > 768 ? 'left' : 'center',
    },
    launchButton: {
        marginTop: 40,
        backgroundColor: '#0090FF',
        width: width > 768 ? 320 : '100%',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: width > 768 ? 'flex-start' : 'center',
    },
    launchButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '500',
        paddingHorizontal: 20,
    },
    sectionImage: {
        width: width > 768 ? 592 : '90%',
        height: width > 768 ? 672 : 290,
    },
    feedbackSection: {
        marginVertical: width > 768 ? 100 : 124,
        paddingHorizontal: 16,
    },
});

export default InterviewCopilot;