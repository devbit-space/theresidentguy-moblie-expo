import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Layout from "../components/layout";

const Question = () => {
    return (
        <Layout>
            <View style={styles.container}>
                <Text>Question</Text>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Question;