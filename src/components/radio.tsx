import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioProps {
  value: string;
  isChecked: boolean;
  onChangeRadio: (value: string) => void;
}

export const Radio = ({ isChecked, onChangeRadio, value }: RadioProps) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onChangeRadio(value)}
      activeOpacity={0.7}
    >
      <View style={styles.radioOuter}>
        <View style={[styles.radioInner, isChecked && styles.radioInnerChecked]} />
      </View>
      <Text style={styles.label}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#64748b', // slate-500
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  radioInnerChecked: {
    backgroundColor: '#64748b', // slate-500
  },
  label: {
    color: '#000000',
    fontWeight: '600',
  },
});