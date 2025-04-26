import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Layout from "../components/layout";
import Icon from "../../../components/icon";
import { companies } from "../components/data.d";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const ChatWithRecruiters = () => {
    const [status, setStatus] = useState({
        companyIdx: 0,
        company: "",
        tabIdx: 0
    });

    return (
        <Layout>
            <View style={styles.container}>
                {isTablet && (
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Speak with Recruiters
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            Unlock direct access to AI-powered recruiters from the world's leading
                            Fortune 500 companies. Whether you're seeking personalized interview tips,
                            exploring job openings, or getting insider insights on company culture, our
                            AI recruiters are here to guide you.
                        </Text>
                    </View>
                )}
                
                {isTablet ? (
                    <View style={styles.tabletContent}>
                        <View style={styles.companiesPanel}>
                            <View style={styles.companyHeader}>
                                <TouchableOpacity style={styles.techButton}>
                                    <Text style={styles.techButtonText}>Tech</Text>
                                    <Icon icon="Tech" />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.divider} />
                            
                            <ScrollView style={styles.companiesList} showsVerticalScrollIndicator={false}>
                                {companies.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setStatus({ ...status, companyIdx: index, company: item.name })}
                                        style={[
                                            styles.companyItem,
                                            index === status.companyIdx && styles.companyItemActive
                                        ]}
                                    >
                                        <Image source={{ uri: item.logo }} style={styles.companyLogo} />
                                        <Text numberOfLines={1} style={styles.companyName}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        
                        <View style={styles.chatPanel}>
                            <ScrollView style={styles.chatContainer}>
                                <View style={styles.messageContainer}>
                                    <View style={styles.messageBubble}>
                                        <View style={styles.messageAvatar}>
                                            <Image 
                                                source={{ uri: "https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG" }} 
                                                style={styles.avatarImage} 
                                            />
                                        </View>
                                        <View style={styles.messageContent}>
                                            <Text style={styles.messageText}>
                                                Hello, I am a recruiter at Apple, and I am more than happy to
                                                answer any questions you may have regarding our company's
                                                recruitment, interviews, and workplace-related matters.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>

                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Send a message to coach"
                                        multiline={true}
                                    />
                                    <View style={styles.sendButtonContainer}>
                                        <TouchableOpacity style={styles.sendButton}>
                                            <Icon icon="ArrowUp" style={styles.sendIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    status.tabIdx === 0 ? (
                        <View style={styles.mobileCompanySelector}>
                            <Text style={styles.mobileTitle}>
                                Speak with Recruiters from Fortune 500 Companies. Choose one first
                            </Text>
                            
                            <ScrollView 
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false}
                                style={styles.categoryScroller}
                                contentContainerStyle={styles.categoryScrollerContent}
                            >
                                <Text style={styles.categoryActive}>Tech</Text>
                                <Text style={styles.category}>Startup</Text>
                                <Text style={styles.category}>Consumer</Text>
                                <Text style={styles.category}>Professional Services</Text>
                                <Text style={styles.category}>Healthcare</Text>
                            </ScrollView>
                            
                            <ScrollView style={styles.mobileCompanyList}>
                                <View style={styles.mobileCompanyGrid}>
                                    {companies.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => setStatus({ ...status, company: item.name, companyIdx: index })}
                                            style={[
                                                styles.mobileCompanyItem,
                                                index === status.companyIdx && styles.mobileCompanyItemActive
                                            ]}
                                        >
                                            <Image source={{ uri: item.logo }} style={styles.mobileCompanyLogo} />
                                            <Text style={styles.mobileCompanyName}>{item.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                            
                            <TouchableOpacity 
                                onPress={() => setStatus({...status, tabIdx: 1})}
                                style={styles.mobileChooseButton}
                            >
                                <LinearGradient
                                    colors={['#0090FF', '#00F7FF']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientButton}
                                >
                                    <Text style={styles.buttonText}>Choose company</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.mobileChatPanel}>
                            <ScrollView style={styles.mobileChatContainer}>
                                <View style={styles.mobileMessageContainer}>
                                    <View style={styles.mobileMessageBubble}>
                                        <View style={styles.mobileMessageAvatar}>
                                            <Image 
                                                source={{ uri: "https://cdn.brandfetch.io/idnrCPuv87/w/400/h/400/theme/dark/icon.png?k=bfHSJFAPEG" }} 
                                                style={styles.mobileAvatarImage} 
                                            />
                                        </View>
                                        <View style={styles.mobileMessageContent}>
                                            <Text style={styles.mobileMessageText}>
                                                Hello, I am a recruiter at Apple, and I am more than happy to
                                                answer any questions you may have regarding our company's
                                                recruitment, interviews, and workplace-related matters.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>

                            <View style={styles.mobileInputContainer}>
                                <View style={styles.mobileInputWrapper}>
                                    <TextInput
                                        style={styles.mobileInput}
                                        placeholder="Send a message to coach"
                                        multiline={true}
                                    />
                                    <View style={styles.mobileSendButtonContainer}>
                                        <TouchableOpacity style={styles.mobileSendButton}>
                                            <Icon icon="ArrowUp" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                )}
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 16,
    },
    header: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 24,
    },
    tabletContent: {
        flex: 1,
        flexDirection: 'row',
        gap: 24,
    },
    companiesPanel: {
        flex: 2,
        minWidth: 180,
        maxWidth: 324,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        padding: 24,
    },
    companyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    techButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    techButtonText: {
        fontSize: 20,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 24,
    },
    companiesList: {
        flex: 1,
    },
    companyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        height: 48,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#FFFFFF',
        marginBottom: 12,
    },
    companyItemActive: {
        borderColor: '#0EA5E9',
        backgroundColor: 'rgba(186, 230, 253, 0.55)',
    },
    companyLogo: {
        width: 24,
        height: 24,
    },
    companyName: {
        fontSize: 14,
        flex: 1,
    },
    chatPanel: {
        flex: 5,
        minWidth: 380,
        maxWidth: 803,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        padding: 16,
        paddingTop: 24,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 8,
    },
    messageContainer: {
        marginBottom: 40,
    },
    messageBubble: {
        flexDirection: 'row',
        gap: 8,
    },
    messageAvatar: {
        width: 32,
        height: 32,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    messageContent: {
        flex: 1,
        backgroundColor: '#BAE6FD',
        borderRadius: 16,
        borderTopLeftRadius: 0,
        padding: 12,
    },
    messageText: {
        fontSize: 16,
        color: '#0F172A',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        paddingHorizontal: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#7DD3FC',
        backgroundColor: '#F0F9FF',
        borderRadius: 24,
        padding: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 0,
        paddingHorizontal: 8,
        backgroundColor: 'transparent',
    },
    sendButtonContainer: {
        alignSelf: 'flex-end',
    },
    sendButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#06B6D4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendIcon: {
        color: '#FFFFFF',
    },
    // Mobile styles
    mobileCompanySelector: {
        flex: 1,
    },
    mobileTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 32,
    },
    categoryScroller: {
        flexGrow: 0,
    },
    categoryScrollerContent: {
        gap: 24,
        paddingRight: 16,
    },
    category: {
        fontSize: 18,
        color: '#64748B',
        fontWeight: '600',
    },
    categoryActive: {
        fontSize: 18,
        fontWeight: '600',
    },
    mobileCompanyList: {
        marginTop: 24,
        flex: 1,
    },
    mobileCompanyGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        paddingBottom: 80,
    },
    mobileCompanyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        width: '48%',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#FFFFFF',
    },
    mobileCompanyItemActive: {
        borderColor: '#0EA5E9',
        backgroundColor: '#BAE6FD',
    },
    mobileCompanyLogo: {
        width: 24,
        height: 24,
    },
    mobileCompanyName: {
        fontSize: 14,
    },
    mobileChooseButton: {
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        borderRadius: 8,
        overflow: 'hidden',
    },
    gradientButton: {
        padding: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    mobileChatPanel: {
        flex: 1,
        paddingVertical: 24,
    },
    mobileChatContainer: {
        flex: 1,
        paddingHorizontal: 8,
    },
    mobileMessageContainer: {
        marginBottom: 40,
    },
    mobileMessageBubble: {
        flexDirection: 'row',
        gap: 8,
    },
    mobileMessageAvatar: {
        width: 32,
        height: 32,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    mobileAvatarImage: {
        width: '100%',
        height: '100%',
    },
    mobileMessageContent: {
        flex: 1,
        backgroundColor: '#BAE6FD',
        borderRadius: 16,
        borderTopLeftRadius: 0,
        padding: 12,
    },
    mobileMessageText: {
        fontSize: 16,
        color: '#0F172A',
    },
    mobileInputContainer: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        paddingHorizontal: 8,
    },
    mobileInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#7DD3FC',
        backgroundColor: '#F0F9FF',
        borderRadius: 24,
        padding: 8,
        marginHorizontal: 8,
    },
    mobileInput: {
        flex: 1,
        fontSize: 16,
        padding: 0,
        paddingHorizontal: 8,
        backgroundColor: 'transparent',
    },
    mobileSendButtonContainer: {
        alignSelf: 'flex-end',
    },
    mobileSendButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#06B6D4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileSendIcon: {
        color: '#FFFFFF',
    },
});

export default ChatWithRecruiters;