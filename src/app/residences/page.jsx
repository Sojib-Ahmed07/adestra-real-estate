'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowUpRight, Maximize2, Compass, Home, MapPin, Layers } from 'lucide-react';
import LuxuryNavbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

// A sophisticated procedural modern 3D building/villa generator for properties
function ArchitecturalModel({ type }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  // Render different premium structural setups based on property type
  if (type === 'penthouses') {
    return (
      <group ref={meshRef} position={[0, -1.5, 0]}>
        {/* Tower Core / Base */}
        <mesh castShadow receiveShadow position={[0, 1.8, 0]}>
          <boxGeometry args={[1.5, 3.6, 1.5]} />
          <meshStandardMaterial color="#1a1c23" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Sky Villa / Glass Terraces */}
        {[1, 2, 3].map((i) => (
          <group key={i} position={[0, i * 0.9, 0]}>
            {/* Glass panels */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.7, 0.1, 1.7]} />
              <meshStandardMaterial color="#c5a880" roughness={0.1} metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.4, 0]}>
              <boxGeometry args={[1.65, 0.8, 1.65]} />
              <meshPhysicalMaterial 
                color="#a5c4d4" 
                transmission={0.6} 
                opacity={0.5} 
                transparent 
                roughness={0.1} 
                thickness={0.5}
              />
            </mesh>
          </group>
        ))}
        {/* Golden Crown */}
        <mesh castShadow position={[0, 3.7, 0]}>
          <boxGeometry args={[1.8, 0.2, 1.8]} />
          <meshStandardMaterial color="#c5a880" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>
    );
  }

  if (type === 'private-estates') {
    return (
      <group ref={meshRef} position={[0, -0.8, 0]}>
        {/* Minimalist Pavilion Ground Floor */}
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[3.2, 0.6, 2.2]} />
          <meshStandardMaterial color="#e8e4db" roughness={0.5} />
        </mesh>
        {/* First Floor Offset */}
        <mesh castShadow position={[0.4, 0.9, 0.2]}>
          <boxGeometry args={[2.2, 0.6, 1.8]} />
          <meshStandardMaterial color="#2d2f36" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Floating Overhang Slab */}
        <mesh castShadow position={[-0.5, 1.25, 0]}>
          <boxGeometry args={[2.0, 0.1, 2.4]} />
          <meshStandardMaterial color="#c5a880" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Pillars */}
        <mesh position={[-1.3, 0.45, 0.9]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9]} />
          <meshStandardMaterial color="#111" metalness={0.9} />
        </mesh>
        <mesh position={[-1.3, 0.45, -0.9]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9]} />
          <meshStandardMaterial color="#111" metalness={0.9} />
        </mesh>
        {/* Pool plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 1.4]}>
          <planeGeometry args={[2.5, 0.8]} />
          <meshStandardMaterial color="#4fa3cc" roughness={0.05} metalness={0.8} />
        </mesh>
      </group>
    );
  }

  // default: waterfront-estates / waterfront
  return (
    <group ref={meshRef} position={[0, -0.8, 0]}>
      {/* Curved Sculptural Architecture */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.4, 1.6, 1.0, 32]} />
        <meshStandardMaterial color="#eef1f6" roughness={0.3} />
      </mesh>
      {/* Cantilever block */}
      <mesh castShadow position={[0.3, 1.1, 0.3]}>
        <boxGeometry args={[2.2, 0.5, 1.4]} />
        <meshStandardMaterial color="#c5a880" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Floating wood deck */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[4.0, 0.1, 4.0]} />
        <meshStandardMaterial color="#916c47" roughness={0.8} />
      </mesh>
      {/* Blue Water Base Surround */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[2.2, 4.0, 32]} />
        <meshStandardMaterial color="#1a6d96" roughness={0.1} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

const PROPERTIES_DATA = [
  {
    id: 'lume-penthouse',
    name: 'Aurelia Sky Residence',
    category: 'penthouses',
    location: 'Gulshan-2, Dhaka',
    price: '$2.4M',
    area: '6,400 sqft',
    description: 'An elevated marvel designed by Valois. Hovering above the cityscape with private glass elevators, infinite-edge skypool, and custom Italian marble finishes.',
    specs: { beds: 5, baths: 6, levels: 3 }
  },
  {
    id: 'vanguard-penthouse',
    name: 'The Crown Penthouse',
    category: 'penthouses',
    location: 'Banani, Dhaka',
    price: '$1.9M',
    area: '5,200 sqft',
    description: 'Featuring 360-degree panoramic skyline views, a private sky lounge, and modular double-height volume spaces designed for slower luxury living.',
    specs: { beds: 4, baths: 5, levels: 2 }
  },
  {
    id: 'nera-estate',
    name: 'The Obsidian Pavilion',
    category: 'private-estates',
    location: 'Purbachal Sector 4, Dhaka',
    price: '$3.8M',
    area: '12,500 sqft',
    description: 'Secluded luxury villa enclosed in lush nature. Sculpted with dark textured granite, glass panes, and linear water runways flowing through the central living pavilion.',
    specs: { beds: 6, baths: 8, levels: 2 }
  },
  {
    id: 'solara-estate',
    name: 'Solara Meadows',
    category: 'private-estates',
    location: 'Baridhara Diplomatic Zone, Dhaka',
    price: '$4.2M',
    area: '9,800 sqft',
    description: 'A structural blend of French colonial and modern minimalist design, offering complete privacy, smart climate control, and a landscaped multi-tier organic garden.',
    specs: { beds: 5, baths: 6, levels: 2 }
  },
  {
    id: 'arco-waterfront',
    name: 'Maison du Lac',
    category: 'waterfront',
    location: 'Lake Crescent, Gulshan',
    price: '$5.1M',
    area: '10,200 sqft',
    description: 'An exceptional waterfront architectural masterpiece overlooking the serene lake waters. Sculptural curved facades interact seamlessly with morning and evening reflections.',
    specs: { beds: 5, baths: 7, levels: 3 }
  }
];

function ResidencesContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'all';

  const [activeTab, setActiveTab] = useState(initialType);
  const [selectedProperty, setSelectedProperty] = useState(() => {
    if (initialType && initialType !== 'all') {
      return PROPERTIES_DATA.find(p => p.category === initialType) || PROPERTIES_DATA[0];
    }
    return PROPERTIES_DATA[0];
  });

  // Track the previous initialType to sync state during rendering
  const [prevInitialType, setPrevInitialType] = useState(initialType);

  if (initialType !== prevInitialType) {
    setPrevInitialType(initialType);
    setActiveTab(initialType);
    const matchedProp = PROPERTIES_DATA.find(p => p.category === initialType);
    if (matchedProp) {
      setSelectedProperty(matchedProp);
    } else if (initialType === 'all') {
      setSelectedProperty(PROPERTIES_DATA[0]);
    }
  }

  const filteredProperties = activeTab === 'all' 
    ? PROPERTIES_DATA 
    : PROPERTIES_DATA.filter(p => p.category === activeTab);

  const selectPropertyHandler = (prop) => {
    setSelectedProperty(prop);
  };

  return (
    <main className="bg-[#0B0D12] min-h-screen text-[#F4F1EA] pt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Heading & Property Selector Pane (Left 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A880]" />
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
                3D Interactive Collection
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight leading-none mb-8">
              Explore Our <span className="italic text-[#C5A880]">Residences</span>
            </h1>

            {/* Premium Custom Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {['all', 'penthouses', 'private-estates', 'waterfront'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    const firstMatch = tab === 'all' 
                      ? PROPERTIES_DATA[0] 
                      : PROPERTIES_DATA.find(p => p.category === tab);
                    if (firstMatch) setSelectedProperty(firstMatch);
                  }}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all duration-300 rounded-full ${
                    activeTab === tab
                      ? 'bg-[#C5A880] text-[#0B0D12] border-[#C5A880]'
                      : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Scrollable list of properties in filtered group */}
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => selectPropertyHandler(prop)}
                  className={`p-5 rounded-xl border transition-all duration-500 cursor-pointer flex justify-between items-center group ${
                    selectedProperty.id === prop.id
                      ? 'bg-[#161820] border-[#C5A880]/60 shadow-[0_4px_30px_rgba(197,168,128,0.1)]'
                      : 'border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div>
                    <span className="text-[9px] text-[#C5A880] uppercase tracking-widest font-mono">
                      {prop.category.replace('-', ' ')}
                    </span>
                    <h3 className="text-lg font-light tracking-tight mt-1 group-hover:text-[#C5A880] transition-colors duration-300">
                      {prop.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-white/40 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-[#C5A880]" /> {prop.location}
                      </span>
                      <span>•</span>
                      <span>{prop.area}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-md font-semibold text-[#C5A880]">{prop.price}</span>
                    <span className="block text-[8px] text-white/30 uppercase mt-1 tracking-widest">Select to View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Technical Specs Overlay */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <h4 className="text-[9px] uppercase tracking-[0.3em] text-white/35 mb-4">Architectural Blueprint</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                <span className="block text-[8px] uppercase tracking-wider text-white/40">Bedrooms</span>
                <span className="text-lg font-light text-[#C5A880]">{selectedProperty.specs.beds} Beds</span>
              </div>
              <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                <span className="block text-[8px] uppercase tracking-wider text-white/40">Bathrooms</span>
                <span className="text-lg font-light text-[#C5A880]">{selectedProperty.specs.baths} Baths</span>
              </div>
              <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                <span className="block text-[8px] uppercase tracking-wider text-white/40">Storeys</span>
                <span className="text-lg font-light text-[#C5A880]">{selectedProperty.specs.levels} Floors</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3D Visualizer & Description Pane (Right 7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Interactive R3F 3D Canvas Container */}
          <div className="relative h-[480px] w-full bg-[#0E1017] rounded-2xl overflow-hidden border border-white/5 shadow-inner">
            
            {/* Absolute UI overlay inside the 3D viewer */}
            <div className="absolute top-5 left-5 z-10 pointer-events-none">
              <span className="bg-[#0B0D12]/75 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] border border-white/15 text-[#C5A880] inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live 3D Renderer
              </span>
            </div>

            <div className="absolute bottom-5 right-5 z-10 pointer-events-none bg-[#0B0D12]/75 backdrop-blur-md px-4 py-2.5 rounded-xl text-right border border-white/15">
              <span className="block text-[9px] uppercase tracking-wider text-[#C5A880] font-mono">3D Axis Controller</span>
              <span className="text-[10px] text-white/50">Drag to Rotate | Scroll to Zoom</span>
            </div>

            {/* R3F WebGL Canvas */}
            <Canvas
              camera={{ position: [5, 4, 5], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
              shadows
            >
              <color attach="background" args={['#0E1017']} />
              
              <ambientLight intensity={0.6} />
              
              <directionalLight
                position={[5, 10, 5]}
                intensity={2.2}
                castShadow
                shadow-mapSize={[1024, 1024]}
                color="#fffcf5"
              />
              <directionalLight
                position={[-5, 5, -5]}
                intensity={0.8}
                color="#c5a880"
              />
              
              <Suspense fallback={
                <Html center>
                  <div className="flex flex-col items-center gap-3 text-white/50">
                    <div className="h-0.5 w-16 bg-[#C5A880] animate-pulse" />
                    <span className="text-[9px] uppercase tracking-widest">Initializing Engine</span>
                  </div>
                </Html>
              }>
                <ArchitecturalModel type={selectedProperty.category} />
                
                <Environment preset="city" />
                
                <ContactShadows
                  position={[0, -0.85, 0]}
                  opacity={0.35}
                  scale={8}
                  blur={2.4}
                  far={4}
                />
              </Suspense>

              <OrbitControls 
                enablePan={false} 
                minDistance={3.5} 
                maxDistance={12} 
                maxPolarAngle={Math.PI / 2.1} 
              />
            </Canvas>
          </div>

          {/* Elegant descriptive card of selected property */}
          <div className="bg-[#141620] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start border-b border-white/5 pb-5 mb-5">
                <div>
                  <h2 className="text-2xl font-serif font-light tracking-tight text-white mb-2">
                    {selectedProperty.name}
                  </h2>
                  <p className="text-xs text-[#C5A880] uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <MapPin size={12} /> {selectedProperty.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-1">Purchase Value</span>
                  <span className="text-2xl font-serif text-[#C5A880] font-light">{selectedProperty.price}</span>
                </div>
              </div>

              <p className="text-sm font-light leading-relaxed text-white/60 mb-6">
                {selectedProperty.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              <div className="flex gap-6 text-xs text-white/40 font-light">
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-0.5">Total Area</span>
                  <span className="text-white font-medium">{selectedProperty.area}</span>
                </div>
                <div className="h-8 w-px bg-white/5" />
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-0.5">Design Style</span>
                  <span className="text-white font-medium">Modernist restraint</span>
                </div>
              </div>

              <a
                href={`/contact?property=${selectedProperty.id}`}
                className="inline-flex items-center justify-center gap-3 bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-[0.2em] px-6 py-4 rounded-xl transition-all duration-300 hover:bg-[#F4F1EA] shadow-xl shadow-[#C5A880]/5"
              >
                Inquire About Property
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

export default function ResidencesPage() {
  return (
    <>
      <LuxuryNavbar />
      <Suspense fallback={
        <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center text-white/50">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-t-2 border-[#C5A880] rounded-full animate-spin mx-auto" />
            <span className="text-xs uppercase tracking-widest">Loading Portfolio...</span>
          </div>
        </div>
      }>
        <ResidencesContent />
      </Suspense>
      <Footer />
    </>
  );
}
