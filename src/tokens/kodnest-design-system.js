/**
 * KODNEST PREMIUM BUILD SYSTEM
 * 
 * Design Philosophy: Calm, Intentional, Coherent, Confident
 * 
 * NOT flashy, NOT loud, NOT playful
 * NO gradients, NO glassmorphism, NO neon colors, NO animation noise
 * 
 * This is a serious B2C product company design system.
 */

/* ========================================
   COLOR SYSTEM (Maximum 4 colors)
   ======================================== */

/**
 * PRIMARY COLORS:
 * 1. Background: #F7F6F3 (off-white)
 * 2. Primary Text: #111111 (near-black)
 * 3. Accent: #8B0000 (deep red)
 * 4. Success: #4A7C59 (muted green)
 * 
 * SECONDARY COLORS (derived):
 * - Warning: #CC8800 (muted amber)
 * - Error: #A83232 (derived from accent)
 * - Borders: #E0E0E0 (neutral gray)
 */

/* ========================================
   TYPOGRAPHY SYSTEM
   ======================================== */

/**
 * HEADINGS:
 * - Font: 'Playfair Display', Georgia, serif
 * - Style: Large, confident, generous spacing
 * - Weights: 600 (semibold), 700 (bold)
 * 
 * BODY:
 * - Font: 'Inter', -apple-system, sans-serif
 * - Size: 16-18px
 * - Line-height: 1.6-1.8
 * - Max width: 720px for text blocks
 */

/* ========================================
   SPACING SYSTEM (Consistent scale)
   ======================================== */

/**
 * ONLY USE THESE VALUES:
 * - 8px  (--space-xs)
 * - 16px (--space-sm)
 * - 24px (--space-md)
 * - 40px (--space-lg)
 * - 64px (--space-xl)
 * 
 * NEVER USE: 13px, 27px, or any random values
 */

/* ========================================
   GLOBAL LAYOUT STRUCTURE
   ======================================== */

/**
 * EVERY PAGE MUST FOLLOW:
 * [Top Bar] 
 *   ↓
 * [Context Header]
 *   ↓
 * [Primary Workspace (70%)] + [Secondary Panel (30%)]
 *   ↓
 * [Proof Footer]
 */

/* ========================================
   COMPONENT RULES
   ======================================== */

/**
 * PRIMARY BUTTON:
 * - Background: solid #8B0000 (deep red)
 * - Text: white
 * - No gradients, no shadows
 * - Hover: darken to #6D0000
 * 
 * SECONDARY BUTTON:
 * - Background: transparent
 * - Border: 1px solid #8B0000
 * - Text: #8B0000
 * - Hover: light background fill
 * 
 * INPUTS:
 * - Clean borders (1px solid #E0E0E0)
 * - No heavy shadows
 * - Focus: 2px solid accent color
 * 
 * CARDS:
 * - Subtle border (1px solid #E0E0E0)
 * - No drop shadows
 * - Balanced padding (24px)
 * - Background: white
 */

/* ========================================
   TRANSITION RULES
   ======================================== */

/**
 * - Duration: 150-200ms only
 * - Easing: ease-in-out (NO bounce, NO elastic)
 * - Properties: color, background-color, border-color
 * - NO transform animations on hover
 * - NO scale, NO rotate, NO bounce effects
 */

/* ========================================
   SHADOW RULES
   ======================================== */

/**
 * - NO heavy drop shadows
 * - Subtle borders preferred
 * - If shadow needed: 0 1px 2px rgba(0, 0, 0, 0.04) maximum
 * - Avoid layered shadows
 */

/* ========================================
   BORDER RADIUS
   ======================================== */

/**
 * - Consistent 4px across all components
 * - NO pill shapes (9999px)
 * - NO circles unless for avatars
 * - Sharp corners acceptable
 */

/* ========================================
   ANIMATION RESTRICTIONS
   ======================================== */

/**
 * ALLOWED:
 * - Subtle opacity transitions (150-200ms)
 * - Simple color changes on hover
 * 
 * NOT ALLOWED:
 * - Bounce animations
 * - Elastic easing
 * - Scale transforms
 * - Rotate animations
 * - Slide-in/slide-out effects
 * - Pulse animations
 * - Shake animations
 * - Loading spinners with rotation
 */

/* ========================================
   ACCESSIBILITY REQUIREMENTS
   ======================================== */

/**
 * - Contrast ratio: minimum 4.5:1
 * - Focus states: visible outline on all interactive elements
 * - Font sizes: minimum 14px
 * - Touch targets: minimum 44x44px
 * - Semantic HTML: use proper heading hierarchy
 */
