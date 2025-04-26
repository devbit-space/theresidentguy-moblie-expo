import React from "react";
import { 
  Modal as RNModal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "../../../../components/icon";

const { width, height } = Dimensions.get("window");

const CompleteSessionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity 
                  onPress={onClose} 
                  style={styles.closeButton}
                >
                  <Icon icon="Close" />
                </TouchableOpacity>
                
                <View style={styles.headerContainer}>
                  <View style={styles.iconContainer}>
                    <Icon icon="Alert" />
                  </View>
                  <Text style={styles.title}>Complete Session</Text>
                </View>
                
                <Text style={styles.message}>
                  Are you sure you want to end this interview session?
                </Text>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    onPress={onClose} 
                    style={styles.cancelButton}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    onPress={onClose} 
                    style={styles.completeButton}
                  >
                    <Text style={styles.completeButtonText}>Complete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.95,
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContent: {
    padding: 24,
    paddingBottom: 16,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    marginTop: 4,
  },
  iconContainer: {
    backgroundColor: '#FEE2E2', // red-100
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  message: {
    fontSize: 18,
    color: '#6B7280', // gray-500
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#CBD5E1', // slate-300
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  completeButton: {
    backgroundColor: '#0EA5E9', // sky-500
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  completeButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CompleteSessionModal;
