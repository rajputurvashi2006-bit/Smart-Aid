export default function Input({
  label,
  error,
  hint,
  className = '',
  containerClass = '',
  type = 'text',
  ...props
}) {
  const hasError = !!error
  const inputBase =
    'w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed'
  const inputState = hasError
    ? 'border-accent-rose focus:ring-accent-rose'
    : 'border-slate-200 dark:border-slate-700'

  return (
    <div className={`${containerClass}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${inputBase} ${inputState} ${className}`}
        {...props}
      />
      {hint && !hasError && (
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}
      {hasError && (
        <p className="mt-1.5 text-sm text-accent-rose">{error}</p>
      )}
    </div>
  )
}
