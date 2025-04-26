import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import Layout from "../../components/layout";
import Header from "./components/header";
import Innovations from "./components/innovations";
import Learn from "./components/learn";
import Progress from './components/progress';
import Question from "./components/question";
import Testimonials from './components/testimonials';

const HomeIndex = () => (
  <Layout>
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Header />
        <Progress />
        <Testimonials />
        <Question />
        <Innovations />
        <Learn />
      </View>
    </ScrollView>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 30,
    position: 'relative',
  }
});

export default HomeIndex;
