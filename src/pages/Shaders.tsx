import { useRef, useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'

/* ═══════════════════════════════════════════════════════════
   GLSL — Shared vertex shader & fragment prefix
   Colors: Jade #059669 · Gold #b8860b · Dark #060806
   ═══════════════════════════════════════════════════════════ */

const VERT = `attribute vec2 a_position;
void main(){gl_Position=vec4(a_position,0.,1.);}`;

const PREFIX = `precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359
#define TAU 6.28318530718
vec3 JADE=vec3(.02,.588,.412);
vec3 GOLD=vec3(.722,.525,.043);
vec3 BG=vec3(.024,.031,.024);
`;

/* ═══════════════════════════════════════════════════════════
   ShaderCanvas — WebGL canvas with IntersectionObserver
   ═══════════════════════════════════════════════════════════ */

function ShaderCanvas({ frag }: { frag: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false })
    if (!gl) return

    const compile = (type: number, src: string): WebGLShader | null => {
      const s = gl.createShader(type)
      if (!s) return null
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s))
        gl.deleteShader(s)
        return null
      }
      return s
    }

    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, PREFIX + '\n' + frag)
    if (!vs || !fs) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog))
      return
    }

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(prog, 'a_position')
    const uRes = gl.getUniformLocation(prog, 'u_resolution')
    const uTime = gl.getUniformLocation(prog, 'u_time')

    gl.useProgram(prog)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let visible = false
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting },
      { threshold: 0.1 },
    )
    io.observe(canvas)

    let raf = 0
    const t0 = performance.now()
    const loop = () => {
      if (visible) {
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.uniform1f(uTime, (performance.now() - t0) / 1000)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [frag])

  return (
    <canvas
      ref={ref}
      className="w-full rounded-[var(--radius-md)] border border-[var(--border-default)]"
      style={{ aspectRatio: '16/9', background: '#060806' }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════
   8 Buddhist-Themed Fragment Shaders
   ═══════════════════════════════════════════════════════════ */

const shaders: { id: string; vi: string; en: string; desc: string; frag: string }[] = [

  /* ─── 1. Mandala ─── */
  {
    id: 'mandala',
    vi: 'Mạn Đà La',
    en: 'Mandala',
    desc: 'Sacred geometry circles rotating in layered rings. Meditative breathing rhythm in jade and gold.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float a=atan(uv.y,uv.x);
  float t=u_time*.25;
  float breath=.5+.5*sin(t*.8);

  float m=0.;

  // 4 concentric petal-rings with different symmetry orders
  float r1=.42+.03*sin(a*16.+t*.4);
  m+=smoothstep(.0,.015,abs(r-r1));
  m=1.-m; // invert
  float ring1=(1.-smoothstep(.0,.015,abs(r-r1)))*.8;

  float ring2=(1.-smoothstep(.0,.012,abs(r-(.3+.025*sin(a*12.-t*.6)))))*.7;
  float ring3=(1.-smoothstep(.0,.01, abs(r-(.2+.02 *sin(a*8. +t*.8)))))*.6;
  float ring4=(1.-smoothstep(.0,.008,abs(r-(.11+.015*sin(a*6. -t*.5)))))*.5;

  m=ring1+ring2+ring3+ring4;

  // Sacred geometry fill between rings
  float fill=sin(r*40.-t*2.)*.5+.5;
  fill*=sin(a*8.+t)*.5+.5;
  fill*=smoothstep(.45,.12,r)*smoothstep(.05,.1,r);
  m+=fill*.15*breath;

  // Center glow
  float glow=exp(-r*8.);
  m+=glow;

  vec3 col=mix(JADE,GOLD,sin(a*4.+t)*.5+.5);
  col=mix(BG,col,clamp(m,0.,1.));
  col+=GOLD*glow*.3*breath;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 2. Hào Quang ─── */
  {
    id: 'hao-quang',
    vi: 'Hào Quang',
    en: 'God Rays',
    desc: 'Radial god-rays from center, warm gold fading to jade. Buddha backlight aura.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float a=atan(uv.y,uv.x);
  float t=u_time*.15;

  // Layered god-rays
  float rays=0.;
  for(int i=0;i<3;i++){
    float fi=float(i);
    float freq=12.+fi*6.;
    float speed=t*(1.+fi*.4);
    float ray=pow(.5+.5*sin(a*freq+speed),16.);
    ray*=exp(-r*(1.5+fi*.5));
    rays+=ray*(.5-fi*.1);
  }

  float core=exp(-r*5.);
  float halo=exp(-r*2.)*.5;
  float pulse=.85+.15*sin(t*3.);

  // Gold center fading to jade at edges
  vec3 rayCol=mix(GOLD*1.5,JADE,smoothstep(0.,.5,r));

  vec3 col=BG;
  col+=rayCol*rays*pulse;
  col+=GOLD*core*1.2;
  col+=mix(GOLD,JADE,.5)*halo;
  col*=1.-smoothstep(.6,.9,r)*.3;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 3. Bánh Xe Pháp ─── */
  {
    id: 'banh-xe-phap',
    vi: 'Bánh Xe Pháp',
    en: 'Dharma Wheel',
    desc: 'Eight-spoke dharma wheel rotating with geometric spokes of light and jade glow.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float a=atan(uv.y,uv.x);
  float t=u_time*.2;
  float ra=a+t;

  // Outer rim (double ring)
  float rim=1.-smoothstep(.0,.015,abs(r-.4));
  rim+=( 1.-smoothstep(.0,.008,abs(r-.38)) )*.5;

  // Hub circle + fill
  float hub=1.-smoothstep(.0,.008,abs(r-.08));
  float hubFill=smoothstep(.08,.06,r);

  // 8 spokes via modular angle
  float sa=mod(ra,PI/4.)-PI/8.;
  float spoke=smoothstep(.02,.008,abs(sa)*r);
  spoke*=step(.08,r)*step(r,.4);

  // Small circles at spoke tips
  float dots=0.;
  for(int i=0;i<8;i++){
    float da=float(i)*PI/4.+t;
    vec2 dp=vec2(cos(da),sin(da))*.4;
    dots+=smoothstep(.03,.015,length(uv-dp));
  }

  float wheel=max(max(rim,spoke),max(hub+hubFill,dots));
  wheel=clamp(wheel,0.,1.);

  // Jade halo glow
  float glow=exp(-abs(r-.4)*8.)*.4+exp(-r*3.)*.3;

  vec3 col=BG;
  col+=JADE*glow;
  col+=mix(JADE*.8,GOLD,.4)*wheel;
  col+=GOLD*hubFill*.3;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 4. Thiền Định ─── */
  {
    id: 'thien-dinh',
    vi: 'Thiền Định',
    en: 'Meditation',
    desc: 'Concentric ripples in a still pond. Extremely slow, calm, minimal jade on black.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float t=u_time*.08;

  // Three ultra-slow ripple layers
  float rip1=sin(r*30.-t*2.)*.5+.5;
  rip1*=exp(-r*2.5);

  float rip2=sin(r*22.-t*1.5+2.)*.5+.5;
  rip2*=exp(-r*3.);

  float rip3=sin(r*38.-t*1.2+4.)*.5+.5;
  rip3*=exp(-r*4.);

  float ripples=rip1*.4+rip2*.25+rip3*.1;

  // Still center point
  float center=exp(-r*25.)*.5;

  vec3 col=BG;
  col+=JADE*ripples*.35;
  col+=JADE*center;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 5. Chuông Chùa ─── */
  {
    id: 'chuong-chua',
    vi: 'Chuông Chùa',
    en: 'Temple Bell',
    desc: 'Sound-wave rings expanding like bell resonance. Fade and repeat in warm jade.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float t=u_time;

  // Multiple bell strikes staggered in time
  float wave=0.;
  for(int i=0;i<5;i++){
    float fi=float(i);
    float strike=mod(t-fi*2.,10.);
    float expand=strike*.12;
    float ring=1.-smoothstep(.0,.02,abs(r-expand));
    ring+=(1.-smoothstep(.0,.04,abs(r-expand)))*.3;
    float fade=exp(-strike*.6)*exp(-abs(r-expand)*4.);
    wave+=ring*fade;
  }

  // Resonating center dot
  float center=exp(-r*10.)*(.5+.5*sin(t*5.))*exp(-mod(t,10.)*.4);

  vec3 warmJade=mix(JADE,GOLD,.25);
  vec3 col=BG;
  col+=warmJade*wave*1.5;
  col+=GOLD*center*.4;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 6. Bát Nhã ─── */
  {
    id: 'bat-nha',
    vi: 'Bát Nhã',
    en: 'Prajna',
    desc: 'Sacred characters dissolving into light particles. Jade ink scattering — impermanence.',
    frag: `
float hash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.2;

  // Tiled grid of calligraphic stroke elements
  vec2 grid=uv*8.;
  vec2 cell=floor(grid);
  vec2 local=fract(grid)-.5;

  float phase=fract(t*.15);
  float h=hash(cell);

  // Staggered dissolution per cell
  float dissolve=smoothstep(h,h+.3,phase);

  // Vertical strokes
  float vStroke=smoothstep(.08,.04,abs(local.x))
               *smoothstep(.4,.3,abs(local.y));
  vStroke*=step(.3,h)*(1.-step(.6,h));

  // Horizontal strokes
  float hStroke=smoothstep(.08,.04,abs(local.y+.1))
               *smoothstep(.3,.2,abs(local.x));
  hStroke*=step(.6,h)*(1.-step(.85,h));

  // Dots
  float inkDot=smoothstep(.12,.06,length(local));
  inkDot*=step(.85,h);

  float shape=(vStroke+hStroke+inkDot)*(1.-dissolve);

  // Scattered particles from dissolved ink
  vec2 scatter=vec2(hash(cell+.1)-.5,hash(cell+.2)-.5);
  vec2 pPos=local-scatter*dissolve*2.;
  float particle=smoothstep(.08,.02,length(pPos));
  particle*=dissolve*(1.-smoothstep(.5,1.,dissolve));

  float pattern=shape+particle*.5;

  // Vignette
  float fade=1.-smoothstep(.35,.5,length(uv));
  pattern*=fade;

  vec3 col=BG;
  col+=mix(JADE,GOLD*.3+JADE*.7,.2)*pattern;
  col+=JADE*exp(-length(uv)*4.)*.05;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 7. Liên Hoa ─── */
  {
    id: 'lien-hoa',
    vi: 'Liên Hoa',
    en: 'Lotus',
    desc: 'Detailed lotus opening from bud to bloom. SDF petals with water reflection and gold center.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.12;

  // Bloom cycle: bud ↔ full bloom
  float bloom=.4+.6*(.5+.5*sin(t));

  // Flower center (shifted up to leave room for reflection)
  vec2 p=uv-vec2(0.,-.05);
  float r=length(p);
  float a=atan(p.y,p.x);

  // Outer petals — 8 via polar modulation
  float outerR=.12+.14*bloom*pow(abs(cos(a*4.)),.6);
  float outerEdge=1.-smoothstep(.0,.015,abs(r-outerR));
  float outerFill=smoothstep(outerR,outerR*.3,r)*.25;
  float outer=(outerEdge+outerFill)*smoothstep(.04,.08,r);

  // Inner petals — rotated 22.5 deg
  float innerA=a+PI/8.;
  float innerR=.06+.08*bloom*pow(abs(cos(innerA*4.)),.7);
  float innerEdge=1.-smoothstep(.0,.012,abs(r-innerR));
  float innerFill=smoothstep(innerR,innerR*.2,r)*.2;
  float inner=(innerEdge+innerFill)*smoothstep(.025,.04,r);

  // Gold center pistil
  float center=smoothstep(.035,.015,r);

  // Water surface
  float waterY=.12;
  float waterLine=1.-smoothstep(.0,.008,abs(uv.y+waterY));

  // Reflection below water
  vec2 rp=vec2(uv.x,-(uv.y+waterY*2.))-vec2(0.,-.05);
  rp.x+=sin(rp.y*30.+t*8.)*.008;
  float rr=length(rp);
  float ra=atan(rp.y,rp.x);
  float refR=.12+.14*bloom*pow(abs(cos(ra*4.)),.6);
  float ref=smoothstep(refR,refR*.3,rr)*.08;
  ref*=step(uv.y,-waterY);

  vec3 col=BG;
  col+=JADE*.15*waterLine;
  col+=JADE*.15*ref;
  col+=JADE*.6*outer;
  col+=mix(JADE,GOLD,.35)*.8*inner;
  col+=GOLD*center;
  col+=JADE*exp(-r*5.)*.12;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 8. Niết Bàn ─── */
  {
    id: 'niet-ban',
    vi: 'Niết Bàn',
    en: 'Nirvana',
    desc: 'Geometric forms dissolving into pure luminance. Jade to warm white-gold — ultimate stillness.',
    frag: `
float hash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float a=atan(uv.y,uv.x);
  float t=u_time*.1;
  float phase=fract(t*.2);

  // Geometric forms: hexagonal lattice + circles + star ring
  float hex=cos(a*3.+t*.3)*r;
  float s1=1.-smoothstep(.0,.01,abs(hex-.15));
  float s2=1.-smoothstep(.0,.008,abs(r-.2));
  float s3=1.-smoothstep(.0,.006,abs(r-.1));
  float star=cos(a*6.-t*.2)*.04;
  float s4=1.-smoothstep(.0,.008,abs(r-.28-star));

  float shapes=max(max(s1,s2),max(s3,s4));

  // Pixel-block dissolution noise
  float noise=hash(floor(gl_FragCoord.xy*.3));
  float alive=1.-smoothstep(noise-.05,noise+.05,phase);

  float remaining=shapes*alive;
  float emitted=shapes*(1.-alive)*exp(-r*2.);
  float pure=smoothstep(.7,1.,phase)*exp(-r*1.5);

  vec3 formCol=mix(JADE,GOLD,.3);
  vec3 lightCol=mix(GOLD,vec3(.95,.9,.8),.5);

  vec3 col=BG;
  col+=formCol*remaining;
  col+=lightCol*emitted*1.5;
  col+=lightCol*pure*.5;

  gl_FragColor=vec4(col,1.);
}`,
  },
]

/* ═══════════════════════════════════════════════════════════
   6 Vietnamese Folk-Themed Fragment Shaders
   ═══════════════════════════════════════════════════════════ */

const folkShaders: { id: string; vi: string; en: string; desc: string; frag: string }[] = [

  /* ─── 1. Sen Nở ─── */
  {
    id: 'sen-no',
    vi: 'Sen Nở',
    en: 'Lotus Bloom',
    desc: 'Top-down lotus bloom with radial petal layers expanding outward. Jade glow pulses with breathing rhythm.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float a=atan(uv.y,uv.x);
  float t=u_time*.15;
  float bloom=.5+.5*sin(t);

  // 3 petal layers blooming outward (6, 8, 10 petals)
  float petals=0.;
  for(int i=0;i<3;i++){
    float fi=float(i);
    float n=6.+fi*2.;
    float offset=fi*PI/12.;
    float petalR=(.1+fi*.08)*(.6+.4*bloom);
    float shape=pow(abs(cos(a*n*.5+offset+t*.3)),1.5)*petalR;
    float base=.08+fi*.06;
    float petal=1.-smoothstep(.0,.015,abs(r-shape-base));
    petal+=smoothstep(shape+base,shape*.3,r)*.15;
    petals+=petal*(.8-fi*.2);
  }

  float glow=exp(-r*6.)*(1.+.3*bloom);
  float rays=pow(.5+.5*sin(a*12.+t*2.),8.)*exp(-r*3.)*.3;

  vec3 col=BG;
  col+=JADE*petals*.7;
  col+=JADE*glow*.5;
  col+=JADE*rays;
  col+=mix(JADE,GOLD,.5)*exp(-r*12.)*.4;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 2. Trúc Lâm ─── */
  {
    id: 'truc-lam',
    vi: 'Trúc Lâm',
    en: 'Bamboo Grove',
    desc: 'Vertical bamboo stalks swaying in wind. Nodes, leaves, and layered depth in jade silhouettes.',
    frag: `
float bhash(float p){
  return fract(sin(p*127.1)*43758.5453);
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.3;

  float bamboo=0.;
  for(int i=0;i<12;i++){
    float fi=float(i);
    float x=-.55+fi*.1+bhash(fi)*.03;
    float wind=sin(t+fi*.7)*.015+sin(t*1.3+fi*.5)*.008;
    float sway=wind*(uv.y+.5);

    // Stalk
    float stalk=smoothstep(.008,.002,abs(uv.x-x-sway));
    stalk*=smoothstep(-.5,-.45,uv.y);

    // Nodes
    float nodeY=mod(uv.y+bhash(fi+10.)*.1+.5,.15)-.075;
    float node=smoothstep(.012,.004,abs(uv.x-x-sway))
              *smoothstep(.008,.002,abs(nodeY))
              *step(-.45,uv.y);

    // Leaves at nodes
    float leafY=floor((uv.y+.5)/.15)*.15-.5+bhash(fi+20.)*.1;
    vec2 lp=vec2(uv.x-x-sway,uv.y-leafY);
    float side=sign(bhash(fi+30.)-.5);
    float leaf=smoothstep(.003,.001,abs(lp.y-lp.x*side*2.))
              *smoothstep(.08,.0,abs(lp.x))
              *step(0.,lp.x*side);

    float depth=.5+.5*bhash(fi+5.);
    bamboo+=(stalk+node*1.5+leaf*.6)*depth;
  }

  float fog=exp(-abs(uv.y-.2)*3.)*.08;

  vec3 col=BG;
  col+=JADE*bamboo*.6;
  col+=JADE*fog;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 3. Hơi Sương ─── */
  {
    id: 'hoi-suong',
    vi: 'Hơi Sương',
    en: 'Jade Mist',
    desc: 'Layered mountain fog breathing slowly. FBM noise mist drifting across jade ridgelines.',
    frag: `
float mhash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}
float mnoise(vec2 p){
  vec2 i=floor(p);vec2 f=fract(p);
  f=f*f*(3.-2.*f);
  float a=mhash(i);float b=mhash(i+vec2(1.,0.));
  float c=mhash(i+vec2(0.,1.));float d=mhash(i+vec2(1.,1.));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}
float fbm(vec2 p){
  float v=0.;float a=.5;
  for(int i=0;i<5;i++){v+=a*mnoise(p);p*=2.;a*=.5;}
  return v;
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.06;
  float breath=.5+.5*sin(t*2.5);

  float mist=0.;
  mist+=fbm(uv*3.+vec2(t,0.))*.4;
  mist+=fbm(uv*5.+vec2(-t*.7,.3))*.25;
  mist+=fbm(uv*8.+vec2(t*.5,t*.3))*.15;
  mist*=.6+.4*breath;
  mist*=smoothstep(.5,-.3,uv.y);

  // Mountain ridge silhouettes
  float ridge1=smoothstep(.0,.08,uv.y-(.05+fbm(vec2(uv.x*2.+1.,t*.2))*.15-.1));
  float ridge2=smoothstep(.0,.06,uv.y-(-.05+fbm(vec2(uv.x*2.5+5.,t*.15))*.12-.05));
  mist+=ridge1*.06+ridge2*.04;

  vec3 col=BG;
  col+=JADE*mist;
  col+=JADE*exp(-length(uv)*2.)*.05*breath;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 4. Sóng Nước ─── */
  {
    id: 'song-nuoc',
    vi: 'Sóng Nước',
    en: 'Water Ripples',
    desc: 'Three ripple sources interfering to form caustic patterns. Concentric waves in jade on still water.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.4;

  float wave=0.;

  vec2 c1=vec2(-.2,.05);
  float d1=length(uv-c1);
  wave+=sin(d1*40.-t*3.)*.5*exp(-d1*2.5);

  vec2 c2=vec2(.15,-.1);
  float d2=length(uv-c2);
  wave+=sin(d2*35.-t*2.5+1.)*.4*exp(-d2*2.8);

  vec2 c3=vec2(.0,.2);
  float d3=length(uv-c3);
  wave+=sin(d3*45.-t*2.8+2.)*.3*exp(-d3*3.);

  // Caustic interference
  float caustic=wave*wave;

  float surface=sin(uv.x*10.+sin(uv.y*8.+t)*.5+t*.5)
               *sin(uv.y*10.+sin(uv.x*8.+t*.7)*.5)*.05;

  float vig=1.-smoothstep(.3,.6,length(uv));

  vec3 col=BG;
  col+=JADE*caustic*1.2*vig;
  col+=JADE*(.5+.5*wave)*.15*vig;
  col+=JADE*surface;
  col+=JADE*exp(-length(uv)*3.)*.08;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 5. Đèn Lồng ─── */
  {
    id: 'den-long',
    vi: 'Đèn Lồng',
    en: 'Floating Lanterns',
    desc: 'Bokeh lantern orbs floating upward with warm flicker. Jade-gold glow drifting through the night.',
    frag: `
float lhash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.2;

  vec3 lanternCol=vec3(0.);

  for(int i=0;i<15;i++){
    float fi=float(i);
    float h1=lhash(vec2(fi,0.));
    float h2=lhash(vec2(fi,1.));
    float h3=lhash(vec2(fi,2.));

    float x=h1*1.4-.7+sin(t*(.5+h3)+fi)*.04;
    float y=mod(h2*1.2-.6+t*(.05+h3*.08),1.4)-.7;

    vec2 lp=uv-vec2(x,y);
    float d=length(lp);
    float size=.03+h3*.04;
    float flicker=.7+.3*sin(t*(8.+fi*2.)+fi*5.);

    float orb=exp(-d*d/(size*size*2.))*flicker;
    vec3 lCol=mix(JADE,GOLD,h2*.6+.2);
    lanternCol+=lCol*orb;
  }

  vec3 col=BG;
  col+=lanternCol*.8;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 6. Hoạ Tiết Dân Gian ─── */
  {
    id: 'hoa-tiet-dan-gian',
    vi: 'Hoạ Tiết Dân Gian',
    en: 'Folk Tessellation',
    desc: 'Rotating geometric tessellation — diamond, cross, and ring motifs from Vietnamese folk patterns.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.15;

  float ca=cos(t);float sa=sin(t);
  vec2 ruv=mat2(ca,-sa,sa,ca)*uv;

  vec2 hex=ruv*6.;
  vec2 local=fract(hex)-.5;

  float pattern=0.;

  // Diamond motif
  float diamond=abs(local.x)+abs(local.y);
  pattern+=1.-smoothstep(.28,.3,diamond);
  pattern-=1.-smoothstep(.2,.22,diamond);

  // Inner cross
  float cross2=min(abs(local.x),abs(local.y));
  pattern+=smoothstep(.03,.01,cross2)*smoothstep(.22,.15,diamond);

  // Corner dots
  for(int i=0;i<4;i++){
    float fi=float(i);
    float ax=PI*.5*fi+PI*.25;
    vec2 dp=vec2(cos(ax),sin(ax))*.2;
    pattern+=smoothstep(.04,.02,length(local-dp));
  }

  // Rotating dashed ring
  float r=length(local);
  float a=atan(local.y,local.x);
  float ring=1.-smoothstep(.0,.012,abs(r-.35));
  float ringDash=step(.5,fract(a*4./TAU+t*.5));
  pattern+=ring*ringDash*.5;

  // Cell frame
  float frame=smoothstep(.012,.004,abs(abs(local.x)-.5));
  frame+=smoothstep(.012,.004,abs(abs(local.y)-.5));
  pattern+=frame*.3;

  float vig=1.-smoothstep(.3,.55,length(uv));
  pattern*=vig;

  vec3 col=BG;
  col+=JADE*clamp(pattern,0.,1.)*.7;
  col+=GOLD*smoothstep(.8,1.,pattern)*.3;

  gl_FragColor=vec4(col,1.);
}`,
  },
]

/* ═══════════════════════════════════════════════════════════
   5 Đạo Mẫu Tứ Phủ Shaders
   ═══════════════════════════════════════════════════════════ */

const daoMauShaders: { id: string; vi: string; en: string; desc: string; frag: string }[] = [

  /* ─── 1. Tứ Phủ Thánh Mẫu ─── */
  {
    id: 'tu-phu-thanh-mau',
    vi: 'Tứ Phủ Thánh Mẫu',
    en: 'Four Palaces',
    desc: 'Four cosmic domains rotating around center — Thiên (red), Nhạc (green), Thoải (white), Địa (yellow). Mandala rings with Mẫu Liễu Hạnh light at core.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float a=atan(uv.y,uv.x);
  float t=u_time*.15;

  vec3 thien=vec3(.863,.149,.149);
  vec3 nhac=vec3(.02,.588,.412);
  vec3 thoai=vec3(.886,.91,.941);
  vec3 dia=vec3(.918,.702,.031);

  float ra=a+t;
  float wT=pow(max(0.,sin(ra)),3.);
  float wN=pow(max(0.,-cos(ra)),3.);
  float wH=pow(max(0.,cos(ra)),3.);
  float wD=pow(max(0.,-sin(ra)),3.);
  float wSum=wT+wN+wH+wD+.001;
  vec3 dc=(thien*wT+nhac*wN+thoai*wH+dia*wD)/wSum;

  float m=0.;
  m+=(1.-smoothstep(.0,.015,abs(r-.38)))*.8;
  m+=(1.-smoothstep(.0,.012,abs(r-.28)))*.6;
  m+=(1.-smoothstep(.0,.01,abs(r-.18)))*.5;

  float petal=sin(a*8.+t*2.)*.5+.5;
  petal*=smoothstep(.4,.15,r)*smoothstep(.05,.1,r);
  m+=petal*.2;

  float glow=exp(-r*2.5)*.5;

  float center=exp(-r*10.);
  vec3 mauLight=mix(GOLD,vec3(1.,.95,.85),.6);

  vec3 col=BG;
  col+=dc*(glow+m*.4);
  col+=mauLight*center;
  col+=dc*sin(r*25.-t*2.)*.04*exp(-r*3.);

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 2. Hầu Đồng ─── */
  {
    id: 'hau-dong',
    vi: 'Hầu Đồng',
    en: 'Spirit Trance',
    desc: 'Energy field of trance ritual — bursting waves, flowing fabric, flickering candles. Colors cycle red→green→white→yellow with drum-beat pulse.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float a=atan(uv.y,uv.x);
  float t=u_time;

  float beat=pow(.5+.5*sin(t*4.),8.);
  float pulse=1.+beat*.4;

  vec3 cRed=vec3(.863,.149,.149);
  vec3 cGreen=vec3(.02,.588,.412);
  vec3 cWhite=vec3(.886,.91,.941);
  vec3 cYellow=vec3(.918,.702,.031);

  float cycle=mod(t*.15,4.);
  vec3 cc=mix(cRed,cGreen,smoothstep(0.,1.,cycle));
  cc=mix(cc,cWhite,smoothstep(1.,2.,cycle));
  cc=mix(cc,cYellow,smoothstep(2.,3.,cycle));
  cc=mix(cc,cRed,smoothstep(3.,4.,cycle));

  float energy=0.;
  for(int i=0;i<5;i++){
    float fi=float(i);
    float w=sin(r*18.-t*3.+fi*1.3)*.5+.5;
    w*=exp(-r*(1.8+fi*.4));
    energy+=w*(.4-fi*.06);
  }
  energy*=pulse;

  float fabric=0.;
  for(int i=0;i<4;i++){
    float fi=float(i);
    float y=uv.y+sin(uv.x*5.+t*1.5+fi*1.7)*.12+fi*.12-.2;
    fabric+=exp(-y*y*30.)*.25;
  }

  float candles=0.;
  for(int i=0;i<8;i++){
    float fi=float(i);
    vec2 cp=vec2(cos(fi*PI*.25),sin(fi*PI*.25))*.42;
    float flicker=.7+.3*sin(t*10.+fi*4.);
    candles+=exp(-dot(uv-cp,uv-cp)/.002)*flicker;
  }

  vec3 col=BG;
  col+=cc*energy*.6;
  col+=cc*fabric*.5;
  col+=GOLD*candles*.4;
  col+=cc*exp(-r*5.)*.3*pulse;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 3. Ngũ Hổ Ngũ Hành ─── */
  {
    id: 'ngu-ho-ngu-hanh',
    vi: 'Ngũ Hổ Ngũ Hành',
    en: 'Five Tigers',
    desc: 'Five abstract tigers as aggressive claw-streaks in five directions — Kim (white), Mộc (green), Thuỷ (dark blue), Hoả (red), Thổ (yellow). Fierce pouncing energy.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.4;
  vec3 col=BG;

  for(int i=0;i<5;i++){
    float fi=float(i);
    float angle=fi*TAU/5.;
    vec2 dir=vec2(cos(angle),sin(angle));
    vec2 nrm=vec2(-dir.y,dir.x);

    vec3 tc=vec3(.9,.9,.92);
    if(i==1) tc=vec3(.02,.588,.412);
    if(i==2) tc=vec3(.08,.15,.35);
    if(i==3) tc=vec3(.863,.149,.149);
    if(i==4) tc=vec3(.918,.702,.031);

    float phase=mod(t+fi*1.3,3.5);
    float attack=smoothstep(0.,.6,phase)*smoothstep(2.5,1.,phase);

    vec2 pos=dir*(.5-attack*.7);
    vec2 dp=uv-pos;
    float along=dot(dp,dir);

    float streak=0.;
    for(int j=0;j<3;j++){
      float fj=float(j)-1.;
      float pD=abs(dot(dp,nrm)-fj*.03);
      float w=.007+.012*smoothstep(.0,-.2,along);
      streak+=exp(-pD*pD/(w*w))*smoothstep(.25,.0,along)*smoothstep(-.4,-.05,along);
    }

    float trail=exp(-dot(dp,dp)/.015)*attack*.4;
    col+=tc*(streak*attack*.7+trail);
  }

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 4. Khăn Phủ Diện ─── */
  {
    id: 'khan-phu-dien',
    vi: 'Khăn Phủ Diện',
    en: 'Ritual Veil',
    desc: 'Flowing silk fabric — layered translucent red and gold veils drifting in ceremony. Backlit light filters through the cloth.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.3;

  vec3 red=vec3(.863,.149,.149);
  vec3 gold2=vec3(.85,.65,.15);

  vec3 fabricCol=vec3(0.);

  for(int i=0;i<7;i++){
    float fi=float(i);
    float offset=fi*.07-.21;

    float fold=sin(uv.x*4.+t*1.2+fi*.8)*.08
              +sin(uv.x*7.-t*.8+fi*1.3)*.04
              +sin(uv.x*12.+t*1.5+fi*2.)*.02;

    float y=uv.y-fold-offset;
    float layer=exp(-y*y*80.)*.5;
    float backlit=exp(-y*y*40.)*.2;

    vec3 lc=mix(red,gold2,mod(fi,2.));
    lc*=.6+.4*(.5+.5*sin(uv.x*3.+t+fi));

    fabricCol+=lc*(layer+backlit);
  }

  float ambient=exp(-uv.y*uv.y*3.)*.1;

  vec3 col=BG;
  col+=fabricCol;
  col+=GOLD*ambient;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 5. Cửu Thiên Huyền Nữ ─── */
  {
    id: 'cuu-thien-huyen-nu',
    vi: 'Cửu Thiên Huyền Nữ',
    en: 'Nine Heavens',
    desc: 'Cosmic feminine vortex — nine concentric heavenly rings, star field, swirling energy in purple, jade, and gold. Mystical atmosphere.',
    frag: `
float chash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float r=length(uv);
  float a=atan(uv.y,uv.x);
  float t=u_time*.1;

  vec3 purple=vec3(.486,.227,.929);
  vec3 jade2=vec3(.02,.588,.412);
  vec3 gold3=vec3(.722,.525,.043);

  float vortex=a+t+r*3.;

  float rings=0.;
  for(int i=0;i<9;i++){
    float fi=float(i);
    float rr=.05+fi*.045;
    float opacity=1.-fi*.08;
    float wobble=sin(vortex*3.+fi*1.2)*.01;
    rings+=(1.-smoothstep(.0,.012,abs(r-rr-wobble)))*opacity;
  }

  vec2 starGrid=floor(gl_FragCoord.xy/3.);
  float star=step(.97,chash(starGrid));
  star*=.5+.5*sin(t*10.+chash(starGrid+.1)*TAU);

  float swirl=sin(vortex*6.)*.5+.5;
  swirl*=exp(-r*2.5);

  vec3 ringCol=mix(purple,jade2,sin(r*15.+t)*.5+.5);
  ringCol=mix(ringCol,gold3,exp(-r*6.));

  vec3 col=BG;
  col+=ringCol*rings*.5;
  col+=purple*swirl*.3;
  col+=vec3(.8,.85,1.)*star*.4;
  col+=gold3*exp(-r*8.)*.5;
  col+=purple*exp(-r*3.)*.15;

  gl_FragColor=vec4(col,1.);
}`,
  },
]

/* ═══════════════════════════════════════════════════════════
   5 Thiên Nhiên Việt Nam Shaders
   ═══════════════════════════════════════════════════════════ */

const natureShaders: { id: string; vi: string; en: string; desc: string; frag: string }[] = [

  /* ─── 1. Mưa Phùn ─── */
  {
    id: 'mua-phun',
    vi: 'Mưa Phùn',
    en: 'Drizzle',
    desc: 'Very fine diagonal rain, misty fog layers, subtle jade tint on grey. Micro-ripples at bottom — melancholic calm.',
    frag: `
float rhash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_resolution;
  vec2 suv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time;

  float rain=0.;
  for(int i=0;i<4;i++){
    float fi=float(i);
    float scale=80.+fi*30.;
    float speed=(.8+fi*.2)*t;
    vec2 grid=vec2(uv.x*scale+fi*17.+uv.y*8.,uv.y*scale+speed);
    vec2 cell=floor(grid);
    vec2 local=fract(grid);
    float h=rhash(cell);
    float dx=local.x-.5;
    float dy=local.y-.5;
    float drop=smoothstep(.015,.0,abs(dx-dy*.15))*smoothstep(.25,.0,abs(dy));
    drop*=step(.7,h);
    rain+=drop*(.25-fi*.04);
  }

  float fog=0.;
  fog+=(sin(suv.x*2.+t*.1)*.5+.5)*.06;
  fog+=(sin(suv.x*5.-t*.15+1.)*.5+.5)*.04;
  fog*=smoothstep(.4,-.3,suv.y);

  float ripple=0.;
  float bottom=smoothstep(-.3,-.45,suv.y);
  for(int i=0;i<6;i++){
    float fi=float(i);
    vec2 rp=vec2(rhash(vec2(fi,floor(t*.5+fi*.3)))*.8-.4,-.42);
    float rd=length(suv-rp);
    float age=fract(t*.5+fi*.17);
    ripple+=(1.-smoothstep(.0,.008,abs(rd-age*.06)))*exp(-age*3.)*bottom;
  }

  vec3 col=BG;
  col+=vec3(.06,.08,.07)*fog;
  col+=vec3(.12,.13,.12)*rain;
  col+=JADE*ripple*.3;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 2. Ruộng Bậc Thang ─── */
  {
    id: 'ruong-bac-thang',
    vi: 'Ruộng Bậc Thang',
    en: 'Rice Terraces',
    desc: 'Sapa-inspired terraced rice paddies — curved layers in varying jade greens, water shimmer on flooded fields, gentle wind sway.',
    frag: `
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.2;

  vec3 terraceCol=vec3(0.);

  for(int i=0;i<8;i++){
    float fi=float(i);
    float y=.35-fi*.1;

    float curve=sin(uv.x*3.+fi*.8+1.)*.03+sin(uv.x*6.-fi*.5)*.015;
    float edge=y+curve;

    float layer=smoothstep(edge,edge-.005,uv.y)*smoothstep(edge-.095,edge-.04,uv.y);

    float shimmer=sin(uv.x*40.+t*3.+fi*2.)*.5+.5;
    shimmer*=sin(uv.x*25.-t*2.+fi)*.5+.5;
    shimmer*=.12*smoothstep(edge-.01,edge-.05,uv.y);

    vec3 green2=vec3(.015+fi*.008,.18+fi*.035,.12+fi*.015);

    float sway=.8+.2*(sin(uv.x*2.+t+fi*.5)*.5+.5);
    green2*=sway;

    terraceCol+=green2*layer;
    terraceCol+=JADE*shimmer;

    float edgeLine=1.-smoothstep(.0,.006,abs(uv.y-edge));
    terraceCol+=vec3(.03,.15,.1)*edgeLine*.4;
  }

  float sky=smoothstep(.38,.5,uv.y);
  vec3 skyCol=mix(BG,vec3(.04,.07,.05),.5);

  vec3 col=BG;
  col+=terraceCol;
  col+=skyCol*sky;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 3. Phố Cổ ─── */
  {
    id: 'pho-co',
    vi: 'Phố Cổ',
    en: 'Ancient Town',
    desc: 'Hoi An lantern bokeh — warm red, yellow, orange circles swaying gently. Thu Bon river reflections below. Night atmosphere.',
    frag: `
float phash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.3;

  vec3 col=BG;

  for(int i=0;i<20;i++){
    float fi=float(i);
    float h1=phash(vec2(fi,0.));
    float h2=phash(vec2(fi,1.));
    float h3=phash(vec2(fi,2.));

    float x=h1*1.4-.7+sin(t*.3+fi*.5)*.03;
    float y=h2*.4+.02;
    float size=.03+h3*.05;

    float sway=sin(t*.8+fi*2.)*.02;
    vec2 lp=vec2(x+sway,y);
    float d=length(uv-lp);

    float flicker=.7+.3*sin(t*4.+fi*3.);
    float bokeh=exp(-d*d/(size*size))*flicker;

    vec3 lc=vec3(.863,.149,.149);
    if(h3>.33) lc=vec3(.918,.702,.031);
    if(h3>.66) lc=vec3(.9,.45,.1);

    col+=lc*bokeh*.5;

    float ry=-y-.06+sin(uv.x*15.+t*2.)*.01;
    vec2 rp2=vec2(x+sway,ry);
    float rd=length(uv-rp2);
    float ref=exp(-rd*rd/(size*size*1.5))*flicker*.2;
    col+=lc*ref;
  }

  float waterLine=smoothstep(.01,.0,abs(uv.y+.03));
  col+=JADE*waterLine*.08;

  col+=vec3(.12,.04,.01)*exp(-length(uv-vec2(0.,.15))*2.)*.15;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 4. Vịnh Hạ Long ─── */
  {
    id: 'vinh-ha-long',
    vi: 'Vịnh Hạ Long',
    en: 'Ha Long Bay',
    desc: 'Limestone karst silhouettes layered with parallax depth, morning mist, jade-tinted fog, sun glow behind mountains, calm water below.',
    frag: `
float hhash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}
float hnoise(vec2 p){
  vec2 i=floor(p);vec2 f=fract(p);
  f=f*f*(3.-2.*f);
  float a=hhash(i);float b=hhash(i+vec2(1.,0.));
  float c=hhash(i+vec2(0.,1.));float d=hhash(i+vec2(1.,1.));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.05;

  vec2 sunPos=vec2(.2,.25);
  float sunDist=length(uv-sunPos);
  vec3 sunGlow=mix(GOLD,vec3(.9,.6,.3),sunDist*2.)*exp(-sunDist*3.);

  vec3 col=BG+sunGlow*.3;

  for(int i=0;i<5;i++){
    float fi=float(i);
    float depth=1.-fi*.18;
    float scroll=t*(1.+fi*.3);

    float mx=uv.x*2.+fi*3.+scroll;
    float mountain=hnoise(vec2(mx,fi))*.3
                  +hnoise(vec2(mx*2.,fi+5.))*.15
                  +hnoise(vec2(mx*4.,fi+10.))*.07;
    mountain=mountain-.12+fi*.06;

    float peak=pow(hnoise(vec2(mx*1.5,fi+20.)),.5)*.15;
    mountain+=peak;

    float mask=step(uv.y,mountain);

    float fog=exp(-fi*.6)*.3;
    vec3 mountainCol=BG*depth+JADE*fog*.3;

    col=mix(col,mountainCol,mask);
  }

  float mist=exp(-abs(uv.y-.05)*5.)*.15;
  col+=JADE*mist;

  float water=smoothstep(-.1,-.15,uv.y);
  col=mix(col,col*.5+JADE*.08,water);
  col+=JADE*exp(-abs(uv.y+.2+sin(uv.x*30.+t*10.)*.01)*20.)*.05*water;

  gl_FragColor=vec4(col,1.);
}`,
  },

  /* ─── 5. Tre Việt Nam ─── */
  {
    id: 'tre-viet-nam',
    vi: 'Tre Việt Nam',
    en: 'Bamboo Moon',
    desc: 'Bamboo grove under moonlight — tall swaying stalks with nodes and leaves, light shafts filtering through on dark night sky.',
    frag: `
float bhash2(float p){
  return fract(sin(p*127.1)*43758.5453);
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.25;

  vec2 moonPos=vec2(.3,.35);
  float moonDist=length(uv-moonPos);
  float moon=smoothstep(.06,.04,moonDist);
  float moonGlow=exp(-moonDist*4.)*.3;

  vec3 col=BG;
  col+=vec3(.7,.75,.8)*moon;
  col+=vec3(.3,.35,.4)*moonGlow;

  float bamboo=0.;
  float leafSum=0.;

  for(int i=0;i<10;i++){
    float fi=float(i);
    float x=-.45+fi*.1+bhash2(fi)*.04;
    float wind=sin(t+fi*.6)*.01+sin(t*1.4+fi*.4)*.006;
    float sway=wind*(uv.y+.5);

    float stalk=smoothstep(.007,.002,abs(uv.x-x-sway));
    stalk*=smoothstep(-.5,-.45,uv.y);

    float nodeY=mod(uv.y+bhash2(fi+10.)*.08+.5,.12)-.06;
    float node=smoothstep(.012,.003,abs(uv.x-x-sway))
              *smoothstep(.006,.001,abs(nodeY))
              *step(-.45,uv.y);

    float leaves=0.;
    for(int j=0;j<3;j++){
      float fj=float(j);
      float ly=-.2+fj*.25+bhash2(fi+20.+fj)*.15;
      vec2 lp=vec2(uv.x-x-sway,uv.y-ly);
      float side=sign(bhash2(fi+30.+fj)-.5);
      float leaf=smoothstep(.003,.0,abs(lp.y-lp.x*side*2.5))
                *smoothstep(.06,.0,abs(lp.x))
                *step(0.,lp.x*side);
      leaves+=leaf;
    }

    float depth=.4+.6*bhash2(fi+5.);
    bamboo+=(stalk+node*1.5)*depth;
    leafSum+=leaves*.35*depth;
  }

  float shaft=exp(-abs(uv.x-.3)*3.)*.08;
  shaft*=smoothstep(-.5,.3,uv.y);

  col+=JADE*bamboo*.6;
  col+=JADE*leafSum*.4;
  col+=vec3(.25,.3,.2)*shaft;

  gl_FragColor=vec4(col,1.);
}`,
  },
]

/* ═══════════════════════════════════════════════════════════
   Shaders Page
   ═══════════════════════════════════════════════════════════ */

export default function Shaders() {
  return (
    <div>
      <PageHeader
        title="Shaders"
        description="GLSL fragment shaders — 8 Buddhist, 6 Folk, 5 Đạo Mẫu Tứ Phủ, and 5 Vietnamese Nature. 24 shaders in jade, gold, and elemental palettes on dark."
      />

      <div className="space-y-12">
        <h2 className="text-[var(--font-size-xl)] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] pb-2">
          Phật Giáo <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">Buddhist</span>
        </h2>
        {shaders.map((s) => (
          <section key={s.id}>
            <div className="mb-4">
              <h3 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)]">
                {s.vi}
                <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">{s.en}</span>
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{s.desc}</p>
            </div>
            <ShaderCanvas frag={s.frag} />
          </section>
        ))}

        <h2 className="text-[var(--font-size-xl)] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] pb-2 mt-16">
          Dân Gian <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">Folk</span>
        </h2>
        {folkShaders.map((s) => (
          <section key={s.id}>
            <div className="mb-4">
              <h3 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)]">
                {s.vi}
                <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">{s.en}</span>
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{s.desc}</p>
            </div>
            <ShaderCanvas frag={s.frag} />
          </section>
        ))}

        <h2 className="text-[var(--font-size-xl)] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] pb-2 mt-16">
          Đạo Mẫu Tứ Phủ <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">Mother Goddess</span>
        </h2>
        {daoMauShaders.map((s) => (
          <section key={s.id}>
            <div className="mb-4">
              <h3 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)]">
                {s.vi}
                <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">{s.en}</span>
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{s.desc}</p>
            </div>
            <ShaderCanvas frag={s.frag} />
          </section>
        ))}

        <h2 className="text-[var(--font-size-xl)] font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)] pb-2 mt-16">
          Thiên Nhiên Việt Nam <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">Vietnamese Nature</span>
        </h2>
        {natureShaders.map((s) => (
          <section key={s.id}>
            <div className="mb-4">
              <h3 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)]">
                {s.vi}
                <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">{s.en}</span>
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{s.desc}</p>
            </div>
            <ShaderCanvas frag={s.frag} />
          </section>
        ))}
      </div>
    </div>
  )
}
