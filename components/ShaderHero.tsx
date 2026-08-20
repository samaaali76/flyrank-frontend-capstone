'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── The fragment shader itself (GLSL) ───────────────────────────
// This runs once per pixel, every frame, entirely on the GPU.
//
// uv        : this pixel's position on screen, normalized to 0–1
// u_time    : seconds since the shader started — drives the animation
// u_resolution : canvas size in pixels — used to correct aspect ratio
// u_mouse   : normalized cursor position (0–1), used to bend the flow
const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  varying vec2 vUv;

  // Cheap pseudo-random noise — turns a 2D position into a number
  // between 0 and 1 with no visible pattern. This is what makes the
  // stars land in different spots instead of a perfect grid.
  float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // Draws one layer of stars. Splitting space into a grid of cells
  // and placing (at most) one star per cell is a cheap way to get
  // scattered points without generating thousands of individual dots.
  float starLayer(vec2 uv, float density, float twinkleSpeed) {
    vec2 grid = fract(uv * density) - 0.5;
    vec2 cellId = floor(uv * density);

    float star = random(cellId);
    // Only ~15% of cells actually get a star — keeps it sparse
    // instead of a wall of dots.
    if (star > 0.85) {
      float dist = length(grid);
      float twinkle = 0.6 + 0.4 * sin(u_time * twinkleSpeed + star * 30.0);
      return smoothstep(0.05, 0.0, dist) * twinkle;
    }
    return 0.0;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= u_resolution.x / u_resolution.y;

    // Cursor gently pans the whole starfield, like a parallax effect.
    vec2 mouseOffset = (u_mouse - 0.5) * 0.08;

    // Three layers moving at different speeds/densities/sizes fake
    // depth — distant stars drift slower and are smaller than close
    // ones, same trick real parallax backgrounds use.
    float stars = 0.0;
    stars += starLayer(uv + mouseOffset * 0.3 + vec2(u_time * 0.005, 0.0), 8.0, 1.2);
    stars += starLayer(uv + mouseOffset * 0.6 + vec2(u_time * 0.012, u_time * 0.004), 14.0, 1.8);
    stars += starLayer(uv + mouseOffset * 1.0 + vec2(u_time * 0.02, u_time * 0.008), 22.0, 2.4);

    // Palette: slate-teal at the top fading to soft pink at the
    // bottom, with a pale teal midpoint so the transition doesn't
    // pass straight through gray.
    vec3 topColor = vec3(0.365, 0.420, 0.420);    // #5D6B6B
    vec3 midColor = vec3(0.835, 0.898, 0.898);    // #D5E5E5
    vec3 bottomColor = vec3(0.969, 0.796, 0.792); // #F7CBCA

    vec3 bg = mix(topColor, midColor, smoothstep(0.0, 0.55, vUv.y));
    bg = mix(bg, bottomColor, smoothstep(0.55, 1.0, vUv.y));

    vec3 starColor = vec3(0.945, 0.969, 0.969); // #F1F7F7
    vec3 color = bg + starColor * stars;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export function ShaderHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const el: HTMLDivElement = container;

    // Respect reduced-motion: skip WebGL entirely and let the CSS
    // fallback gradient (see ShaderHero.css) show instead.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // Cap devicePixelRatio at 2 — going higher just burns battery
    // for a difference nobody can see.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(el.clientWidth, el.clientHeight),
      },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    let animationId: number;
    let paused = false;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);
      if (paused) return;
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    }
    animate();

    // Pause the render loop when the tab isn't visible, so it's not
    // burning GPU/battery in a background tab.
    function handleVisibility() {
      paused = document.hidden;
    }
    document.addEventListener('visibilitychange', handleVisibility);

    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      uniforms.u_mouse.value.x = (e.clientX - rect.left) / rect.width;
      uniforms.u_mouse.value.y = 1 - (e.clientY - rect.top) / rect.height;
    }
    window.addEventListener('mousemove', handleMouseMove);

    function handleResize() {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="shader-hero__canvas" />;
}