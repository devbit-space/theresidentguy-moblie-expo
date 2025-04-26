import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import Practice from "./components/practice";
import Header from "./components/header";
import JobPreparation from "./components/job-preparation";
import JoinSeekers from "./components/join-seekers";
import JobOfferReceive from "./components/job-offer-receive";
import Faq from "../components/faq";
import { companies } from "./components/data.d";
import { faqs } from "../components/data.d";
import { WebView } from 'react-native-webview';
import Layout from "../../../components/layout";

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth >= 1024;

const responsive = {
  desktop: {
    itemWidth: 100,
    sliderWidth: screenWidth,
  },
  tablet: {
    itemWidth: 120,
    sliderWidth: screenWidth,
  },
  mobile: {
    itemWidth: 150,
    sliderWidth: screenWidth,
  }
};

const AiMockInterview = () => {
  const carouselSettings = isLargeScreen 
    ? responsive.desktop 
    : screenWidth > 464 
      ? responsive.tablet 
      : responsive.mobile;

  const renderCompanyItem = ({ item }: { item: { src: string; alt: string } }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 8 }}>
      <WebView
        source={{ uri: item.src }}
        style={{ width: 100, height: 40 }}
        scrollEnabled={false}
        originWhitelist={['*']}
        javaScriptEnabled
      />
      <Text style={{ fontSize: 12, color: '#888', marginTop: 6 }}>{item.alt}</Text>
    </View>
  );

  return (
    <Layout>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainContainer}>
            <Image 
              source={require('../../../assets/image/home/common-bg.png')} 
              style={styles.backgroundImage} 
              resizeMode="cover"
            />
            
            <Header />
            
            <View style={styles.carouselSection}>
              <Carousel
                data={companies}
                renderItem={renderCompanyItem}
                sliderWidth={carouselSettings.sliderWidth}
                itemWidth={carouselSettings.itemWidth}
                loop={true}
                autoplay={true}
                autoplayInterval={2000}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
                activeSlideAlignment="center"
              />
            </View>
            
            <Practice />
            <JobPreparation />
            <JoinSeekers />
            <JobOfferReceive />
            <Faq title="FAQ: Everything You Need to Know About Mock Interviews" data={faqs}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E0F7FA', // bg-cyan-50
  },
  scrollView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
    paddingTop: 30,
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 300, // Adjust based on actual image proportions
    zIndex: -1,
  },
  carouselSection: {
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
    paddingVertical: 20,
    width: '100%',
  },
  companyContainer: {
    width: 140,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyLogo: {
    width: '100%',
    height: '100%',
  },
});

export default AiMockInterview;