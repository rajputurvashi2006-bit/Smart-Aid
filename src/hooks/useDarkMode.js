import { useEffect, useState } from 'react'

const STORAGE_KEY = 'smart-aid-dark'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) return stored === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem(STORAGE_KEY, 'true')
    } else {
      root.classList.remove('dark')
      localStorage.setItem(STORAGE_KEY, 'false')
    }
  }, [isDark])

  const toggle = () => setIsDark((prev) => !prev)
  return { isDark, toggle }
}
