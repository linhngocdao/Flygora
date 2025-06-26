"use client"
import React from 'react'

interface ContentWrapperProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className = "",
  fullWidth = false
}) => {
  if (fullWidth) {
    return (
      <div className={`w-full ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  )
}

export default ContentWrapper
