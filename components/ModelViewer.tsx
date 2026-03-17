'use client'

import { 
  AdaptiveDpr,
  AdaptiveEvents,
  Center,
  OrbitControls, 
  PerformanceMonitor,
  Preload,
  Stage, 
  useGLTF,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useMemo, useState } from 'react'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF('/ichigo_sword_the_second_mode.glb')
  const scanLightRef = React.useRef<THREE.SpotLight | null>(null)
  const lightTargetRef = React.useRef<THREE.Object3D>(new THREE.Object3D())

  // Optimize scene traversal and material setup
  useMemo(() => {
    if (!scene) return
    scene.traverse((node: THREE.Object3D) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        if (mesh.material && 'roughness' in mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial
          material.roughness = 0.2
          material.metalness = 0.8
          material.emissiveIntensity = 0
        }
      }
    })
  }, [scene])

  React.useEffect(() => {
    if (!scene) return
    scene.add(lightTargetRef.current)
    const target = lightTargetRef.current
    return () => {
      scene.remove(target)
    }
  }, [scene])

  React.useEffect(() => {
    if (scanLightRef.current) {
      scanLightRef.current.target = lightTargetRef.current
    }
  }, [])

  useFrame(() => {
    // Using performance.now() to avoid the deprecated THREE.Clock warning
    const t = performance.now() / 1000
    const cycleTime = 4
    const localT = (t % cycleTime) / cycleTime

    if (!scanLightRef.current) return

    if (localT < 0.4) {
      const progress = localT / 0.4
      const xPos = THREE.MathUtils.lerp(15, -60, progress)
      scanLightRef.current.intensity = 50
      scanLightRef.current.position.set(xPos, 15, 5)
      lightTargetRef.current.position.set(xPos, 0, 0)
    } else {
      // Avoid unnecessary updates when light is off
      if (scanLightRef.current.intensity !== 0) {
        scanLightRef.current.intensity = 0
      }
    }
  })

  return (
    <group rotation={[Math.PI / -100, Math.PI / 2.5, 6]}>
      <primitive object={scene} />
      <spotLight
        ref={scanLightRef}
        angle={0.2}
        penumbra={0.5}
        color="#ffffff"
        distance={40}
        castShadow
        shadow-mapSize={[512, 512]} // Optimize shadow resolution
      />
    </group>
  )
}


export default function ModelViewer() {
  const [dpr, setDpr] = useState(1.5)

  return (
    <div className="w-full h-full min-h-100 cursor-move">
      <Canvas 
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={dpr}
        camera={{ position: [150, 50, 100], fov: 35 }}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true
        }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        <Suspense fallback={null}>
          <Stage 
            preset="rembrandt" 
            intensity={2.5}
            environment="city" 
            adjustCamera={0.9} 
            shadows="contact"
          >
            <Center>
              <Model />
            </Center>
          </Stage>
          
          <OrbitControls 
            makeDefault
            enableZoom={true} 
            enablePan={true}
            enableDamping={true}
            dampingFactor={0.07}
            rotateSpeed={0.5}
          />
          
          <ambientLight intensity={0.4} />
          <pointLight position={[-50, 20, -50]} intensity={3} color="#ffffff" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Pre-cargar el modelo una sola vez
useGLTF.preload('/ichigo_sword_the_second_mode.glb')

