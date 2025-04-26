import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
    children: ReactNode;
    hiddenFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hiddenFooter }) => {
    return (
        <View style={styles.container}>
            <Header />
            <Image 
            style={styles.imageRight}
            source={require("../../assets/image/effort-2.png")}
            resizeMode="contain"
            />
            <Image 
            style={styles.imageLeft}
            source={require("../../assets/image/effort-1.png")}
            resizeMode="contain"
            />
            <ScrollView>
                <View style={styles.content}>
                    {children}
                </View>
                {!hiddenFooter && <Footer />}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    imageRight: {
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: -1,
    },
    imageLeft: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      zIndex: -1,
    }
});

export default Layout; 