import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { sliceText, textEllipsis } from "../context/helper"
import Icon from "./icon"

interface SelectProps {
    value: string;
    data: string[];
    optionPrefix?: string;
    onHandle: (value: string, obk: string) => void;
    showDropdown: boolean;
    onDropdown: () => void;
    dropdownRef: any;
    obk: string;
}

export const Select = ({ value, data, onHandle, optionPrefix, showDropdown, onDropdown, dropdownRef, obk }: SelectProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onDropdown}
                style={styles.selectButton}
                activeOpacity={0.7}
            >
                <Text style={styles.selectText} numberOfLines={1}>
                    {value !== "" ? textEllipsis(value, 30) as string : textEllipsis(optionPrefix || "", 30) as string}
                </Text>
                {/* <Icon icon="ChevronDown" /> */}
            </TouchableOpacity>

            <Modal
                visible={showDropdown}
                transparent
                animationType="fade"
                onRequestClose={onDropdown}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPress={onDropdown}
                >
                    <View style={styles.dropdownContainer} ref={dropdownRef}>
                        <ScrollView>
                            {optionPrefix && (
                                <Text style={styles.optionPrefix}>{optionPrefix}</Text>
                            )}
                            {data.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.option,
                                        value === item && styles.selectedOption
                                    ]}
                                    onPress={() => onHandle(item, obk)}
                                >
                                    <View style={styles.checkContainer}>
                                        {value === item && <Icon icon="Check" />}
                                    </View>
                                    <Text style={styles.optionText}>{item}{value === item && " (Selected)"}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        minWidth: 150,
    },
    selectButton: {
        flexDirection: 'row',
        height: 36,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        backgroundColor: 'transparent',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    selectText: {
        fontSize: 13,
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownContainer: {
        width: '80%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    optionPrefix: {
        paddingHorizontal: 28,
        paddingTop: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        marginVertical: 4,
        borderRadius: 4,
    },
    selectedOption: {
        backgroundColor: '#e0f2fe',
    },
    checkContainer: {
        width: 16,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 13,
        color: '#1e293b',
        marginLeft: 8,
    },
});