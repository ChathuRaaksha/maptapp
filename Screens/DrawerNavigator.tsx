import React, { useRef, useState, ReactNode } from 'react';
import { View, Animated, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import DrawerContent from '../Components/DrawerContent';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8;

interface DrawerNavigatorProps {
  children: ReactNode;
  navigation: any;
  handleLogout: () => void;
}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({ children, navigation, handleLogout }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsDrawerOpen(false);
    });
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.main}>
        {React.cloneElement(children as React.ReactElement, { openDrawer })}
      </View>

      {/* Overlay */}
      {isDrawerOpen && (
        <TouchableOpacity 
          style={styles.overlay}
          activeOpacity={1} 
          onPress={closeDrawer}
        >
          <Animated.View 
            style={[
              styles.overlayBackground,
              { opacity },
            ]} 
          />
        </TouchableOpacity>
      )}

      {/* Drawer */}
      <Animated.View 
        style={[
          styles.drawer,
          { transform: [{ translateX }] },
        ]}
      >
        <DrawerContent 
          navigation={navigation} 
          closeDrawer={closeDrawer} 
          handleLogout={handleLogout}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  overlayBackground: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#FFF',
    zIndex: 200,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default DrawerNavigator;