import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import Icon from "../../../components/icon";
import Layout from "../components/layout/index";
import { essentialItems, proItems } from "../onboarding/components/compare-modal-data";

interface ListItemProps {
    icon: string;
    title: string;
    description?: string;
}

const ListItem = ({ icon, title, description }: ListItemProps) => (
    <View style={styles.listItem}>
        <View style={styles.listItemContent}>
            <View style={styles.iconContainer}>
                {icon === "Check" ? 
                    <View style={styles.iconWrapper}>
                        <Text style={styles.checkIconText}>
                            <Icon icon={icon} />
                        </Text>
                    </View> : 
                    <Icon icon={icon} />
                }
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.listItemTitle}>{title}</Text>
                {description && <Text style={styles.listItemDescription}>{description}</Text>}
            </View>
        </View>
    </View>
);

const Subscription = () => {
    return (
        <Layout>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.headerTitle}>Upgrade Now</Text>
                <Text style={styles.subTitle}>You are on the Free Trial plan</Text>
                
                <View style={styles.plansContainer}>
                    {/* Essential Plan */}
                    <View style={styles.planCardEssential}>
                        <Text style={styles.planTitle}>Essential</Text>
                        <Text style={styles.planDescription}>
                            AI copilot for 1-4 interviews per month. Experience the AI magic of Interview Copilot™.
                        </Text>
                        
                        <View style={styles.pricingContainer}>
                            <View style={styles.priceWrapper}>
                                <Text style={styles.currencySymbol}>$</Text>
                                <Text style={styles.priceValue}>96</Text>
                            </View>
                            <View style={styles.billingInfo}>
                                <Text style={styles.billingText}>Per Month</Text>
                                <Text style={styles.billingText}>Billed Monthly</Text>
                            </View>
                        </View>
                        
                        <LinearGradient
                            colors={['#0090FF', '#00F7FF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <TouchableOpacity style={styles.subscribeButtonContent}>
                                <Text style={styles.subscribeButtonText}>Subscribe</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        
                        <View style={styles.featuresList}>
                            {essentialItems.map((item, index) => (
                                <ListItem 
                                    key={index} 
                                    icon={item.icon} 
                                    title={item.title} 
                                    description={item.description} 
                                />
                            ))}
                        </View>
                    </View>
                    
                    {/* Pro Plan */}
                    <View style={styles.planCardPro}>
                        <Text style={styles.planTitle}>Pro</Text>
                        <Text style={styles.planDescription}>
                            3-month copilot for unlimited interviews—full support to land your dream job.
                        </Text>
                        
                        <View style={styles.pricingContainer}>
                            <View style={styles.priceWrapper}>
                                <Text style={styles.currencySymbol}>$</Text>
                                <Text style={styles.priceValue}>148</Text>
                            </View>
                            <View style={styles.billingInfo}>
                                <Text style={styles.billingText}>Per Month</Text>
                                <Text style={styles.billingText}>Billed Quarterly</Text>
                            </View>
                        </View>
                        
                        <TouchableOpacity style={styles.outlineButton}>
                            <Text style={styles.outlineButtonText}>Subscribe</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.featuresList}>
                            {proItems.map((item, index) => (
                                <ListItem 
                                    key={index} 
                                    icon={item.icon} 
                                    title={item.title} 
                                    description={item.description} 
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 0,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'left',
        lineHeight: 32,
    },
    subTitle: {
        marginBottom: 16,
        fontSize: 16,
        fontWeight: '500',
        color: '#475569',
    },
    plansContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        paddingBottom: 32,
    },
    planCardEssential: {
        width: '100%',
        maxWidth: 380,
        borderWidth: 1,
        borderColor: '#0EA5E9',
        borderRadius: 8,
        padding: 24,
    },
    planCardPro: {
        width: '100%',
        maxWidth: 380,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        padding: 24,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 28,
    },
    planDescription: {
        marginTop: 8,
        fontSize: 14,
        color: '#94A3B8',
    },
    pricingContainer: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    currencySymbol: {
        fontSize: 14,
    },
    priceValue: {
        fontSize: 48,
        fontWeight: '800',
    },
    billingInfo: {
        marginLeft: 12,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    billingText: {
        fontSize: 14,
    },
    gradientButton: {
        marginTop: 24,
        borderRadius: 6,
        height: 40,
    },
    subscribeButtonContent: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subscribeButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    outlineButton: {
        marginTop: 24,
        height: 40,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outlineButtonText: {
        fontWeight: '500',
    },
    featuresList: {
        marginTop: 16,
        paddingTop: 24,
        borderTopWidth: 1,
        borderColor: '#E2E8F0',
    },
    listItem: {
        marginBottom: 16,
    },
    listItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIconText: {
        color: '#16A34A',
    },
    textContainer: {
        marginLeft: 8,
        flex: 1,
        flexDirection: 'column',
    },
    listItemTitle: {
        fontSize: 16,
        color: '#334155',
    },
    listItemDescription: {
        fontSize: 12,
    },
});

export default Subscription;