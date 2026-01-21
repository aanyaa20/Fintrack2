declare module '@react-three/fiber' {
  export * from '@react-three/fiber/dist/declarations/src/index'
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any
      planeGeometry: any
      shaderMaterial: any
    }
  }
}

export {}
