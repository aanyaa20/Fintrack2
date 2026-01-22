// JSX intrinsic elements for react-three/fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Core
      mesh: any;
      planeGeometry: any;
      shaderMaterial: any;
      group: any;
      
      // Common geometries
      boxGeometry: any;
      sphereGeometry: any;
      cylinderGeometry: any;
      
      // Common materials
      meshBasicMaterial: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      
      // Lights
      ambientLight: any;
      pointLight: any;
      directionalLight: any;
      spotLight: any;
      
      // Cameras
      perspectiveCamera: any;
      orthographicCamera: any;
    }
  }
}

export {};
