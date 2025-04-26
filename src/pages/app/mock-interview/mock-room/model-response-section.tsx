import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ModelResponseSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.responseColumn}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.timestamp}>00:00</Text>
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>
                Welcome to your mock interview! Let's get started and focus on showcasing your strengths and skills.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '75%',
    gap: 20,
  },
  responseColumn: {
    flex: 1,
    minWidth: 400,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9', // border-slate-100
    padding: 24,
    height: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  timestamp: {
    fontSize: 14,
    color: '#64748B', // text-slate-600
  },
  messageBubble: {
    backgroundColor: '#ECFEFF', // bg-cyan-100
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  messageText: {
    color: '#155E75', // text-cyan-800
    fontSize: 16,
    fontWeight: '600',
  }
});

export default ModelResponseSection;
