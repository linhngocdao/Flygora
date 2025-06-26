"use client"
import React from 'react'
import HeaderComponent from './header/page'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <HeaderComponent />
      <main className="pt-[70px] lg:pt-24">
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  )
}

export default MainLayout
