import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  FlatList,
  Modal,
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import UploadModal from "../components/upload-modal";
import LinkedinProfileModal from '../components/linkedin-profile-modal';

// Layout component adapted for mobile
const Layout = ({ children }) => (
  <SafeAreaView style={styles.layoutContainer}>
    {children}
  </SafeAreaView>
);

// Document item for mobile view
const DocumentItem = ({ name, type, date, onView, onDelete }) => (
  <View style={styles.documentCard}>
    <Text style={styles.documentTitle}>{name}</Text>
    <View style={styles.documentDetails}>
      <Text style={styles.documentInfo}>Document Type: {type}</Text>
      <Text style={[styles.documentInfo, {marginTop: 4}]}>Upload Date: {date}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={onView}>
          <Feather name="eye" size={20} color="#0F172A" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, {marginLeft: 12}]} onPress={onDelete}>
          <Feather name="trash-2" size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// Upload Modal component
// const UploadModal = ({ visible, onClose }) => (
//   <Modal
//     visible={visible}
//     transparent={true}
//     animationType="slide"
//     onRequestClose={onClose}
//   >
//     <View style={styles.modalOverlay}>
//       <View style={styles.modalContent}>
//         <View style={styles.modalHeader}>
//           <Text style={styles.modalTitle}>Upload Document</Text>
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Feather name="x" size={24} color="#64748B" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.modalBody}>
//           <TouchableOpacity style={styles.uploadArea}>
//             <Feather name="upload-cloud" size={36} color="#0EA5E9" />
//             <Text style={styles.uploadText}>Tap to select a file</Text>
//             <Text style={styles.uploadHint}>PDF, DOCX, or DOC (Max 10MB)</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.modalFooter}>
//           <TouchableOpacity style={styles.modalButton} onPress={onClose}>
//             <Text style={styles.modalButtonText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.modalButton, styles.primaryButton]}>
//             <Text style={styles.primaryButtonText}>Upload</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   </Modal>
// );

// LinkedIn Profile Modal component
// const LinkedinProfileModal = ({ visible, onClose }) => (
//   <Modal
//     visible={visible}
//     transparent={true}
//     animationType="slide"
//     onRequestClose={onClose}
//   >
//     <View style={styles.modalOverlay}>
//       <View style={styles.modalContent}>
//         <View style={styles.modalHeader}>
//           <Text style={styles.modalTitle}>LinkedIn Profile</Text>
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Feather name="x" size={24} color="#64748B" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.modalBody}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Profile URL</Text>
//             <View style={styles.textInput}>
//               <Text style={styles.inputPlaceholder}>Enter your LinkedIn profile URL</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.modalFooter}>
//           <TouchableOpacity style={styles.modalButton} onPress={onClose}>
//             <Text style={styles.modalButtonText}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.modalButton, styles.primaryButton]}>
//             <Text style={styles.primaryButtonText}>Import</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   </Modal>
// );

const Resume = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLinkedinProfileModal, setShowLinkedinProfileModal] = useState(false);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  
  // Mock data for documents
  const documents = [
    { id: 1, name: 'proposal.docx', type: 'Other', date: '08 Jan, 2025' },
    { id: 2, name: 'proposal.docx', type: 'Resume', date: '08 Jan, 2025' },
    { id: 3, name: 'proposal.docx', type: 'Resume', date: '08 Jan, 2025' },
    { id: 4, name: 'proposal.docx', type: 'Resume', date: '07 Jan, 2025' },
    { id: 5, name: 'LeoYoungResume.pdf', type: 'Resume', date: '15 Dec, 2024' },
  ];
  
  // Function to render table header
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell, { flex: 2 }]}>File Name</Text>
      <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Document Type</Text>
      <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Upload Date</Text>
      <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Action</Text>
    </View>
  );
  
  // Function to render table row
  const renderTableRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 2 }]} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.type}</Text>
      <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.date}</Text>
      <View style={[styles.tableCell, { flex: 1, flexDirection: 'row' }]}>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="download" size={18} color="#0F172A" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, {marginLeft: 8}]}>
          <Feather name="trash-2" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Document Center</Text>
          <Text style={styles.subheading}>
            Upload your resume, cover letter, notes or any other application materials. 
            AI will extract key content and remind you during the interview to fully showcase yourself.
          </Text>
        </View>
        
        <View style={styles.actionBar}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={() => setShowUploadModal(true)}
            >
              <Feather name="upload" size={20} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkedinButton}
              onPress={() => setShowLinkedinProfileModal(true)}
            >
              <Text style={styles.linkedinButtonText}>LinkedIn Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Table view for larger screens */}
        {windowWidth > 768 ? (
          <View style={styles.tableContainer}>
            {renderTableHeader()}
            <FlatList
              data={documents}
              renderItem={renderTableRow}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        ) : (
          /* Card view for smaller screens */
          <View style={styles.cardContainer}>
            {documents.map(doc => (
              <DocumentItem
                key={doc.id}
                name={doc.name}
                type={doc.type.toLowerCase()}
                date={doc.date}
                onView={() => {}}
                onDelete={() => {}}
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
              <Text style={styles.paginationValue}>5</Text>
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
      
      <UploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
      
      <LinkedinProfileModal
        isOpen={showLinkedinProfileModal}
        onClose={() => setShowLinkedinProfileModal(false)}
      />
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
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
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
    marginTop: 4,
    maxWidth: 640,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0EA5E9',
    padding: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 8,
  },
  linkedinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    borderRadius: 8,
    marginLeft: 16,
  },
  linkedinButtonText: {
    color: '#0F172A',
    fontWeight: '500',
  },
  tableContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
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
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableCell: {
    fontSize: 14,
    color: '#334155',
  },
  cardContainer: {
    marginTop: 16,
  },
  documentCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },
  documentDetails: {
    marginTop: 8,
  },
  documentInfo: {
    fontSize: 14,
    color: '#64748B',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 16,
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
    marginTop: 12,
  },
  uploadHint: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginLeft: 12,
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  primaryButton: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 12,
  },
  inputPlaceholder: {
    color: '#94A3B8',
  },
});

export default Resume;