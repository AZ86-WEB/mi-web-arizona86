"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// Cambia la función Model para soportar Draco:
function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/'); // ¡Ponemos la ruta abajo!
    loader.setDRACOLoader(dracoLoader);
  });
  return <primitive object={gltf.scene} />;
}

export default function Product3DViewer({ glbPath }) {
  return (
    <div style={{ width: "100%", height: 350, borderRadius: 18, background: "#fafafc", margin: "0 0 1.4rem 0" }}>
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Stage intensity={0.9} environment="city" adjustCamera={1.4}>
            <Model url={glbPath} />
          </Stage>
          <OrbitControls enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
