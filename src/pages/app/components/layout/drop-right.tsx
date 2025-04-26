import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import Icon from "../../../../components/icon";

const DropRight = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <View style={styles.container}>
            <View style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemText}>Live Interview</Text>
                    <Text style={styles.freeTrialText}>Free Trial</Text>
                </View>
            </View>
            
            <View style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemText}>Mock Interview</Text>
                    <Text style={styles.freeTrialText}>Free Trial</Text>
                </View>
            </View>
            
            <View style={styles.subMenu}>
                <TouchableOpacity style={styles.subMenuItem}>
                    <View style={styles.subMenuItemContent}>
                        <Icon icon="Download" />
                        <Text style={styles.subMenuItemText}>Download Center</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.subMenuItem}
                    onPress={() => navigation.navigate("PermissionSetting" as never)}
                >
                    <View style={styles.subMenuItemContent}>
                        <Icon icon="SettingOutLine" />
                        <Text style={styles.subMenuItemText}>Settings</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.subMenuItem}>
                    <View style={styles.subMenuItemContent}>
                        <Icon icon="HelpCenter" />
                        <Text style={styles.subMenuItemText}>Help Center</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -40,
        right: -255,
        width: 250,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 8,
    },
    menuItem: {
        paddingHorizontal: 8,
        paddingVertical: 7,
    },
    menuItemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    menuItemText: {
        fontSize: 14,
        fontWeight: '500',
    },
    freeTrialText: {
        color: '#007CEE',
        fontSize: 14,
        fontWeight: '500',
    },
    subMenu: {
        marginTop: 8,
        width: '100%',
        backgroundColor: '#F8FAFC',
        paddingVertical: 4,
    },
    subMenuItem: {
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    subMenuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subMenuItemText: {
        fontSize: 14,
        marginLeft: 12,
    },
});

export default DropRight;