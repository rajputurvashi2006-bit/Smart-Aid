export default function Loader({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-14 h-14 border-3',
  }

  return (
    <div
      className={`animate-spin rounded-full border-primary-200 dark:border-primary-800 border-t-primary-500 ${sizes[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader size="lg" />
      <p className="text-slate-600 dark:text-slate-400 font-medium">
        Analyzing...
      </p>
    </div>
  )
}
