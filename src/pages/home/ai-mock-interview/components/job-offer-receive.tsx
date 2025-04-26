import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  MockInterview: undefined;
};

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 1024;

const JobOfferReceive = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('MockInterview');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0090FF', '#00F7FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientCard}
      >
        <Image
          source={require('../../../../assets/image/icons/stars-5.svg')}
          style={styles.ratingImage}
          resizeMode="contain"
        />
        <Text style={styles.ratingText}>250K+ Job Offers Received</Text>
        
        <Text style={styles.headingText}>
          No More Interview Nerves or Missed Opportunities
        </Text>
        
        <Text style={styles.descriptionText}>
          Say goodbye to sweaty palms, blank stares, and "I should've said that"
          moments.{' '}With Theresidentguy, you get real practice, real feedback,
          and real confidence.{' '}Step into your next interview calm, clear, and
          ready to impress.
        </Text>
        
        {isLargeScreen ? (
          <TouchableOpacity 
            style={styles.buttonLarge}
            onPress={handlePress}
          >
            <Text style={styles.buttonText}>
              Start Building Interview Confidence Now
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.buttonSmall}
            onPress={handlePress}
          >
            <Text style={styles.buttonText}>Start Building</Text>
            <Text style={styles.buttonText}>Interview Confidence Now</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: isLargeScreen ? 200 : 100,
  },
  gradientCard: {
    width: '100%',
    maxWidth: 1200,
    height: isLargeScreen ? 400 : 592,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  ratingImage: {
    width: 145,
    height: 24,
  },
  ratingText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  headingText: {
    marginTop: 32,
    fontSize: isLargeScreen ? 48 : 32,
    lineHeight: isLargeScreen ? 48 : 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  descriptionText: {
    marginTop: 12,
    width: '100%',
    maxWidth: 1068,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  buttonLarge: {
    marginTop: 48,
    height: 56,
    width: 392,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSmall: {
    marginTop: 48,
    height: 80,
    width: 276,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827', // text-gray-900
  },
});

export default JobOfferReceive;