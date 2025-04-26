import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Animated } from "react-native";

interface HamburgerProps {
  onHandle?: (isOpen: boolean) => void;
  initialState?: boolean;
}

const Hamburger = ({ onHandle, initialState = false }: HamburgerProps) => {
  const [isOpenedMenu, setOpenedMenu] = useState(initialState);
  
  // Animations for hamburger lines
  const firstLineWidth = useRef(new Animated.Value(initialState ? 0 : 24)).current;
  const secondLineWidth = useRef(new Animated.Value(initialState ? 0 : 24)).current;
  const thirdLineWidth = useRef(new Animated.Value(initialState ? 0 : 24)).current;
  const crossHeight = useRef(new Animated.Value(initialState ? 20 : 0)).current;
  const crossWidth = useRef(new Animated.Value(initialState ? 20 : 0)).current;

  const onMenu = () => {
    const newState = !isOpenedMenu;
    setOpenedMenu(newState);
    onHandle && onHandle(newState);
  };

  useEffect(() => {
    if (isOpenedMenu) {
      // Animate to X
      Animated.sequence([
        Animated.parallel([
          Animated.timing(firstLineWidth, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(secondLineWidth, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(thirdLineWidth, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]),
        Animated.parallel([
          Animated.timing(crossHeight, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(crossWidth, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    } else {
      // Animate to hamburger
      Animated.sequence([
        Animated.parallel([
          Animated.timing(crossHeight, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(crossWidth, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]),
        Animated.parallel([
          Animated.timing(firstLineWidth, {
            toValue: 24,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(secondLineWidth, {
            toValue: 24,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(thirdLineWidth, {
            toValue: 24,
            duration: 200,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    }
  }, [isOpenedMenu]);

  return (
    <TouchableOpacity
      onPress={onMenu}
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        <View style={styles.hamburgerLines}>
          <Animated.View style={[styles.line, { width: firstLineWidth }]} />
          <Animated.View style={[styles.line, { width: secondLineWidth }]} />
          <Animated.View style={[styles.line, { width: thirdLineWidth }]} />
        </View>
        <View style={styles.crossContainer}>
          <Animated.View style={[styles.crossLine, { height: crossHeight }]} />
          <Animated.View style={[styles.crossLine, styles.crossLineHorizontal, { width: crossWidth }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  menuIconContainer: {
    position: "relative",
    height: 22,
    width: 22,
  },
  hamburgerLines: {
    position: "absolute",
    paddingHorizontal: 2.5,
    right: 0,
    height: "100%",
    width: "100%",
  },
  line: {
    marginVertical: 4,
    height: 2,
    backgroundColor: "black",
    borderRadius: 2,
  },
  crossContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: "100%",
    transform: [{ rotate: "45deg" }],
  },
  crossLine: {
    position: "absolute",
    backgroundColor: "black",
    borderRadius: 2,
    width: 2,
    left: 10,
  },
  crossLineHorizontal: {
    height: 2,
    width: 0,
    top: 10,
    left: 0,
  },
});

export default Hamburger;