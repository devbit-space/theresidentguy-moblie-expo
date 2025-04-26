import React, { useState, useRef, useEffect } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

// Define navigation type
type RootStackParamList = {
    LiveInterview: undefined;
    PermissionSetting: undefined;
    Subscription: undefined;
};

// Import existing components
import Layout from "../components/layout";
import InterviewModal from "../components/interview-modal";
import { Select } from "../../../components/select";
import { w } from "../../../theme/services";
import { Path } from "react-native-svg";
import Svg from "react-native-svg";

// Custom Icon component
const Icon = ({ icon, size = 24, color = "#000" }) => {
    switch (icon) {
        case "LiveInterview":
            return (
            <Svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
            >
                <Path
                    d="M9.16658 6.66667C9.16658 6.20643 8.79349 5.83333 8.33325 5.83333C7.87301 5.83333 7.49992 6.20643 7.49992 6.66667V10.8333C7.49992 11.2936 7.87301 11.6667 8.33325 11.6667H11.6666C12.1268 11.6667 12.4999 11.2936 12.4999 10.8333C12.4999 10.3731 12.1268 10 11.6666 10H9.16658V6.66667Z"
                    fill="#ffffff"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.33325 2.5C2.41278 2.5 1.66659 3.24619 1.66659 4.16667V13.3333C1.66659 14.2538 2.41278 15 3.33325 15H16.6666C17.5871 15 18.3333 14.2538 18.3333 13.3333V4.16667C18.3333 3.24619 17.5871 2.5 16.6666 2.5H3.33325ZM3.33325 4.16667H16.6666V13.3333H3.33325V4.16667Z"
                    fill="#ffffff"
                />
                <Path
                    d="M1.66659 15.8333C1.20635 15.8333 0.833252 16.2064 0.833252 16.6667C0.833252 17.1269 1.20635 17.5 1.66659 17.5H18.3333C18.7935 17.5 19.1666 17.1269 19.1666 16.6667C19.1666 16.2064 18.7935 15.8333 18.3333 15.8333H1.66659Z"
                    fill="#ffffff"
                />
            </Svg>
        );
        case "Setting":
            return <Ionicons name="settings-sharp" size={size} color={color} />;
        case "ChevronDown":
            return <MaterialIcons name="keyboard-arrow-down" size={size} color={color} />;
        case "ArrowLeft":
            return <MaterialIcons name="arrow-back" size={size} color={color} />;
        case "ChevronRight":
            return <MaterialIcons name="arrow-forward" size={size} color={color} />;
        case "CodingCopilot":
            return <FontAwesome name="code" size={size} color={color} />;
        case "PhoneInterview":
            return <FontAwesome name="phone" size={size} color={color} />;
        case "General":
            return <MaterialIcons name="work" size={size} color={color} />;
        case "Diamond":
            return <FontAwesome name="diamond" size={size} color={color} />;
        case "HireVue":
            return <FontAwesome name="user" size={size} color={color} />;
        case "New":
            return <Ionicons name="add-circle-outline" size={size} color={color} />;
        case "Check":
            return <Ionicons name="checkmark" size={size} color={color} />;
        default:
            return <MaterialIcons name="error" size={size} color={color} />;
    }
};

const HomeIndex = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showCreateDropdown, setShowCreateDropdown] = useState(false);
    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [status, setStatus] = useState({
        status: "All Status"
    });
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    
    const showStatusDropdownRef = useRef(null);

    const onHandleStatus = (v: string, obk: string) => {
        setStatus({...status, [obk]: v});
        setShowStatusDropdown(false);
    };

    // Sample data for the interview table
    const interviewData = [
        {
            id: '1',
            title: '<Empty Job Info>',
            status: 'Completed',
            appointment: 'N/A',
        },
        {
            id: '2',
            title: '<Empty Job Info>',
            status: 'Completed',
            appointment: 'N/A',
        }
    ];

    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Live Interview</Text>
                    <Text style={styles.headerSubtitle}>
                        Live Interview offers a variety of interview scenarios and provides
                        customized add-ons tailored to different industries.
                    </Text>
                </View>

                <View style={styles.actionsContainer}>
                    <View style={styles.desktopButtons}>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity 
                                style={styles.primaryButton}
                                onPress={() => setShowInterviewModal(true)}
                            >
                                <View style={styles.buttonContent}>
                                    <Icon icon="LiveInterview" color="#fff" />
                                    <Text style={styles.primaryButtonText}>Start Live Interview</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.secondaryButton}
                                onPress={() => navigation.navigate('PermissionSetting')}
                            >
                                <View style={styles.buttonContent}>
                                    <Icon icon="Setting" color="#0ea5e9" />
                                    <Text style={styles.secondaryButtonText}>Setting</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={styles.filterContainer}>
                        <Select 
                            value={status.status} 
                            data={["Ready to Launch", "In Progress", "Complete"]} 
                            onHandle={onHandleStatus} 
                            showDropdown={showStatusDropdown} 
                            onDropdown={() => setShowStatusDropdown(true)} 
                            dropdownRef={showStatusDropdownRef}
                            obk="status" 
                        />
                    </View>

                    <View style={styles.mobileButton}>
                        <TouchableOpacity 
                            style={styles.mobileActionButton}
                            onPress={() => setShowInterviewModal(true)}
                        >
                            <Icon icon="New" color="#fff" size={20} />
                            <Text style={styles.mobileActionText}>Live Interview</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Interview</Text>
                        <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Status</Text>
                        <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Appointment</Text>
                        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Action</Text>
                    </View>

                    {interviewData.map(item => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { flex: 3 }]} numberOfLines={1} ellipsizeMode="tail">
                                {item.title}
                            </Text>
                            <View style={[styles.tableCell, { flex: 3 }]}>
                                <View style={styles.statusBadge}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.statusText}>Completed</Text>
                                </View>
                            </View>
                            <Text style={[styles.tableCell, { flex: 3 }]}>{item.appointment}</Text>
                            <View style={[styles.tableCell, { flex: 2 }]}>
                                <Text>/</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                                &lt;Empty Job Info&gt;
                            </Text>
                            <Text style={styles.cardSubtitle}>Live Interview</Text>
                            <Text style={styles.cardSubtitle}>07 Jan, 2025</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.pagination}>
                    <View style={styles.paginationInfo}>
                        <Text style={styles.paginationLabel}>Page </Text>
                        <Text style={styles.paginationValue}>1/1</Text>
                        <Text style={[styles.paginationLabel, { marginLeft: 8 }]}>Total </Text>
                        <Text style={styles.paginationValue}>1</Text>
                    </View>
                    <View style={styles.paginationControls}>
                        <TouchableOpacity style={styles.paginationButton}>
                            <Icon icon="ArrowLeft" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paginationButton}>
                            <Icon icon="ChevronRight" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {showInterviewModal && (
                <InterviewModal 
                    isOpen={showInterviewModal} 
                    onClose={() => setShowInterviewModal(false)} 
                />
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 64,
    },
    header: {
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'left',
    },
    headerSubtitle: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: '500',
        color: '#64748b',
        maxWidth: 640,
    },
    actionsContainer: {
        marginBottom: 16,
    },
    desktopButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        display: 'flex', // Would be conditionally shown in a real app
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 16,
    },
    primaryButton: {
        backgroundColor: '#0ea5e9',
        borderRadius: 6,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 19,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    primaryButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: w(3.2),
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: '#7dd3fc',
        borderRadius: 6,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#0ea5e9',
        fontWeight: '500',
        fontSize: w(3.2),
    },
    filterContainer: {
        flexDirection: 'row',
    },
    mobileButton: {
        display: 'none', // Would be conditionally shown in a real app
    },
    mobileActionButton: {
        backgroundColor: '#f97316',
        borderRadius: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    mobileActionText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
    },
    tableContainer: {
        marginBottom: 16,
        display: 'flex', // Would be conditionally shown in a real app
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f8fafc',
        height: 48,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        alignItems: 'center',
    },
    tableHeaderCell: {
        paddingHorizontal: 8,
        height: 40,
        justifyContent: 'center',
        fontWeight: '600',
        color: '#0f172a',
        textAlignVertical: 'center'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    tableCell: {
        padding: 8,
        justifyContent: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#64748b',
        marginRight: 8,
    },
    statusText: {
        fontSize: 12,
        color: '#64748b',
    },
    cardContainer: {
        display: 'none', // Would be conditionally shown in a real app
    },
    card: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        marginBottom: 16,
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#94a3b8',
    },
    pagination: {
        marginVertical: 16,
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
    },
    paginationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paginationLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6b7280',
    },
    paginationValue: {
        fontSize: 12,
        fontWeight: '500',
        color: '#0f172a',
    },
    paginationControls: {
        flexDirection: 'row',
        gap: 8,
    },
    paginationButton: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
});

export default HomeIndex;