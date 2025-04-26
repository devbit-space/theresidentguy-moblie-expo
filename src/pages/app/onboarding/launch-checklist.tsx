import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ResolveModal from './components/resolve-modal';

type SettingsKeys = 'microphone' | 'camera' | 'notification' | 'compatibility';

type Settings = {
  [key: string]: boolean;
};

interface LaunchChecklistProps {
  onNext: () => void;
  onPrev: () => void;
}

const LaunchChecklist: React.FC<LaunchChecklistProps> = ({ onNext, onPrev }) => {
  const [status, setStatus] = useState<Settings>({
    microphone: false,
    camera: false,
    notification: false,
    compatibility: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const onResolve = (key: string) => {
    if (status[key] === false) {
      setStatus({ ...status, [key]: true });
    } else {
      setSelectedStatus(key);
      setShowModal(true);
    }
  };

  const onCloseModal = () => {
    setSelectedStatus("");
    setShowModal(false);
  };

  // Function to render the appropriate icon based on the key
  const renderIcon = (key: string) => {
    switch (key) {
      case 'microphone':
        return <MaterialIcons name="mic" size={24} color="#64748B" style={styles.icon} />;
      case 'camera':
        return <MaterialIcons name="videocam" size={24} color="#64748B" style={styles.icon} />;
      case 'notification':
        return <MaterialIcons name="notifications" size={24} color="#64748B" style={styles.icon} />;
      case 'compatibility':
        return <MaterialCommunityIcons name="check-circle-outline" size={24} color="#64748B" style={styles.icon} />;
      default:
        return null;
    }
  };

  // Array of items to render to avoid repetition
  const checklistItems = [
    { key: 'microphone', title: 'Microphone Permission' },
    { key: 'camera', title: 'Camera Permission' },
    { key: 'notification', title: 'Browser Notifications' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onPrev}
      >
        <MaterialIcons name="arrow-back" size={20} color="#64748B" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <Text style={styles.stepIndicator}>3/4</Text>
        <Text style={styles.title}>
          Launch Checklist
        </Text>
        <Text style={styles.subtitle}>
          Obtain the necessary permissions for the interview in advance to ensure a
          smooth process.
        </Text>
        
        <ScrollView style={styles.checklistContainer}>
          {checklistItems.map((item) => (
            <View key={item.key} style={styles.checklistItem}>
              <View style={styles.itemTitleContainer}>
                {renderIcon(item.key)}
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              
              <View style={styles.itemActionContainer}>
                {status[item.key] && (
                  <Text style={styles.blockedText}>Blocked</Text>
                )}
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => onResolve(item.key)}
                >
                  <Text style={styles.actionButtonText}>
                    {!status[item.key] ? "Request" : "Resolve"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          {/* Compatibility item (always checked) */}
          <View style={styles.checklistItem}>
            <View style={styles.itemTitleContainer}>
              {renderIcon('compatibility')}
              <Text style={styles.itemTitle}>Browser Compatibility</Text>
            </View>
            <View>
              <MaterialIcons name="check-circle" size={24} color="#10B981" />
            </View>
          </View>
        </ScrollView>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={onNext}
        >
          <Text style={styles.nextButtonText}>Next Step</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip This Step</Text>
        </TouchableOpacity>
      </View>
      
      <ResolveModal 
        visible={showModal} 
        onClose={onCloseModal} 
        selectedStatus={selectedStatus} 
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
    marginVertical: 36,
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 8,
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
  checklistContainer: {
    marginTop: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  itemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
  },
  itemActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F97316',
    marginRight: 12,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  buttonsContainer: {
    marginTop: 'auto',
    marginBottom: Platform.OS === 'ios' ? 16 : 0,
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

export default LaunchChecklist;