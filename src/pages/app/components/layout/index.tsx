import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import SideBar from './side-bar';
import Header from './header';
import ActivateBar from './activate-bar';
import { useGlobalContext } from '../../../../context';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const [state, {dispatch}] = useGlobalContext();
    const { width } = useWindowDimensions(); // React Native way to get responsive dimensions

    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [smallSideBar, setSmallSideBar] = useState(false);
    const [showArrowButton, setShowArrowButton] = useState(false);

    // Update dimensions when screen size changes
    useEffect(() => {
        // Check screen size and set appropriate flags
        const isTabletSize = width <= 1000;
        const isMobileSize = width <= 500;
        
        setIsTablet(isTabletSize);
        setIsMobile(isMobileSize);
    }, [width]);

    // Update sidebar state when tablet mode changes
    useEffect(() => {
        isTablet ? setSmallSideBar(true) : setSmallSideBar(false);
    }, [isTablet, isMobile]);

    const onSideBar = () => {
        setSmallSideBar(!smallSideBar);
        setShowArrowButton(false);
    };

    return (
        <View style={styles.container}>
            {state.isLeaveInterview?.status && <ActivateBar />}
            
            <View style={[
                styles.contentWrapper,
                isMobile ? styles.mobileContent : styles.desktopContent
            ]}>
                <SideBar
                    smallSideBar={smallSideBar}
                    isMobile={isMobile}
                    onSideBar={onSideBar}
                    showArrowButton={showArrowButton}
                    onShowArrowButton={() => setShowArrowButton(!showArrowButton)}
                    onSmallSideBar={() => setSmallSideBar(!smallSideBar)}
                />
                <View style={[
                    styles.mainContent,
                    (smallSideBar || isMobile) ? styles.mainContentSmall : styles.mainContentLarge
                ]}>
                    {children}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentWrapper: {
        flex: 1,
    },
    desktopContent: {
        flexDirection: 'row',
    },
    mobileContent: {
        position: 'relative',
    },
    mainContent: {
        flex: 1,
    },
    mainContentSmall: {
        marginLeft: 55, // Equivalent to sm:ml-[55px]
    },
    mainContentLarge: {
        marginLeft: 260, // Equivalent to sm:ml-[260px]
    },
});

export default Layout;
