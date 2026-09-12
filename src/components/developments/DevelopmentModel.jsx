'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* =========================================================
   MATERIALS
========================================================= */

function createMaterials() {
    const glassBlue = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#23688c'),
        metalness: 0.78,
        roughness: 0.12,
        transmission: 0.08,
        transparent: true,
        opacity: 0.88,
        clearcoat: 0.85,
        clearcoatRoughness: 0.16,
        envMapIntensity: 1.8,
    });

    const glassDark = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#102b43'),
        metalness: 0.9,
        roughness: 0.13,
        transmission: 0.04,
        transparent: true,
        opacity: 0.94,
        clearcoat: 0.9,
        envMapIntensity: 1.6,
    });

    const glassWarm = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#a66f42'),
        metalness: 0.72,
        roughness: 0.16,
        transmission: 0.05,
        transparent: true,
        opacity: 0.92,
        clearcoat: 0.8,
        envMapIntensity: 1.5,
    });

    const mullion = new THREE.MeshStandardMaterial({
        color: '#152333',
        metalness: 0.95,
        roughness: 0.22,
    });

    const concrete = new THREE.MeshStandardMaterial({
        color: '#66727c',
        metalness: 0.25,
        roughness: 0.75,
    });

    const roof = new THREE.MeshStandardMaterial({
        color: '#1b2731',
        metalness: 0.9,
        roughness: 0.25,
    });

    const warmInterior = new THREE.MeshStandardMaterial({
        color: '#ffcc88',
        emissive: '#ff9d42',
        emissiveIntensity: 0.35,
        metalness: 0.15,
        roughness: 0.45,
    });

    return {
        glassBlue,
        glassDark,
        glassWarm,
        mullion,
        concrete,
        roof,
        warmInterior,
    };
}

/* =========================================================
   GLASS PANEL
========================================================= */

function GlassPanel({
    width,
    height,
    depth,
    position,
    material,
}) {
    return (
        <mesh
            position={position}
            material={material}
            castShadow
            receiveShadow
        >
            <boxGeometry args={[width, height, depth]} />
        </mesh>
    );
}

/* =========================================================
   CURTAIN WALL FLOOR
========================================================= */

function CurtainWallFloor({
    width,
    depth,
    y,
    bays,
    material,
    floorHeight = 0.78,
}) {
    const panelWidth = width / bays;

    const panels = [];

    for (let x = 0; x < bays; x++) {
        const px =
            -width / 2 +
            panelWidth / 2 +
            x * panelWidth;

        panels.push(
            <GlassPanel
                key={`glass-${x}`}
                width={panelWidth - 0.055}
                height={floorHeight - 0.08}
                depth={depth}
                position={[px, y, 0]}
                material={material}
            />
        );

        /*
         * Vertical mullion
         */
        if (x !== 0) {
            panels.push(
                <mesh
                    key={`mullion-${x}`}
                    position={[
                        -width / 2 + x * panelWidth,
                        y,
                        depth / 2 + 0.025,
                    ]}
                    material={material.__mullion || undefined}
                >
                    <boxGeometry
                        args={[0.045, floorHeight, 0.055]}
                    />
                </mesh>
            );
        }
    }

    return (
        <group>
            {panels}

            {/* floor line */}
            <mesh
                position={[0, y - floorHeight / 2, depth / 2 + 0.035]}
                material={materialsGlobal.mullion}
            >
                <boxGeometry args={[width, 0.055, 0.07]} />
            </mesh>
        </group>
    );
}

let materialsGlobal = {
    mullion: new THREE.MeshStandardMaterial({
        color: '#152333',
        metalness: 0.95,
        roughness: 0.2,
    }),
};

/* =========================================================
   MODERN GLASS TOWER
========================================================= */

function ModernTower({
    position = [0, 0, 0],
    width = 5,
    depth = 5,
    floors = 20,
    floorHeight = 0.82,
    material,
    taper = 0,
    roofDetail = true,
    rotation = 0,
}) {
    const group = useRef();

    const totalHeight = floors * floorHeight;

    const levels = [];

    for (let floor = 0; floor < floors; floor++) {
        const y = floorHeight / 2 + floor * floorHeight;

        /*
         * Very subtle taper.
         */
        const factor =
            1 -
            taper *
            Math.pow(
                floor / Math.max(1, floors - 1),
                1.5
            );

        const floorWidth = width * factor;
        const floorDepth = depth * factor;

        levels.push(
            <CurtainWallFloor
                key={floor}
                width={floorWidth}
                depth={floorDepth}
                y={y}
                bays={Math.max(5, Math.round(width * 2))}
                material={material}
                floorHeight={floorHeight}
            />
        );
    }

    return (
        <group
            ref={group}
            position={[
                position[0],
                position[1],
                position[2],
            ]}
            rotation={[0, rotation, 0]}
        >
            {levels}

            {/* Structural corners */}
            <mesh
                position={[
                    -width / 2,
                    totalHeight / 2,
                    -depth / 2,
                ]}
                material={materialsGlobal.mullion}
            >
                <boxGeometry
                    args={[
                        0.08,
                        totalHeight,
                        0.08,
                    ]}
                />
            </mesh>

            <mesh
                position={[
                    width / 2,
                    totalHeight / 2,
                    -depth / 2,
                ]}
                material={materialsGlobal.mullion}
            >
                <boxGeometry
                    args={[
                        0.08,
                        totalHeight,
                        0.08,
                    ]}
                />
            </mesh>

            <mesh
                position={[
                    -width / 2,
                    totalHeight / 2,
                    depth / 2,
                ]}
                material={materialsGlobal.mullion}
            >
                <boxGeometry
                    args={[
                        0.08,
                        totalHeight,
                        0.08,
                    ]}
                />
            </mesh>

            <mesh
                position={[
                    width / 2,
                    totalHeight / 2,
                    depth / 2,
                ]}
                material={materialsGlobal.mullion}
            >
                <boxGeometry
                    args={[
                        0.08,
                        totalHeight,
                        0.08,
                    ]}
                />
            </mesh>

            {/* Roof */}
            {roofDetail && (
                <group position={[0, totalHeight + 0.15, 0]}>
                    <mesh material={materialsGlobal.mullion}>
                        <boxGeometry
                            args={[
                                width * 0.94,
                                0.18,
                                depth * 0.94,
                            ]}
                        />
                    </mesh>

                    <mesh position={[0, 0.35, 0]}>
                        <boxGeometry
                            args={[
                                width * 0.42,
                                0.5,
                                depth * 0.42,
                            ]}
                        />
                        <meshStandardMaterial
                            color="#1a2b37"
                            metalness={0.9}
                            roughness={0.25}
                        />
                    </mesh>
                </group>
            )}
        </group>
    );
}

/* =========================================================
   22 BISHOPSGATE-STYLE TOWER
========================================================= */

function MainTower({ materials }) {
    return (
        <group position={[2.8, -2.2, -1]}>
            <ModernTower
                width={5.6}
                depth={5.2}
                floors={24}
                floorHeight={0.88}
                taper={0.045}
                material={materials.glassBlue}
            />

            {/* Main tower crown */}
            <mesh
                position={[0, 21.5, 0]}
                material={materials.glassDark}
            >
                <boxGeometry args={[3.2, 2.5, 3]} />
            </mesh>

            {/* Crown fins */}
            {[-1.5, -0.75, 0, 0.75, 1.5].map(
                (x) => (
                    <mesh
                        key={x}
                        position={[
                            x,
                            21.5,
                            2.05,
                        ]}
                        material={materialsGlobal.mullion}
                    >
                        <boxGeometry
                            args={[
                                0.065,
                                2.5,
                                0.12,
                            ]}
                        />
                    </mesh>
                )
            )}

            {/* vertical center structural lines */}
            {[-1.9, -0.95, 0, 0.95, 1.9].map(
                (x) => (
                    <mesh
                        key={x}
                        position={[
                            x,
                            10.5,
                            2.68,
                        ]}
                        material={materialsGlobal.mullion}
                    >
                        <boxGeometry
                            args={[
                                0.035,
                                19,
                                0.045,
                            ]}
                        />
                    </mesh>
                )
            )}
        </group>
    );
}

/* =========================================================
   LEADENHALL / CHEESEGRATER STYLE WEDGE
========================================================= */

function WedgeTower({ materials }) {
    const group = useRef();

    const height = 16;
    const widthBottom = 5.3;
    const widthTop = 1.2;
    const depth = 4.4;

    const geometry = useMemo(() => {
        const shape = new THREE.Shape();

        shape.moveTo(-widthBottom / 2, 0);
        shape.lineTo(widthBottom / 2, 0);
        shape.lineTo(widthTop / 2, height);
        shape.lineTo(-widthTop / 2, height);
        shape.closePath();

        const geo = new THREE.ExtrudeGeometry(shape, {
            depth,
            bevelEnabled: false,
            steps: 1,
        });

        geo.translate(0, 0, -depth / 2);

        return geo;
    }, []);

    /*
     * Diagonal structural members.
     */
    const diagonals = [];

    for (let floor = 0; floor < 8; floor++) {
        const y = 1 + floor * 1.85;

        const leftX =
            -widthBottom / 2 +
            (widthBottom - widthTop) *
            (y / height) /
            2;

        const rightX =
            widthBottom / 2 -
            (widthBottom - widthTop) *
            (y / height) /
            2;

        diagonals.push(
            <DiagonalBeam
                key={`l-${floor}`}
                start={[
                    -widthBottom / 2,
                    y,
                    depth / 2 + 0.08,
                ]}
                end={[
                    leftX,
                    y + 1.85,
                    depth / 2 + 0.08,
                ]}
            />
        );

        diagonals.push(
            <DiagonalBeam
                key={`r-${floor}`}
                start={[
                    widthBottom / 2,
                    y,
                    depth / 2 + 0.08,
                ]}
                end={[
                    rightX,
                    y + 1.85,
                    depth / 2 + 0.08,
                ]}
            />
        );
    }

    return (
        <group
            ref={group}
            position={[8, -2.2, -0.4]}
        >
            <mesh
                geometry={geometry}
                material={materials.glassWarm}
                castShadow
                receiveShadow
            />

            {/* Internal floor plates */}
            {Array.from({ length: 8 }).map(
                (_, i) => (
                    <mesh
                        key={i}
                        position={[
                            0,
                            0.8 + i * 1.85,
                            0,
                        ]}
                        material={materialsGlobal.mullion}
                    >
                        <boxGeometry
                            args={[
                                THREE.MathUtils.lerp(
                                    widthBottom,
                                    widthTop,
                                    (i * 1.85) / height
                                ),
                                0.075,
                                depth + 0.08,
                            ]}
                        />
                    </mesh>
                )
            )}

            {diagonals}

            {/* Strong vertical edge */}
            <mesh
                position={[
                    -widthBottom / 2,
                    height / 2,
                    depth / 2 + 0.1,
                ]}
                rotation={[0, 0, -0.16]}
                material={materialsGlobal.mullion}
            >
                <boxGeometry
                    args={[0.12, height * 1.02, 0.12]}
                />
            </mesh>
        </group>
    );
}

/* =========================================================
   DIAGONAL BEAM
========================================================= */

function DiagonalBeam({ start, end }) {
    const midpoint = new THREE.Vector3()
        .addVectors(
            new THREE.Vector3(...start),
            new THREE.Vector3(...end)
        )
        .multiplyScalar(0.5);

    const direction = new THREE.Vector3(
        end[0] - start[0],
        end[1] - start[1],
        end[2] - start[2]
    );

    const length = direction.length();

    const quaternion = new THREE.Quaternion();

    quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
    );

    return (
        <mesh
            position={midpoint}
            quaternion={quaternion}
            material={materialsGlobal.mullion}
            castShadow
        >
            <boxGeometry args={[0.105, length, 0.105]} />
        </mesh>
    );
}

/* =========================================================
   SECONDARY CITY BUILDINGS
========================================================= */

function SecondaryBuildings({ materials }) {
    return (
        <group position={[0, -2.2, -4]}>
            <ModernTower
                position={[-4.2, 0, 0]}
                width={3.5}
                depth={3.4}
                floors={16}
                floorHeight={0.78}
                taper={0.03}
                material={materials.glassDark}
                roofDetail={false}
            />

            <ModernTower
                position={[-8.0, 0, -1]}
                width={3}
                depth={3}
                floors={12}
                floorHeight={0.76}
                taper={0.08}
                material={materials.glassWarm}
                roofDetail={false}
            />

            <ModernTower
                position={[-10.5, 0, -2]}
                width={2.2}
                depth={2.5}
                floors={9}
                floorHeight={0.72}
                material={materials.glassDark}
                roofDetail={false}
            />

            <ModernTower
                position={[-1, 0, -4]}
                width={2.8}
                depth={2.7}
                floors={14}
                floorHeight={0.72}
                taper={0.06}
                material={materials.glassWarm}
                roofDetail={false}
            />

            <ModernTower
                position={[12, 0, -5]}
                width={2.7}
                depth={2.8}
                floors={13}
                floorHeight={0.75}
                taper={0.1}
                material={materials.glassDark}
                roofDetail={false}
            />
        </group>
    );
}

/* =========================================================
   LOW CITY PODIUM
========================================================= */

function Podium({ materials }) {
    return (
        <group position={[0, -2.55, -2]}>
            <mesh
                position={[0, 0, 0]}
                material={materials.concrete}
                receiveShadow
            >
                <boxGeometry args={[28, 0.65, 13]} />
            </mesh>

            <mesh
                position={[0, 0.36, 0]}
                material={materials.glassDark}
            >
                <boxGeometry args={[26, 0.18, 11]} />
            </mesh>

            {/* roof modules */}
            {Array.from({ length: 9 }).map(
                (_, i) => (
                    <mesh
                        key={i}
                        position={[
                            -11 + i * 2.75,
                            0.55,
                            -1.5,
                        ]}
                        material={
                            materials.glassBlue
                        }
                    >
                        <boxGeometry
                            args={[
                                2.15,
                                0.35,
                                3.5,
                            ]}
                        />
                    </mesh>
                )
            )}
        </group>
    );
}

/* =========================================================
   CLOUD SYSTEM
========================================================= */

function createCloudTexture() {
    const canvas = document.createElement('canvas');

    canvas.width = 1024;
    canvas.height = 512;

    const ctx = canvas.getContext('2d');

    const gradient =
        ctx.createRadialGradient(
            512,
            256,
            20,
            512,
            256,
            420
        );

    gradient.addColorStop(
        0,
        'rgba(255,255,255,0.95)'
    );

    gradient.addColorStop(
        0.3,
        'rgba(245,250,255,0.82)'
    );

    gradient.addColorStop(
        0.65,
        'rgba(220,235,247,0.32)'
    );

    gradient.addColorStop(
        1,
        'rgba(255,255,255,0)'
    );

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    return new THREE.CanvasTexture(canvas);
}

function Clouds({ progressRef }) {
    const group = useRef();

    const clouds = useMemo(() => {
        const texture = createCloudTexture();

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.62,
            depthWrite: false,
            depthTest: true,
        });

        const items = [];

        /*
         * Back layer
         */
        for (let i = 0; i < 18; i++) {
            const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(12, 6),
                material
            );

            mesh.position.set(
                -24 + i * 3.1,
                -0.2 + Math.sin(i * 1.7) * 1.3,
                -9 - (i % 4) * 2
            );

            mesh.scale.setScalar(
                0.8 + (i % 5) * 0.18
            );

            items.push(mesh);
        }

        /*
         * Foreground layer
         */
        for (let i = 0; i < 22; i++) {
            const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(11, 5.5),
                material
            );

            mesh.position.set(
                -28 + i * 2.8,
                -1.4 + Math.sin(i * 1.4) * 1.6,
                4 + (i % 5) * 1.2
            );

            mesh.scale.setScalar(
                0.9 + (i % 4) * 0.22
            );

            items.push(mesh);
        }

        return items;
    }, []);

    useFrame((state) => {
        if (!group.current) return;

        const progress =
            progressRef?.current ?? 0;

        /*
         * Clouds move only a little.
         */
        group.current.position.z =
            THREE.MathUtils.lerp(
                0,
                1.8,
                progress
            );

        group.current.position.y =
            THREE.MathUtils.lerp(
                0,
                -0.4,
                progress
            );

        clouds.forEach((cloud, index) => {
            cloud.quaternion.copy(
                state.camera.quaternion
            );

            cloud.position.x +=
                Math.sin(
                    state.clock.elapsedTime * 0.08 +
                    index
                ) * 0.0008;
        });
    });

    return (
        <group ref={group}>
            {clouds.map((cloud, i) => (
                <primitive
                    key={i}
                    object={cloud}
                />
            ))}
        </group>
    );
}

/* =========================================================
   MAIN MODEL
========================================================= */

export default function DevelopmentModel({
    progressRef,
}) {
    const root = useRef();

    const materials = useMemo(() => {
        const result = createMaterials();

        let materialsGlobal = {
            mullion: null,
        };

        return result;
    }, []);

    useEffect(() => {
        return () => {
            Object.values(materials).forEach(
                (material) => material.dispose()
            );
        };
    }, [materials]);

    useFrame((state) => {
        if (!root.current) return;

        const p = THREE.MathUtils.clamp(
            progressRef?.current ?? 0,
            0,
            1
        );

        /*
         * Almost static architectural presentation.
         *
         * Scroll is primarily used to reveal content,
         * not throw the building around.
         */
        root.current.rotation.y =
            THREE.MathUtils.lerp(
                -0.045,
                0.025,
                p
            );

        root.current.position.y =
            THREE.MathUtils.lerp(
                -0.25,
                -0.8,
                p
            );

        root.current.position.x =
            THREE.MathUtils.lerp(
                0,
                -0.55,
                p
            );
    });

    return (
        <group ref={root}>
            <MainTower materials={materials} />

            <WedgeTower materials={materials} />

            <SecondaryBuildings
                materials={materials}
            />

            <Podium materials={materials} />

            <Clouds progressRef={progressRef} />
        </group>
    );
}