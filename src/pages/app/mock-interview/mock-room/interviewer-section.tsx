import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface InterviewerSectionProps {
  isCameraOn: boolean;
}

const InterviewerSection = ({ isCameraOn }: InterviewerSectionProps) => {
  const avatarVideo = require('../../../../assets/video/avatar.mp4');

  return (
    <View style={styles.container}>
      <View style={styles.mainVideoContainer}>
        {/* Main avatar video */}
        <Video
          source={ avatarVideo }
          style={styles.video}
          shouldPlay
          isLooping
          resizeMode={ResizeMode.COVER}
          isMuted
        />

        {/* Camera placeholder - in a real app, use expo-camera after proper setup */}
        {isCameraOn && (
          <View style={styles.cameraContainer}>
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.cameraText}>Camera Preview</Text>
              <Text style={styles.cameraSubtext}>
                Camera is ON
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 150,
    width: '25%',
    height: '100%',
  },
  mainVideoContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E293B', // bg-slate-900
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 12,
    right: 8,
    width: '40%',
    aspectRatio: 4/3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cameraPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  cameraText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  cameraSubtext: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  }
});

export default InterviewerSection;
