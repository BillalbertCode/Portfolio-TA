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
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

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
  const { scene } = useGLTF('/ichigo_sword_the_second_mode.glb')
  const scanLightRef = React.useRef<THREE.SpotLight>(null!)
  const lightTargetRef = React.useRef<THREE.Object3D>(new THREE.Object3D())

  // Referencia a un punto fijo de la espada para que la luz lo siga
  React.useEffect(() => {
    scene.add(lightTargetRef.current)
  }, [scene])

  // Configuración inicial de materiales
  scene.traverse((node: any) => {
    if (node.isMesh) {
      node.castShadow = true
      node.receiveShadow = true
      // Aseguramos que el material sea receptivo a luces puntuales intensas
      if (node.material) {
        node.material.roughness = 0.2 // Más reflectante
        node.material.metalness = 0.8 // Más metálico
        node.material.emissiveIntensity = 0 // Quitamos el pulso anterior
      }
    }
  })

  // Animación del "escaneo" de luz (reflejo deslizante)
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Ciclo cada 4 segundos
    const cycleTime = 4
    const localT = (t % cycleTime) / cycleTime // 0 a 1 cada 4s

    if (scanLightRef.current) {
      // Solo activamos la luz en la primera mitad del ciclo para el efecto de "pasada"
      if (localT < 0.4) {
        const progress = localT / 0.4 // 0 a 1 durante el escaneo
        // La espada mide de X: -55 a 10. Deslizamos la luz a lo largo de este eje.
        const xPos = THREE.MathUtils.lerp(15, -60, progress)

        scanLightRef.current.intensity = 50 // Mucha intensidad para el glint
        scanLightRef.current.position.set(xPos, 15, 5) // Se desliza sobre el filo
        lightTargetRef.current.position.set(xPos, 0, 0)
      } else {
        scanLightRef.current.intensity = 0 // Apagado el resto del tiempo
      }
    }
  })

  return (
    <group rotation={[Math.PI / -100, Math.PI / 2.5, 6]}>
      <primitive object={scene} />
      {/* Luz de escaneo que vive dentro del espacio local de la espada */}
      <spotLight 
        ref={scanLightRef}
        target={lightTargetRef.current}
        angle={0.2}
        penumbra={0.5}
        color="#ffffff"
        distance={40}
      />
    </group>
  )
}


export default function ModelViewer() {
  return (
    <div className="w-full h-full min-h-100 cursor-move">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [150, 50, 100], fov: 35 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>
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

