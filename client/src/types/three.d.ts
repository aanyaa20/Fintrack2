// Declaration for three.js module
declare module 'three' {
  export * from 'three/src/Three'
}

declare module 'three/src/Three' {
  export class Color {
    constructor(...args: any[])
  }
  export class Mesh {}
  export class ShaderMaterial {
    uniforms: any
  }
  export interface IUniform<T = any> {
    value: T
  }
}

// Declaration for @react-three/fiber
declare module '@react-three/fiber' {
  import { ReactNode, RefObject } from 'react'
  
  export interface CanvasProps {
    children?: ReactNode
    dpr?: [number, number]
    frameloop?: 'always' | 'demand' | 'never'
  }
  
  export function Canvas(props: CanvasProps): JSX.Element
  export function useFrame(callback: (state: any, delta: number) => void): void
  export function useThree(): { viewport: { width: number; height: number } }
}

// JSX intrinsic elements for react-three/fiber
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
