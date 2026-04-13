"use client";
import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  ContactShadows,
  MeshTransmissionMaterial 
} from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';

// --- 1. GEOMETRÍA DEL VIAL (Perfil idéntico a la foto) ---
const VialShape = () => {
  const points = useMemo(() => {
    const pts = [];
    // Puntos (x, y) que dibujan la silueta desde el centro (0,0)
    pts.push(new THREE.Vector2(0, 0));       // Centro base
    pts.push(new THREE.Vector2(0.85, 0));    // Borde base
    pts.push(new THREE.Vector2(0.9, 0.1));   // Curva base inferior
    pts.push(new THREE.Vector2(0.9, 2.2));   // Cuerpo recto
    pts.push(new THREE.Vector2(0.8, 2.4));   // Hombro
    pts.push(new THREE.Vector2(0.65, 2.5));  // Cuello
    pts.push(new THREE.Vector2(0.65, 2.8));  // Altura cuello
    pts.push(new THREE.Vector2(0.75, 2.85)); // Labio superior
    pts.push(new THREE.Vector2(0.75, 3.0));  // Grosor boca
    return pts;
  }, []);

  return <latheGeometry args={[points, 64]} />;
};

// --- 2. COMPONENTE DEL PRODUCTO ---
const TesamorelinVial = ({ phase }: { phase: number }) => {
  // Animación del tapón y la tapa azul
  const { capPos, powderScale } = useSpring({
    capPos: phase >= 2 ? [0, 2.75, 0] : [0, 3.8, 0],
    powderScale: phase >= 1 ? [0.85, 0.4, 0.85] : [0.85, 0.01, 0.85],
    config: { mass: 1, tension: 120, friction: 20 }
  });

  return (
    <group position={[0, -1.5, 0]}>
      {/* CUERPO DE CRISTAL - Estilo Apple con refracción avanzada */}
      <mesh>
        <VialShape />
        <MeshTransmissionMaterial 
          backside 
          samples={4} 
          thickness={0.2} 
          chromaticAberration={0.02} 
          anisotropy={0.1} 
          distortion={0.1} 
          distortionScale={0.1} 
          temporalDistortion={0.1} 
          transparent
        />
      </mesh>

      {/* POLVO LIOFILIZADO (Tesamorelin) */}
      <a.mesh position={[0, 0.3, 0]} scale={powderScale as any}>
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </a.mesh>

      {/* ETIQUETA (Placeholder de alta calidad) */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.91, 0.91, 1.5, 64, 1, true]} />
        <meshStandardMaterial 
          color="white" 
          side={THREE.DoubleSide} 
          roughness={0.3}
        />
      </mesh>

      {/* TAPA AZUL METÁLICA (Idéntica a la foto) */}
      <a.group position={capPos as any}>
        {/* Tapa de Aluminio */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.35, 32]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Parte superior plástica */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
          <meshStandardMaterial color="#162c6b" roughness={0.5} />
        </mesh>
      </a.group>
    </group>
  );
};

// --- 3. ESCENA PRINCIPAL ---
export default function PeptideFactory() {
  const [phase, setPhase] = useState(0);

  return (
    <div className="w-full h-[600px] md:h-[850px] bg-neutral-950 relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={35} />
        
        {/* Iluminación de estudio */}
        <Environment preset="studio" />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-5, 2, -5]} color="#4287f5" intensity={0.5} />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <TesamorelinVial phase={phase} />
        </Float>

        <ContactShadows position={[0, -1.6, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.8} 
        />
      </Canvas>

      {/* CONTROLES UI */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 p-1.5 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10">
        {[0, 1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => setPhase(s)}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${
              phase === s 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
              : 'text-neutral-500 hover:text-white'
            }`}
          >
            {s === 0 && "Llenado"}
            {s === 1 && "Liofilización"}
            {s === 2 && "Sellado"}
            {s === 3 && "Inspección"}
          </button>
        ))}
      </div>
    </div>
  );
}