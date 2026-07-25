import { create } from 'zustand'

// Figma ke mutabiq roles defined karein
export type Role = 'Super-Principal' | 'Principal' | 'Teacher' | 'Student'

interface AppState {
  currentRole: Role
  setRole: (role: Role) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentRole: 'Super-Principal',
  setRole: (role) => set({ currentRole: role }),
}))