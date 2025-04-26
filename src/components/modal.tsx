import { View, Modal as RNModal, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  visible: boolean;
  onRequestClose?: () => void;
}

const Modal = ({ children, visible, onRequestClose }: ModalProps) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOverlay}>
        {children}
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Modal;
  