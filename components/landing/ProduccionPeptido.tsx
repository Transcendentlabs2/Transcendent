"use client";
import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Html } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';

// --- 1. COMPONENTE DEL VIAL ANIMADO ---
// Usamos "a" (animated) de react-spring para envolver elementos 3D que se animarán
const AnimatedMesh = a.mesh;
const AnimatedGroup = a.group;

interface VialProps {
  phase: number;
}

const ProceduralVial: React.FC<VialProps> = ({ phase }) => {
  const laserRef = useRef<THREE.Mesh>(null);

  // Animaciones controladas por la fase actual
  const { capY, powderOpacity, liquidOpacity, laserOpacity } = useSpring({
    capY: phase >= 2 ? 1.5 : 2.5, // El tapón baja en la fase 2
    powderOpacity: phase >= 1 ? 1 : 0, // El polvo aparece en la fase 1
    liquidOpacity: phase >= 1 ? 0 : 0.6, // El líquido desaparece en la fase 1
    laserOpacity: phase === 3 ? 1 : 0, // El láser solo se enciende en la fase 3
    config: { mass: 1, tension: 170, friction: 26 }, // Física fluida tipo Apple
  });

  // Animación continua del láser (escaneo arriba y abajo)
  useFrame((state) => {
    if (laserRef.current && phase === 3) {
      laserRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.8;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* --- EL CRISTAL (Cuerpo del vial) --- */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[1, 1, 2.5, 64]} />
        {/* Material Físico Avanzado para simular vidrio realista */}
        <meshPhysicalMaterial 
          transmission={1} 
          roughness={0.05} 
          thickness={0.5} 
          envMapIntensity={2} 
          clearcoat={1}
          transparent={true}
        />
      </mesh>

      {/* --- LA ETIQUETA (Mockup) --- 
          NOTA: Aquí es donde cargarías la textura de tu foto real.
          Ejemplo: const texture = useLoader(THREE.TextureLoader, '/etiqueta.jpg');
      */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[1.01, 1.01, 1.2, 64]} />
        <meshStandardMaterial color="#f8f9fa" />
        {/* Para usar tu imagen, cambiarías a: <meshStandardMaterial map={texture} /> */}
      </mesh>

      {/* --- LÍQUIDO / POLVO LIOFILIZADO --- */}
      <group position={[0, 0.2, 0]}>
        {/* Líquido inicial */}
        <AnimatedMesh scale={[0.95, 0.3, 0.95]} material-opacity={liquidOpacity} material-transparent={true}>
          <cylinderGeometry args={[1, 1, 1, 32]} />
          <meshStandardMaterial color="#e0f2fe" roughness={0} />
        </AnimatedMesh>
        
        {/* Polvo cristalizado (Tesamorelin) */}
        <AnimatedMesh scale={[0.95, 0.3, 0.95]} material-opacity={powderOpacity} material-transparent={true}>
          <cylinderGeometry args={[1, 1, 1, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </AnimatedMesh>
      </group>

      {/* --- TAPA Y TAPÓN DE GOMA --- */}
      <AnimatedGroup position-y={capY}>
        {/* Tapón de goma */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
          <meshStandardMaterial color="#333333" roughness={0.8} />
        </mesh>
        {/* Tapa metálica azul (Idéntica al Tesamorelin) */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.3, 32]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.9} roughness={0.2} />
        </mesh>
      </AnimatedGroup>

      {/* --- LÁSER DE INSPECCIÓN --- */}
      <AnimatedMesh ref={laserRef} position={[0, 1, 1.1]} material-opacity={laserOpacity} material-transparent={true}>
        <boxGeometry args={[2.5, 0.05, 0.05]} />
        <meshBasicMaterial color="#00ffcc" />
      </AnimatedMesh>
      
      {/* Luz del láser que ilumina el frasco */}
      {phase === 3 && (
        <pointLight position={[0, 1, 1.2]} color="#00ffcc" intensity={2} distance={3} />
      )}
    </group>
  );
};

// --- 2. COMPONENTE PRINCIPAL (UI + Canvas) ---
export default function PeptideSimulation() {
  // Estado para controlar las fases: 0=Inicio, 1=Liofilización, 2=Sellado, 3=Inspección
  const [phase, setPhase] = useState<number>(0);

  const steps = [
    { id: 0, label: "Preparación" },
    { id: 1, label: "Liofilización" },
    { id: 2, label: "Sellado" },
    { id: 3, label: "Escaneo QA" }
  ];

  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10">
      
      {/* CAPA 3D */}
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        {/* Iluminación de estudio "Premium" */}
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} intensity={2} angle={0.15} penumbra={1} castShadow />
        <Environment preset="city" /> {/* Esto da los reflejos realistas al cristal */}
        
        {/* Sombra base suave */}
        <ContactShadows position={[0, -1.05, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        
        <ProceduralVial phase={phase} />
        
        {/* Controles para que el usuario pueda rotar con el dedo/mouse suavemente */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={phase === 3} autoRotateSpeed={2} />
      </Canvas>

      {/* CAPA UI (Controles superpuestos) */}
      <div className="absolute bottom-8 left-0 w-full px-6 flex flex-col items-center pointer-events-none">
        
        {/* Panel de Información Holográfica (Solo en fase 3) */}
        <div className={`mb-8 p-4 bg-black/40 backdrop-blur-md border border-[#00ffcc]/30 rounded-xl transition-all duration-500 transform ${phase === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-[#00ffcc] font-mono text-xs md:text-sm tracking-widest text-center">
              SCAN COMPLETED <br/>
              <span className="font-bold text-white text-lg">PUREZA: 99.8%</span>
            </p>
        </div>

        {/* Botones de Control */}
        <div className="flex gap-2 p-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 pointer-events-auto">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setPhase(step.id)}
              className={`px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${
                phase === step.id 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}