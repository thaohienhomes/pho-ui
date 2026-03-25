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
   Shaders Page
   ═══════════════════════════════════════════════════════════ */

export default function Shaders() {
  return (
    <div>
      <PageHeader
        title="Shaders"
        description="Buddhist-themed GLSL fragment shaders. Sacred geometry, meditation, and impermanence — rendered in jade and gold on dark."
      />

      <div className="space-y-12">
        {shaders.map((s) => (
          <section key={s.id}>
            <div className="mb-4">
              <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)]">
                {s.vi}
                <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">{s.en}</span>
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{s.desc}</p>
            </div>
            <ShaderCanvas frag={s.frag} />
          </section>
        ))}
      </div>
    </div>
  )
}
