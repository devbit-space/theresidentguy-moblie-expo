import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CompareItem as CompareItemType } from './compare-modal-data';

interface CompareItemProps {
  item: CompareItemType;
  isPro?: boolean;
}

// Define type for MaterialIcons name properties
type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

/**
 * A component that renders a single comparison item with an icon and description
 */
const CompareItem: React.FC<CompareItemProps> = ({ item, isPro = false }) => {
  const getIconName = (): MaterialIconName => {
    if (item.icon === 'Check') return 'check-circle';
    if (item.icon === 'Cancel') return 'cancel';
    if (item.icon === 'Info') return 'info';
    if (item.icon === 'Warning') return 'warning';
    return 'help-outline';
  };

  const getIconColor = (): string => {
    if (!item.available) return '#CBD5E1'; // gray for unavailable items
    return isPro ? '#3B82F6' : '#10B981'; // blue for pro, green for essential
  };

  return (
    <View style={styles.container}>
      <MaterialIcons 
        name={getIconName()} 
        size={20} 
        color={getIconColor()} 
        style={styles.icon} 
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#64748B',
  },
});

export default CompareItem; 