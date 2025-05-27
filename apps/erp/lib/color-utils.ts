/**
 * Color utility functions for generating and applying color schemes
 */

// Convert hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace(/^#/, "")

  // Parse hex values
  let r, g, b
  if (hex.length === 3) {
    r = Number.parseInt(hex[0] + hex[0], 16)
    g = Number.parseInt(hex[1] + hex[1], 16)
    b = Number.parseInt(hex[2] + hex[2], 16)
  } else {
    r = Number.parseInt(hex.substring(0, 2), 16)
    g = Number.parseInt(hex.substring(2, 4), 16)
    b = Number.parseInt(hex.substring(4, 6), 16)
  }

  return { r, g, b }
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16)
        return hex.length === 1 ? "0" + hex : hex
      })
      .join("")
  )
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

// Convert hex to HSL string for CSS variables
export function hexToHslString(hex: string): string {
  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)
  return `${h} ${s}% ${l}%`
}

// Convert RGB to HSB (HSV)
export function rgbToHsb(r: number, g: number, b: number): { h: number; s: number; b: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min

  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
  }
}

// Convert HSB to RGB
export function hsbToRgb(h: number, s: number, b: number): { r: number; g: number; b: number } {
  h /= 360
  s /= 100
  b /= 100

  let r, g, b1
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = b * (1 - s)
  const q = b * (1 - f * s)
  const t = b * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = b
      g = t
      b1 = p
      break
    case 1:
      r = q
      g = b
      b1 = p
      break
    case 2:
      r = p
      g = b
      b1 = t
      break
    case 3:
      r = p
      g = q
      b1 = b
      break
    case 4:
      r = t
      g = p
      b1 = b
      break
    case 5:
      r = b
      g = p
      b1 = q
      break
    default:
      r = 0
      g = 0
      b1 = 0
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b1 * 255),
  }
}

// Convert hex to HSB
export function hexToHsb(hex: string): { h: number; s: number; b: number } {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHsb(r, g, b)
}

// Convert HSB to hex
export function hsbToHex(h: number, s: number, b: number): string {
  const { r, g, b: b1 } = hsbToRgb(h, s, b)
  return rgbToHex(r, g, b1)
}

// Lighten a color by a percentage
export function lightenColor(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  const lighten = (value: number) => Math.min(255, value + (255 - value) * amount)

  return rgbToHex(lighten(r), lighten(g), lighten(b))
}

// Darken a color by a percentage
export function darkenColor(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex)
  const darken = (value: number) => Math.max(0, value * (1 - amount))

  return rgbToHex(darken(r), darken(g), darken(b))
}

// Calculate luminance for contrast checking
function luminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  const lum1 = luminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = luminance(rgb2.r, rgb2.g, rgb2.b)

  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

// Get a foreground color (black or white) based on background color
export function getForegroundColor(backgroundColor: string): string {
  const { r, g, b } = hexToRgb(backgroundColor)
  // Simple luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5 ? "#000000" : "#ffffff"
}

// Generate a complete color scheme from a primary color
export function generateColorScheme(primaryColor: string) {
  // Primary colors
  const primary = primaryColor
  const primaryForeground = getForegroundColor(primary)

  // Secondary colors (slightly desaturated version of primary)
  const { r, g, b } = hexToRgb(primary)
  const avg = (r + g + b) / 3
  const desaturate = 0.3 // Desaturation amount
  const secondaryR = r * (1 - desaturate) + avg * desaturate
  const secondaryG = g * (1 - desaturate) + avg * desaturate
  const secondaryB = b * (1 - desaturate) + avg * desaturate
  const secondary = lightenColor(rgbToHex(secondaryR, secondaryG, secondaryB), 0.8)
  const secondaryForeground = getForegroundColor(secondary)

  // Accent colors (complementary to primary)
  const accent = darkenColor(primary, 0.1)
  const accentForeground = getForegroundColor(accent)

  // Muted colors
  const muted = lightenColor(secondary, 0.5)
  const mutedForeground = darkenColor(secondary, 0.5)

  // Destructive colors (red-based)
  const destructive = "#ff4d4f"
  const destructiveForeground = "#ffffff"

  // Border colors
  const border = lightenColor(primary, 0.7)
  const input = border

  // Ring color
  const ring = primary

  // Dark mode variants
  const darkPrimary = lightenColor(primary, 0.1)
  const darkPrimaryForeground = getForegroundColor(darkPrimary)

  const darkSecondary = darkenColor(secondary, 0.6)
  const darkSecondaryForeground = getForegroundColor(darkSecondary)

  const darkAccent = lightenColor(accent, 0.2)
  const darkAccentForeground = getForegroundColor(darkAccent)

  const darkMuted = darkenColor(muted, 0.7)
  const darkMutedForeground = lightenColor(mutedForeground, 0.3)

  const darkDestructive = lightenColor(destructive, 0.1)
  const darkDestructiveForeground = "#ffffff"

  const darkBorder = darkenColor(border, 0.6)
  const darkInput = darkBorder

  const darkRing = lightenColor(ring, 0.1)

  return {
    light: {
      primary: hexToHslString(primary),
      primaryForeground: hexToHslString(primaryForeground),
      secondary: hexToHslString(secondary),
      secondaryForeground: hexToHslString(secondaryForeground),
      accent: hexToHslString(accent),
      accentForeground: hexToHslString(accentForeground),
      muted: hexToHslString(muted),
      mutedForeground: hexToHslString(mutedForeground),
      destructive: hexToHslString(destructive),
      destructiveForeground: hexToHslString(destructiveForeground),
      border: hexToHslString(border),
      input: hexToHslString(input),
      ring: hexToHslString(ring),
    },
    dark: {
      primary: hexToHslString(darkPrimary),
      primaryForeground: hexToHslString(darkPrimaryForeground),
      secondary: hexToHslString(darkSecondary),
      secondaryForeground: hexToHslString(darkSecondaryForeground),
      accent: hexToHslString(darkAccent),
      accentForeground: hexToHslString(darkAccentForeground),
      muted: hexToHslString(darkMuted),
      mutedForeground: hexToHslString(darkMutedForeground),
      destructive: hexToHslString(darkDestructive),
      destructiveForeground: hexToHslString(darkDestructiveForeground),
      border: hexToHslString(darkBorder),
      input: hexToHslString(darkInput),
      ring: hexToHslString(darkRing),
    },
  }
}

// Apply color scheme to CSS variables
export function applyColorScheme(primaryColor: string) {
  const scheme = generateColorScheme(primaryColor)

  // Save to localStorage
  localStorage.setItem("formx-primary-color", primaryColor)

  // Create a style element for our custom CSS variables
  const styleElement = document.createElement("style")
  styleElement.id = "dynamic-color-scheme"

  // Set CSS variables for both light and dark modes
  styleElement.textContent = `
    :root {
      --primary: ${scheme.light.primary};
      --primary-foreground: ${scheme.light.primaryForeground};
      --secondary: ${scheme.light.secondary};
      --secondary-foreground: ${scheme.light.secondaryForeground};
      --accent: ${scheme.light.accent};
      --accent-foreground: ${scheme.light.accentForeground};
      --muted: ${scheme.light.muted};
      --muted-foreground: ${scheme.light.mutedForeground};
      --destructive: ${scheme.light.destructive};
      --destructive-foreground: ${scheme.light.destructiveForeground};
      --border: ${scheme.light.border};
      --input: ${scheme.light.input};
      --ring: ${scheme.light.ring};
    }

    .dark {
      --primary: ${scheme.dark.primary};
      --primary-foreground: ${scheme.dark.primaryForeground};
      --secondary: ${scheme.dark.secondary};
      --secondary-foreground: ${scheme.dark.secondaryForeground};
      --accent: ${scheme.dark.accent};
      --accent-foreground: ${scheme.dark.accentForeground};
      --muted: ${scheme.dark.muted};
      --muted-foreground: ${scheme.dark.mutedForeground};
      --destructive: ${scheme.dark.destructive};
      --destructive-foreground: ${scheme.dark.destructiveForeground};
      --border: ${scheme.dark.border};
      --input: ${scheme.dark.input};
      --ring: ${scheme.dark.ring};
    }
  `

  // Remove any existing dynamic style element
  const existingStyle = document.getElementById("dynamic-color-scheme")
  if (existingStyle) {
    existingStyle.remove()
  }

  // Add the new style element
  document.head.appendChild(styleElement)

  return scheme
}
