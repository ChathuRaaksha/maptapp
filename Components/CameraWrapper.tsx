import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import * as ExpoCamera from 'expo-camera';

// Use require as a workaround to get the actual Camera component
const ActualCamera = require('expo-camera').Camera;

// For newer expo-camera versions
export const CameraType = {
  front: 'front' as const,
  back: 'back' as const
};

// Use the correct permission hook/function based on expo-camera version
export const requestCameraPermissions = async () => {
  // Try the newer hook-based approach first
  if (ExpoCamera.useCameraPermissions) {
    const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
    if (!permission?.granted) {
      return await requestPermission();
    }
    return { status: 'granted' };
  } 
  // Fall back to older approach if available
  /* else if (ExpoCamera.requestPermissionsAsync) {
    return await ExpoCamera.requestPermissionsAsync();
  } */
  // Last resort - try the Camera object directly
  else if (ActualCamera.requestPermissionsAsync) {
    return await ActualCamera.requestPermissionsAsync();
  }
  
  console.warn('Could not find camera permission methods');
  return { status: 'denied' };
};

interface CameraWrapperProps {
  style?: StyleProp<ViewStyle>;
  type?: any;
  ref?: any;
  // Add any other camera props you need
}

const CameraWrapper: React.FC<CameraWrapperProps> = React.forwardRef((props, ref) => {
  return <ActualCamera {...props} ref={ref} />;
});

export default CameraWrapper;