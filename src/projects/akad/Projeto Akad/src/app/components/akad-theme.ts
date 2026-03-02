// Akad Seguros Brand Colors & Design Tokens
export const akad = {
  // Primary palette
  navy: "#1A1054",
  blue: "#3B22B8",
  blueLight: "#5B3FE0",
  pink: "#E6007E",
  pinkLight: "#FF3FA0",
  pinkSoft: "rgba(230, 0, 126, 0.08)",
  pinkSubtle: "rgba(230, 0, 126, 0.04)",

  // Neutrals
  bg: "#FAFAFC",
  bgWarm: "#F6F5FA",
  card: "#FFFFFF",
  cardGlass: "rgba(255, 255, 255, 0.72)",
  surface: "#F0EFF5",
  surfaceHover: "#EAE8F2",

  // Text
  text: "#1A1054",
  textSecondary: "#6B6490",
  textTertiary: "#A09CB8",
  textOnDark: "#FFFFFF",
  textOnDarkSecondary: "rgba(255, 255, 255, 0.6)",
  textOnDarkTertiary: "rgba(255, 255, 255, 0.35)",

  // Dark mode surfaces
  darkBg: "#0D0826",
  darkCard: "#150F38",
  darkCardHover: "#1C1548",
  darkBorder: "rgba(255, 255, 255, 0.06)",

  // Semantic
  success: "#00C48C",
  successSoft: "rgba(0, 196, 140, 0.1)",
  warning: "#FFB020",
  warningSoft: "rgba(255, 176, 32, 0.1)",
  danger: "#FF4757",
  dangerSoft: "rgba(255, 71, 87, 0.1)",

  // Borders
  border: "rgba(26, 16, 84, 0.06)",
  borderSubtle: "rgba(26, 16, 84, 0.03)",

  // Shadows
  shadow: "0 1px 3px rgba(26, 16, 84, 0.04), 0 4px 12px rgba(26, 16, 84, 0.03)",
  shadowMd: "0 4px 16px rgba(26, 16, 84, 0.06), 0 8px 32px rgba(26, 16, 84, 0.04)",
  shadowLg: "0 8px 40px rgba(26, 16, 84, 0.08), 0 20px 60px rgba(26, 16, 84, 0.06)",

  // Gradients
  gradientPrimary: "linear-gradient(135deg, #1A1054 0%, #3B22B8 100%)",
  gradientAccent: "linear-gradient(135deg, #E6007E 0%, #FF3FA0 100%)",
  gradientMixed: "linear-gradient(135deg, #3B22B8 0%, #E6007E 100%)",
  gradientDark: "linear-gradient(180deg, #0D0826 0%, #150F38 100%)",

  // Font
  font: "'Space Grotesk', 'Inter', system-ui, sans-serif",

  // Radius
  radius: "20px",
  radiusSm: "14px",
  radiusXs: "10px",
  radiusFull: "9999px",
} as const;

export type AkadTheme = typeof akad;
