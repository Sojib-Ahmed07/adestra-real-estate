'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    PerspectiveCamera,
    Environment,
    ContactShadows,
    Preload,
    Html,
    useProgress,
} from '@react-three/drei';
import * as THREE from 'three';

import DevelopmentModel from './DevelopmentModel';

function Loader() {
    const { progress } = useProgress();

    return (
        <Html center>
            <div className="flex w-[260px] flex-col gap-4 rounded-2xl border border-white/10 bg-black/70 p-5 text-white shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
                        Loading architecture
                    </span>

                    <span className="font-mono text-[10px] text-white/50">
                        {Math.round(progress)}%
                    </span>
                </div>

                <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
                    <div
                        className="h-full bg-white transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </Html>
    );
}

function SceneCamera({ progressRef }) {
    const camera = useRef();

    const current = useRef({
        x: 18,
        y: 12,
        z: 29,
        lookX: 0,
        lookY: 8,
        lookZ: 0,
    });

    useFrame((state, delta) => {
        if (!camera.current) return;

        /*
         * IMPORTANT:
         * Scroll controls only a small amount of the camera.
         * The previous implementation moved the camera way too much.
         */
        const raw = progressRef?.current ?? 0;

        // Much slower / calmer scroll response
        const p = THREE.MathUtils.smoothstep(
            THREE.MathUtils.clamp(raw * 1.05, 0, 1),
            0,
            1
        );

        /*
         * HERO
         *
         * Camera starts fairly wide.
         */
        const targetX = THREE.MathUtils.lerp(17.5, 13.5, p);
        const targetY = THREE.MathUtils.lerp(11.5, 13.8, p);
        const targetZ = THREE.MathUtils.lerp(31, 28, p);

        const lookX = THREE.MathUtils.lerp(0.5, 2.2, p);
        const lookY = THREE.MathUtils.lerp(7.8, 9.2, p);
        const lookZ = THREE.MathUtils.lerp(0, -0.5, p);

        const smoothing = 1 - Math.pow(0.001, delta);

        current.current.x = THREE.MathUtils.lerp(
            current.current.x,
            targetX,
            smoothing
        );

        current.current.y = THREE.MathUtils.lerp(
            current.current.y,
            targetY,
            smoothing
        );

        current.current.z = THREE.MathUtils.lerp(
            current.current.z,
            targetZ,
            smoothing
        );

        current.current.lookX = THREE.MathUtils.lerp(
            current.current.lookX,
            lookX,
            smoothing
        );

        current.current.lookY = THREE.MathUtils.lerp(
            current.current.lookY,
            lookY,
            smoothing
        );

        current.current.lookZ = THREE.MathUtils.lerp(
            current.current.lookZ,
            lookZ,
            smoothing
        );

        camera.current.position.set(
            current.current.x,
            current.current.y,
            current.current.z
        );

        camera.current.lookAt(
            current.current.lookX,
            current.current.lookY,
            current.current.lookZ
        );

        /*
         * Tiny natural architectural-camera movement.
         * This is intentionally almost invisible.
         */
        const time = state.clock.elapsedTime;

        camera.current.position.x += Math.sin(time * 0.12) * 0.025;
        camera.current.position.y += Math.cos(time * 0.1) * 0.018;
    });

    return (
        <PerspectiveCamera
            ref={camera}
            makeDefault
            fov={39}
            near={0.1}
            far={300}
            position={[17.5, 11.5, 31]}
        />
    );
}

function Scene({ progressRef }) {
    return (
        <>
            <SceneCamera progressRef={progressRef} />

            <color attach="background" args={['#9dc8e7']} />

            {/* Sky / environment */}
            <Environment
                preset="city"
                environmentIntensity={0.7}
            />

            {/* Large soft daylight */}
            <hemisphereLight
                skyColor="#d9efff"
                groundColor="#52677b"
                intensity={2.1}
            />

            <directionalLight
                castShadow
                position={[20, 35, 20]}
                intensity={4.8}
                color="#fff3dc"
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={1}
                shadow-camera-far={100}
                shadow-camera-left={-40}
                shadow-camera-right={40}
                shadow-camera-top={40}
                shadow-camera-bottom={-20}
            />

            <directionalLight
                position={[-25, 20, -20]}
                intensity={1.5}
                color="#9bd8ff"
            />

            <directionalLight
                position={[0, 10, 35]}
                intensity={0.9}
                color="#ffffff"
            />

            <Suspense fallback={<Loader />}>
                <DevelopmentModel progressRef={progressRef} />

                <ContactShadows
                    position={[0, -2.9, 0]}
                    opacity={0.22}
                    scale={70}
                    blur={2.5}
                    far={25}
                />

                <Preload all />
            </Suspense>
        </>
    );
}

export default function DevelopmentScene({ progressRef }) {
    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance',
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.15,
            }}
        >
            <Scene progressRef={progressRef} />
        </Canvas>
    );
}