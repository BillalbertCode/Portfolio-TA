'use client'

import { 
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
  Center,
  Environment,
  OrbitControls, 
  PerformanceMonitor,
  Preload,
  useGLTF,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF('/ichigo_sword_the_second_mode.glb')
  const groupRef = useRef<THREE.Group>(null)
  
  // Uniforms for the scan shader
  const uniforms = useRef({
    uScanPos: { value: -100 },
    uScanColor: { value: new THREE.Color('#ffffff') },
    uScanIntensity: { value: 0 }
  })

  // Nuanced material setup with shader injection
  useLayoutEffect(() => {
    if (!scene) return
    scene.traverse((node: THREE.Object3D) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial
          material.roughness = 0.1
          material.metalness = 0.9
          material.envMapIntensity = 2.5

          // Inject scan effect shader
          material.onBeforeCompile = (shader) => {
            shader.uniforms.uScanPos = uniforms.current.uScanPos
            shader.uniforms.uScanColor = uniforms.current.uScanColor
            shader.uniforms.uScanIntensity = uniforms.current.uScanIntensity

            shader.vertexShader = `
              varying vec3 vWorldPos;
              ${shader.vertexShader}
            `.replace(
              '#include <worldpos_vertex>',
              `
              #include <worldpos_vertex>
              vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
              `
            )

            shader.fragmentShader = `
              varying vec3 vWorldPos;
              uniform float uScanPos;
              uniform vec3 uScanColor;
              uniform float uScanIntensity;
              ${shader.fragmentShader}
            `.replace(
              '#include <dithering_fragment>',
              `
              #include <dithering_fragment>
              float scanWidth = 1.5;
              float dist = abs(vWorldPos.x - uScanPos);
              if (dist < scanWidth) {
                float glow = 1.0 - (dist / scanWidth);
                gl_FragColor.rgb += uScanColor * glow * uScanIntensity * 2.0;
              }
              `
            )
          }
          material.needsUpdate = true
        }
      }
    })
  }, [scene])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    // Entrance animation: smoothly lerp scale to 5
    if (groupRef.current) {
      const targetScale = 5
      if (groupRef.current.scale.x < targetScale - 0.001) {
        groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.04)
      }
    }

    // Scan effect logic
    const cycleTime = 4
    const localT = (t % cycleTime) / cycleTime

    if (localT < 0.4) {
      const progress = localT / 0.4
      uniforms.current.uScanPos.value = THREE.MathUtils.lerp(15, -60, progress)
      uniforms.current.uScanIntensity.value = 1.0
    } else {
      uniforms.current.uScanIntensity.value = 0
    }
  })

  return (
    <group 
      ref={groupRef} 
      rotation={[Math.PI / -100, Math.PI / 2.5, 6]} 
      position={[0, 0, 0]} 
      scale={0} 
    >
      <primitive object={scene} />
    </group>
  )
}

export default function ModelViewer() {
  const [dpr, setDpr] = useState(1.5)
  const [shouldRender, setShouldRender] = useState(false)

  // Hydration Deferral
  useEffect(() => {
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setShouldRender(true))
      } else {
        setShouldRender(true)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!shouldRender) return <div className="w-full h-full min-h-100 bg-transparent" />

  return (
    <div className="w-full h-full min-h-100 cursor-move">
      <Canvas 
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={dpr}
        camera={{ position: [52.107, 34.203, 36.686], fov: 30 }} 
        gl={{ 
          antialias: false,
          powerPreference: "default",
          alpha: true,
          stencil: false,
          depth: true,
        }}
        flat
      >
        <PerformanceMonitor 
          flipflops={3}
          onFallback={() => setDpr(1)}
          onDecline={() => setDpr(1)} 
          onIncline={() => setDpr(2)} 
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        <Suspense fallback={null}>
          <Environment preset="city" /> 
          <Center>
            <Model />
          </Center>
          
          <OrbitControls 
            makeDefault
            target={[-2.893, 16.203, -3.314]}
            enableZoom={true} 
            enablePan={true}
            enableDamping={true}
            dampingFactor={0.07}
            rotateSpeed={0.5}
          />
          
          <ambientLight intensity={0.9} />
          <pointLight position={[-50, 20, -50]} intensity={5} color="#ffffff" />
          <spotLight
            position={[20, 50, 20]}
            angle={0.3}
            penumbra={0.5}
            intensity={7}
          />
          <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
          <BakeShadows />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Pre-cargar el modelo una sola vez
useGLTF.preload('/ichigo_sword_the_second_mode.glb')
