import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import the PrepareModal converted to React Native
import PrepareModal from "../components/prepare-modal";

// Layout component adapted for mobile
const Layout = ({ children }) => (
  <SafeAreaView style={styles.layoutContainer}>
    {children}
  </SafeAreaView>
);

// Resume item card for mobile view
const ResumeCard = ({ title, company, onEdit }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{company}</Text>
    </View>
    <View style={styles.cardFooter}>
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Feather name="edit" size={16} color="#0F172A" />
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Role = () => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  
  // Mock data for resumes
  const resumes = [
    { 
      id: 1, 
      resume: 'proposal.docx', 
      hasResume: true,
      position: 'sdf', 
      company: 'sdf', 
      companyDetail: 'sdfsdf', 
      jobDescription: 'asd' 
    },
    { 
      id: 2, 
      resume: '', 
      hasResume: false,
      position: 'Web Developer', 
      company: 'Swiss Re AG', 
      companyDetail: 'Swiss Re AG', 
      jobDescription: 'Web Developer' 
    },
  ];
  
  // Function to render table header
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Resume</Text>
      <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Position</Text>
      <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Company</Text>
      <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Company Detail</Text>
      <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Job Description</Text>
      <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Action</Text>
    </View>
  );
  
  // Function to render table row
  const renderTableRow = ({ item }) => (
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, { flex: 1.2 }]}>
        {item.hasResume ? (
          <Text style={styles.linkText} numberOfLines={1} ellipsizeMode="tail">
            {item.resume}
          </Text>
        ) : (
          <Text style={styles.mutedText}>Not selected yet</Text>
        )}
      </View>
      <View style={[styles.tableCell, { flex: 1 }]}>
        <Text style={styles.cellText} numberOfLines={1} ellipsizeMode="tail">
          {item.position}
        </Text>
      </View>
      <View style={[styles.tableCell, { flex: 1 }]}>
        <Text style={styles.cellText} numberOfLines={1} ellipsizeMode="tail">
          {item.company}
        </Text>
      </View>
      <View style={[styles.tableCell, { flex: 1.2 }]}>
        <Text style={styles.cellText} numberOfLines={1} ellipsizeMode="tail">
          {item.companyDetail}
        </Text>
      </View>
      <View style={[styles.tableCell, { flex: 1.2 }]}>
        <Text style={styles.cellText} numberOfLines={1} ellipsizeMode="tail">
          {item.jobDescription}
        </Text>
      </View>
      <View style={[styles.tableCell, { flex: 1.5, flexDirection: 'row' }]}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="edit-2" size={14} color="#0F172A" />
          <Text style={styles.actionButtonText}>Edit QA Pairs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { marginLeft: 8 }]}>
          <Feather name="edit" size={14} color="#0F172A" />
          <Text style={styles.actionButtonText}>Edit Role</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { marginLeft: 8, width: 32 }]}>
          <Feather name="x" size={14} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Interview Preparation Hub</Text>
          <Text style={styles.subheading}>
            Link your resume and create a role, generate interview questions, and prepare in advance.
          </Text>
        </View>
        
        <View style={styles.actionBar}>
          <TouchableOpacity 
            style={styles.prepareButton}
            onPress={() => setShowRoleModal(true)}
          >
            <Feather name="plus" size={18} color="#FFFFFF" />
            <Text style={styles.prepareButtonText}>Prepare</Text>
          </TouchableOpacity>
        </View>
        
        {/* Table view for larger screens */}
        {windowWidth > 768 ? (
          <View style={styles.tableContainer}>
            {renderTableHeader()}
            <FlatList
              data={resumes}
              renderItem={renderTableRow}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        ) : (
          /* Card view for smaller screens */
          <View style={styles.cardContainer}>
            {resumes.map(resume => (
              <ResumeCard
                key={resume.id}
                title={resume.position}
                company={resume.company}
                onEdit={() => {}}
              />
            ))}
          </View>
        )}
        
        {/* Pagination controls */}
        <View style={styles.paginationContainer}>
          <View style={styles.paginationInfo}>
            <Text style={styles.paginationText}>
              <Text style={styles.paginationLabel}>Page </Text>
              <Text style={styles.paginationValue}>1/1</Text>
            </Text>
            <Text style={[styles.paginationText, {marginLeft: 16}]}>
              <Text style={styles.paginationLabel}>Total </Text>
              <Text style={styles.paginationValue}>2</Text>
            </Text>
          </View>
          <View style={styles.paginationControls}>
            <TouchableOpacity style={styles.paginationButton}>
              <Feather name="arrow-left" size={18} color="#64748B" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.paginationButton, {marginLeft: 8}]}>
              <Feather name="chevron-right" size={18} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {showRoleModal && (
        <PrepareModal 
          isOpen={showRoleModal}
          onClose={() => setShowRoleModal(false)}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  actionBar: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  prepareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#38BDF8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  prepareButtonText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 8,
  },
  tableContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableHeaderCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableCell: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
    color: '#334155',
  },
  linkText: {
    fontSize: 14,
    color: '#334155',
    textDecorationLine: 'underline',
  },
  mutedText: {
    fontSize: 14,
    color: '#94A3B8',
    opacity: 0.6,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    height: 32,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0F172A',
    marginLeft: 4,
  },
  cardContainer: {
    marginTop: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  cardFooter: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0F172A',
    marginLeft: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  paginationInfo: {
    flexDirection: 'row',
    marginRight: 24,
  },
  paginationText: {
    fontSize: 12,
  },
  paginationLabel: {
    color: '#6B7280',
    fontWeight: '500',
  },
  paginationValue: {
    color: '#0F172A',
    fontWeight: '500',
  },
  paginationControls: {
    flexDirection: 'row',
  },
  paginationButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Role;