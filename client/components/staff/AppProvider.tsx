"use client"

import type React from "react"
import { StaffProvider } from "~/contexts/StaffContext"

interface AppProviderProps {
  children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  return <StaffProvider>{children}</StaffProvider>
}
