import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Icon from "../../../components/icon";
import { faqs } from "./data.d";
import { w, h } from '../../../theme/services'

const { width } = Dimensions.get('window');

type AccordionProps = {
  item: { 
    question: string; 
    answer: string; 
  };
  isActive: boolean;
  toggle: () => void;
};

const Accordion: React.FC<AccordionProps> = ({ item, isActive, toggle }) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isActive]);
  
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={[
          styles.accordionHeader,
          isActive ? styles.accordionHeaderActive : styles.accordionHeaderInactive
        ]}
        onPress={toggle}
        activeOpacity={0.8}
      >
        <Text style={styles.accordionTitle}>{item.question}</Text>
        <View style={isActive ? styles.iconActive : styles.icon}>
          <Icon icon={isActive ? "Minus" : "Plus"} />
        </View>
      </TouchableOpacity>
      
      <Animated.View 
        style={[
          styles.accordionContent,
          {
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500]
            }),
            opacity: animatedHeight,
            marginTop: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 16]
            }),
          }
        ]}
      >
        <Text style={styles.accordionText}>{item.answer}</Text>
      </Animated.View>
    </View>
  );
};

const Question = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.subtitle}>Questions &amp; Answers</Text>
        <Text style={styles.title}>
          If you still have questions. Here are the answers
        </Text>
      </View>
      
      <View style={styles.accordionsContainer}>
        {faqs.map((item, index) => (
          <Accordion
            key={index}
            item={item}
            isActive={activeIndex === index}
            toggle={() => toggleAccordion(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: h(30),
    paddingHorizontal: w(4),
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: h(5),
    maxWidth: '100%',
  },
  subtitle: {
    fontSize: w(5),
    color: '#9CA3AF', // text-gray-400
    marginTop: h(10),
    marginBottom: h(5),
    textAlign: 'center',
  },
  title: {
    fontSize: w(7),
    // fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '90%',
    fontFamily: 'Georgia',
  },
  accordionsContainer: {
    width: '100%',
    maxWidth: width > 1024 ? 1028 : width * 0.95,
  },
  accordionContainer: {
    width: '100%',
    backgroundColor: '#ECFEFF', // bg-cyan-50
    borderRadius: 16,
    marginBottom: h(1.5),
    // padding: 8,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: w(6),
    borderRadius: 16,
  },
  accordionHeaderActive: {
    backgroundColor: '#CFFAFE', // bg-cyan-200
  },
  accordionHeaderInactive: {
    backgroundColor: '#ECFEFF', // bg-cyan-50
  },
  accordionTitle: {
    fontSize: w(4.2),
    flex: 1,
    fontFamily: 'Georgia',
  },
  icon: {
    marginLeft: w(2),
  },
  iconActive: {
    marginLeft: w(2),
    color: '#06B6D4', // text-cyan-500
  },
  accordionContent: {
    overflow: 'hidden',
    paddingHorizontal: 24,
  },
  accordionText: {
    fontSize: w(4.5),
    color: '#6B7280', // text-gray-500
    marginBottom: h(5),
  },
});

export default Question;
