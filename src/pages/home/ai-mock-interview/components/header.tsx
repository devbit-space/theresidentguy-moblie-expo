import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  MockInterview: undefined;
};

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 1024;

const Header = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          Land Your Dream Job with 100% Confidence
        </Text>
        <Text style={styles.subheading}>
          Every day, 500 candidates level up with us. Join them, crush your nerves,
          and become interview-ready.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MockInterview')}
        >
          <Text style={styles.buttonText}>Start Now for Free</Text>
        </TouchableOpacity>
      </View>
      
      <Image
        source={{ uri: "https://www.finalroundai.com/_next/image?url=%2Fassets%2Fimages%2Fnew-ai-mock%2Fmock-intro-pic.png&w=750&q=75" }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1200,
    flexDirection: isLargeScreen ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: isLargeScreen ? 'space-between' : 'center',
    paddingHorizontal: 16,
    paddingTop: isLargeScreen ? 30 : 20,
    alignSelf: 'center',
  },
  textContainer: {
    maxWidth: 476,
    flexDirection: 'column',
    alignItems: isLargeScreen ? 'flex-start' : 'center',
  },
  heading: {
    fontSize: isLargeScreen ? 36 : 32,
    fontWeight: '400',
    lineHeight: 45,
    textAlign: isLargeScreen ? 'left' : 'center',
  },
  subheading: {
    marginTop: 24,
    width: '100%',
    maxWidth: 423,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: isLargeScreen ? 'left' : 'center',
    color: '#333333',
  },
  button: {
    marginTop: 48,
    height: 56,
    width: 251,
    borderRadius: 8,
    backgroundColor: '#0EA5E9', // sky-500
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  image: {
    marginTop: isLargeScreen ? 0 : 48,
    width: width > 732 ? 732 : width - 32,
    height: 450,
    borderRadius: 16,
  },
});

export default Header;