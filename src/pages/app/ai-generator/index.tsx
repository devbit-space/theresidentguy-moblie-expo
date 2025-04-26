import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "../../../components/icon";

interface JobItem {
  role: string;
  company: string;
  hasResume: boolean;
  hasCover: boolean;
}

const AiGenerator = () => {
  const data: JobItem[] = [
    { role: 'sdf', company: 'sdf', hasResume: true, hasCover: true },
    { role: 'Web Developer', company: 'Swiss Re AG', hasResume: false, hasCover: true }
  ];

  const renderItem = ({ item }: { item: JobItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.role}</Text>
        <Text style={styles.cardSubtitle}>{item.company}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.rowContainer}>
          <Text style={styles.rowLabel}>Resume</Text>
          <View style={styles.buttonRow}>
            {item.hasResume ? (
              <>
                <TouchableOpacity style={styles.iconButton}>
                                                        <Icon icon="Download" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                                                        <Icon icon="Refresh" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.generateButton}>
                                                    <Icon icon="MagicEdit" />
                <Text style={styles.generateButtonText}>Generate</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowLabel}>Cover Letter</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.iconButton}>
                                                        <Icon icon="Download" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
                                                        <Icon icon="Refresh" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Material Generator</Text>
          <Text style={styles.subtitle}>Generate resume, cover letters, and interview flashcards tailored to each job.</Text>
        </View>
        
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
        
        <View style={styles.paginationContainer}>
          <View style={styles.paginationInfo}>
            <Text style={styles.paginationText}>
              <Text style={styles.paginationLabel}>Page </Text>
              <Text style={styles.paginationValue}>1/1</Text>
            </Text>
            <Text style={styles.paginationText}>
              <Text style={styles.paginationLabel}>Total </Text>
              <Text style={styles.paginationValue}>{data.length}</Text>
            </Text>
          </View>
          <View style={styles.paginationButtons}>
            <TouchableOpacity style={styles.paginationButton}>
                                <Icon icon="ArrowLeft" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.paginationButton}>
                                <Icon icon="ChevronRight" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  cardHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardContent: {
    padding: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  iconButton: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    padding: 8,
    marginLeft: 8,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  generateButtonText: {
    fontSize: 14,
    marginLeft: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    gap: 24,
  },
  paginationInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  paginationText: {
    fontSize: 12,
  },
  paginationLabel: {
    color: '#6b7280',
    fontWeight: '500',
  },
  paginationValue: {
    color: '#111827',
    fontWeight: '500',
  },
  paginationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  paginationButton: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AiGenerator;