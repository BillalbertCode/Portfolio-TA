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
import React, { Suspense, useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import { Color, Group,MathUtils,Mesh,MeshStandardMaterial,Object3D,PCFShadowMap,Timer, Vector3 } from 'three'

function Model({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF('/ichigo_sword_the_second_mode.glb')
  const groupRef = useRef<Group>(null)
  const timerRef = useRef(new Timer())
  const targetScale = isMobile ? 3.0 : 3.8

  // Uniforms for the scan shader
  const uniforms = useRef({
    uScanPos: { value: -100 },
    uScanColor: { value: new Color('#ffffff') },
    uScanIntensity: { value: 0 }
  })

  // Nuanced material setup with shader injection
  useLayoutEffect(() => {
    if (!scene) return
    scene.traverse((node: Object3D) => {
      if ((node as Mesh).isMesh) {
        const mesh = node as Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true

        if (mesh.material) {
          const material = mesh.material as MeshStandardMaterial
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

  useFrame(() => {
    // Update the timer for precise delta and elapsed time
    timerRef.current.update()
    const t = timerRef.current.getElapsed()

    // Entrance animation: smoothly lerp scale to targetScale
    if (groupRef.current) {
      if (Math.abs(groupRef.current.scale.x - targetScale) > 0.001) {
        groupRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.04)
      }
    }

    // Scan effect logic
    const cycleTime = 4
    const localT = (t % cycleTime) / cycleTime

    if (localT < 0.4) {
      const progress = localT / 0.4
      uniforms.current.uScanPos.value = MathUtils.lerp(15, -60, progress)
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

type State = {
  dpr: number
  shouldRender: boolean
  isMobile: boolean
}

type Action = 
  | { type: 'SET_DPR'; payload: number }
  | { type: 'SET_MOBILE'; payload: boolean }
  | { type: 'SET_RENDER'; payload: boolean }
  | { type: 'INIT'; isMobile: boolean }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DPR': return { ...state, dpr: action.payload }
    case 'SET_MOBILE': return { ...state, isMobile: action.payload }
    case 'SET_RENDER': return { ...state, shouldRender: action.payload }
    case 'INIT': return { ...state, isMobile: action.isMobile, shouldRender: true }
    default: return state
  }
}

const ModelViewer = React.memo(function ModelViewer() {
  const [state, dispatch] = useReducer(reducer, {
    dpr: 1.5,
    shouldRender: false,
    isMobile: false
  })

  const { dpr, shouldRender, isMobile } = state

  // Hydration Deferral and Screen Size Check
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 1024
    
    const onResize = () => dispatch({ type: 'SET_MOBILE', payload: checkMobile() })
    window.addEventListener('resize', onResize)

    const timer = setTimeout(() => {
      const initialMobile = checkMobile()
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => dispatch({ type: 'INIT', isMobile: initialMobile }))
      } else {
        dispatch({ type: 'INIT', isMobile: initialMobile })
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (!shouldRender) return <div className="w-full h-full min-h-100 bg-transparent" />

  return (
    <div className="w-full h-full min-h-100 cursor-move">
      <Canvas
        shadows={{ type: PCFShadowMap }}
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
          onFallback={() => dispatch({ type: 'SET_DPR', payload: 1 })}
          onDecline={() => dispatch({ type: 'SET_DPR', payload: 1 })}
          onIncline={() => dispatch({ type: 'SET_DPR', payload: 2 })}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Suspense fallback={null}>
          <Environment
            preset="studio"
            resolution={32}
            background={false}
          />
          <Center top={isMobile}>
            <Model isMobile={isMobile} />
          </Center>

          <OrbitControls
            makeDefault
            target={isMobile ? [0, 5, 0] : [-2.893, 13.3, -3.314]}
            enableZoom={false}
            enablePan={false}
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
})

export default ModelViewer

// Pre-cargar el modelo una sola vez
useGLTF.preload('/ichigo_sword_the_second_mode.glb')
