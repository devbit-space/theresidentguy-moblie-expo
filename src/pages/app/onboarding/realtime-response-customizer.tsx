import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

interface RealtimeResponseCustomizerProps {
  onNext: () => void;
  onPrev: () => void;
}

interface UploadedDocument {
  name: string;
  uri: string;
  size?: number;
  mimeType?: string;
}

const RealtimeResponseCustomizer: React.FC<RealtimeResponseCustomizerProps> = ({ 
  onNext, 
  onPrev 
}) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedDocument | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true
      });
      
      if (result.assets && result.assets.length > 0) {
        const document = result.assets[0];
        setUploadedFile({
          name: document.name,
          uri: document.uri,
          size: document.size,
          mimeType: document.mimeType
        });
        console.log('Uploaded file:', document);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onPrev}
      >
        <MaterialIcons name="arrow-back" size={20} color="#64748B" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <Text style={styles.stepIndicator}>2/4</Text>
        <Text style={styles.title}>
          Help us tailor our realtime responses to you
        </Text>
        <Text style={styles.subtitle}>
          Our AI will generate realtime responses to your interviewer's questions based on your experience.
        </Text>
        
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Upload your resume</Text>
          
          {!uploadedFile ? (
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={pickDocument}
            >
              <MaterialIcons name="file-upload" size={24} color="#64748B" />
              <Text style={styles.uploadButtonText}>
                Tap to Upload
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.filePreview}>
              <Text style={styles.fileName}>{uploadedFile.name}</Text>
              <TouchableOpacity 
                onPress={() => setUploadedFile(null)}
                style={styles.deleteButton}
              >
                <MaterialIcons name="delete" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
          )}
          
          <Text style={styles.fileHint}>
            Only PDF, DOC, or DOCX files up to 10 MB are accepted.
          </Text>
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
  );
};

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
    flex: 1,
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    fontWeight: '500',
  },
  uploadSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 8,
  },
  uploadButton: {
    height: 80,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#94A3B8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  uploadButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  filePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  fileName: {
    fontSize: 14,
    color: '#334155',
  },
  deleteButton: {
    padding: 4,
  },
  fileHint: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 8,
    fontWeight: '500',
  },
  buttonsContainer: {
    marginTop: 'auto',
    marginBottom: Platform.OS === 'ios' ? 16 : 0,
  },
  nextButton: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
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
    padding: 8,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
});

export default RealtimeResponseCustomizer;