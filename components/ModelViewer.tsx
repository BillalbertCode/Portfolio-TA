'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  useGLTF, 
  Stage, 
  Center,
  useProgress,
  Html,
  Preload
} from '@react-three/drei'

// Loader elegante para el cambio de énfasis
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-accent animate-pulse uppercase">
          REVEALING SOUL {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  )
}

function Model() {
  // Cambio de modelo al Badge de Shinigami Sustituto
  const { scene } = useGLTF('/bleach_substitute_shinigami_badge.glb')
  
  // Habilitar sombras y asegurar que el material resalte (Wow factor para metal)
  scene.traverse((node: any) => {
    if (node.isMesh) {
      node.castShadow = true
      node.receiveShadow = true
      // Si el modelo tiene materiales, Stage se encargará de los reflejos
    }
  })

  // Posición inicial dinámica: un ángulo de 3/4 resalta mejor el volumen 3D
  return <primitive object={scene} rotation={[Math.PI / 8, Math.PI / 4, 0]} />
}

export default function ModelViewer() {
  return (
    <div className="w-full h-full min-h-100 cursor-move">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [150, 100, 80], fov: 35 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>

          <Stage 
            preset="rembrandt" 
            intensity={1} 
            environment="city" 
            adjustCamera={1.5} 
            shadows="contact"
          >
            <Center>
              <Model />
            </Center>
          </Stage>
          
          {/* 
            Control total:
            - Se eliminan los límites de Azimuth y Polar para permitir 360 grados
            - Se habilita el zoom y paneo para que el usuario "posea" el objeto
          */}
          <OrbitControls 
            makeDefault
            enableZoom={true} 
            enablePan={true}
            enableDamping={true}
            dampingFactor={0.07}
            rotateSpeed={0.5}
          />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Pre-cargar el nuevo Badge
useGLTF.preload('/bleach_substitute_shinigami_badge.glb')
