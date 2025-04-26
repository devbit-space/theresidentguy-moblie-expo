import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Loading = ({ children }: { children: React.ReactNode }) => {
  // Animation values
  const rotation1 = useRef(new Animated.Value(0)).current;
  const rotation2 = useRef(new Animated.Value(0)).current;
  const hueRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotation animation for the faces
    const createRotationAnimation = (value: Animated.Value, direction: 'normal' | 'reverse') => {
      return Animated.loop(
        Animated.timing(value, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
    };

    // Hue rotation animation for the text
    const hueRotationAnimation = Animated.loop(
      Animated.timing(hueRotation, {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );

    const anim1 = createRotationAnimation(rotation1, 'normal');
    const anim2 = createRotationAnimation(rotation2, 'reverse');

    anim1.start();
    anim2.start();
    hueRotationAnimation.start();

    return () => {
      anim1.stop();
      anim2.stop();
      hueRotationAnimation.stop();
    };
  }, []);

  // Interpolate rotation values
  const spin1 = rotation1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spin2 = rotation2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  // Interpolate hue rotation
  const hueRotate = hueRotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '360deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <View style={styles.loader}>
          <Animated.View 
            style={[
              styles.face, 
              styles.face1,
              { transform: [{ rotate: spin1 }] }
            ]}
          >
            <View style={styles.circleContainer}>
              <View style={[styles.circle, styles.circle1]} />
            </View>
          </Animated.View>
          <Animated.View 
            style={[
              styles.face, 
              styles.face2,
              { transform: [{ rotate: spin2 }] }
            ]}
          >
            <View style={styles.circleContainer}>
              <View style={[styles.circle, styles.circle2]} />
            </View>
          </Animated.View>
        </View>
      </View>
      <Animated.View style={{ transform: [{ rotate: hueRotate }] }}>
        <LinearGradient
          colors={['#2d60ec', '#3ccfda']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientText}
        >
          <Text style={styles.text}>{children}</Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    marginRight: 20,
  },
  loader: {
    width: 60,
    height: 60,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    position: 'absolute',
    borderRadius: 50,
    borderWidth: 2,
  },
  face1: {
    width: '100%',
    height: '100%',
    borderColor: 'gold',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  face2: {
    width: '70%',
    height: '70%',
    borderColor: 'lime',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
  },
  circleContainer: {
    position: 'absolute',
    width: '50%',
    height: 1,
    top: '50%',
    left: '50%',
    backgroundColor: 'transparent',
  },
  circle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    top: -5,
    right: -5,
  },
  circle1: {
    backgroundColor: 'gold',
    shadowColor: 'gold',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  circle2: {
    backgroundColor: 'lime',
    shadowColor: 'lime',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  gradientText: {
    padding: 5,
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'transparent',
  },
});

export default Loading;