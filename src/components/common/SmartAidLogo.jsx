import { useDarkMode } from '../../hooks/useDarkMode'

export default function SmartAidLogo({ className = "w-9 h-9" }) {
  const { isDark } = useDarkMode()
  
  // Color palette matching the theme
  const colors = {
    background: isDark ? '#042f2e' : '#f0fdfa',
    light: isDark ? '#5eead4' : '#ccfbf1',
    medium: isDark ? '#0d9488' : '#0f766e',
    dark: isDark ? '#0f766e' : '#0d9488',
    accent: isDark ? '#14b8a6' : '#2dd4bf',
    node: isDark ? '#14b8a6' : '#2dd4bf',
  }

  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle background */}
      <circle cx="20" cy="20" r="20" fill={colors.background} />
      
      {/* AI Circuit nodes in corners - representing neural network */}
      <circle cx="8" cy="8" r="1.5" fill={colors.node} />
      <circle cx="32" cy="8" r="1.5" fill={colors.node} />
      <circle cx="8" cy="32" r="1.5" fill={colors.node} />
      <circle cx="32" cy="32" r="1.5" fill={colors.node} />
      
      {/* AI Circuit connecting lines (subtle mesh pattern) */}
      <line x1="8" y1="8" x2="32" y2="32" stroke={colors.light} strokeWidth="0.8" opacity="0.4" />
      <line x1="32" y1="8" x2="8" y2="32" stroke={colors.light} strokeWidth="0.8" opacity="0.4" />
      
      {/* Medical cross - centered symbol */}
      {/* Top vertical pillar with rounded medical cross */}
      <rect x="16.5" y="10" width="7" height="11" rx="2" fill={colors.dark} />
      
      {/* Left horizontal pillar */}
      <rect x="10" y="17.5" width="20" height="5" rx="2.5" fill={colors.dark} />
      
      {/* Bottom heartbeat curve - creating a pulse effect */}
      <path 
        d="M 14 26 Q 16 28 18 26 Q 20 24 20 22 Q 20 24 22 26 Q 24 28 26 26" 
        fill="none" 
        stroke={colors.accent} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Inner glow circle for AI element - subtle ring */}
      <circle cx="20" cy="20" r="11" fill="none" stroke={colors.accent} strokeWidth="0.6" opacity="0.3" />
    </svg>
  )
}
