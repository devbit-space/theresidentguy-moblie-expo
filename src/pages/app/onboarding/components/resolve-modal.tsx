import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ResolveModalProps {
  visible: boolean;
  onClose: () => void;
  selectedStatus: string;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ResolveModal: React.FC<ResolveModalProps> = ({ visible, onClose, selectedStatus }) => {
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
          <Text style={styles.title}>Resolve the Permission Issue</Text>
          
          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.description}>
              If you previously declined permission and the window doesn't appear, follow these steps:
            </Text>
            <Text style={styles.instruction}>
              1. Click on the icon on the left side of the URL bar to open site permission settings.
            </Text>
            <Image
              source={{ uri: '/image/app/onboarding-permission-guide-setting-btn.png' }}
              style={styles.fullWidthImage}
              resizeMode="contain"
            />
            <Text style={styles.instruction}>
              2. Toggle the notifications setting to "Allow".
            </Text>
            <Image
              source={{ uri: `/image/app/onboarding-permission-guide-${selectedStatus}.png` }}
              style={styles.smallImage}
              resizeMode="contain"
            />
          </View>
          
          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.fixButton} onPress={onClose}>
              <Text style={styles.fixButtonText}>Fix now</Text>
            </TouchableOpacity>
          </View>
          
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#64748B" />
          </TouchableOpacity>
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
    width: '90%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    position: 'relative',
    maxHeight: windowHeight * 0.8,
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'left',
  },
  content: {
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
    fontWeight: '500',
  },
  instruction: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  fullWidthImage: {
    width: '100%',
    height: 100,
    marginBottom: 16,
  },
  smallImage: {
    width: 192,
    height: 150,
    marginTop: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fixButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  fixButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
});

export default ResolveModal;