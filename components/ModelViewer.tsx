'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei'

function Model() {
  const gltf = useGLTF('/tensa_zangetsu.glb')
  return <primitive object={gltf.scene} scale={2} position={[0, 0, 0]} />
}

export default function ModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, 5]} intensity={0.5} />
      <Model />
      <OrbitControls autoRotate autoRotateSpeed={3} enableZoom={true} />
    </Canvas>
  )
}
