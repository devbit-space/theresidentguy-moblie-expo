import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const companies = [
    "3M Company",
    "A.P. Moller-Maersk Group",
    "ABB Ltd.",
    "ACC Limited",
    "Adani Enterprises"
]

const roles = [
    "Accountant",
    "Administrative Assistant",
    "Advertising Manager",
    "Architect",
    "Art Director",
];

interface InterviewRolePromptProps {
    onNext: () => void;
    onPrev: () => void;
}

const InterviewRolePrompt: React.FC<InterviewRolePromptProps> = ({ onNext, onPrev }) => {
    const [status, setStatus] = useState({
        company: "", 
        role: ""
    });
    
    const [isCompanyVisible, setIsCompanyVisible] = useState(false);
    const [isRoleVisible, setIsRoleVisible] = useState(false);
    
    const companyAnimation = useRef(new Animated.Value(0)).current;
    const roleAnimation = useRef(new Animated.Value(0)).current;
    
    const toggleCompanyDropdown = (visible: boolean) => {
        setIsCompanyVisible(visible);
        Animated.timing(companyAnimation, {
            toValue: visible ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    };
    
    const toggleRoleDropdown = (visible: boolean) => {
        setIsRoleVisible(visible);
        Animated.timing(roleAnimation, {
            toValue: visible ? 1 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    };
    
    const companyDropdownHeight = companyAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 240]
    });
    
    const roleDropdownHeight = roleAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 240]
    });
    
    const selectCompany = (company: string) => {
        setStatus({ ...status, company });
        toggleCompanyDropdown(false);
    };
    
    const selectRole = (role: string) => {
        setStatus({ ...status, role });
        toggleRoleDropdown(false);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={onPrev}
                >
                    <MaterialIcons name="arrow-back" size={20} color="#64748B" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                
                <View style={styles.contentContainer}>
                    <Text style={styles.stepIndicator}>1/4</Text>
                    <Text style={styles.title}>
                        Tell us about the role you're interviewing for
                    </Text>
                    
                    <View style={styles.formContainer}>
                        {/* Company Dropdown */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>
                                Your desired company
                            </Text>
                            <View style={styles.dropdownContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={status.company}
                                    onChangeText={(text) => setStatus({ ...status, company: text })}
                                    onFocus={() => toggleCompanyDropdown(true)}
                                    placeholder="Select or type a company"
                                />
                                <TouchableOpacity 
                                    style={styles.dropdownIcon}
                                    onPress={() => toggleCompanyDropdown(!isCompanyVisible)}
                                >
                                    <MaterialIcons 
                                        name="chevron-right" 
                                        size={20} 
                                        color="#64748B" 
                                        style={{ transform: [{ rotate: '270deg' }] }}
                                    />
                                </TouchableOpacity>
                                
                                <Animated.View style={[styles.dropdown, { maxHeight: companyDropdownHeight }]}>
                                    <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                                        <Text style={styles.dropdownHeader}>Suggestions</Text>
                                        {companies.map((company, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.dropdownItem}
                                                onPress={() => selectCompany(company)}
                                            >
                                                <Text style={styles.dropdownItemText}>{company}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </Animated.View>
                            </View>
                        </View>
                        
                        {/* Role Dropdown */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>
                                Your desired role
                            </Text>
                            <View style={styles.dropdownContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={status.role}
                                    onChangeText={(text) => setStatus({ ...status, role: text })}
                                    onFocus={() => toggleRoleDropdown(true)}
                                    placeholder="Select or type a role"
                                />
                                <TouchableOpacity 
                                    style={styles.dropdownIcon}
                                    onPress={() => toggleRoleDropdown(!isRoleVisible)}
                                >
                                    <MaterialIcons 
                                        name="chevron-right" 
                                        size={20} 
                                        color="#64748B" 
                                        style={{ transform: [{ rotate: '270deg' }] }}
                                    />
                                </TouchableOpacity>
                                
                                <Animated.View style={[styles.dropdown, { maxHeight: roleDropdownHeight }]}>
                                    <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                                        <Text style={styles.dropdownHeader}>Suggestions</Text>
                                        {roles.map((role, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.dropdownItem}
                                                onPress={() => selectRole(role)}
                                            >
                                                <Text style={styles.dropdownItemText}>{role}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </Animated.View>
                            </View>
                        </View>
                    </View>
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
            </View>
        </TouchableWithoutFeedback>
    );
};

const { width } = Dimensions.get('window');

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
        marginBottom: 16,
        lineHeight: 32,
    },
    formContainer: {
        marginTop: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0F172A',
        marginBottom: 8,
    },
    dropdownContainer: {
        position: 'relative',
        zIndex: 1,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        width: '100%',
    },
    dropdownIcon: {
        position: 'absolute',
        right: 12,
        top: '50%',
        marginTop: -10,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 2,
        overflow: 'hidden',
    },
    dropdownHeader: {
        padding: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
        backgroundColor: '#F8FAFC',
    },
    dropdownItem: {
        padding: 12,
        marginHorizontal: 4,
        borderRadius: 8,
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#0F172A',
    },
    buttonsContainer: {
        marginTop: 'auto',
    },
    nextButton: {
        backgroundColor: '#0F172A',
        borderRadius: 8,
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
        padding: 12,
        alignItems: 'center',
    },
    skipButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94A3B8',
    },
});

export default InterviewRolePrompt;