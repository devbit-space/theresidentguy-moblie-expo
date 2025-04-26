import React, { useRef, useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

interface PrepareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrepareModal: React.FC<PrepareModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState({
    resume: "",
    resumes: ["proposal1.docx", "proposal2.docx", "proposal.docx", "LeoYoungResume.pdf"]
  });

  const [showResumeDropdown, setShowResumeDropdown] = useState(false);

  const handleSelectResume = (resume: string) => {
    setStatus(prev => ({ ...prev, resume }));
    setShowResumeDropdown(false);
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Prepare for QA Pairs</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            </View>

            <View>
              {/* Resume Dropdown */}
              <Text style={styles.label}>Resume <Text style={{ color: "#0090FF" }}>*</Text></Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowResumeDropdown(!showResumeDropdown)}
              >
                <Text>{status.resume || "Select your resume"}</Text>
              </TouchableOpacity>
              {showResumeDropdown && (
                <View style={styles.dropdown}>
                  {status.resumes.map((res, idx) => (
                    <Pressable key={idx} onPress={() => handleSelectResume(res)} style={styles.dropdownItem}>
                      <Text>{res}</Text>
                    </Pressable>
                  ))}
                </View>
              )}

              {/* Job Description URL */}
              <Text style={styles.label}>Job Description</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. https://www.example.com/jobs?id=abc123"
                keyboardType="url"
              />

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextBtn}>
                  <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "600"
  },
  closeButton: {
    padding: 4
  },
  closeText: {
    fontSize: 22,
    color: "#999"
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "500"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 8
  },
  nextBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#0090FF",
    borderRadius: 8
  },
  cancelText: {
    color: "#333"
  },
  nextText: {
    color: "#fff",
    fontWeight: "500"
  }
});

export default PrepareModal;
