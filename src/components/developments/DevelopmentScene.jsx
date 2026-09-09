'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Environment,
    ContactShadows,
    Html,
    useProgress,
} from '@react-three/drei';
import * as THREE from 'three';
import DevelopmentModel from './DevelopmentModel';

function Loader() {
    const { progress } = useProgress();

    return (
        <Html center>
            <div className="flex flex-col items-center gap-4 text-[#F4F1EA]">
                <div className="h-px w-24 overflow-hidden bg-white/10">
                    <div
                        className="h-full bg-[#C5A880] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-[9px] uppercase tracking-[0.35em] text-white/40">
                    Loading {Math.round(progress)}%
                </span>
            </div>
        </Html>
    );
}

function SceneController({ progressRef, model }) {
    const { camera } = useThree();
    const groupRef = useRef(null);
    const cameraTarget = useRef(new THREE.Vector3());
    const lookTarget = useRef(new THREE.Vector3());

    useFrame((state, delta) => {
        const progress = progressRef.current || 0;

        const intro = Math.min(progress / 0.22, 1);
        const orbit = THREE.MathUtils.clamp((progress - 0.18) / 0.5, 0, 1);
        const detail = THREE.MathUtils.clamp((progress - 0.55) / 0.25, 0, 1);
        const outro = THREE.MathUtils.clamp((progress - 0.78) / 0.22, 0, 1);

        const easedIntro = THREE.MathUtils.smoothstep(intro, 0, 1);
        const easedOrbit = THREE.MathUtils.smoothstep(orbit, 0, 1);
        const easedDetail = THREE.MathUtils.smoothstep(detail, 0, 1);
        const easedOutro = THREE.MathUtils.smoothstep(outro, 0, 1);

        const angle = THREE.MathUtils.lerp(
            -0.55,
            Math.PI * 1.35,
            easedOrbit
        );

        const radius = THREE.MathUtils.lerp(
            12,
            7.2,
            easedDetail
        );

        const height = THREE.MathUtils.lerp(
            5.8,
            3.4,
            easedDetail
        );

        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        const finalRadius = THREE.MathUtils.lerp(radius, 13, easedOutro);

        cameraTarget.current.set(
            Math.sin(angle) * finalRadius,
            THREE.MathUtils.lerp(height, 7, easedOutro),
            Math.cos(angle) * finalRadius
        );

        camera.position.lerp(cameraTarget.current, 1 - Math.pow(0.001, delta));

        const targetY = THREE.MathUtils.lerp(
            0,
            0.5,
            easedIntro
        );

        lookTarget.current.set(0, targetY, 0);
        camera.lookAt(lookTarget.current);

        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                -0.2,
                Math.PI * 0.35,
                easedOrbit
            );

            groupRef.current.position.y = THREE.MathUtils.lerp(
                -2.2,
                0,
                easedIntro
            );

            const scale = THREE.MathUtils.lerp(
                0.72,
                1,
                easedIntro
            );

            groupRef.current.scale.setScalar(
                THREE.MathUtils.lerp(scale, 0.82, easedOutro)
            );

            groupRef.current.position.y +=
                Math.sin(state.clock.elapsedTime * 0.55) * 0.015;
        }
    });

    return (
        <group ref={groupRef}>
            <DevelopmentModel url={model} />
        </group>
    );
}

export default function DevelopmentScene({ model, progressRef }) {
    return (
        <Canvas
            dpr={[1, 1.5]}
            camera={{
                position: [12, 5.8, 12],
                fov: 32,
                near: 0.1,
                far: 200,
            }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            }}
            shadows
        >
            <color attach="background" args={['#090A0D']} />

            <ambientLight intensity={0.55} />

            <directionalLight
                position={[8, 12, 8]}
                intensity={3}
                color="#fff7e8"
                castShadow
                shadow-mapSize={[1024, 1024]}
            />

            <directionalLight
                position={[-8, 5, -6]}
                intensity={1.2}
                color="#c5a880"
            />

            <Suspense fallback={<Loader />}>
                <SceneController
                    progressRef={progressRef}
                    model={model}
                />

                <Environment preset="city" />

                <ContactShadows
                    position={[0, -2.15, 0]}
                    opacity={0.38}
                    scale={18}
                    blur={2.8}
                    far={8}
                    resolution={512}
                />
            </Suspense>
        </Canvas>
    );
}