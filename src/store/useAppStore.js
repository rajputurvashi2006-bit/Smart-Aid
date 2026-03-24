import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      // Scan
      scanResult: null,
      lastScanAt: null,
      setScanResult: (result) =>
        set({ scanResult: result, lastScanAt: new Date().toISOString() }),
      clearScanResult: () => set({ scanResult: null, lastScanAt: null }),

      // Auth
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),

      // Chat history (optional persist)
      chatMessages: [],
      addChatMessage: (msg) =>
        set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
      clearChat: () => set({ chatMessages: [] }),
    }),
    { name: 'smart-aid-store' }
  )
)
