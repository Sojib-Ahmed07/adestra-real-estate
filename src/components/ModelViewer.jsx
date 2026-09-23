'use client';

import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Loader2, AlertCircle } from 'lucide-react';

// Error Boundary to catch 3D model loading / fetch failures
class ModelErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error) {
        console.error("Failed to load 3D GLTF model:", error);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 space-y-2 bg-[#0E1017]">
                    <AlertCircle className="h-6 w-6" />
                    <span className="text-xs uppercase tracking-widest text-white/60">
                        Unable to load 3D Model
                    </span>
                </div>
            );
        }
        return this.props.children;
    }
}

function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

export default function ModelViewer({ src, height = 'h-full' }) {
    if (!src) return null;

    return (
        <div className={`w-full ${height} bg-[#0E1017] relative`}>
            <ModelErrorBoundary key={src}>
                <Suspense
                    fallback={
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#C5A880] space-y-2 bg-[#0E1017]">
                            <Loader2 className="animate-spin h-6 w-6" />
                            <span className="text-[10px] uppercase tracking-widest text-white/40">
                                Loading 3D Scene...
                            </span>
                        </div>
                    }
                >
                    <Canvas camera={{ position: [0, 2, 5], fov: 45 }} shadows>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[10, 10, 5]} intensity={1.2} />
                        <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
                            <Model url={src} />
                        </Stage>
                        <OrbitControls enableZoom autoRotate autoRotateSpeed={0.8} makeDefault />
                    </Canvas>
                </Suspense>
            </ModelErrorBoundary>
        </div>
    );
}