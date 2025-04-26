import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { essentialItems, proItems } from './compare-modal-data';

// List item component for feature comparison
const ListItem = ({ 
  icon, 
  title, 
  description, 
  available,
  isPro = false 
}: { 
  icon: string, 
  title: string, 
  description?: string,
  available: boolean,
  isPro?: boolean 
}) => {
  const iconColor = available 
    ? (isPro ? '#3B82F6' : '#10B981') // blue for pro, green for essential
    : '#CBD5E1'; // gray for unavailable

  return (
    <View style={styles.listItem}>
      <View style={styles.iconContainer}>
        {icon === "Check" ? (
          <MaterialIcons name="check-circle" size={20} color={iconColor} />
        ) : (
          <MaterialIcons name="cancel" size={20} color={iconColor} />
        )}
      </View>
      <View style={styles.listTextContainer}>
        <Text style={styles.listTitle}>{title}</Text>
        {description && <Text style={styles.listDescription}>{description}</Text>}
      </View>
    </View>
  );
};

interface CompareModalProps {
  visible: boolean;
  onClose: () => void;
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CompareModal: React.FC<CompareModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Compare Plans</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <ScrollView style={styles.scrollContent}>
            <View style={styles.plansContainer}>
              {/* Essential Plan */}
              <View style={styles.planCard}>
                <Text style={styles.planTitle}>Essential</Text>
                <Text style={styles.planDescription}>
                  AI copilot for 1-4 interviews per month. Experience the AI magic of Interview Copilot™.
                </Text>
                <View style={styles.pricingContainer}>
                  <View style={styles.priceRow}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <Text style={styles.price}>96</Text>
                  </View>
                  <View style={styles.billingInfo}>
                    <Text style={styles.billingText}>Per Month</Text>
                    <Text style={styles.billingText}>Billed Monthly</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.featuresList}>
                  {essentialItems.map((item, index) => (
                    <ListItem 
                      key={`essential-${index}`} 
                      icon={item.icon} 
                      title={item.title} 
                      description={item.description} 
                      available={item.available}
                    />
                  ))}
                </View>
              </View>

              {/* Pro Plan */}
              <View style={styles.planCard}>
                <Text style={styles.planTitle}>Pro</Text>
                <Text style={styles.planDescription}>
                  3-month copilot for unlimited interviews—full support to land your dream job.
                </Text>
                <View style={styles.pricingContainer}>
                  <View style={styles.priceRow}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <Text style={styles.price}>148</Text>
                  </View>
                  <View style={styles.billingInfo}>
                    <Text style={styles.billingText}>Per Month</Text>
                    <Text style={styles.billingText}>Billed Quarterly</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.featuresList}>
                  {proItems.map((item, index) => (
                    <ListItem 
                      key={`pro-${index}`} 
                      icon={item.icon} 
                      title={item.title} 
                      description={item.description} 
                      available={item.available}
                      isPro
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* Satisfaction Guarantee */}
            <View style={styles.guaranteeContainer}>
              <FontAwesome name="star" size={16} color="#64748B" />
              <Text style={styles.guaranteeText}>Satisfaction Guarantee</Text>
              <FontAwesome name="star" size={16} color="#64748B" />
            </View>
          </ScrollView>

          {/* Footer with action buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.upgradeButton]}>
              <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    maxWidth: 700,
    maxHeight: windowHeight * 0.9,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  scrollContent: {
    maxHeight: windowHeight * 0.7,
  },
  plansContainer: {
    flexDirection: windowWidth > 700 ? 'row' : 'column',
    padding: 16,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    maxWidth: 380,
    width: '100%',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currencySymbol: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginTop: 4,
  },
  price: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1E293B',
  },
  billingInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  billingText: {
    fontSize: 14,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  featuresList: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  listTextContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  listDescription: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  guaranteeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    marginVertical: 16,
  },
  guaranteeText: {
    fontSize: 14,
    color: '#1E293B',
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  upgradeButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default CompareModal;
