import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Layout from "../components/layout/index";
import { infoCards, steps, tutorials } from "./components/data";
import Icon from "../../../components/icon";
import StepCard from "./components/step-card";
import TutorialCard from "./components/tutorial-card";
import InfoCard from "./components/info-card";

import { useGlobalContext } from "../../../context/index";
import { restApi } from "../../../context/restApi";
import { showToast } from "../../../context/helper";

// Define types for the step, tutorial, and info card data
interface Step {
  title: string;
  desc: string;
  link: string;
  idx: number;
}

interface Tutorial {
  link: string;
  title: string;
  imgSrc: string;
  altText: string;
}

interface InfoCardData {
  title: string;
  desc: string;
  buttonText: string;
  link: string;
}

const Started = () => {
    const navigation = useNavigation<any>();
    const [state, { dispatch }] = useGlobalContext();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log('state ==========================================>', state);
            const res = await restApi.postRequest("get-user");

            // if (res === undefined) {
            //     showToast('An error has occurred during communication with backend.', 'error');
            // } else if (res.status === 200) {
            //     const data = res.data.data;
            //     const user = { 
            //         id: data._id, 
            //         email: data.email, 
            //         fullName: data.full_name, 
            //         pfp: data.pfp, 
            //         isPasswordSet: data.is_password_set 
            //     };
            //     console.log("user =====>", user);
            //     dispatch({ type: "user", payload: user });
                
            //     if (state.authType !== "signup") {
            //         navigation.navigate("Started");
            //     } else {
            //         navigation.navigate("Onboarding");
            //     }
            // } else {
            //     navigation.navigate("SignIn");
            // }
        } catch (error) {
            console.error('Error fetching user:', error);
            navigation.navigate("SignIn");
        }
    };
    
    return (
        <Layout>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Get the most out of Theresidentguy</Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Start with the basics
                    </Text>
                    <LinearGradient
                        colors={['#54aef3', '#00d9ff']}
                        style={styles.stepsGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        {steps.map((step: Step, index: number) => (
                            <React.Fragment key={index}>
                                <StepCard title={step.title} desc={step.desc} link={step.link} idx={step.idx} />
                                {index < steps.length - 1 && (
                                    <View style={styles.separator}>
                                        <Icon icon="ChevronDown" />
                                    </View>
                                )}
                            </React.Fragment>
                        ))}
                    </LinearGradient>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Watch the Interview Copilot™ demo</Text>
                    <View style={styles.tutorialsContainer}>
                        {tutorials.map((tutorial: Tutorial, index: number) => (
                            <TutorialCard
                                key={index}
                                idx={index}
                                link={tutorial.link}
                                title={tutorial.title}
                                imgSrc={tutorial.imgSrc}
                                altText={tutorial.altText}
                            />
                        ))}
                    </View>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Get a leg up on the competition
                    </Text>
                    <View style={styles.infoCardsContainer}>
                        {infoCards.map((card: InfoCardData, index: number) => (
                            <InfoCard
                                key={index}
                                title={card.title}
                                desc={card.desc}
                                buttonText={card.buttonText}
                                link={card.link}
                            />
                        ))}
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
        paddingBottom: 32,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 32,
    },
    section: {
        marginVertical: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 8,
        color: '#0f172a',
    },
    stepsGradient: {
        flexDirection: 'column',
        padding: 24,
        borderRadius: 8,
    },
    separator: {
        alignItems: 'center',
        padding: 8,
    },
    tutorialsContainer: {
        marginTop: 16,
        flexDirection: 'column',
        gap: 16,
    },
    infoCardsContainer: {
        marginTop: 8,
        flexDirection: 'column',
        gap: 16,
    },
});

export default Started;
