import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Dimensions, Platform } from "react-native";
import { BlurView } from 'expo-blur';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { timezones } from "./data.d";
import { meetingId } from "../../../context/helper";
import { useGlobalContext } from "../../../context";
import Icon from "../../../components/icon";

type DropdownStatus = {
  resume: { value: string; data: string[]; prefix: string };
  role: { value: string; data: string[]; prefix: string };
  domain: { value: string; data: string[] };
  interviewType: { value: string; data: string[] };
};

// Custom Select component for React Native
const Select = ({ 
  value, 
  data, 
  onHandle, 
  showDropdown, 
  onDropdown, 
  obk, 
  optionPrefix 
}: { 
  value: string; 
  data: string[]; 
  onHandle: (v: string, obk: keyof DropdownStatus) => void; 
  showDropdown: boolean; 
  onDropdown: () => void; 
  obk: keyof DropdownStatus; 
  optionPrefix?: string 
}) => {
  return (
    <View style={styles.selectContainer}>
      <TouchableOpacity style={styles.selectButton} onPress={onDropdown}>
        <Text style={styles.selectText}>
          {value || optionPrefix || 'Select an option'}
        </Text>
        <Icon icon="ChevronDown1" />
      </TouchableOpacity>
      
      {showDropdown && (
        <View style={styles.dropdown}>
          <ScrollView style={styles.dropdownScroll}>
            {data.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.dropdownItem}
                onPress={() => onHandle(item, obk)}
              >
                <View style={styles.checkIconContainer}>
                  {value === item && <Icon icon="Check" />}
                </View>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

// Define navigation type
type RootStackParamList = {
  Home: undefined;
  InterviewRoom: { callId: string };
  Role: undefined;
  Subscription: undefined;
};

const InterviewModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {
  const [state] = useGlobalContext();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [status, setStatus] = useState<DropdownStatus>({
    resume: {
      value: "",
      data: ["resume1.doc", "resume2.doc"],
      prefix: "Select your resume",
    },
    role: {
      value: "",
      data: ["Doctor"],
      prefix: "Select your role",
    },
    domain: {
      value: "General",
      data: ["General"],
    },
    interviewType: {
      value: "General",
      data: ["General", "Phone Interview"],
    },
  });

  const [showResumeDropdown, setShowResumeDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [showInterviewTypeDropdown, setShowInterviewTypeDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showTimeZoneDropdown, setShowTimeZoneDropdown] = useState(false);

  const [tabIdx, setTabIdx] = useState(0);
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
    timezone: "UTC+00:00 Europe/London"
  });

  const [smallOpen, setSmallOpen] = useState(false);

  const onHandle = (v: string, obk: keyof DropdownStatus) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [obk]: { ...prevStatus[obk], value: v },
    }));

    // Close the dropdown that was just interacted with
    if (obk === "resume") setShowResumeDropdown(false);
    if (obk === "role") setShowRoleDropdown(false);
    if (obk === "domain") setShowDomainDropdown(false);
    if (obk === "interviewType") setShowInterviewTypeDropdown(false);
  };

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2).toString().padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  });

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
        copyToCacheDirectory: false
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setStatus({ 
          ...status, 
          resume: { ...status.resume, value: file.name } 
        });
      }
    } catch (error) {
      console.log('Error picking document', error);
    }
  };

  const onLaunch = () => {
    if (state.isLeaveInterview?.status) {
      return;
    }

    onClose();
    // const generatedCallId = meetingId(12); // Generate a meeting ID
    const generatedCallId = () => Math.random().toString(36).substring(2, 10);
    navigation.navigate('MockRoom', { callId: generatedCallId() });
  };

  const onChangeDatePicker = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      setDateTime({
        ...dateTime,
        date: selectedDate.toLocaleDateString()
      });
    }
  };

  const renderTimeItem = (time: string, index: number) => (
    <TouchableOpacity 
      key={index} 
      style={styles.timeItem}
      onPress={() => {
        setDateTime({ ...dateTime, time });
        setShowTimeDropdown(false);
      }}
    >
      <View style={styles.checkIconContainer}>
        {dateTime.time === time && <Icon icon="Check" />}
      </View>
      <Text>{time}</Text>
    </TouchableOpacity>
  );

  // Render a timezone item
  const renderTimezoneItem = (timezone: { value: string, label: string }, index: number) => (
    <TouchableOpacity 
      key={index} 
      style={styles.timezoneItem}
      onPress={() => {
        setDateTime({ ...dateTime, timezone: timezone.label });
        setShowTimeZoneDropdown(false);
      }}
    >
      <View style={styles.checkIconContainer}>
        {dateTime.timezone === timezone.label && <Icon icon="Check" />}
      </View>
      <Text>{timezone.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={70} style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Start Your Next Interview</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon icon="Close" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.scrollContainer}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Resume{" "}
                  <Text style={styles.optionalTag}>Optional</Text>
                </Text>
                <TouchableOpacity onPress={pickDocument}>
                  <Icon icon="Upload" />
                  {/* <Text style={[styles.uploadBtn, styles.upgradeLink]}>Upload</Text> */}
                </TouchableOpacity>
              </View>
              
              <Select
                value={status.resume.value}
                data={status.resume.data}
                onHandle={onHandle}
                showDropdown={showResumeDropdown}
                onDropdown={() => setShowResumeDropdown(true)}
                obk="resume"
                optionPrefix={status.resume.prefix}
              />
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Role{" "}
                  <Text style={styles.optionalTag}>Optional</Text>
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Role')}>
                  <Icon icon="ArrowUpRight" />
                </TouchableOpacity>
              </View>
              
              <Select
                value={status.role.value}
                data={status.role.data}
                onHandle={onHandle}
                showDropdown={showRoleDropdown}
                onDropdown={() => setShowRoleDropdown(true)}
                obk="role"
                optionPrefix={status.role.prefix}
              />
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Select Knowledge Domain(Specialization){" "}
                  <Text style={styles.optionalTag}>Optional</Text>
                </Text>
              </View>
              
              <Select
                value={status.domain.value}
                data={status.domain.data}
                onHandle={onHandle}
                showDropdown={showDomainDropdown}
                onDropdown={() => setShowDomainDropdown(true)}
                obk="domain"
              />
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Interview Type{" "}
                  <Text style={styles.optionalTag}>Optional</Text>
                </Text>
                <View style={styles.upgradeNowContainer}>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('Subscription')}
                  >
                    <Icon icon="ArrowUpRight" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <Select
                value={status.interviewType.value}
                data={status.interviewType.data}
                onHandle={onHandle}
                showDropdown={showInterviewTypeDropdown}
                onDropdown={() => setShowInterviewTypeDropdown(true)}
                obk="interviewType"
              />
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Schedule your interview</Text>
              </View>
              
              <View style={styles.tabContainer}>
                <TouchableOpacity 
                  style={[styles.tabButton, tabIdx === 0 ? styles.activeTab : null]}
                  onPress={() => setTabIdx(0)}
                >
                  <Text style={[styles.tabText, tabIdx === 0 ? styles.activeTabText : null]}>Immediately</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.tabButton, tabIdx === 1 ? styles.activeTab : null]}
                  onPress={() => {
                    setTabIdx(1)
                    setSmallOpen(true)
                  }}
                >
                  <Text style={[styles.tabText, tabIdx === 1 ? styles.activeTabText : null]}>Set Date and Time</Text>
                </TouchableOpacity>
              </View>

              {/* {tabIdx === 1 && ( */}
                <Modal
                  visible={smallOpen}
                  transparent={true}
                  animationType="fade"
                  onRequestClose={onClose}
                >
                  <BlurView intensity={70} style={styles.container}>            
                    <View style={styles.scheduleContainer}>
                      <Text style={styles.scheduleSectionTitle}>When</Text>
                      
                      <View style={styles.dateTimeContainer}>
                        {/* Date Picker */}
                        <TouchableOpacity 
                          style={styles.datePickerButton}
                          onPress={() => setShowDatePicker(true)}
                        >
                          <Text style={styles.datePickerText}>
                            {startDate ? startDate.toLocaleDateString() : "Pick a date"}
                          </Text>
                          <Icon icon="Calandar" />
                        </TouchableOpacity>
                        
                        {showDatePicker && (
                          <DateTimePicker
                            value={startDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={onChangeDatePicker}
                            minimumDate={new Date()}
                          />
                        )}
                        
                        {/* Time Selection */}
                        <TouchableOpacity 
                          style={styles.timePickerButton}
                          onPress={() => setShowTimeDropdown(!showTimeDropdown)}
                        >
                          <Text style={styles.timePickerText}>
                            {dateTime.time || "Select your time"}
                          </Text>
                          {/* <Icon icon="ChevronDown" /> */}
                        </TouchableOpacity>
                        
                        {showTimeDropdown && (
                          <View style={styles.timeDropdown}>
                            <ScrollView style={styles.timeDropdownScroll}>
                              {timeOptions.map((time, index) => renderTimeItem(time, index))}
                            </ScrollView>
                          </View>
                        )}
                      </View>
                      
                      {/* Timezone Selection */}
                      <Text style={styles.timezoneTitle}>Time Zone</Text>
                      <TouchableOpacity 
                        style={styles.timezoneButton}
                        onPress={() => setShowTimeZoneDropdown(!showTimeZoneDropdown)}
                      >
                        <Text style={styles.timezoneText}>{dateTime.timezone}</Text>
                        {/* <Icon icon="ChevronDown" /> */}
                      </TouchableOpacity>
                      
                      {showTimeZoneDropdown && (
                        <View style={styles.timezoneDropdown}>
                          <ScrollView style={styles.timezoneDropdownScroll}>
                            {timezones.map((timezone, index) => renderTimezoneItem(timezone, index))}
                          </ScrollView>
                        </View>
                      )}
                      
                      <TouchableOpacity style={styles.cancelButton} onPress={() => setSmallOpen(false)}>
                        <Text style={styles.cancelButtonText}>SET</Text>
                      </TouchableOpacity>
                    </View>
                  </BlurView>
                </Modal>
              {/* )} */}
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.launchButton,
                state.isLeaveInterview?.status ? styles.disabledButton : null
              ]} 
              onPress={onLaunch}
              disabled={state.isLeaveInterview?.status}
            >
              <Text style={styles.launchButtonText}>Launch</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.95,
    maxHeight: height * 0.95,
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 2,
  },
  scrollContainer: {
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  optionalTag: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: 'normal',
  },
  selectContainer: {
    marginBottom: 4,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  selectText: {
    color: '#000',
    fontSize: 14,
  },
  dropdown: {
    position: 'absolute',
    top: 46,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    zIndex: 10,
    maxHeight: 200,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  checkIconContainer: {
    width: 24,
    marginRight: 8,
  },
  upgradeNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeLink: {
    fontSize: 13,
    color: '#0ea5e9',
    // marginRight: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0f2fe',
    borderRadius: 6,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  launchButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  launchButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  uploadBtn : {
    paddingHorizontal: 3, 
  },
  scheduleContainer: {
    width: width * 0.8,
    maxHeight: height * 0.95,
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  scheduleSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  dateTimeContainer: {
    marginBottom: 16,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    marginBottom: 8,
  },
  datePickerText: {
    color: '#64748b',
  },
  timePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
  },
  timePickerText: {
    color: '#64748b',
  },
  timeDropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    marginTop: 8,
    zIndex: 2,
  },
  timeDropdownScroll: {
    maxHeight: 200,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  timezoneTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  timezoneButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
  },
  timezoneText: {
    color: '#64748b',
  },
  timezoneDropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    marginTop: 8,
    zIndex: 2,
  },
  timezoneDropdownScroll: {
    maxHeight: 350,
  },
  timezoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
});

export default InterviewModal;
