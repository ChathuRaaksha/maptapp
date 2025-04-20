import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Renderer } from 'expo-three';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

// Define a custom GLTF interface
interface CustomGLTF {
  scene: THREE.Scene | THREE.Group | THREE.Object3D;
  animations?: THREE.AnimationClip[];
  cameras?: THREE.Camera[];
  asset: object;
}

// Define progress event interface for GLTFLoader
interface LoaderProgressEvent {
  loaded: number;
  total: number;
  lengthComputable?: boolean;
}

// Define your navigation prop types
interface ARCameraScreenProps {
  navigation: StackNavigationProp<any>;
}

const ARCameraScreen: React.FC<ARCameraScreenProps> = ({ navigation }) => {
  const glViewRef = useRef<GLView | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const requestAnimationFrameRef = useRef<number | null>(null);
  const glContextRef = useRef<ExpoWebGLRenderingContext | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const loadModel = async (gl: ExpoWebGLRenderingContext) => {
    try {
      // Store the GL context for potential use later
      glContextRef.current = gl;
      
      // Only proceed if dimensions are available
      if (dimensions.width === 0 || dimensions.height === 0) {
        console.log('Dimensions not ready yet, waiting for layout');
        return;
      }

      // Load the .glb model from assets
      const asset = Asset.fromModule(require('../assets/scene.glb'));
      await asset.downloadAsync();
      console.log('Asset downloaded:', asset.uri);

      // Set up scene, camera, and renderer
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#000000');
      
      const camera = new THREE.PerspectiveCamera(
        75,
        dimensions.width / dimensions.height,
        0.1,
        1000
      );
      
      const renderer = new Renderer({ gl });
      renderer.setSize(dimensions.width, dimensions.height);
      renderer.setClearColor('#000000');

      // Store the references
      sceneRef.current = scene;
      cameraRef.current = camera;
      rendererRef.current = renderer;

      // Position camera
      camera.position.z = 5;
      
      // Add a light to better see the model
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 10, 10);
      scene.add(directionalLight);
      
      // Load model with proper error handling and typed parameters
      const loader = new GLTFLoader();
      loader.load(
        asset.uri,
        (gltf: CustomGLTF) => {
          console.log('Model loaded successfully');
          scene.add(gltf.scene);
          setIsModelLoaded(true);
          
          // Start animation loop only after model is loaded
          startAnimationLoop(gl);
        },
        (progress: LoaderProgressEvent) => {
          if (progress.lengthComputable && progress.total > 0) {
            console.log(`Loading: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
          } else {
            console.log(`Loaded: ${progress.loaded} bytes`);
          }
        },
        (error: Error) => {
          console.error('Failed to load GLB:', error);
        }
      );
    } catch (error) {
      console.error('Failed to load asset:', error);
    }
  };
  
  const startAnimationLoop = (gl: ExpoWebGLRenderingContext) => {
    // Cancel any existing animation frame
    if (requestAnimationFrameRef.current !== null) {
      cancelAnimationFrame(requestAnimationFrameRef.current);
    }
    
    // Animation loop
    const animate = () => {
      // Only continue animation if screen is focused
      if (isFocused) {
        requestAnimationFrameRef.current = requestAnimationFrame(animate);

        // Rotate the model for animation
        if (sceneRef.current) {
          sceneRef.current.rotation.y += 0.01;
        }

        // Render the scene
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
          gl.endFrameEXP();
        }
      }
    };

    animate();
  };

  // Handle layout changes to update dimensions
  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  // Use focus effect to properly handle screen focus events
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      
      // Delay initialization slightly to avoid navigation transition issues
      const timeoutId = setTimeout(() => {
        if (isMounted && dimensions.width > 0 && glContextRef.current) {
          if (rendererRef.current && cameraRef.current) {
            // Just update existing renderer/camera if they exist
            cameraRef.current.aspect = dimensions.width / dimensions.height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(dimensions.width, dimensions.height);
            
            // Restart animation if needed
            if (isModelLoaded && glContextRef.current) {
              startAnimationLoop(glContextRef.current);
            }
          } else {
            // Load model if not already loaded
            loadModel(glContextRef.current);
          }
        }
      }, 300);
      
      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
        
        // Pause animations when losing focus
        if (requestAnimationFrameRef.current !== null) {
          cancelAnimationFrame(requestAnimationFrameRef.current);
          requestAnimationFrameRef.current = null;
        }
      };
    }, [dimensions, isModelLoaded])
  );

  // Effect to handle dimension changes
  useEffect(() => {
    if (isFocused && glContextRef.current && dimensions.width > 0 && dimensions.height > 0) {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = dimensions.width / dimensions.height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(dimensions.width, dimensions.height);
      }
    }
  }, [dimensions, isFocused]);

  // Cleanup resources when component unmounts
  useEffect(() => {
    return () => {
      // Cancel animation frame
      if (requestAnimationFrameRef.current !== null) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
      
      // Dispose of Three.js resources
      if (rendererRef.current) {
        console.log('Disposing renderer');
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        // Clean up scene resources
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  return (
    <View style={styles.container} onLayout={onLayout}>
      {isFocused && dimensions.width > 0 && dimensions.height > 0 && (
        <GLView
          style={styles.glView}
          onContextCreate={loadModel}
          ref={glViewRef}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  glView: {
    flex: 1,
  },
});

export default ARCameraScreen;