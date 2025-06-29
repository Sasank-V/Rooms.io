"use client"

import type React from "react"
import { StaffProvider } from "~/contexts/StaffContext"

interface AppWrapperProps {
  children: React.ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return <StaffProvider>{children}</StaffProvider>
}
