'use client';

import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function DevelopmentModel({ url }) {
    const { scene } = useGLTF(url);

    const clonedScene = useMemo(() => {
        const clone = scene.clone(true);

        const box = new THREE.Box3().setFromObject(clone);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 5.5 / maxDimension;

        clone.scale.setScalar(scale);
        clone.position.set(
            -center.x * scale,
            -box.min.y * scale,
            -center.z * scale
        );

        return clone;
    }, [scene]);

    useEffect(() => {
        clonedScene.traverse(object => {
            if (!object.isMesh) return;

            object.castShadow = true;
            object.receiveShadow = true;

            if (object.material) {
                const materials = Array.isArray(object.material)
                    ? object.material
                    : [object.material];

                materials.forEach(material => {
                    material.envMapIntensity = 0.75;
                    material.needsUpdate = true;
                });
            }
        });
    }, [clonedScene]);

    return <primitive object={clonedScene} />;
}