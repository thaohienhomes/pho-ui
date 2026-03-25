// ═══════════════════════════════════════════════════════════
// PHO.CHAT V2 — DESIGN TOKENS (Source of Truth)
// Type Scale: Major Third (1.25) × 15px base
// Spacing: 4px grid
// Colors: Dark-first layered system
// ═══════════════════════════════════════════════════════════

export const typeScale = {
  xs:    { size: 10, lineHeight: 16, letterSpacing: '0.04em',  weight: 400 },
  sm:    { size: 12, lineHeight: 18, letterSpacing: '0.01em',  weight: 400 },
  base:  { size: 15, lineHeight: 24, letterSpacing: '0',       weight: 400 },
  md:    { size: 19, lineHeight: 28, letterSpacing: '-0.01em', weight: 500 },
  lg:    { size: 24, lineHeight: 32, letterSpacing: '-0.015em',weight: 600 },
  xl:    { size: 30, lineHeight: 36, letterSpacing: '-0.02em', weight: 600 },
  '2xl': { size: 38, lineHeight: 44, letterSpacing: '-0.025em',weight: 700 },
} as const;

export const space = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

export const colors = {
  bg: {
    base:     '#0a0a0a',
    surface:  '#111111',
    elevated: '#1a1a1a',
    hover:    '#1f1f1f',
    active:   '#252525',
    input:    '#171717',
  },
  text: {
    primary:   '#f0f0f0',
    secondary: '#a0a0a0',
    muted:     '#737373',
    disabled:  '#404040',
  },
  border: {
    default:  '#1e1e1e',
    hover:    '#2a2a2a',
    focus:    '#059669',
    subtle:   '#151515',
  },
  accent: {
    DEFAULT:  '#059669',
    light:    '#34d399',
    dim:      '#065f46',
    faint:    'rgba(5, 150, 105, 0.08)',
    glow:     'rgba(5, 150, 105, 0.15)',
    border:   'rgba(52, 211, 153, 0.15)',
    text:     '#6ee7b7',
  },
  feedback: {
    error:        '#dc2626',
    errorFaint:   'rgba(220, 38, 38, 0.08)',
    warning:      '#d97706',
    warningFaint: 'rgba(217, 119, 6, 0.08)',
    info:         '#2563eb',
    infoFaint:    'rgba(37, 99, 235, 0.08)',
    success:      '#059669',
    successFaint: 'rgba(5, 150, 105, 0.08)',
  },
  jade: {
    50:  '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#059669',
    600: '#047857',
    700: '#065f46',
    800: '#064e3b',
    900: '#022c22',
    950: '#011a14',
  },
} as const;

export const radius = {
  sm:   '6px',
  md:   '12px',
  lg:   '20px',
  full: '9999px',
} as const;

export const motion = {
  easing: {
    default: 'cubic-bezier(0.16, 1, 0.3, 1)',
    spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  duration: {
    fast:   '120ms',
    normal: '200ms',
    slow:   '350ms',
  },
} as const;

export const shadows = {
  sm:        '0 1px 3px rgba(0,0,0,0.3)',
  md:        '0 4px 12px rgba(0,0,0,0.4)',
  lg:        '0 8px 32px rgba(0,0,0,0.5)',
  glow:      '0 0 20px rgba(5, 150, 105, 0.15)',
  glowStrong:'0 0 40px rgba(5, 150, 105, 0.25)',
} as const;

export const layout = {
  sidebarWidth:     '280px',
  sidebarCollapsed: '64px',
  maxContentWidth:  '768px',
  maxPageWidth:     '1200px',
  headerHeight:     '52px',
  touchTarget:      '44px',
} as const;

export const zIndex = {
  base:     0,
  dropdown: 10,
  sticky:   20,
  overlay:  30,
  modal:    40,
  toast:    50,
  tooltip:  60,
  command:  70,
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const tokens = {
  typeScale,
  space,
  colors,
  radius,
  motion,
  shadows,
  layout,
  zIndex,
  breakpoints,
} as const;
