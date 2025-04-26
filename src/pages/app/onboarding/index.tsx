import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InterviewHelper from './interview-helper';
import InterviewRolePrompt from './interview-role-prompt';
import RealtimeResponseCustomizer from './realtime-response-customizer';
import LaunchChecklist from './launch-checklist';
import LastStep from './last-step';

const Onboarding = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const navigation = useNavigation();

  const onNext = () => setStepIndex(stepIndex + 1);
  const onPrev = () => setStepIndex(stepIndex - 1);
  
  const navigateToApp = () => {
    // navigation.navigate('Started' as never);
    navigation.navigate('Home' as never);
  };

  const renderCurrentStep = () => {
    switch (stepIndex) {
      case 0:
        return <InterviewHelper onNext={onNext} />;
      case 1:
        return <InterviewRolePrompt onNext={onNext} onPrev={onPrev} />;
      case 2:
        return <RealtimeResponseCustomizer onNext={onNext} onPrev={onPrev} />;
      case 3:
        return <LaunchChecklist onNext={onNext} onPrev={onPrev} />;
      case 4:
        return <LastStep onNext={onNext} onPrev={onPrev} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.navigate('Home' as never)}>
          <Text style={styles.logoText}>Theresidentguy</Text>
          <Image 
            source={require('../../../assets/image/icons/logo.png')} 
            style={styles.logoImage} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={navigateToApp}
        >
          <Text style={styles.skipButtonText}>Skip to app</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderCurrentStep()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0EA5E9',
  },
  logoImage: {
    width: 25,
    height: 25,
  },
  skipButton: {
    padding: 10,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxWidth: 500,
    alignSelf: 'center',
    width: '100%',
  },
});

export default Onboarding;