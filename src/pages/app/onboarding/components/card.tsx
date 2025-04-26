import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

interface CardProps {
  title: string;
  desc: string;
  subscribe: string;
  onNext: () => void;
}

const Card = ({ title, desc, subscribe, onNext }: CardProps) => {
  const buttonHeight = useRef(new Animated.Value(0)).current;
  const [isPressed, setIsPressed] = useState(false);
  const buttonHeightValue = useRef(0);

  // Add listener to keep track of the animated value
  buttonHeight.addListener(({ value }) => {
    buttonHeightValue.current = value;
  });

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(buttonHeight, {
      toValue: 40, // height of the button in pixels
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    if (buttonHeightValue.current === 0) return; // Don't animate if already at 0
    Animated.timing(buttonHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onNext}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, isPressed && styles.containerPressed]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, isPressed && styles.titlePressed]}>{title}</Text>
        <View style={[
          styles.badge,
          subscribe === "Free" ? styles.freeBadge : styles.premiumBadge
        ]}>
          <Text style={[
            styles.badgeText,
            subscribe === "Free" ? styles.freeBadgeText : styles.premiumBadgeText
          ]}>
            {subscribe}
          </Text>
        </View>
      </View>
      
      <Text style={styles.description}>{desc}</Text>
      
      <Animated.View style={[styles.buttonContainer, { height: buttonHeight }]}>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Start here</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  containerPressed: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  titlePressed: {
    color: '#0ea5e9',
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  freeBadge: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  premiumBadge: {
    backgroundColor: '#f97316',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  freeBadgeText: {
    color: '#000',
  },
  premiumBadgeText: {
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 16,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    padding: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
});

export default Card;