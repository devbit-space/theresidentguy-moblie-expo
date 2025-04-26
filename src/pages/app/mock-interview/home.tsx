import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { MockInterviewStackParamList } from "./index";

// Import existing components
import Layout from "../components/layout";
import MockInterviewModal from "../components/mock-interview-modal";
import { Select } from "../../../components/select";

// Custom Icon component
interface IconProps {
  icon: string;
  color?: string;
  size?: number;
}

const Icon = ({ icon, color = "#000", size = 24 }: IconProps) => {
  switch (icon) {
    case "MockInterview":
      return <FontAwesome name="video-camera" size={size} color={color} />;
    case "New":
      return <Ionicons name="add-circle-outline" size={size} color={color} />;
    case "ArrowLeft":
      return <MaterialIcons name="arrow-back" size={size} color={color} />;
    case "ChevronRight":
      return <MaterialIcons name="arrow-forward" size={size} color={color} />;
    case "ExplorePath":
      return <MaterialIcons name="explore" size={size} color={color} />;
    default:
      return <MaterialIcons name="error" size={size} color={color} />;
  }
};

// Mock interview data type
interface InterviewItem {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  appointment: string;
  hasExplore: boolean;
}

// Mock interview data
const interviewData: InterviewItem[] = [
  {
    id: '1',
    title: 'Job Readiness Assessment',
    subtitle: 'Management Consultant',
    status: 'Completed',
    appointment: 'N/A',
    hasExplore: true
  },
  {
    id: '2',
    title: 'Job Readiness Assessment',
    subtitle: 'IT Consultant',
    status: 'Completed',
    appointment: 'N/A',
    hasExplore: true
  },
  {
    id: '3',
    title: 'Job Readiness Assessment',
    subtitle: 'IT Consultant',
    status: 'Completed',
    appointment: 'N/A',
    hasExplore: true
  },
  {
    id: '4',
    title: 'Web Developer',
    subtitle: '',
    status: 'Completed',
    appointment: 'N/A',
    hasExplore: false
  }
];

const MockInterview = () => {
  const navigation = useNavigation<StackNavigationProp<MockInterviewStackParamList>>();
  const [showMockInterviewModal, setShowMockInterviewModal] = useState(false);
  const [status, setStatus] = useState({
    status: "All Status"
  });
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  
  const showStatusDropdownRef = useRef(null);

  const onHandleStatus = (v: string, obk: string) => {
    setStatus({ ...status, [obk]: v });
    setShowStatusDropdown(false);
  };

  // Render a single interview item for FlatList
  const renderInterviewItem = ({ item }: { item: InterviewItem }) => (
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, { flex: 3 }]}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        {item.subtitle ? (
          <Text style={styles.subtitleText}>{item.subtitle}</Text>
        ) : null}
      </View>
      <View style={[styles.tableCell, { flex: 2 }]}>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={[styles.tableCell, { flex: 3 }]}>
        <Text>{item.appointment}</Text>
      </View>
      <View style={[styles.tableCell, { flex: 3, flexDirection: 'row', gap: 12 }]}>
        <Text>/</Text>
        {item.hasExplore && (
          <TouchableOpacity style={styles.exploreButton}>
            <Icon icon="ExplorePath" size={18} />
            <Text style={styles.exploreText}>Explore Learning Path</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <Layout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mock Interview</Text>
          <Text style={styles.subtitle}>
            Prepare for the interview in advance and get yourself in the best possible state.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {/* Desktop Actions */}
          <View style={styles.desktopButtons}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => setShowMockInterviewModal(true)}
            >
              <View style={styles.buttonContent}>
                <Icon icon="MockInterview" color="#fff" />
                <Text style={styles.buttonText}>Start Mock Interview</Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.filterContainer}>
              <Select 
                onDropdown={() => setShowStatusDropdown(true)} 
                showDropdown={showStatusDropdown} 
                value={status.status} 
                obk="status" 
                onHandle={onHandleStatus} 
                data={["Ready to Launch", "In Progress", "Complete"]} 
                dropdownRef={showStatusDropdownRef}
              />
            </View>
          </View>
          
          {/* Mobile Actions */}
          <View style={styles.mobileButtons}>
            <TouchableOpacity 
              style={styles.mobileButton}
              onPress={() => setShowMockInterviewModal(true)}
            >
              <Icon icon="New" color="#fff" />
              <Text style={styles.mobileButtonText}>Mock Interview</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Interview Table (Desktop) */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Interview</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Status</Text>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Appointment</Text>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Action</Text>
          </View>
          <FlatList
            data={interviewData}
            renderItem={renderInterviewItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Mobile Card View */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                &lt;Empty Job Info&gt;
              </Text>
              <Text style={styles.cardSubtitle}>Free Trial Interview</Text>
              <Text style={styles.cardSubtitle}>09 Jan, 2025</Text>
            </View>
          </View>
        </View>

        {/* Pagination */}
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

      {/* Interview Modal */}
      {showMockInterviewModal && (
        <MockInterviewModal 
          isOpen={showMockInterviewModal} 
          onClose={() => setShowMockInterviewModal(false)} 
        />
      )}
    </Layout>
  );
};

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
  },
  subtitle: {
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
    alignItems: 'center',
    display: isTablet ? 'flex' : 'none',
  },
  primaryButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 6,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  mobileButtons: {
    display: isTablet ? 'none' : 'flex',
  },
  mobileButton: {
    backgroundColor: '#f97316',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 6,
    // height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  tableContainer: {
    display: isTablet ? 'flex' : 'none',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    height: 48,
    alignItems: 'center',
  },
  tableHeaderCell: {
    paddingHorizontal: 8,
    fontWeight: '600',
    color: '#0f172a',
    fontSize: 14,
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
  titleText: {
    fontWeight: '600',
    color: '#0f172a',
    fontSize: 14,
  },
  subtitleText: {
    fontSize: 11,
    color: '#64748b',
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
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  exploreText: {
    fontSize: 14,
    color: '#0f172a',
  },
  cardContainer: {
    display: isTablet ? 'none' : 'flex',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginVertical: 16,
    height: 32,
  },
  paginationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MockInterview;