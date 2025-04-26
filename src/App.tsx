import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalContextProvider } from './context';
import Toast from "react-native-toast-message"

import Home from './pages/home';
// import Auth from './pages/auth';

export default function App() {
  return (
    <SafeAreaProvider>
      <GlobalContextProvider>
        <SafeAreaView style={styles.container}>
          <Home />
          {/* <Auth /> */}
          <Toast />
        </SafeAreaView>
      </GlobalContextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
