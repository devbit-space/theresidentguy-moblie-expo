import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from "react-native";
import Modal from "react-native-modal";

import Icon from "../icon";
import Profile from "./profile";
import Security from "./security";

type ManageAccountModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const { width, height } = Dimensions.get("window");

const ManageAccountModal = ({ isVisible, onClose }: ManageAccountModalProps) => {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.7}
      backdropTransitionOutTiming={0}
      useNativeDriverForBackdrop
      style={styles.modal}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Icon icon="Close" />
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Sidebar on medium and large screens */}
          {width >= 768 && (
            <View style={styles.sidebar}>
              <View style={styles.sidebarContent}>
                <Text style={styles.sidebarTitle}>Account</Text>
                <Text style={styles.sidebarSubtitle}>Manage Your account info.</Text>
                
                <TouchableOpacity 
                  onPress={() => setTabIdx(0)} 
                  style={[
                    styles.tabButton,
                    tabIdx === 0 && styles.activeTabButton
                  ]}
                >
                  <View style={styles.iconContainer}>
                    <Icon icon="ProfileUser" />
                  </View>
                  <Text 
                    style={[
                      styles.tabText,
                      tabIdx === 0 && styles.activeTabText
                    ]}
                  >
                    Profile
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => setTabIdx(1)} 
                  style={[
                    styles.tabButton,
                    tabIdx === 1 && styles.activeTabButton
                  ]}
                >
                  <View style={styles.iconContainer}>
                    <Icon icon="Security" />
                  </View>
                  <Text 
                    style={[
                      styles.tabText,
                      tabIdx === 1 && styles.activeTabText
                    ]}
                  >
                    Security
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Tab content */}
          <View style={styles.tabContent}>
            {tabIdx === 0 ? <Profile /> : <Security />}
          </View>

          {/* Tab bar for small screens */}
          {width < 768 && (
            <View style={styles.mobileTabBar}>
              <TouchableOpacity 
                style={[
                  styles.mobileTabButton,
                  tabIdx === 0 && styles.activeMobileTabButton
                ]}
                onPress={() => setTabIdx(0)}
              >
                <View style={styles.mobileIconContainer}>
                  <Icon icon="ProfileUser" />
                </View>
                <Text 
                  style={[
                    styles.mobileTabText,
                    tabIdx === 0 && styles.activeMobileTabText
                  ]}
                >
                  Profile
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.mobileTabButton,
                  tabIdx === 1 && styles.activeMobileTabButton
                ]}
                onPress={() => setTabIdx(1)}
              >
                <View style={styles.mobileIconContainer}>
                  <Icon icon="Security" />
                </View>
                <Text 
                  style={[
                    styles.mobileTabText,
                    tabIdx === 1 && styles.activeMobileTabText
                  ]}
                >
                  Security
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: width > 500 ? '85%' : '95%',
    maxWidth: 900,
    height: height * 0.8,
    maxHeight: 700,
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
  content: {
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 8 : 8,
    right: Platform.OS === 'ios' ? 8 : 8,
    zIndex: 10,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
  },
  sidebar: {
    width: width >= 768 ? '33%' : 0,
    backgroundColor: '#F0F9FF', // bg-sky-50
    paddingTop: 32,
    paddingHorizontal: 12,
  },
  sidebarContent: {
    height: '100%',
  },
  sidebarTitle: {
    fontSize: 24,
    paddingHorizontal: 12,
  },
  sidebarSubtitle: {
    fontSize: 16,
    color: '#64748B', // text-slate-500
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#E2E8F0', // bg-slate-200
  },
  iconContainer: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#94A3B8', // text-slate-400
  },
  activeTabText: {
    color: '#0EA5E9', // text-sky-500
  },
  tabContent: {
    flex: 1,
  },
  // Mobile tab bar styles
  mobileTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  mobileTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeMobileTabButton: {
    borderTopWidth: 2,
    borderTopColor: '#0EA5E9', // border-sky-500
  },
  mobileIconContainer: {
    width: 24,
    height: 24,
  },
  mobileTabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#94A3B8', // text-slate-400
  },
  activeMobileTabText: {
    color: '#0EA5E9', // text-sky-500
  },
});

export default ManageAccountModal; 