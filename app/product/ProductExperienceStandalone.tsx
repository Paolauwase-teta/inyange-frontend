"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Hourglass } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ScrollControls, Scroll, ContactShadows, Text, useScroll, useProgress, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const seeded = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const products = [
  { id: "milk", color: "#00A3FF", heroText: "PURITY", price: "$4.99", desc: "FRESH • ORGANIC • WHOLE" },
  { id: "cheese", color: "#FF8A00", heroText: "AGED", price: "$12.99", desc: "CRITICAL • VINTAGE • CHEDDAR" },
  { id: "yogurt", color: "#007CFF", heroText: "GREEK", price: "$3.49", desc: "PROBIOTIC • CREAMY • BERRY" },
  { id: "butter", color: "#FFB800", heroText: "GOLDEN", price: "$5.99", desc: "SALTED • CHURNED • PURE" },
];

const productStore = {
  idx: 0,
  listeners: new Set<(idx: number) => void>(),
  next() { this.idx = (this.idx + 1) % products.length; this.listeners.forEach((f) => f(this.idx)); },
  prev() { this.idx = (this.idx - 1 + products.length) % products.length; this.listeners.forEach((f) => f(this.idx)); },
  getSnapshot() { return this.idx; },
  subscribe(fn: (idx: number) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  },
};

const useActiveProductIdx = () => {
  const [idx, setIdx] = useState(productStore.getSnapshot());
  useEffect(() => productStore.subscribe(setIdx), []);
  return idx;
};

const SceneSideNav = ({ totalPages = 6 }: { totalPages?: number }) => {
  const scroll = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  useFrame(() => {
    const section = Math.min(Math.floor(scroll.offset * totalPages + 0.1), totalPages - 1);
    if (section !== activeSection) setActiveSection(section);
  });
  return <div className="side-nav-vertical"><span className="current">0{activeSection + 1}</span><span className="separator"> / </span><span className="total">0{totalPages}</span></div>;
};

const CustomLoader = () => {
  const { active } = useProgress();
  const [minTimePassed, setMinTimePassed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence>
      {(active || !minTimePassed) && (
        <motion.div className="loader-overlay" exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
          <div className="hourglass-container"><Hourglass size={32} color="black" className="spinning-hourglass" /><p>loading</p></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HeroText3D = ({ text }: { text: string }) => {
  const textRef = useRef<{ fillOpacity?: number; outlineOpacity?: number } | null>(null);
  const scroll = useScroll();
  useFrame((state) => {
    if (!textRef.current) return;
    const t = Math.max(0, state.clock.elapsedTime - 1.5);
    const entranceOpacity = Math.min(1, t * 0.8);
    const scrollOpacity = Math.max(0, 1 - scroll.offset * 10);
    textRef.current.fillOpacity = scrollOpacity * 0.2 * entranceOpacity;
    textRef.current.outlineOpacity = scrollOpacity * 0.1 * entranceOpacity;
  });
  return <Text ref={(node) => { textRef.current = node as unknown as { fillOpacity?: number; outlineOpacity?: number } | null; }} position={[0, 0, -4]} fontSize={5.5} color="#80D1FF" font="https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/bebasneue/BebasNeue-Regular.ttf" anchorX="center" anchorY="middle" outlineWidth={0.04} outlineColor="#80D1FF" fontWeight="bold">{text}</Text>;
};

const ProductAnimatedRoot = ({ children, kind }: { children: React.ReactNode; kind: "milk" | "cheese" | "yogurt" | "butter" }) => {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const mouseRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  const stages = useMemo(() => (kind === "milk" || kind === "cheese")
    ? [[0, 0, 0, 0.5, 0], [5.5, 0.3, 2, 2.0, 0.5], [-6, 0.5, 2.5, 1.8, 0.2], [0, 0, 0, 0.5, 0.3], [0, -0.5, 0, 0.6, 0.5], [0, 20, -10, 1, 8]]
    : [[0, 0, 0, 0.8, 0], [5.5, 0.3, 2, 2.4, 0.5], [-6, 0.5, 2.5, 2.2, 0.2], [0, 0, 0, 0.8, 0.3], [0, -0.2, 0, 0.9, 0.5], [0, 20, -10, 1, 8]], [kind]);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const offset = scroll.offset;
    const totalStages = stages.length - 1;
    const i1 = Math.floor(offset * totalStages);
    const i2 = Math.min(i1 + 1, totalStages);
    const t = (offset * totalStages) % 1;
    const s1 = stages[i1];
    const s2 = stages[i2];
    ref.current.position.x = THREE.MathUtils.lerp(s1[0], s2[0], t) + mouseRef.current.x * 0.15;
    ref.current.position.y = THREE.MathUtils.lerp(s1[1], s2[1], t) - mouseRef.current.y * 0.15;
    ref.current.position.z = THREE.MathUtils.lerp(s1[2], s2[2], t);
    ref.current.scale.setScalar(THREE.MathUtils.lerp(s1[3], s2[3], t));
    ref.current.rotation.y += delta * (kind === "yogurt" ? 0.6 : 0.4);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, THREE.MathUtils.lerp(s1[4], s2[4], t) + mouseRef.current.y * 0.2, 0.1);
  });
  return <group ref={ref}>{children}</group>;
};

const Milk = () => {
  const points = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i < 20; i++) {
      const x = i < 12 ? 1 : 1 - Math.pow((i - 12) / 8, 2) * 0.5;
      pts.push(new THREE.Vector2(x, (i - 10) * 0.25));
    }
    pts.push(new THREE.Vector2(0.5, 2.5), new THREE.Vector2(0.6, 2.5), new THREE.Vector2(0.6, 2.7), new THREE.Vector2(0, 2.7));
    return pts;
  }, []);
  return (
    <ProductAnimatedRoot kind="milk">
      <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.95, 0.95, 2.8, 32]} /><meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0} emissive="#EEEEEE" emissiveIntensity={0.2} /></mesh>
      <mesh castShadow receiveShadow><latheGeometry args={[points, 64]} /><MeshTransmissionMaterial backside thickness={0.5} roughness={0.05} transmission={0.95} ior={1.5} chromaticAberration={0.02} anisotropy={0.1} distortion={0} distortionScale={0} temporalDistortion={0} /></mesh>
      <mesh position={[0, -0.5, 1.01]}><planeGeometry args={[1.2, 1.2]} /><meshStandardMaterial color="#FFFFFF" roughness={1} /><Text position={[0, 0, 0.01]} fontSize={0.15} color="#000000" anchorX="center" anchorY="middle">FARM FRESH</Text></mesh>
      <mesh position={[0, 2.55, 0]} castShadow receiveShadow><cylinderGeometry args={[0.62, 0.62, 0.3, 32]} /><meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} /></mesh>
    </ProductAnimatedRoot>
  );
};

const Cheese = () => {
  const holes = useMemo(() => [...Array(12)].map((_, i) => ({ pos: [(seeded(i + 1) - 0.5) * 2.8, (seeded(i + 101) - 0.5) * 1.2, (seeded(i + 1001) - 0.5) * 2.8] as [number, number, number], scale: 0.1 + seeded(i + 2001) * 0.25 })), []);
  return (
    <ProductAnimatedRoot kind="cheese">
      <mesh castShadow receiveShadow><cylinderGeometry args={[2, 2, 1.5, 32, 1, false, 0, Math.PI * 1.6]} /><meshStandardMaterial color="#FFD700" roughness={0.6} metalness={0.05} /></mesh>
      <mesh><cylinderGeometry args={[2.02, 2.02, 1.52, 32, 1, true, 0, Math.PI * 1.6]} /><meshStandardMaterial color="#FFA500" roughness={0.9} metalness={0} /></mesh>
      {holes.map((h, i) => <mesh key={i} position={h.pos} scale={h.scale}><sphereGeometry args={[1, 16, 16]} /><meshStandardMaterial color="#B8860B" roughness={1} metalness={0} /></mesh>)}
    </ProductAnimatedRoot>
  );
};

const Yogurt = () => {
  const foilBumpMap = useMemo(() => {
    const size = 256;
    const data = new Uint8ClampedArray(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      const val = seeded(i + 3001) * 255;
      data[i * 4] = val; data[i * 4 + 1] = val; data[i * 4 + 2] = val; data[i * 4 + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.needsUpdate = true; texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(4, 4);
    return texture;
  }, []);
  return (
    <ProductAnimatedRoot kind="yogurt">
      <mesh castShadow receiveShadow><cylinderGeometry args={[1, 0.75, 1.8, 32]} /><meshStandardMaterial color="#B0E0E6" roughness={0.1} metalness={0.05} /></mesh>
      <mesh position={[0, 0.91, 0]} castShadow receiveShadow><cylinderGeometry args={[1.05, 1.05, 0.04, 32]} /><meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} bumpMap={foilBumpMap} bumpScale={0.05} /></mesh>
      <mesh position={[0, 0, 0.87]}><planeGeometry args={[0.8, 0.8]} /><meshStandardMaterial color="#FFFFFF" roughness={1} /><Text position={[0, 0, 0.01]} fontSize={0.12} color="#2F4F4F" anchorX="center" anchorY="middle">GREEK CREME</Text></mesh>
    </ProductAnimatedRoot>
  );
};

const Butter = () => {
  const paperBumpMap = useMemo(() => {
    const size = 128;
    const data = new Uint8ClampedArray(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      const val = 150 + seeded(i + 4001) * 105;
      data[i * 4] = val; data[i * 4 + 1] = val; data[i * 4 + 2] = val; data[i * 4 + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.needsUpdate = true; texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(2, 2);
    return texture;
  }, []);
  return (
    <ProductAnimatedRoot kind="butter">
      <mesh castShadow receiveShadow><boxGeometry args={[2.5, 1, 1]} /><meshStandardMaterial color="#FFFACD" roughness={0.8} bumpMap={paperBumpMap} bumpScale={0.02} /></mesh>
      <mesh position={[0, 0, 0.51]}><planeGeometry args={[0.1, 1]} /><meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} /></mesh>
      <Text position={[0, 0, 0.52]} fontSize={0.2} color="#8B4513" anchorX="center" anchorY="middle">PURE BUTTER</Text>
    </ProductAnimatedRoot>
  );
};

const ProductWrapper = ({ index, children }: { index: number; children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const activeIdx = useActiveProductIdx();
  const targetScale = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const active = activeIdx === index;
    const s = active && state.clock.elapsedTime > 1.5 ? 1 : 0.001;
    targetScale.set(s, s, s);
    groupRef.current.scale.lerp(targetScale, 0.15);
    if (!active && groupRef.current.scale.x > 0.01) { groupRef.current.rotation.y -= delta * 5; groupRef.current.rotation.z += delta * 2; }
    else if (active && groupRef.current.scale.x < 0.99) { groupRef.current.rotation.set(0, 0, 0); }
  });
  return <group ref={groupRef}>{children}</group>;
};

const Pedestal = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!groupRef.current) return;
    const visibility = Math.max(0, 1 - Math.abs(scroll.offset - 0.8) * 10);
    groupRef.current.visible = visibility > 0.01;
    groupRef.current.position.y = -4.5 + (1 - visibility) * -5;
  });
  return (
    <group ref={groupRef} position={[0, -4.5, 0]}>
      <mesh><cylinderGeometry args={[5, 5.5, 1, 64]} /><meshStandardMaterial color="#e0e0e0" roughness={0.1} metalness={0.8} /></mesh>
      <mesh position={[0, 1, 0]}><cylinderGeometry args={[4, 4.5, 1, 64]} /><meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.8} /></mesh>
      <mesh position={[0, 2, 0]}><cylinderGeometry args={[3, 3, 1, 64]} /><meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.8} /></mesh>
    </group>
  );
};

const HUD = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!groupRef.current) return;
    const visibility = Math.max(0, 1 - Math.abs(scroll.offset - 0.6) * 8);
    groupRef.current.visible = visibility > 0.01;
    groupRef.current.scale.setScalar(visibility);
    groupRef.current.rotation.z += 0.002;
  });
  return <group ref={groupRef} position={[0, 0, 3.5]}><mesh><ringGeometry args={[2.2, 2.201, 128]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.05} /></mesh></group>;
};

const Fragments = ({ count = 40 }: { count?: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => [...Array(count)].map((_, i) => ({ t: seeded(i + 1) * 100, factor: 20 + seeded(i + 101) * 100, speed: 0.01 + seeded(i + 201) / 200, xFactor: -50 + seeded(i + 301) * 100, yFactor: -50 + seeded(i + 401) * 100, zFactor: -50 + seeded(i + 501) * 100 })), [count]);
  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.t += p.speed / 2;
      const s = Math.cos(p.t);
      dummy.position.set(p.xFactor + Math.cos((p.t / 10) * p.factor), p.yFactor + Math.sin((p.t / 10) * p.factor), p.zFactor + Math.sin((p.t / 10) * p.factor));
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return <instancedMesh ref={meshRef} args={[undefined, undefined, count]}><tetrahedronGeometry args={[0.2, 0]} /><meshStandardMaterial color="#00A3FF" opacity={0.6} transparent /></instancedMesh>;
};

const Content = ({ activeProduct }: { activeProduct: (typeof products)[number] }) => (
  <div className="content-wrapper">
    <SceneSideNav totalPages={6} />
    <section className="section section-hero">
      <motion.div className="hero-top-left" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.6 }}>
        <div className="promo-video"><div className="play-btn"><Play size={10} fill="white" /></div><span>Promotion video</span></div>
      </motion.div>
      <div className="hero-bottom-container">
        <motion.div className="hero-price-block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.8 }}><span className="price-label">{activeProduct.price}</span><span className="price-subtext">{activeProduct.desc}</span></motion.div>
        <motion.div className="hero-cta-block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.0 }}><button className="add-to-cart-btn">ADD TO CART</button></motion.div>
        <motion.div className="hero-nav-block" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 2.2 }}><div className="slider-arrows"><div className="arrow-btn prev" onClick={() => productStore.prev()}><ChevronLeft size={16} /></div><div className="arrow-btn next active" onClick={() => productStore.next()}><ChevronRight size={16} /></div></div></motion.div>
      </div>
    </section>

    <section className="section section-elite"><div className="layout-elite"><div className="elite-header"><p className="label-orange-dot"><span></span> QUALITY STANDARDS</p><h1 className="title-huge-condensed">CREAMY<br />TEXTURE</h1></div><div className="elite-stats"><div className="elite-stat-block"><div className="elite-stat-header"><span className="elite-val">100%</span><div className="elite-line-h"></div></div><p className="elite-label">ORGANIC WHOLE MILK</p><p className="elite-desc">Sourced from pasture-raised cows, ensuring the richest flavor and smoothest consistency.</p></div><div className="elite-stat-block"><div className="elite-stat-header"><span className="elite-val">4.5%</span><div className="elite-line-h"></div></div><p className="elite-label">BUTTERFAT CONTENT</p><p className="elite-desc">Optimized fat levels for a velvety mouthfeel and premium culinary performance.</p></div></div></div></section>

    <section className="section section-aerodynamics"><div className="layout-aero"><div className="aero-header"><span className="pill-label">PURITY</span><h1 className="title-huge-condensed">NATURAL<br />SOURCE</h1></div><div className="aero-stats"><div className="aero-stat-item"><div className="aero-stat-main"><span className="aero-val">0.00</span><span className="aero-dot"></span></div><p className="aero-label">ADDITIVES</p></div><div className="aero-stat-item"><div className="aero-stat-main"><span className="aero-val">12</span><span className="aero-dot"></span></div><p className="aero-label">MONTHS AGED</p></div></div><p className="aero-description">Our traditional aging process and minimal intervention ensure that every product retains its natural enzymes and rich probiotic profile.</p></div></section>

    <section className="section section-hud"><div className="hud-container"><div className="hud-label top-left"><div className="hud-line-v"></div><div className="hud-content"><p className="label-tiny">CALCIUM CONTENT</p><div className="hud-value-row"><span className="hud-value-large">1200mg</span><div className="hud-line-h"></div></div><p className="label-tiny">PER SERVING</p></div></div><div className="hud-label center-left"><p className="label-tiny">PROTEIN: 8.5g</p></div><div className="hud-label bottom-right"><div className="hud-content align-right"><p className="label-tiny">CULTURE SPEC</p><div className="hud-value-row rev"><div className="hud-line-h"></div><span className="hud-value-large">L. Bulgarius</span></div><div className="hud-line-v"></div></div></div><div className="hud-label center-right"><p className="label-tiny">VITAMIN D3: 400IU</p></div><div className="hud-label bottom-center"><p className="label-tiny letter-spacing-lg">B-12 ENRICHED</p></div></div></section>

    <section className="section section-podium"><div className="layout-champion"><div className="podium-header"><p className="subtitle-podium">ESTATE RESERVED</p><h1 className="title-champion">GOLD STANDARD</h1></div><div className="podium-stats"><div className="podium-stat-left"><p className="label-orange">AWARDS 01</p><h4>Blue Ribbon</h4><p className="stat-desc-small">Voted best-in-class for texture and taste profile.</p></div><div className="podium-stat-right"><p className="label-orange">CERTIFIED</p><h4>Farm-to-Table</h4><p className="stat-desc-small">Meets all stringent organic and sustainability standards.</p></div></div></div></section>

    <section className="section section-cta"><div className="layout-cta"><p className="label-orange-bg">EXPERIENCE THE FRESHNESS</p><h1 className="title-huge">DAIRY<br />DELIGHT</h1><button className="shop-button">SHOP COLLECTION</button></div></section>
  </div>
);

export default function ProductExperienceStandalone() {
  const idx = useActiveProductIdx();
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", products[idx].color);
    document.body.classList.add("product-page-active");
    return () => document.body.classList.remove("product-page-active");
  }, [idx]);

  return (
    <>
      <CustomLoader />
      <div className="canvas-container">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <ScrollControls pages={6} damping={0.25}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 15, 10]} angle={0.25} penumbra={1} intensity={2000} castShadow />
              <pointLight position={[-10, 5, -5]} intensity={1000} color={products[idx].color} />
              <pointLight position={[10, 5, -5]} intensity={1000} color={products[idx].color} />
              <directionalLight position={[0, -5, 5]} intensity={0.8} />

              <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                <ProductWrapper index={0}><Milk /></ProductWrapper>
                <ProductWrapper index={1}><Cheese /></ProductWrapper>
                <ProductWrapper index={2}><Yogurt /></ProductWrapper>
                <ProductWrapper index={3}><Butter /></ProductWrapper>
              </Float>
              <HeroText3D text={products[idx].heroText} />
              <Pedestal />
              <HUD />
              <Fragments count={40} />
              <ContactShadows opacity={0.15} scale={20} blur={2.4} far={4.5} />
              <Environment preset="city" />

              <Scroll html><Content activeProduct={products[idx]} /></Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
