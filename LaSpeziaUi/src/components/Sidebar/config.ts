import { createContext } from 'react'
export const SidebarContext = createContext<{open: boolean} | null>(null)
export const sidebarDefaults = { openDelayMs: 0, closeDelayMs: 160, transition: 'animated', openOn: 'both' }
