/**
 * Color Design Tokens
 * Based on a systematic color palette approach
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Secondary Colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Secondary
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Success Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Success
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Warning Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f59e0b', // Warning
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Error Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Error
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Neutral Grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Special Colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Component-specific color mappings
  text: {
    primary: '#111827', // gray-900
    secondary: '#6b7280', // gray-500
    tertiary: '#9ca3af', // gray-400
    inverse: '#ffffff', // white
  },

  background: {
    primary: '#ffffff', // white
    secondary: '#f9fafb', // gray-50
    tertiary: '#f3f4f6', // gray-100
  },

  border: {
    primary: '#e5e7eb', // gray-200
    secondary: '#d1d5db', // gray-300
    tertiary: '#9ca3af', // gray-400
  },
} as const

export type ColorScale = typeof colors.primary
export type ColorToken = keyof typeof colors

// Helper function to access colors
export const getColor = (token: string): string => {
  const keys = token.split('.')
  let color: Record<string, unknown> | string = colors

  for (const key of keys) {
    if (typeof color === 'string') return token
    color = (color as Record<string, unknown>)[key]
    if (!color) return token // Return original if not found
  }

  return typeof color === 'string' ? color : token
}
