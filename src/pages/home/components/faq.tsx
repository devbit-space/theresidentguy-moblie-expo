import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "../../../components/icon";

const Item = ({ i, isOpen, toggleOpen }: { i: { question: string, answer: string }, isOpen: boolean, toggleOpen: () => void }) => {
    const animatedHeight = useState(new Animated.Value(0))[0];

    React.useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: isOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isOpen]);

    return (
        <TouchableOpacity 
            onPress={toggleOpen} 
            style={styles.itemContainer}
            activeOpacity={0.8}
        >
            <View style={styles.itemContent}>
                <View style={styles.questionRow}>
                    <Text style={[styles.questionText, isOpen && styles.questionTextOpen]}>
                        {i.question}
                    </Text>
                    {/* <Icon 
                        icon={isOpen ? "ChevronUp" : "ChevronDown"}
                        style={styles.icon} 
                        color={isOpen ? "#0ea5e9" : "#000000"}
                    /> */}
                </View>
                <Animated.View
                    style={[
                        styles.answerContainer,
                        {
                            maxHeight: animatedHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 500],
                            }),
                        },
                    ]}
                >
                    <Text style={styles.answerText}>{i.answer}</Text>
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
};

const Faq = ({title, desc, data}: {title: string, desc?: string, data: any}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null); 

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.titleText}>{title}</Text>
                {desc && <Text style={styles.descText}>{desc}</Text>}
            </View>
            <View style={styles.itemsContainer}>
                {data.map((i: any, k: number) => (
                    <Item
                        key={k}
                        i={i}
                        isOpen={openIndex === k}
                        toggleOpen={() => toggleAccordion(k)}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingBottom: 40,
        paddingTop: 6,
        paddingHorizontal: 16,
    },
    headerContainer: {
        alignItems: "center",
        paddingTop: 100,
        paddingHorizontal: 12,
        marginBottom: 20,
    },
    titleText: {
        fontFamily: "Georgia",
        fontSize: 28,
        lineHeight: 36,
        letterSpacing: -0.5,
        textAlign: "center",
        maxWidth: 983,
    },
    descText: {
        color: "#64748b",
        fontSize: 16,
        marginTop: 6,
    },
    itemsContainer: {
        width: "100%",
        maxWidth: 962,
        rowGap: 16,
    },
    itemContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 16,
        backgroundColor: "white",
        marginBottom: 16,
    },
    itemContent: {
        flexDirection: "column",
        padding: 24,
    },
    questionRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    questionText: {
        fontSize: 20,
        color: "#000000",
        fontFamily: "Georgia",
    },
    questionTextOpen: {
        color: "#0ea5e9",
    },
    icon: {
        height: 24,
        width: 24,
    },
    answerContainer: {
        overflow: "hidden",
        marginTop: 12,
    },
    answerText: {
        color: "#374151",
        fontSize: 18,
    },
});

export default Faq;
