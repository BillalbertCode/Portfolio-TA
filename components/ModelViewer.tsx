'use client'

import { 
  Center,
  OrbitControls, 
  Preload,
  Stage, 
  useGLTF,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import React, { Suspense } from 'react'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF('/ichigo_sword_the_second_mode.glb')
  const scanLightRef = React.useRef<THREE.SpotLight | null>(null)
  const lightTargetRef = React.useRef<THREE.Object3D>(new THREE.Object3D())

  React.useEffect(() => {
    if (!scene) return
    scene.add(lightTargetRef.current)

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

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
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
      scanLightRef.current.intensity = 0
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
      />
    </group>
  )
}


export default function ModelViewer() {
  return (
    <div className="w-full h-full min-h-100 cursor-move">
      <Canvas 
        shadows 
        dpr={1}
        camera={{ position: [150, 50, 100], fov: 35 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Stage 
            preset="rembrandt" 
            intensity={2.5} // Brillo aumentado para contraste metálico
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
          {/* Luz en posición opuesta y más brillante */}
          <pointLight position={[-50, 20, -50]} intensity={3} color="#ffffff" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Pre-cargar el modelo una sola vez
useGLTF.preload('/ichigo_sword_the_second_mode.glb')

