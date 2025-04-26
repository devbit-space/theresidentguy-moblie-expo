import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CompareModal from './components/compare-modal';

interface LastStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const LastStep: React.FC<LastStepProps> = ({ onNext, onPrev }) => {
  const navigation = useNavigation();
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('essential');

  const handleNavigateToStart = () => {
    navigation.navigate('Started' as never);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onPrev}
      >
        <MaterialIcons name="arrow-back" size={20} color="#64748B" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.stepIndicator}>4/4</Text>
        <Text style={styles.title}>Last step</Text>
        <Text style={styles.subtitle}>
          Select subscription to use Interview Copilot™ in real time.
        </Text>
        
        <View style={styles.plansContainer}>
          {/* Essential Plan */}
          <TouchableOpacity 
            style={[
              styles.planCard, 
              selectedPlan === 'essential' && styles.selectedPlanCard
            ]}
            onPress={() => setSelectedPlan('essential')}
          >
            <View style={styles.planHeader}>
              <View style={styles.planRadioContainer}>
                <View style={styles.radioCircle}>
                  {selectedPlan === 'essential' && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Text style={styles.essentialPlanText}>Essential</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <Text style={styles.price}>148</Text>
              </View>
            </View>
            
            <View style={styles.planDetailsContainer}>
              <Text style={styles.planDescription}>
                AI copilot for 1-4 interviews per month. Experience the AI magic of Interview Copilot™.
              </Text>
              <View style={styles.billingInfo}>
                <Text style={styles.billingText}>Per Month</Text>
                <Text style={styles.billingText}>Billed Monthly</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          {/* Pro Plan */}
          <TouchableOpacity 
            style={[
              styles.planCard, 
              selectedPlan === 'pro' && styles.selectedPlanCard
            ]}
            onPress={() => setSelectedPlan('pro')}
          >
            <View style={styles.planHeader}>
              <View style={styles.planRadioContainer}>
                <View style={styles.radioCircle}>
                  {selectedPlan === 'pro' && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Text style={styles.proPlanText}>Pro</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <Text style={styles.price}>96</Text>
              </View>
            </View>
            
            <View style={styles.planDetailsContainer}>
              <Text style={styles.planDescription}>
                3-month copilot for unlimited interviews—full support to land your dream job.
              </Text>
              <View style={styles.billingInfo}>
                <Text style={styles.billingText}>Per Month</Text>
                <Text style={styles.billingText}>Billed Quarterly</Text>
              </View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.comparePlansButton}
            onPress={() => setShowCompareModal(true)}
          >
            <Text style={styles.comparePlansText}>Compare plans</Text>
            <MaterialIcons name="arrow-outward" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNavigateToStart}
        >
          <Text style={styles.nextButtonText}>Next Step</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip for 5 Minute Step</Text>
        </TouchableOpacity>
      </View>
      
      <CompareModal 
        visible={showCompareModal} 
        onClose={() => setShowCompareModal(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
  },
  contentContainer: {
    flex: 1,
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 8,
    marginTop: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    fontWeight: '500',
  },
  plansContainer: {
    marginTop: 16,
  },
  planCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  selectedPlanCard: {
    borderColor: '#0EA5E9',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planRadioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0EA5E9',
  },
  essentialPlanText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F97316',
    marginLeft: 12,
  },
  proPlanText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginLeft: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  planDetailsContainer: {
    flexDirection: 'row',
    paddingLeft: 28,
    justifyContent: 'space-between',
  },
  planDescription: {
    flex: 1,
    fontSize: 14,
    color: '#64748B',
    marginRight: 16,
  },
  billingInfo: {
    alignItems: 'flex-end',
    width: 96,
  },
  billingText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  comparePlansButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    padding: 8,
    borderRadius: 6,
    marginTop: 16,
  },
  comparePlansText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginRight: 4,
  },
  buttonsContainer: {
    marginTop: 24,
  },
  nextButton: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  skipButton: {
    padding: 8,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
});

export default LastStep;