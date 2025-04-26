import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import type { RootStackParamList } from '../../pages';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import SVG files directly
import TwitterIcon from '../../assets/image/icons/icon-twitter.svg';
import InstagramIcon from '../../assets/image/icons/icon-subtract.svg';
import YouTubeIcon from '../../assets/image/icons/icon-youtube.svg';
import DiscordIcon from '../../assets/image/icons/icon-twitch.svg';
import TikTokIcon from '../../assets/image/icons/icon-tiktok.svg';
import ProductHuntIcon from '../../assets/image/icons/product-hunt.svg';
import { WebView } from 'react-native-webview';
import { w, h } from '../../theme/services';

type RootStackParamList = {
    Home: undefined;
    InterviewCopilot: undefined;
    AiMockInterview: undefined;
    AiTools: { screen?: string } | undefined;
    Guide: undefined;
    Faq: undefined;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Footer = () => {
    const navigation = useNavigation<NavigationProp>();

    const handleNavigation = (path: string) => {
        if (path.startsWith('http')) {
            Linking.openURL(path);
        } else {
            // Convert path to screen name
            const screenName = path.replace('/', '');
            
            if (screenName === '') {
                navigation.navigate('Home');
            } else if (screenName === 'interview-copilot') {
                navigation.navigate('InterviewCopilot');
            } else if (screenName === 'ai-mock-interview') {
                navigation.navigate('AiMockInterview');
            } else if (screenName === 'guide') {
                navigation.navigate('Guide');
            } else if (screenName.startsWith('ai-tools')) {
                navigation.navigate('AiTools', { screen: screenName.replace('ai-tools/', '') });
            } else if (screenName === '#faq') {
                navigation.navigate('Faq');
            } else {
                console.log('Screen not found:', screenName);
            }
        }
    };

    return (
        <View style={styles.footer}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.topSection}>
                        <View style={styles.brandSection}>
                            <TouchableOpacity 
                                style={styles.logoContainer} 
                                onPress={() => handleNavigation('/')}
                            >
                                <Text style={styles.brandText}>Theresidentguy</Text>
                                <Image 
                                    source={require('../../assets/image/icons/logo.png')} 
                                    style={styles.logo} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.tagline}>
                                Your trusted platform to ace any job interviews, craft the perfect
                                resumes, and land your dream jobs.
                            </Text>
                            <View style={styles.socialIcons}>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => Linking.openURL('https://x.com/finalround_ai')}
                                >
                                    <TwitterIcon width={w(6)} height={w(6)} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => Linking.openURL('https://www.instagram.com/finalround_ai/')}
                                >
                                    <InstagramIcon width={w(6)} height={w(6)} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => Linking.openURL('https://www.youtube.com/@FinalRoundAI')}
                                >
                                    <YouTubeIcon width={w(6)} height={w(6)} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => Linking.openURL('https://discord.gg/6Ff3eQepcF')}
                                >
                                    <DiscordIcon width={w(6)} height={w(6)} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => Linking.openURL('https://www.tiktok.com/@finalroundai.com')}
                                >
                                        <TikTokIcon width={w(6)} height={w(6)} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => Linking.openURL('https://www.producthunt.com/posts/interview-copilot-by-final-round-ai')}
                            >
                                <ProductHuntIcon width={w(50)} height={h(11.25)} />
                            </TouchableOpacity>
                            {/* <View style={{ width: w(50), height: h(3) }}>
                                <WebView
                                    source={{ uri: 'https://status.finalroundai.com/badge?theme=light' }}
                                    style={{ flex: 1 }}
                                    scrollEnabled={false}
                                    javaScriptEnabled
                                />
                            </View> */}
                        </View>
                        
                        <View style={styles.navSection}>
                            <View style={styles.navColumn}>
                                <Text style={styles.navTitle}>Products</Text>
                                <TouchableOpacity onPress={() => handleNavigation('/interview-copilot')}>
                                    <Text style={styles.navLink}>Interview Copilot</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigation('/ai-mock-interview')}>
                                    <Text style={styles.navLink}>AI Mock Interview</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.navColumn}>
                                <Text style={styles.navTitle}>Resources</Text>
                                <TouchableOpacity onPress={() => handleNavigation('/guide')}>
                                    <Text style={styles.navLink}>Guide</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigation('/blog')}>
                                    <Text style={styles.navLink}>Blog</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.navColumn}>
                                <Text style={styles.navTitle}>Support</Text>
                                <TouchableOpacity onPress={() => handleNavigation('/#faq')}>
                                    <Text style={styles.navLink}>FAQ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigation('/contact')}>
                                    <Text style={styles.navLink}>Contact Us</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.navColumn}>
                                <Text style={styles.navTitle}>Company</Text>
                                <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/nBoH3bjPLWQ?si=_1dzqs5vv9wc5KPi')}>
                                    <Text style={styles.navLink}>How Theresidentguy works</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigation('/about')}>
                                    <Text style={styles.navLink}>About</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigation('/careers')}>
                                    <Text style={styles.navLink}>Careers</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigation('/news')}>
                                    <Text style={styles.navLink}>News</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigation('/referral-program')}>
                                    <Text style={styles.navLink}>Referral Program</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.bottomSection}>
                        <View style={styles.copyright}>
                            <Text style={styles.copyrightText}>
                                © 2025 Theresidentguy,{'\n'}
                                456 University Ave, Palo Alto, CA 94301
                            </Text>
                        </View>
                        <View style={styles.legalLinks}>
                            <TouchableOpacity onPress={() => handleNavigation('/privacy-policy')}>
                                <Text style={styles.legalText}>Privacy Policy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleNavigation('/terms-of-use')}>
                                <Text style={styles.legalText}>Terms & Conditions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        paddingHorizontal: w(4),
        paddingBottom: w(4),
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 26,
        padding: w(6),
    },
    topSection: {
        flexDirection: 'column',
    },
    brandSection: {
        maxWidth: w(100),
        // marginBottom: 24,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: h(3),
    },
    brandText: {
        fontSize: w(5),
        color: '#0066CC',
        marginRight: w(2),
    },
    logo: {
        width: w(6.5),
        height: w(6.5),
    },
    tagline: {
        color: '#666',
        fontSize: w(4),
        marginBottom: h(2.5),
    },
    socialIcons: {
        flexDirection: 'row',
        // marginBottom: h(2.5),
    },
    socialButton: {
        width: w(13.5),
        height: w(13.5),
        borderRadius: w(6.5),
        backgroundColor: '#E0F7FA',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: w(2),
    },
    productHuntBadge: {
        width: '50%',
        height: h(11.25),
        marginBottom: h(2.5),
    },
    navSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: h(6),
    },
    navColumn: {
        width: '48%',
        marginBottom: h(2),
    },
    navTitle: {
        fontSize: w(4),
        fontWeight: 'bold',
        marginBottom: h(2),
    },
    navLink: {
        fontSize: w(4),
        color: '#666',
        marginBottom: h(2),
    },
    bottomSection: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(128, 128, 128, 0.1)',
        marginTop: h(2),
        paddingTop: h(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    copyright: {
        marginBottom: h(2),
        marginLeft: w(8),
    },
    copyrightText: {
        color: '#666',
        opacity: 0.5,
        fontSize: w(3.5),
    },
    legalLinks: {
        flexDirection: 'row',
    },
    legalText: {
        color: '#666',
        opacity: 0.5,
        marginLeft: w(8),
        fontSize: w(3.6),
    },
});

export default Footer;