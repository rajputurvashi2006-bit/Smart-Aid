export default function Card({
  children,
  className = '',
  padding = true,
  hover = false,
  gradient = false,
  ...props
}) {
  const base =
    'rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300'
  const paddingClass = padding ? 'p-6 sm:p-8' : ''
  const hoverClass = hover
    ? 'hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-500/30 hover:-translate-y-0.5'
    : 'shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50'
  const gradientClass = gradient
    ? 'bg-gradient-to-br from-primary-50 to-slate-50 dark:from-primary-950/30 dark:to-slate-900'
    : ''

  return (
    <div
      className={`${base} ${paddingClass} ${hoverClass} ${gradientClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, icon, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-3">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="mt-1 text-slate-600 dark:text-slate-400">{subtitle}</p>
      )}
    </div>
  )
}
