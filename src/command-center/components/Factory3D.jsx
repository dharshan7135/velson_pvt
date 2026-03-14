import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { machines, machineStatusColors } from '../../data/commandCenterData';

function FactoryFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[20, 16]} />
      <meshStandardMaterial color="#e8e0d4" metalness={0.3} roughness={0.7} />
    </mesh>
  );
}

function GridLines() {
  const gridRef = useRef();
  return (
    <gridHelper
      ref={gridRef}
      args={[20, 20, '#b8860b30', '#b8860b10']}
      position={[0, -0.49, 0]}
    />
  );
}

function MachineNode({ machine, onHover, onLeave }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const color = machineStatusColors[machine.status];
  const isFailure = machine.status === 'failure';
  const isRunning = machine.status === 'running';

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // pulse for failure
      if (isFailure) {
        const pulse = 0.9 + Math.sin(t * 4) * 0.15;
        meshRef.current.scale.set(pulse, pulse, pulse);
      }
      // subtle bob for running
      if (isRunning) {
        meshRef.current.position.y = 0.3 + Math.sin(t * 2 + machine.x) * 0.05;
      }
    }
    if (glowRef.current) {
      const t = state.clock.getElapsedTime();
      glowRef.current.material.opacity = 0.15 + Math.sin(t * 3) * 0.08;
    }
  });

  return (
    <group position={[machine.x * 1.2, 0.3, machine.z * 1.2]}>
      {/* Glow ring */}
      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.28, 0]}>
        <ringGeometry args={[0.5, 0.7, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Main node */}
      <mesh
        ref={meshRef}
        castShadow
        onPointerOver={(e) => { e.stopPropagation(); onHover(machine); }}
        onPointerOut={(e) => { e.stopPropagation(); onLeave(); }}
      >
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={isFailure ? 0.8 : 0.3}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.15}
        color="#4a4a6a"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwY.woff2"
      >
        {machine.id}
      </Text>
    </group>
  );
}

function ConveyorLine({ from, to }) {
  const ref = useRef();

  const points = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(from[0] * 1.2, 0.02, from[1] * 1.2),
      new THREE.Vector3(to[0] * 1.2, 0.02, to[1] * 1.2),
    ]);
  }, [from, to]);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.material.dashOffset = -t * 0.5;
    }
  });

  return (
    <line ref={ref} geometry={points}>
      <lineDashedMaterial
        color="#10B981"
        dashSize={0.15}
        gapSize={0.1}
        transparent
        opacity={0.4}
      />
    </line>
  );
}

function FlowParticles() {
  const particlesRef = useRef();
  const count = 50;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = Math.random() * 0.5 + 0.1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array;
      const t = state.clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        pos[i * 3] += Math.sin(t + i) * 0.002;
        pos[i * 3 + 2] += 0.01;
        if (pos[i * 3 + 2] > 6) pos[i * 3 + 2] = -6;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#10B981" size={0.05} transparent opacity={0.6} />
    </points>
  );
}

function Scene({ onHoverMachine, onLeaveMachine }) {
  const conveyorPairs = [
    [[-3, -2], [-1, -2]],
    [[-1, -2], [1, -2]],
    [[1, -2], [3, -2]],
    [[-3, 0], [-1, 0]],
    [[-1, 0], [1, 0]],
    [[1, 0], [3, 0]],
    [[-3, 2], [-1, 2]],
    [[-1, 2], [1, 2]],
    [[1, 2], [3, 2]],
    [[-3, -2], [-3, 0]],
    [[-3, 0], [-3, 2]],
    [[3, -2], [3, 0]],
    [[3, 0], [3, 2]],
    [[-2, 4], [0, 4]],
    [[0, 4], [2, 4]],
    [[2, 4], [4, 4]],
  ];

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={0.8} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.4} color="#047857" />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#1e40af" />

      <FactoryFloor />
      <GridLines />
      <FlowParticles />

      {conveyorPairs.map((pair, i) => (
        <ConveyorLine key={i} from={pair[0]} to={pair[1]} />
      ))}

      {machines.map((m) => (
        <MachineNode
          key={m.id}
          machine={m}
          onHover={onHoverMachine}
          onLeave={onLeaveMachine}
        />
      ))}

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={25}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0, 1]}
      />
    </>
  );
}

export default function Factory3D({ height = '500px' }) {
  const [hoveredMachine, setHoveredMachine] = useState(null);

  return (
    <div className="cc-factory3d" style={{ height }}>
      <Canvas
        camera={{ position: [8, 10, 12], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene
          onHoverMachine={setHoveredMachine}
          onLeaveMachine={() => setHoveredMachine(null)}
        />
      </Canvas>

      {/* Hover Tooltip */}
      {hoveredMachine && (
        <div className="cc-factory3d__tooltip">
          <div className="cc-factory3d__tooltip-header">
            <span
              className="cc-factory3d__tooltip-status"
              style={{ background: machineStatusColors[hoveredMachine.status] }}
            />
            <span className="cc-factory3d__tooltip-id">{hoveredMachine.id}</span>
            <span className="cc-factory3d__tooltip-name">{hoveredMachine.name}</span>
          </div>
          <div className="cc-factory3d__tooltip-grid">
            <div className="cc-factory3d__tooltip-stat">
              <span className="cc-factory3d__tooltip-label">Temp</span>
              <span className="cc-factory3d__tooltip-value">{hoveredMachine.temperature}°C</span>
            </div>
            <div className="cc-factory3d__tooltip-stat">
              <span className="cc-factory3d__tooltip-label">RPM</span>
              <span className="cc-factory3d__tooltip-value">{hoveredMachine.rpm}</span>
            </div>
            <div className="cc-factory3d__tooltip-stat">
              <span className="cc-factory3d__tooltip-label">Load</span>
              <span className="cc-factory3d__tooltip-value">{hoveredMachine.load}%</span>
            </div>
            <div className="cc-factory3d__tooltip-stat">
              <span className="cc-factory3d__tooltip-label">Health</span>
              <span className="cc-factory3d__tooltip-value">{hoveredMachine.healthScore}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="cc-factory3d__legend">
        {Object.entries(machineStatusColors).map(([status, color]) => (
          <div key={status} className="cc-factory3d__legend-item">
            <span className="cc-factory3d__legend-dot" style={{ background: color }} />
            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
