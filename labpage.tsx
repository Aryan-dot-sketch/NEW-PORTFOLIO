import React from 'react';
import * as THREE from 'three';
import {
  X, Plus, Upload, Lock, Coins, IndianRupee, Unlock,
  Download, Eye, EyeOff, Trash2, File, FileText, Image, Video,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../utils/supabase';

// ─── Types ──────────────────────────────────────────────────────────────────
type AccessType = 'free' | 'price' | 'referrals' | 'price_and_referrals' | 'price_or_referrals';

interface LabFile {
  id: string;
  name: string;
  description: string | null;
  file_url: string;
  file_type: string;
  file_size: number | null;
  storage_path: string | null;
  is_visible: boolean;
  created_at: string;
  view_count: number | null;
  access_type: AccessType | null;
  price: number | null;
  referrals_required: number | null;
  category: string | null;
  sub_category: string | null;
}

interface Props {
  onBack: () => void;
  isSupervisor: boolean;
  userEmail?: string;
}

// ─── Constant Data ───────────────────────────────────────────────────────────
const BRANCHES = ['CBSE', 'JEE', 'NEET', 'OFFICIAL', 'PYQs', 'NOTES', 'TEST'] as const;
type Branch = typeof BRANCHES[number];

const PLANET_LABELS: Record<Branch, [string, string, string]> = {
  CBSE:     ['Physics', 'Chemistry', 'Maths'],
  JEE:      ['Physics', 'Chemistry', 'Maths'],
  NEET:     ['Physics', 'Chemistry', 'Biology'],
  OFFICIAL: ['Updates', 'Syllabus', 'Circulars'],
  PYQs:     ['2024', '2023', '2022'],
  NOTES:    ['Short', 'Detailed', 'Quick Rev'],
  TEST:     ['Weekly', 'Monthly', 'Mock'],
};

// Feature 1: Per-branch colors
const BRANCH_COLORS: Record<Branch, number> = {
  CBSE:     0x4dabf7,
  JEE:      0xff922b,
  NEET:     0x51cf66,
  OFFICIAL: 0xff6b6b,
  PYQs:     0xcc5de8,
  NOTES:    0x22b8cf,
  TEST:     0xfcc419,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatSize(bytes: number | null): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}
function fileIcon(type: string) {
  if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
  if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
  if (type.includes('html'))     return <FileText className="w-4 h-4" />;
  return <File className="w-4 h-4" />;
}
function isLocked(f: LabFile) { return (f.access_type ?? 'free') !== 'free'; }

const inputCls = "w-full bg-white/[0.04] border border-white/10 text-white text-xs tracking-wide px-3 py-2.5 focus:outline-none focus:border-white/30 placeholder:text-gray-600";

// ─── Access badge ─────────────────────────────────────────────────────────────
function AccessBadge({ f }: { f: LabFile }) {
  const type = f.access_type ?? 'free';
  if (type === 'free')     return <span className="text-[8px] tracking-[0.18em] text-white/40 border border-white/[0.08] px-1.5 py-0.5">FREE</span>;
  if (type === 'price')    return <span className="text-[8px] tracking-[0.18em] text-white border border-white/30 px-1.5 py-0.5">₹{f.price}</span>;
  if (type === 'referrals') return <span className="text-[8px] tracking-[0.18em] text-white/70 border border-white/20 px-1.5 py-0.5">{f.referrals_required} REFS</span>;
  if (type === 'price_and_referrals') return <span className="text-[8px] tracking-[0.15em] text-white/70 border border-white/20 px-1.5 py-0.5">₹{f.price} + {f.referrals_required} REFS</span>;
  return <span className="text-[8px] tracking-[0.15em] text-white/70 border border-white/20 px-1.5 py-0.5">₹{f.price} OR {f.referrals_required} REFS</span>;
}

// ─── File row in the data panel ───────────────────────────────────────────────
function FileRow({
  f, isSupervisor, userBalance, unlockedIds, onSpendRefs, onView, onToggleVisible, onDelete, onBuy, payingFileId,
}: {
  f: LabFile; isSupervisor: boolean; userBalance: number; unlockedIds: Set<string>;
  onSpendRefs: (f: LabFile) => void; onView: (f: LabFile) => void;
  onToggleVisible: (f: LabFile) => void; onDelete: (f: LabFile) => void;
  onBuy?: (f: LabFile) => void; payingFileId?: string | null;
}) {
  const locked = isLocked(f) && !isSupervisor && !unlockedIds.has(f.id);
  const type = f.access_type ?? 'free';
  const canUnlock =
    !isSupervisor && !unlockedIds.has(f.id) &&
    (type === 'referrals' || type === 'price_or_referrals') &&
    (f.referrals_required ?? 0) > 0 &&
    userBalance >= (f.referrals_required ?? 0);

  return (
    <div
      className={`border p-4 transition-all duration-200 relative overflow-hidden ${
        f.is_visible ? 'border-white/[0.1] hover:border-white/25 hover:bg-white/[0.03]' : 'border-white/[0.04] opacity-40'
      }`}
      style={{ cursor: locked ? 'default' : 'pointer' }}
    >
      {locked && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center gap-2 p-3">
          <Lock className="w-4 h-4 text-white/30" />
          <AccessBadge f={f} />
          {(type === 'referrals' || type === 'price_or_referrals') && (
            <p className="text-[8px] tracking-[0.12em] text-gray-600 text-center">
              YOU HAVE {userBalance} CREDIT{userBalance !== 1 ? 'S' : ''}
            </p>
          )}
          {canUnlock && (
            <button
              onClick={() => onSpendRefs(f)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-[9px] tracking-[0.15em] font-bold hover:bg-gray-200 transition-all cursor-pointer"
            >
              <Unlock className="w-3 h-3" /> SPEND {f.referrals_required} REFS
            </button>
          )}
          {(type === 'price' || type === 'price_and_referrals') && (
            onBuy ? (
              <button
                onClick={() => onBuy(f)}
                disabled={payingFileId === f.id}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-[9px] tracking-[0.15em] font-bold hover:bg-gray-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              >
                {payingFileId === f.id ? 'PROCESSING...' : `PAY ₹${f.price}`}
              </button>
            ) : (
              <p className="text-[8px] tracking-[0.1em] text-gray-700 text-center">Contact us on Telegram</p>
            )
          )}
          {type === 'price_or_referrals' && onBuy && f.price && (
            <button
              onClick={() => onBuy(f)}
              disabled={payingFileId === f.id}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 text-white text-[9px] tracking-[0.15em] font-bold hover:border-white/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              {payingFileId === f.id ? 'PROCESSING...' : `OR PAY ₹${f.price}`}
            </button>
          )}
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-7 h-7 border border-white/10 flex items-center justify-center shrink-0 text-gray-500">
            {fileIcon(f.file_type)}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-[0.08em] truncate text-white">{f.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              {f.file_size && <span className="text-[9px] text-gray-600">{formatSize(f.file_size)}</span>}
              <AccessBadge f={f} />
            </div>
          </div>
        </div>
        {isSupervisor && (
          <div className="flex gap-1 shrink-0 z-20 relative">
            <button onClick={() => onToggleVisible(f)} className="text-gray-600 hover:text-white p-1 transition-colors cursor-pointer">
              {f.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => onDelete(f)} className="text-gray-600 hover:text-red-400 p-1 transition-colors cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {f.description && (
        <p className="text-[9px] text-gray-600 mt-2 leading-relaxed font-light">{f.description}</p>
      )}

      {!locked && (
        <a
          href={f.file_url} target="_blank" rel="noopener noreferrer"
          onClick={() => onView(f)}
          className="mt-3 inline-flex items-center gap-1.5 text-[9px] tracking-[0.15em] text-gray-500 hover:text-white transition-colors border border-white/[0.06] hover:border-white/20 px-3 py-1.5"
        >
          <Download className="w-3 h-3" /> OPEN
        </a>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LabPage({ onBack, isSupervisor, userEmail }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Scene state surfaced to React
  const [mode, setMode]                     = React.useState<'overview' | 'detail' | 'panel'>('overview');
  const [selectedBranch, setSelectedBranch] = React.useState<string>('');
  const [selectedPlanet, setSelectedPlanet] = React.useState<string>('');
  const [statusText, setStatusText]         = React.useState('Initializing Secure Protocol');
  const [showHint, setShowHint]             = React.useState(true);
  const [showScanlines, setShowScanlines]   = React.useState(false);
  const [panelKey, setPanelKey]             = React.useState(0);

  // Feature 11: Search box state
  const [panelSearch, setPanelSearch] = React.useState('');

  // Data
  const [allFiles, setAllFiles]         = React.useState<LabFile[]>([]);
  const [userBalance, setUserBalance]   = React.useState(0);
  const [unlockedIds, setUnlockedIds]   = React.useState<Set<string>>(new Set());
  const [loadingFiles, setLoadingFiles] = React.useState(true);
  const [payingFileId, setPayingFileId] = React.useState<string | null>(null);

  const razorpayEnabled = !!import.meta.env.VITE_RAZORPAY_KEY_ID;

  // Upload modal
  const [showUpload, setShowUpload]     = React.useState(false);
  const [uploading, setUploading]       = React.useState(false);
  const [uploadError, setUploadError]   = React.useState('');
  const [uploadName, setUploadName]     = React.useState('');
  const [uploadDesc, setUploadDesc]     = React.useState('');
  const [uploadFile, setUploadFile]     = React.useState<File | null>(null);
  const [uploadAccess, setUploadAccess] = React.useState<AccessType>('free');
  const [uploadPrice, setUploadPrice]   = React.useState('');
  const [uploadRefs, setUploadRefs]     = React.useState('');
  const [uploadCat, setUploadCat]       = React.useState<string>(BRANCHES[0]);
  const [uploadSubCat, setUploadSubCat] = React.useState<string>(PLANET_LABELS[BRANCHES[0]][0]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Tracks whether any UI overlay is active — used to suppress Three.js click handling
  const uiOverlayRef = React.useRef(false);
  React.useEffect(() => {
    uiOverlayRef.current = mode === 'panel' || showUpload;
  }, [mode, showUpload]);

  // Bridge: Three.js → React
  const bridgeRef = React.useRef({
    onBranchSelect:   (_name: string) => {},
    onPlanetSelect:   (_name: string) => {},
    onPlanetFocus:    (_planet: string) => {},
    onBackToOverview: () => {},
    setStatus: (_s: string) => {},
  });

  // Bridge: React → Three.js (imperative commands)
  const cmdRef = React.useRef({
    goDetail:   (_branchIndex: number) => {},
    goOverview: () => {},
    closePanel: () => {},
  });

  // Wire bridge callbacks to React state setters
  React.useEffect(() => {
    bridgeRef.current.onBranchSelect = (name: string) => {
      setSelectedBranch(name);
      setMode('detail');
      setStatusText(`Orbiting ${name} — 3 Planets Available`);
    };
    bridgeRef.current.onPlanetSelect = (name: string) => {
      setSelectedPlanet(name);
      setMode('panel');
      setPanelKey(k => k + 1);
      setPanelSearch(''); // reset search on new planet open
      setShowScanlines(true);
      setTimeout(() => setShowScanlines(false), 600);
    };
    bridgeRef.current.onPlanetFocus = (planet: string) => {
      setStatusText(`Establishing secure link to ${planet}...`);
    };
    bridgeRef.current.onBackToOverview = () => {
      setMode(m => {
        if (m === 'panel') return 'detail';
        setSelectedBranch('');
        setSelectedPlanet('');
        setStatusText(`Network Active — ${BRANCHES.length} Branches Online`);
        return 'overview';
      });
    };
    bridgeRef.current.setStatus = (s: string) => setStatusText(s);
  }, []);

  // ── Lock body scroll while LabPage is mounted ──────────────────────────────
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ── Three.js scene setup ───────────────────────────────────────────────────
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.03);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Feature 9: Better pixel ratio cap (1.5 on very high DPR devices)
    const dpr = window.devicePixelRatio;
    renderer.setPixelRatio(Math.min(dpr, dpr > 1.5 ? 1.5 : 2));
    renderer.setClearColor(0x050505, 1);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const centerLight = new THREE.PointLight(0xffffff, 1.2, 80);
    scene.add(centerLight);
    const rimLight = new THREE.PointLight(0xaaaaaa, 0.8, 50);
    rimLight.position.set(0, 12, 8);
    scene.add(rimLight);

    // ── Feature 6: Spring physics helpers ──────────────────────────────────
    function smoothSpring(
      current: number, target: number, velocity: number,
      tension: number, friction: number, dt: number,
    ) {
      const delta = target - current;
      const springForce = delta * tension;
      const damping = velocity * friction;
      velocity += (springForce - damping) * dt;
      current += velocity * dt;
      return { current, velocity };
    }

    function shortestAngleDelta(from: number, to: number) {
      let d = to - from;
      while (d >  Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      return d;
    }

    // ── Glow / label helpers ──────────────────────────────────────────────
    function createGlowTexture() {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const ctx = c.getContext('2d')!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.4, 'rgba(255,255,255,0.2)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    }
    const glowTexture = createGlowTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture, color: 0xffffff, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });

    function makeLabel(text: string, size = 40, color = '#ffffff') {
      const res = 3; // render at 3× for crisp zoom
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d')!;
      const font = `700 ${size * res}px "Space Mono", monospace`;
      ctx.font = font;
      const w = ctx.measureText(text).width + 40 * res;
      const h = size * res + 30 * res;
      c.width = w; c.height = h;
      ctx.font = font;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.fillText(text, w / 2, h / 2);
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set((w / h) * 1.2, 1.2, 1);
      return sprite;
    }

    function createRing(radius: number, opacity: number) {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const pts = curve.getPoints(120);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity });
      const line = new THREE.Line(geo, mat);
      line.rotation.x = Math.PI / 2;
      return line;
    }

    // Feature 4: Grid floor ──────────────────────────────────────────────────
    const gridHelper = new THREE.GridHelper(60, 40, 0x222222, 0x111111);
    gridHelper.position.y = -6;
    const gridMats = Array.isArray(gridHelper.material) ? gridHelper.material : [gridHelper.material];
    gridMats.forEach(m => { m.transparent = true; (m as THREE.LineBasicMaterial).opacity = 0.25; });
    scene.add(gridHelper);

    // Feature 8: LOD geometry (mobile = fewer segments)
    const isMobile = window.innerWidth < 768;
    const nodeGeo = new THREE.SphereGeometry(0.34, isMobile ? 20 : 32, isMobile ? 16 : 32);
    const satGeo  = new THREE.SphereGeometry(0.07, isMobile ? 12 : 16, isMobile ? 10 : 16);

    const branchMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0x111111, metalness: 0.85, roughness: 0.2 });
    const satMat    = new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0x111111, metalness: 0.85, roughness: 0.2 });

    function getSunMaterial(color: number) {
      return new THREE.MeshPhysicalMaterial({
        color: 0xffffff, emissive: color, emissiveIntensity: 0.7, metalness: 0.7, roughness: 0.15,
      });
    }

    // ── Overview scene ──────────────────────────────────────────────────────
    const network = new THREE.Group();
    scene.add(network);

    const coreGroup = new THREE.Group();
    network.add(coreGroup);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.9, 2),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0x222222, metalness: 0.9, roughness: 0.15, clearcoat: 1.0, clearcoatRoughness: 0.05 }),
    );
    coreGroup.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 1),
      new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true, transparent: true, opacity: 0.25 }),
    );
    coreGroup.add(wire);

    const coreGlow = new THREE.Sprite(glowMaterial.clone());
    coreGlow.material.opacity = 0.35;
    coreGlow.scale.set(5, 5, 1);
    coreGroup.add(coreGlow);

    const coreLabel = makeLabel('THE LAB', 34);
    coreLabel.position.set(0, -2.0, 0);
    coreGroup.add(coreLabel);

    const ringGroup = new THREE.Group();
    network.add(ringGroup);
    ringGroup.add(createRing(4.0, 0.12));
    ringGroup.add(createRing(5.6, 0.06));

    const orbitRadius = 4.0;
    const branchGroup = new THREE.Group();
    network.add(branchGroup);

    // ── Satellite trail helper ──────────────────────────────────────────────
    interface SatelliteData {
      group: THREE.Group;
      mesh: THREE.Mesh;
      glow: THREE.Sprite;
      label: THREE.Sprite;
      angle: number;
      speed: number;
      color: number;       // Feature 1
      trail: THREE.Line;   // Feature 2
      trailHistory: Array<{ x: number; y: number; z: number }>; // Feature 2
    }

    interface BranchNodeData {
      name: string;
      color: number;                // Feature 1
      group: THREE.Group;
      node: THREE.Mesh;
      label: THREE.Sprite;
      nodeGlow: THREE.Sprite;
      selectionRing: THREE.Line;   // Feature 3
      satellites: SatelliteData[];
      sunGlow: THREE.Sprite;
      planetOrbitRing: THREE.Line;
      angle: number;
      originalPos: THREE.Vector3;
    }

    const branchNodes: BranchNodeData[] = [];

    BRANCHES.forEach((name, i) => {
      // Feature 1: per-branch color
      const color = BRANCH_COLORS[name as Branch];
      const angle = (i / BRANCHES.length) * Math.PI * 2;
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius);

      const node = new THREE.Mesh(nodeGeo, branchMat.clone());
      (node as any).userData.originalMaterial = node.material;
      nodeGroup.add(node);

      // Feature 1: colored node glow
      const nodeGlowSprite = new THREE.Sprite(glowMaterial.clone());
      nodeGlowSprite.material.color.setHex(color);
      nodeGlowSprite.material.opacity = 0.22;
      nodeGlowSprite.scale.set(2.4, 2.4, 1);
      nodeGlowSprite.position.z = -0.1;
      nodeGroup.add(nodeGlowSprite);

      const label = makeLabel(name, 24);
      label.scale.set(1.6, 0.5, 1);
      label.position.set(0, -0.82, 0);
      nodeGroup.add(label);

      // Feature 3: Selection ring (shown on hover)
      const selectionRing = createRing(0.5, 0.0);
      (selectionRing.material as THREE.LineBasicMaterial).color.setHex(color);
      selectionRing.rotation.x = 0; // already set to PI/2 by createRing; keep horizontal
      nodeGroup.add(selectionRing);

      // Satellites
      const planetNames = PLANET_LABELS[name as Branch];
      const satellites: SatelliteData[] = [];
      for (let s = 0; s < 3; s++) {
        const satGroup = new THREE.Group();
        const satAngle = (s / 3) * Math.PI * 2;
        satGroup.position.set(Math.cos(satAngle) * 0.65, 0, Math.sin(satAngle) * 0.65);

        const sat = new THREE.Mesh(satGeo, satMat.clone());
        satGroup.add(sat);

        // Feature 1: colored satellite glow
        const satGlowSprite = new THREE.Sprite(glowMaterial.clone());
        satGlowSprite.material.color.setHex(color);
        satGlowSprite.material.opacity = 0.15;
        satGlowSprite.scale.set(1.2, 1.2, 1);
        satGroup.add(satGlowSprite);

        const satLabel = makeLabel(planetNames[s], 18);
        satLabel.scale.set(1.5, 0.45, 1);
        satLabel.position.set(0, -0.55, 0);
        satLabel.visible = false;
        satGroup.add(satLabel);

        // Feature 2: Trail line
        const trailGeo = new THREE.BufferGeometry();
        const trailPositions = new Float32Array(30 * 3);
        trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
        const trailMat = new THREE.LineBasicMaterial({
          color, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending,
        });
        const trail = new THREE.Line(trailGeo, trailMat);
        trail.frustumCulled = false;
        satGroup.add(trail);

        nodeGroup.add(satGroup);
        satellites.push({
          group: satGroup, mesh: sat, glow: satGlowSprite, label: satLabel,
          angle: satAngle, speed: 0.0012,
          color,      // Feature 1
          trail,      // Feature 2
          trailHistory: [], // Feature 2
        });
      }

      // Sun glow (detail mode)
      const sunGlowSprite = new THREE.Sprite(glowMaterial.clone());
      sunGlowSprite.material.color.setHex(color); // Feature 1
      sunGlowSprite.material.opacity = 0.0;
      sunGlowSprite.scale.set(8, 8, 1);
      nodeGroup.add(sunGlowSprite);

      // Feature 1: colored orbit ring
      const planetOrbitRing = createRing(2.4, 0.0);
      (planetOrbitRing.material as THREE.LineBasicMaterial).color.setHex(color);
      nodeGroup.add(planetOrbitRing);

      branchGroup.add(nodeGroup);
      branchNodes.push({
        name, color, group: nodeGroup, node, label, nodeGlow: nodeGlowSprite,
        selectionRing, satellites, sunGlow: sunGlowSprite, planetOrbitRing,
        angle, originalPos: nodeGroup.position.clone(),
      });
    });

    // Particles
    const particleCount = isMobile ? 40 : 60;
    const particleGeo   = new THREE.BufferGeometry();
    const positions     = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r     = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.4 }),
    );
    scene.add(particles);

    // ── Feature 2: Trail update helper ─────────────────────────────────────
    function updateTrail(sat: SatelliteData, branchColor: number, transitionValue: number) {
      const pos = sat.group.position;
      sat.trailHistory.push({ x: pos.x, y: pos.y, z: pos.z });
      if (sat.trailHistory.length > 30) sat.trailHistory.shift();

      const arr = sat.trail.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 30; i++) {
        const idx = sat.trailHistory.length - 30 + i;
        if (idx >= 0) {
          const p = sat.trailHistory[idx];
          arr[i * 3]     = p.x;
          arr[i * 3 + 1] = p.y;
          arr[i * 3 + 2] = p.z;
        } else {
          arr[i * 3] = arr[i * 3 + 1] = arr[i * 3 + 2] = 0;
        }
      }
      sat.trail.geometry.attributes.position.needsUpdate = true;
      (sat.trail.material as THREE.LineBasicMaterial).opacity = transitionValue > 0.7 ? 0.25 : 0;
      (sat.trail.material as THREE.LineBasicMaterial).color.setHex(branchColor);
    }

    // ── State ─────────────────────────────────────────────────────────────
    type SceneMode = 'overview' | 'detail';
    let sceneMode: SceneMode = 'overview';
    let sceneBranch: string | null = null;
    let transition = 0;
    let transitionTarget = 0;
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let dragDistance = 0;
    let lastTouchEnd = 0;
    let touchWasPinch = false;
    let pinchStartDist = 0;

    // Feature 6: Spring camera state with velocity fields
    const cameraState = {
      radius: 14, targetRadius: 14,
      theta: 0,   targetTheta: 0,
      phi: Math.PI / 2, targetPhi: Math.PI / 2,
      autoTheta: 0.0012,
      velRadius: 0, velTheta: 0, velPhi: 0, // spring velocities
    };

    function getResponsiveRadii() {
      const w = window.innerWidth;
      if (w < 480) return { overview: 11, detail: 6.5 };
      if (w < 768) return { overview: 12.5, detail: 7 };
      if (w < 1200) return { overview: 14, detail: 7.5 };
      return { overview: 15, detail: 8 };
    }
    function getFocusRadius() {
      const w = window.innerWidth;
      if (w < 480) return 3.5;
      if (w < 768) return 4;
      return 4.5;
    }

    type SatData = SatelliteData;

    const focusState = {
      active: false,
      targetSat: null as SatData | null,
      targetSatIndex: -1,
      progress: 0,
      startRadius: 0, endRadius: 0,
      startTheta: 0,  endTheta: 0,
      startPhi: 0,    endPhi: 0,
      opened: false,
    };

    // ── Hover & interaction ─────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();
    let hoveredNode: BranchNodeData | null = null;
    let hoveredPlanetSat: SatData | null = null;

    function updateMouse(clientX: number, clientY: number) {
      mouse.x =  (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    }
    function getHit(objects: THREE.Object3D[]) {
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(objects);
      return hits.length > 0 ? hits[0].object : null;
    }

    // Feature 3: highlightBranch now also toggles selectionRing
    function highlightBranch(bd: BranchNodeData, active: boolean) {
      if (!bd) return;
      (bd.node.material as THREE.MeshPhysicalMaterial).emissive.setHex(active ? 0x555555 : 0x111111);
      bd.node.scale.set(active ? 1.25 : 1, active ? 1.25 : 1, active ? 1.25 : 1);
      (bd.selectionRing.material as THREE.LineBasicMaterial).opacity = active ? 0.6 : 0;
    }

    // Feature 5: highlightSat resets to branch color (not grey)
    function highlightSat(sat: SatData, active: boolean) {
      if (!sat) return;
      (sat.mesh.material as THREE.MeshPhysicalMaterial).emissive.setHex(active ? 0x555555 : sat.color);
      sat.mesh.scale.set(active ? 1.25 : 1, active ? 1.25 : 1, active ? 1.25 : 1);
    }

    function sceneSelectBranch(bd: BranchNodeData) {
      sceneBranch = bd.name;
      sceneMode = 'detail';
      transitionTarget = 1;
      focusState.active = false; focusState.opened = false;
      focusState.targetSat = null; focusState.targetSatIndex = -1;

      // Feature 1: Use branch color for sun material
      bd.node.material = getSunMaterial(bd.color);
      branchNodes.forEach(b => {
        if (b !== bd) {
          b.node.material = (b.node as any).userData.originalMaterial;
          (b.node.material as THREE.MeshPhysicalMaterial).emissive.setHex(0x111111);
        }
        // Clear all selection rings on branch select
        (b.selectionRing.material as THREE.LineBasicMaterial).opacity = 0;
      });

      const r = getResponsiveRadii();
      cameraState.targetRadius = r.detail;
      cameraState.targetTheta  = 0;
      cameraState.targetPhi    = Math.PI / 2.25;
      cameraState.autoTheta    = 0.0008;
      // Feature 6: reset spring velocities on mode change
      cameraState.velRadius = 0; cameraState.velTheta = 0; cameraState.velPhi = 0;
      bridgeRef.current.onBranchSelect(bd.name);
    }

    function sceneBackToOverview() {
      sceneBranch = null;
      sceneMode = 'overview';
      transitionTarget = 0;
      focusState.active = false; focusState.opened = false;
      focusState.targetSat = null; focusState.targetSatIndex = -1;
      branchNodes.forEach(b => {
        b.node.material = (b.node as any).userData.originalMaterial;
        (b.node.material as THREE.MeshPhysicalMaterial).emissive.setHex(0x111111);
      });
      const r = getResponsiveRadii();
      cameraState.targetRadius = r.overview;
      cameraState.targetTheta  = 0;
      cameraState.targetPhi    = Math.PI / 2;
      cameraState.autoTheta    = 0.0012;
      // Feature 6: reset spring velocities
      cameraState.velRadius = 0; cameraState.velTheta = 0; cameraState.velPhi = 0;
      bridgeRef.current.onBackToOverview();
    }

    function startPlanetFocus(sat: SatData, satIndex: number) {
      if (focusState.active) return;
      focusState.active         = true;
      focusState.targetSat      = sat;
      focusState.targetSatIndex = satIndex;
      focusState.progress       = 0;
      focusState.opened         = false;
      focusState.startRadius    = cameraState.targetRadius;
      focusState.startTheta     = cameraState.targetTheta;
      focusState.startPhi       = cameraState.targetPhi;
      focusState.endRadius      = getFocusRadius();
      focusState.endPhi         = Math.PI / 2;
      bridgeRef.current.onPlanetFocus(PLANET_LABELS[sceneBranch as Branch][satIndex]);
    }

    // Expose imperative commands to React
    cmdRef.current.goDetail = (branchIdx: number) => {
      const bd = branchNodes[branchIdx];
      if (bd) sceneSelectBranch(bd);
    };
    cmdRef.current.goOverview = () => sceneBackToOverview();
    cmdRef.current.closePanel = () => {
      focusState.active         = false;
      focusState.opened         = false;
      focusState.targetSat      = null;
      focusState.targetSatIndex = -1;
      const r = getResponsiveRadii();
      cameraState.targetRadius = r.detail;
      cameraState.targetTheta  = 0;
      cameraState.targetPhi    = Math.PI / 2.25;
      // Feature 6: reset spring velocities
      cameraState.velRadius = 0; cameraState.velTheta = 0; cameraState.velPhi = 0;
    };

    // ── Input handlers ──────────────────────────────────────────────────────
    function onDragStart(x: number, y: number) { isDragging = true; lastX = x; lastY = y; dragDistance = 0; }
    function onDragMove(x: number, y: number) {
      if (!isDragging) return;
      const dx = x - lastX, dy = y - lastY;
      dragDistance += Math.abs(dx) + Math.abs(dy);
      cameraState.targetTheta -= dx * 0.0045;
      cameraState.targetPhi   -= dy * 0.0035;
      cameraState.targetPhi = Math.max(0.35, Math.min(Math.PI - 0.35, cameraState.targetPhi));
      lastX = x; lastY = y;
    }
    function onDragEnd() { isDragging = false; }
    function getPinchDist(t: TouchList) {
      const dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function handleClick(clientX: number, clientY: number) {
      if (dragDistance > 10) return;
      if (uiOverlayRef.current) return;
      updateMouse(clientX, clientY);
      if (sceneMode === 'overview') {
        const hit = getHit(branchNodes.map(b => b.node));
        if (hit) {
          const bd = branchNodes.find(b => b.node === hit);
          if (bd) sceneSelectBranch(bd);
        }
      } else if (sceneMode === 'detail') {
        if (focusState.active) return;
        const bd = branchNodes.find(b => b.name === sceneBranch);
        if (!bd) return;
        const hit = getHit(bd.satellites.map(s => s.mesh));
        if (hit) {
          const sat = bd.satellites.find(s => s.mesh === hit);
          if (sat) startPlanetFocus(sat, bd.satellites.indexOf(sat));
        } else {
          sceneBackToOverview();
        }
      }
    }

    const onMouseDown  = (e: MouseEvent) => onDragStart(e.clientX, e.clientY);
    const onMouseUp    = () => onDragEnd();
    const onMouseLeave = () => onDragEnd();
    const onMouseMove  = (e: MouseEvent) => {
      onDragMove(e.clientX, e.clientY);
      updateMouse(e.clientX, e.clientY);
      if (sceneMode === 'overview') {
        const hit = getHit(branchNodes.map(b => b.node));
        if (hit) {
          const bd = branchNodes.find(b => b.node === hit);
          if (hoveredNode !== bd) {
            if (hoveredNode) highlightBranch(hoveredNode, false);
            hoveredNode = bd ?? null;
            if (hoveredNode) highlightBranch(hoveredNode, true);
            document.body.style.cursor = 'pointer';
          }
        } else {
          if (hoveredNode) { highlightBranch(hoveredNode, false); hoveredNode = null; document.body.style.cursor = 'default'; }
        }
      } else if (sceneMode === 'detail') {
        const bd = branchNodes.find(b => b.name === sceneBranch);
        if (!bd) return;
        const hit = getHit(bd.satellites.map(s => s.mesh));
        if (hit) {
          const sat = bd.satellites.find(s => s.mesh === hit);
          if (hoveredPlanetSat !== sat) {
            if (hoveredPlanetSat) highlightSat(hoveredPlanetSat, false);
            hoveredPlanetSat = sat ?? null;
            if (hoveredPlanetSat) highlightSat(hoveredPlanetSat, true);
            document.body.style.cursor = 'pointer';
            const idx = bd.satellites.indexOf(hoveredPlanetSat!);
            bridgeRef.current.setStatus('Click ' + PLANET_LABELS[bd.name as Branch][idx] + ' to open resources');
          }
        } else {
          if (hoveredPlanetSat) { highlightSat(hoveredPlanetSat, false); hoveredPlanetSat = null; document.body.style.cursor = 'default'; }
        }
      }
    };
    const onClick = (e: MouseEvent) => {
      if (Date.now() - lastTouchEnd < 350) return;
      handleClick(e.clientX, e.clientY);
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) { touchWasPinch = true; pinchStartDist = getPinchDist(e.touches); }
      else if (e.touches.length === 1) onDragStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = (e: TouchEvent) => {
      lastTouchEnd = Date.now();
      if (e.touches.length === 0) {
        onDragEnd();
        if (!touchWasPinch && e.changedTouches.length > 0) handleClick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        touchWasPinch = false;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        touchWasPinch = true;
        const dist = getPinchDist(e.touches);
        const minR = sceneMode === 'detail' ? 5 : 6;
        const maxR = window.innerWidth < 768 ? 20 : 24;
        cameraState.targetRadius = Math.max(minR, Math.min(maxR, cameraState.targetRadius + (pinchStartDist - dist) * 0.025));
        pinchStartDist = dist;
      } else if (e.touches.length === 1) onDragMove(e.touches[0].clientX, e.touches[0].clientY);
      e.preventDefault();
    };
    const onWheel = (e: WheelEvent) => {
      const minR = sceneMode === 'detail' ? 5 : 6;
      const maxR = window.innerWidth < 768 ? 20 : 24;
      cameraState.targetRadius = Math.max(minR, Math.min(maxR, cameraState.targetRadius + e.deltaY * 0.015));
    };

    // Feature 7: Arrow key camera rotation
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sceneBackToOverview();
        return;
      }
      if (sceneMode === 'overview') {
        if (e.key === 'ArrowRight') cameraState.targetTheta -= 0.3;
        if (e.key === 'ArrowLeft')  cameraState.targetTheta += 0.3;
      } else if (sceneMode === 'detail' && !focusState.active) {
        if (e.key === 'ArrowRight') cameraState.targetTheta -= 0.25;
        if (e.key === 'ArrowLeft')  cameraState.targetTheta += 0.25;
      }
    };

    const onResize = () => {
      const r = getResponsiveRadii();
      camera.aspect = window.innerWidth / window.innerHeight;
      const ar = camera.aspect;
      // Feature 8: Dynamic FOV by aspect ratio
      camera.fov = ar < 0.6 ? 70 : ar < 1 ? 62 : ar < 1.4 ? 58 : 55;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      cameraState.radius       = sceneMode === 'detail' ? r.detail : r.overview;
      cameraState.targetRadius = sceneMode === 'detail' ? r.detail : r.overview;
      cameraState.velRadius = 0;
      cameraState.velTheta  = 0;
      cameraState.velPhi    = 0;
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClick);
    document.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', () => setTimeout(onResize, 100));

    // ── Animation loop ──────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      // Feature 8: Frame-rate independent dt
      const dt = Math.min(clock.getDelta(), 0.1);
      const t  = clock.getElapsedTime();
      const ts = dt * 60; // normalized to 60fps

      transition += (transitionTarget - transition) * 0.05 * ts;

      // ── Planet focus zoom
      if (focusState.active && focusState.targetSat) {
        focusState.progress += 0.04 * ts;
        focusState.endTheta  = focusState.targetSat.angle;

        const p    = Math.min(focusState.progress, 1);
        const ease = p * (2 - p); // ease-out quad

        cameraState.targetRadius = focusState.startRadius + (focusState.endRadius - focusState.startRadius) * ease;

        const dTheta = shortestAngleDelta(focusState.startTheta, focusState.endTheta);
        cameraState.targetTheta = focusState.startTheta + dTheta * ease;
        cameraState.targetPhi   = focusState.startPhi + (focusState.endPhi - focusState.startPhi) * ease;

        if (focusState.progress >= 1 && !focusState.opened) {
          focusState.opened = true;
          const planetName = PLANET_LABELS[sceneBranch as Branch][focusState.targetSatIndex];
          bridgeRef.current.onPlanetSelect(planetName);
        }
      }

      // Feature 6: Spring physics camera
      const rSpring = smoothSpring(cameraState.radius, cameraState.targetRadius, cameraState.velRadius, 6, 4.5, dt);
      cameraState.radius    = rSpring.current;
      cameraState.velRadius = rSpring.velocity;

      const thetaDelta  = shortestAngleDelta(cameraState.theta, cameraState.targetTheta);
      const thSpring    = smoothSpring(0, thetaDelta, cameraState.velTheta, 7, 5.0, dt);
      cameraState.theta    += thSpring.current;
      cameraState.velTheta  = thSpring.velocity;

      const phSpring = smoothSpring(cameraState.phi, cameraState.targetPhi, cameraState.velPhi, 6, 4.5, dt);
      cameraState.phi    = phSpring.current;
      cameraState.velPhi = phSpring.velocity;

      if (!isDragging && !focusState.active) {
        cameraState.targetTheta += cameraState.autoTheta * ts;
        cameraState.theta       += cameraState.autoTheta * ts;
      }

      camera.position.x = cameraState.radius * Math.sin(cameraState.phi) * Math.sin(cameraState.theta);
      camera.position.y = cameraState.radius * Math.cos(cameraState.phi) + Math.sin(t * 0.2) * 0.3;
      camera.position.z = cameraState.radius * Math.sin(cameraState.phi) * Math.cos(cameraState.theta);
      camera.lookAt(0, 0, 0);

      const ov = 1 - transition;

      // ── Overview animations
      if (ov > 0) {
        network.rotation.y += 0.0008 * ts * ov;

        core.rotation.y += 0.005 * ts;
        core.rotation.x += 0.002 * ts;
        wire.rotation.y -= 0.004 * ts;
        wire.rotation.z += 0.002 * ts;
        const pulse = 1 + Math.sin(t * 1.5) * 0.04;
        core.scale.set(pulse, pulse, pulse);
        coreGlow.scale.set(5 * pulse, 5 * pulse, 1);
        coreLabel.lookAt(camera.position);

        ringGroup.rotation.y -= 0.0008 * ts;
        ringGroup.rotation.x = Math.sin(t * 0.3) * 0.05 * ov;

        // Feature 4: Animated grid floor
        gridHelper.position.z = Math.sin(t * 0.1) * 2;
        gridHelper.rotation.y += 0.0005 * ts;

        branchNodes.forEach(b => {
          b.node.rotation.y += 0.008 * ts * ov;
          b.satellites.forEach(sat => {
            sat.angle += sat.speed * ts * ov;
            sat.group.position.x = Math.cos(sat.angle) * 0.65;
            sat.group.position.y = 0;
            sat.group.position.z = Math.sin(sat.angle) * 0.65;
            sat.mesh.scale.set(1, 1, 1);
            sat.label.visible = false;
            sat.glow.scale.set(1.2, 1.2, 1);
            sat.glow.material.opacity = 0.15;
            (sat.trail.material as THREE.LineBasicMaterial).opacity = 0;
            sat.trailHistory.length = 0; // clear trail in overview
          });
          b.node.scale.set(1, 1, 1);
          b.sunGlow.material.opacity = 0;
          (b.planetOrbitRing.material as THREE.LineBasicMaterial).opacity = 0;
          b.label.lookAt(camera.position);
          b.label.visible = true;
          b.group.visible = ov > 0.01;
          if (b.group.visible) b.group.position.copy(b.originalPos);
        });

        coreGroup.visible = ov > 0.01;
        ringGroup.visible = ov > 0.01;
      }

      // ── Detail animations
      if (transition > 0) {
        const bd = branchNodes.find(b => b.name === sceneBranch);
        if (bd) {
          bd.group.position.copy(bd.originalPos.clone().lerp(new THREE.Vector3(0, 0, 0), transition));
          bd.group.visible = true;

          bd.node.rotation.y += 0.003 * ts;
          bd.node.rotation.x += 0.001 * ts;
          const sunPulse = 1 + Math.sin(t * 2) * 0.03;
          const sunScale = 1 + transition * 2.5;
          bd.node.scale.setScalar(sunScale * sunPulse);
          bd.sunGlow.material.opacity = 0.6 * transition;
          bd.sunGlow.scale.set(8 * sunScale * sunPulse, 8 * sunScale * sunPulse, 1);
          bd.label.visible = false;

          const pRadius = 0.65 + transition * 1.75;
          (bd.planetOrbitRing.material as THREE.LineBasicMaterial).opacity = 0.22 * transition;
          bd.planetOrbitRing.scale.setScalar(1);

          bd.satellites.forEach((sat, i) => {
            sat.angle += sat.speed * ts;
            sat.group.position.x = Math.cos(sat.angle) * pRadius;
            sat.group.position.y = 0;
            sat.group.position.z = Math.sin(sat.angle) * pRadius;
            sat.mesh.rotation.y += 0.008 * ts;
            sat.mesh.scale.setScalar(1 + transition * 7);

            sat.label.visible = transition > 0.3;
            sat.label.scale.set(1.5 + transition * 0.5, 0.45 + transition * 0.15, 1);
            sat.label.lookAt(camera.position);

            // Feature 2: Trail lines
            updateTrail(sat, bd.color, transition);

            const isFocused = focusState.active && i === focusState.targetSatIndex;
            if (isFocused) {
              const fp = Math.min(focusState.progress, 1);
              const burst = 1 + Math.sin(fp * Math.PI) * 1.5;
              sat.glow.scale.setScalar((1.2 + transition * 3) * burst);
              sat.glow.material.opacity = Math.min(1, (0.15 + transition * 0.35) + Math.sin(fp * Math.PI) * 0.5);
            } else {
              sat.glow.scale.setScalar(1.2 + transition * 3);
              sat.glow.material.opacity = 0.15 + transition * 0.35;
            }
          });

          branchNodes.forEach(b => { if (b !== bd) b.group.visible = false; });
          coreGroup.visible = false;
          ringGroup.visible = false;
        }
      }

      particles.rotation.y += 0.0003 * ts;
      particles.rotation.x += 0.0001 * ts;
      renderer.render(scene, camera);
    }

    onResize();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('click', onClick);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      document.body.style.cursor = 'default';
    };
  }, []);

  // ── Data fetching ────────────────────────────────────────────────────────────
  async function fetchFiles() {
    if (!isSupabaseConfigured || !supabase) { setLoadingFiles(false); return; }
    const q = supabase.from('lab_files').select('*').order('created_at', { ascending: false });
    const { data } = isSupervisor ? await q : await q.eq('is_visible', true);
    setAllFiles((data ?? []) as LabFile[]);
    setLoadingFiles(false);
  }

  async function fetchBalance() {
    if (!userEmail || !supabase || isSupervisor) return;
    const { data } = await supabase.from('referrals').select('available_referrals').eq('user_email', userEmail).maybeSingle();
    setUserBalance((data as any)?.available_referrals ?? 0);
  }

  async function fetchPaidFiles() {
    if (!userEmail || !supabase || isSupervisor) return;
    try {
      const { data } = await supabase.from('payments').select('file_id').eq('user_email', userEmail);
      if (data && data.length > 0) {
        setUnlockedIds(s => new Set([...s, ...data.map((d: any) => String(d.file_id))]));
      }
    } catch { /* ignore — table may not exist yet */ }
  }

  async function handleBuyFile(f: LabFile) {
    if (!f.price || !userEmail) return;
    if (!(window as any).Razorpay) {
      alert('Payment system not loaded. Please refresh and try again.');
      return;
    }
    setPayingFileId(f.id);
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_id: f.id, amount: f.price, user_email: userEmail, file_name: f.name }),
      });
      if (!res.ok) throw new Error('Order creation failed');
      const order = await res.json() as { order_id: string; amount: number; currency: string; key_id: string };

      const rzp = new (window as any).Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'ExamCodes',
        description: f.name,
        order_id: order.order_id,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          try {
            const vRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                file_id: f.id,
                user_email: userEmail,
                amount: f.price,
              }),
            });
            if (vRes.ok) {
              setUnlockedIds(s => new Set([...s, f.id]));
            }
          } finally {
            setPayingFileId(null);
          }
        },
        prefill: { email: userEmail },
        theme: { color: '#111111' },
        modal: { ondismiss: () => setPayingFileId(null) },
      });
      rzp.on('payment.failed', () => setPayingFileId(null));
      rzp.open();
    } catch {
      setPayingFileId(null);
    }
  }

  React.useEffect(() => {
    fetchFiles();
    fetchBalance();
    fetchPaidFiles();
    const timer = setTimeout(() => {
      setStatusText(`Network Active — ${BRANCHES.length} Branches Online`);
      setShowHint(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Files for selected branch+planet
  const panelFiles = React.useMemo(() =>
    allFiles.filter(f =>
      f.category?.toUpperCase() === selectedBranch.toUpperCase() &&
      f.sub_category?.toLowerCase() === selectedPlanet.toLowerCase()
    ),
    [allFiles, selectedBranch, selectedPlanet],
  );

  // Feature 11: Filtered files by search query
  const filteredPanelFiles = React.useMemo(() =>
    panelSearch.trim()
      ? panelFiles.filter(f => f.name.toLowerCase().includes(panelSearch.toLowerCase()))
      : panelFiles,
    [panelFiles, panelSearch],
  );

  // ── Supervisor ops ──────────────────────────────────────────────────────────
  async function handleUpload() {
    if (!uploadFile || !uploadName.trim() || !supabase) return;
    setUploading(true); setUploadError('');
    try {
      const ext  = uploadFile.name.split('.').pop();
      const path = `lab/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('lab-files').upload(path, uploadFile);
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage.from('lab-files').getPublicUrl(path);
      const row: Record<string, unknown> = {
        name: uploadName.trim(), description: uploadDesc.trim() || null,
        file_url: urlData.publicUrl, file_type: uploadFile.type || 'application/octet-stream',
        file_size: uploadFile.size, storage_path: path, is_visible: true,
        access_type: uploadAccess, view_count: 0,
        category: uploadCat, sub_category: uploadSubCat,
      };
      const needsPrice = uploadAccess === 'price' || uploadAccess === 'price_and_referrals' || uploadAccess === 'price_or_referrals';
      const needsRefs  = uploadAccess === 'referrals' || uploadAccess === 'price_and_referrals' || uploadAccess === 'price_or_referrals';
      if (needsPrice) row.price = parseInt(uploadPrice) || null;
      if (needsRefs)  row.referrals_required = parseInt(uploadRefs) || null;
      const { error: dbErr } = await supabase.from('lab_files').insert(row);
      if (dbErr) throw dbErr;
      setUploadName(''); setUploadDesc(''); setUploadFile(null);
      setUploadAccess('free'); setUploadPrice(''); setUploadRefs('');
      setShowUpload(false);
      fetchFiles();
    } catch (e: any) { setUploadError(e.message ?? 'Upload failed'); }
    setUploading(false);
  }

  async function toggleVisible(f: LabFile) {
    if (!supabase) return;
    await supabase.from('lab_files').update({ is_visible: !f.is_visible }).eq('id', f.id);
    fetchFiles();
  }
  async function deleteFile(f: LabFile) {
    if (!supabase || !window.confirm(`Delete "${f.name}"?`)) return;
    if (f.storage_path) await supabase.storage.from('lab-files').remove([f.storage_path]);
    await supabase.from('lab_files').delete().eq('id', f.id);
    fetchFiles();
  }
  async function spendRefs(f: LabFile) {
    if (!supabase || !userEmail || !f.referrals_required) return;
    const cost = f.referrals_required;
    if (userBalance < cost || !window.confirm(`Spend ${cost} ref${cost > 1 ? 's' : ''} to unlock "${f.name}"?`)) return;
    const { error } = await supabase.from('referrals').update({ available_referrals: userBalance - cost }).eq('user_email', userEmail);
    if (!error) { setUserBalance(b => b - cost); setUnlockedIds(s => new Set([...s, f.id])); }
  }
  async function trackView(f: LabFile) {
    if (!supabase) return;
    void supabase.from('lab_files').update({ view_count: (f.view_count ?? 0) + 1 }).eq('id', f.id).then(() => {});
  }

  const needsPrice = uploadAccess === 'price' || uploadAccess === 'price_and_referrals' || uploadAccess === 'price_or_referrals';
  const needsRefs  = uploadAccess === 'referrals' || uploadAccess === 'price_and_referrals' || uploadAccess === 'price_or_referrals';

  function handleBack() {
    if (mode === 'panel') {
      setMode('detail');
      cmdRef.current.closePanel();
      return;
    }
    if (mode === 'detail') {
      cmdRef.current.goOverview();
      return;
    }
    onBack();
  }

  const panelOpen      = mode === 'panel';
  const detailOrPanel  = mode === 'detail' || mode === 'panel';

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      {/* 3D Canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 1, display: 'block' }} />

      {/* UI Layer */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column' }}>

        {/* Top bar */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 28px', borderBottom: '1px solid #1a1a1a' }}>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors cursor-pointer"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'none', border: 'none' }}
          >
            ← {mode === 'overview' ? 'EXIT LAB' : 'BACK'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {!isSupervisor && userBalance > 0 && (
              <div className="flex items-center gap-1.5 border border-white/15 px-2.5 py-1 bg-white/[0.03]">
                <Coins className="w-3 h-3 text-white/50" />
                <span className="text-[9px] tracking-[0.15em] font-bold text-white">{userBalance}</span>
                <span className="text-[8px] tracking-[0.1em] text-gray-500">REFS</span>
              </div>
            )}
            {isSupervisor && (
              <button
                onClick={() => setShowUpload(true)}
                className="flex items-center gap-2 px-4 py-2 border border-white/30 hover:border-white/60 text-white text-[9px] tracking-[0.15em] font-bold transition-all cursor-pointer hover:bg-white/[0.05]"
                style={{ pointerEvents: 'auto' }}
              >
                <Plus className="w-3 h-3" /> UPLOAD
              </button>
            )}
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888' }}>
              Kronos Control
            </span>
          </div>
        </div>

        {/* Centre text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '6vh', pointerEvents: 'none' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid #1a1a1a', background: 'rgba(10,10,10,0.6)',
            padding: '8px 16px',
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#f5f5f5', marginBottom: 18, backdropFilter: 'blur(6px)',
          }}>
            ⚗ {detailOrPanel ? 'Branch Detail' : 'The Lab'}
          </div>

          <h1 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 400,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            textAlign: 'center', marginBottom: 12, color: '#f5f5f5',
            textShadow: '0 0 40px rgba(255,255,255,0.08)',
          }}>
            {detailOrPanel ? selectedBranch : "Aryan's Lab"}
          </h1>

          <p style={{ fontSize: 13, color: '#888', textAlign: 'center', maxWidth: 420, lineHeight: 1.6, marginBottom: 8 }}>
            {detailOrPanel
              ? `Select a planet to access ${selectedBranch} resources.`
              : 'Files, resources, and experiments uploaded directly by the supervisor.'}
          </p>

          {/* Feature 10: Breadcrumbs */}
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 9,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#555', marginBottom: '3vh',
          }}>
            <span style={{ color: detailOrPanel ? '#555' : '#888' }}>THE LAB</span>
            {selectedBranch && (
              <>
                <span style={{ color: '#333', margin: '0 6px' }}>/</span>
                <span style={{ color: selectedPlanet ? '#555' : '#f5f5f5' }}>{selectedBranch}</span>
              </>
            )}
            {selectedPlanet && (
              <>
                <span style={{ color: '#333', margin: '0 6px' }}>/</span>
                <span style={{ color: '#f5f5f5' }}>{selectedPlanet}</span>
              </>
            )}
          </div>

          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
            color: statusText.startsWith('Establishing') ? '#ffffff' : '#888',
            opacity: statusText.startsWith('Establishing') ? 1 : 0.7,
            transition: 'color 0.3s, opacity 0.3s',
          }}>
            {statusText}
          </div>
        </div>
      </div>

      {/* Hint */}
      {showHint && !detailOrPanel && (
        <div style={{
          position: 'fixed', bottom: 60, left: '50%', transform: 'translateX(-50%)',
          zIndex: 20, fontFamily: "'Space Mono', monospace",
          fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#888', pointerEvents: 'none',
          animation: 'labHintPulse 4s ease-in-out infinite',
        }}>
          Drag to rotate · Scroll / pinch to zoom · Click a branch
        </div>
      )}

      {/* CRT Scanlines (flashes on panel open) */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 31,
        background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)',
        opacity: showScanlines ? 1 : 0,
        transition: 'opacity 0.3s',
      }} />

      {/* Data Panel */}
      <div
        onClick={e => { if (e.target === e.currentTarget) { setMode('detail'); cmdRef.current.closePanel(); } }}
        style={{
          position: 'fixed', inset: 0, zIndex: 30,
          background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          opacity: panelOpen ? 1 : 0, pointerEvents: panelOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        <div style={{
          width: '100%', maxWidth: 720, maxHeight: '80vh',
          background: '#0a0a0a', border: '1px solid #1a1a1a',
          padding: 32, overflowY: 'auto',
          transform: panelOpen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
          opacity: panelOpen ? 1 : 0,
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
        }}>
          {/* Panel header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid #1a1a1a' }}>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>
                {selectedBranch} / {selectedPlanet}
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f5f5f5' }}>
                {selectedPlanet}
              </div>
            </div>
            <button
              onClick={() => { setMode('detail'); cmdRef.current.closePanel(); }}
              style={{ background: 'transparent', border: '1px solid #1a1a1a', color: '#888', width: 40, height: 40, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className="hover:border-white/30 hover:text-white transition-all"
            >
              ×
            </button>
          </div>

          {/* Feature 11: Search box */}
          <input
            type="text"
            value={panelSearch}
            onChange={e => setPanelSearch(e.target.value)}
            placeholder="Search resources..."
            style={{
              width: '100%', background: 'transparent', border: '1px solid #1a1a1a',
              color: '#f5f5f5', padding: '10px 14px',
              fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.05em',
              marginBottom: 20, outline: 'none', transition: 'border-color 0.3s',
            }}
            className="focus:border-white/25 placeholder:text-gray-600"
          />

          {/* Files */}
          {loadingFiles ? (
            <div className="flex justify-center py-10">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
          ) : filteredPanelFiles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: '#444' }}>
              {panelSearch.trim() ? 'NO RESULTS MATCH YOUR SEARCH' : 'NO FILES IN THIS SECTION YET'}
              {!panelSearch.trim() && isSupervisor && (
                <p style={{ marginTop: 12, fontSize: 10, color: '#333' }}>
                  Upload a file with Category: {selectedBranch} / Sub-category: {selectedPlanet}
                </p>
              )}
            </div>
          ) : (
            <div key={panelKey} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {filteredPanelFiles.map((f, idx) => (
                <div
                  key={f.id}
                  style={{
                    opacity: 0, transform: 'translateY(12px)',
                    animation: 'labItemIn 0.35s ease forwards',
                    animationDelay: `${0.05 + idx * 0.07}s`,
                  }}
                >
                  <FileRow
                    f={f}
                    isSupervisor={isSupervisor}
                    userBalance={userBalance}
                    unlockedIds={unlockedIds}
                    onSpendRefs={spendRefs}
                    onView={trackView}
                    onToggleVisible={toggleVisible}
                    onDelete={deleteFile}
                    onBuy={razorpayEnabled ? handleBuyFile : undefined}
                    payingFileId={payingFileId}
                  />
                </div>
              ))}
            </div>
          )}

          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444', marginTop: 24 }}>
            Click a resource to access · Close to return to orbit
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/10 p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm tracking-[0.15em] font-bold text-white">UPLOAD FILE</h3>
              <button onClick={() => { setShowUpload(false); setUploadError(''); }} className="text-gray-500 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] tracking-[0.2em] text-gray-400 mb-1.5">NAME *</label>
                <input value={uploadName} onChange={e => setUploadName(e.target.value)} placeholder="e.g. JEE Physics Formulas" className={inputCls} />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] text-gray-400 mb-1.5">DESCRIPTION</label>
                <textarea value={uploadDesc} onChange={e => setUploadDesc(e.target.value)} placeholder="Short description (optional)" rows={2} className={`${inputCls} resize-none`} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] text-gray-400 mb-1.5">BRANCH *</label>
                  <select
                    value={uploadCat}
                    onChange={e => {
                      const cat = e.target.value as Branch;
                      setUploadCat(cat);
                      setUploadSubCat(PLANET_LABELS[cat][0]);
                    }}
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] text-gray-400 mb-1.5">PLANET *</label>
                  <select
                    value={uploadSubCat}
                    onChange={e => setUploadSubCat(e.target.value)}
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    {PLANET_LABELS[uploadCat as Branch].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] tracking-[0.2em] text-gray-400 mb-1.5">ACCESS TYPE *</label>
                <select value={uploadAccess} onChange={e => setUploadAccess(e.target.value as AccessType)} className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="free">FREE — Anyone can open</option>
                  <option value="price">PAID — Specific price in ₹</option>
                  <option value="referrals">REFERRAL-GATED — Costs X credits</option>
                  <option value="price_and_referrals">PRICE + REFERRALS — Both required</option>
                  <option value="price_or_referrals">PRICE OR REFERRALS — Either works</option>
                </select>
              </div>
              {needsPrice && (
                <div>
                  <label className="block text-[9px] tracking-[0.2em] text-gray-400 mb-1.5">PRICE (₹) *</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                    <input type="number" min="1" value={uploadPrice} onChange={e => setUploadPrice(e.target.value)} placeholder="e.g. 199" className={`${inputCls} pl-7`} />
                  </div>
                </div>
              )}
              {needsRefs && (
                <div>
                  <label className="block text-[9px] tracking-[0.2em] text-gray-400 mb-1.5">REFERRALS REQUIRED *</label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                    <input type="number" min="1" value={uploadRefs} onChange={e => setUploadRefs(e.target.value)} placeholder="e.g. 3" className={`${inputCls} pl-7`} />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[9px] tracking-[0.2em] text-gray-400 mb-1.5">FILE *</label>
                <input ref={fileInputRef} type="file" onChange={e => setUploadFile(e.target.files?.[0] ?? null)} className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-dashed border-white/20 hover:border-white/40 py-4 text-[10px] tracking-[0.15em] text-gray-400 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {uploadFile ? uploadFile.name : 'CHOOSE FILE'}
                </button>
              </div>
              {uploadError && <p className="text-red-400 text-[10px] tracking-wide">{uploadError}</p>}
              <button
                onClick={handleUpload}
                disabled={uploading || !uploadFile || !uploadName.trim() || (needsPrice && !uploadPrice) || (needsRefs && !uploadRefs)}
                className="w-full py-3 bg-white text-black text-[10px] tracking-[0.2em] font-bold hover:bg-gray-200 transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                {uploading ? 'UPLOADING...' : 'UPLOAD'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes labHintPulse { 0%,100% { opacity: 0.35; } 50% { opacity: 0.7; } }
        @keyframes labItemIn    { to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
