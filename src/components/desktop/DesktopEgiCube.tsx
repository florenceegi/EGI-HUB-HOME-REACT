import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const CUBE_SIZE = 2.5;
const PILLAR_COLORS = [
    '#ffaa00', // Gold
    '#00ffdd', // Cyan
    '#aa00ff', // Purple
    '#b91d47', // Florence Red
];

function EgiCube() {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const [animTime, setAnimTime] = useState(0);

    const topTexture = useLoader(THREE.TextureLoader, '/img/cube_top.png');
    const bottomTexture = useLoader(THREE.TextureLoader, '/img/cube_bottom.png');

    // Reset every 30s
    useEffect(() => {
        const timer = setInterval(() => setAnimTime(0), 30000);
        return () => clearInterval(timer);
    }, []);

    useFrame((_, delta) => {
        setAnimTime((t) => t + delta);

        if (meshRef.current && animTime > 6) {
            meshRef.current.rotation.y += delta * 0.2;
        }
        if (groupRef.current && meshRef.current) {
            groupRef.current.rotation.y = meshRef.current.rotation.y;
        }
    });

    // Wrapping animation: 0-6s
    const wrapScale = animTime < 6 ? Math.min(animTime / 6, 1) : 1;
    const cubeOpacity = animTime < 6 ? Math.min(animTime / 3, 1) : 1;

    const glassProps = {
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.99,
        transparent: true,
        opacity: 0.2 * cubeOpacity,
        thickness: 0.5,
        envMapIntensity: 2,
        clearcoat: 1,
        side: THREE.DoubleSide
    };

    const faces = [
        { title: 'EGI', desc: 'Asset Fisico Certificato', color: PILLAR_COLORS[0] },
        { title: 'EGIZZAZIONE', desc: 'Processo di Certificazione', color: PILLAR_COLORS[1] },
        { title: 'VALORE', desc: 'Token Digitale Protetto', color: PILLAR_COLORS[2] },
        { title: 'FLORENCE EGI', desc: 'Certificazione di Valore', color: PILLAR_COLORS[3] },
    ];

    return (
        <group scale={wrapScale}>
            {/* Glass shell - EXACT copy from ThreePillarsPyramid */}
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />

                <meshPhysicalMaterial attach="material-0" color={PILLAR_COLORS[1]} {...glassProps} />
                <meshPhysicalMaterial attach="material-1" color={PILLAR_COLORS[3]} {...glassProps} />
                <meshPhysicalMaterial attach="material-2" color="white" {...glassProps} opacity={0} transmission={1} />
                <meshPhysicalMaterial attach="material-3" color="white" {...glassProps} opacity={0} transmission={1} />
                <meshPhysicalMaterial attach="material-4" color={PILLAR_COLORS[0]} {...glassProps} />
                <meshPhysicalMaterial attach="material-5" color={PILLAR_COLORS[2]} {...glassProps} />
            </mesh>

            {/* Inner content - EXACT copy from ThreePillarsPyramid */}
            <group ref={groupRef} position={[0, 0, 0]}>
                {/* Bust sculpture inside cube */}
                <mesh position={[0, -0.3, 0]} scale={0.8}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial
                        map={useLoader(THREE.TextureLoader, '/images/statue_source.png')}
                        metalness={0.3}
                        roughness={0.7}
                    />
                </mesh>

                {/* Top texture */}
                <mesh position={[0, 1.27, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[2.5, 2.5]} />
                    <meshBasicMaterial map={topTexture} color="white" side={THREE.DoubleSide} />
                </mesh>

                {/* Bottom texture */}
                <mesh position={[0, -1.27, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[2.5, 2.5]} />
                    <meshBasicMaterial map={bottomTexture} color="white" side={THREE.DoubleSide} />
                </mesh>

                {/* Face texts */}
                <FaceText index={0} data={faces[0]} position={[0, 0, 1.26]} rotation={[0, 0, 0]} />
                <FaceText index={1} data={faces[1]} position={[1.26, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
                <FaceText index={2} data={faces[2]} position={[0, 0, -1.26]} rotation={[0, Math.PI, 0]} />
                <FaceText index={3} data={faces[3]} position={[-1.26, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            </group>
        </group>
    );
}

function FaceText({ data, index, position, rotation }: any) {
    return (
        <group rotation={rotation} position={position}>
            <Text
                fontSize={0.25}
                color={data.color}
                anchorX="center"
                anchorY="middle"
                position={[0, 0.5, 0]}
                maxWidth={2.0}
                textAlign="center"
                material-toneMapped={false}
            >
                {data.title.toUpperCase()}
            </Text>

            <Text
                fontSize={0.1}
                color="white"
                anchorX="center"
                anchorY="top"
                position={[0, 0.2, 0]}
                maxWidth={1.8}
                textAlign="center"
                lineHeight={1.4}
                material-toneMapped={false}
            >
                {data.desc}
            </Text>

            <Text
                fontSize={0.08}
                color={data.color}
                position={[0, -0.8, 0]}
                letterSpacing={0.1}
                material-toneMapped={false}
            >
                {index === 3 ? 'FLORENCE EGI' : `0${index + 1}`}
            </Text>
        </group>
    );
}

export function DesktopEgiCube() {
    return (
        <div
            className="fixed z-25"
            style={{
                right: '8vw', // Positioned on the right
                top: '18vh', // Relative position
                width: '18vw', // Always 18% of viewport width
                height: '18vw', // Square aspect ratio
                minWidth: '250px', // Prevent too small
                minHeight: '250px',
                pointerEvents: 'none'
            }}
        >
            <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="white" />
                <directionalLight position={[-10, 10, 5]} intensity={1} color="white" />

                <EgiCube />

                <EffectComposer enabled={true}>
                    <Bloom
                        luminanceThreshold={0.2}
                        mipmapBlur
                        intensity={1.2}
                        radius={0.5}
                    />
                </EffectComposer>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={2}
                />
            </Canvas>
        </div>
    );
}
