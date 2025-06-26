"use client"
import React from 'react'
import ContentWrapper from './ContentWrapper'

interface SectionProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  containerClass?: string
  sectionClass?: string
  id?: string
}

const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  fullWidth = false,
  containerClass = "",
  sectionClass = "",
  id
}) => {
  return (
    <section
      className={`py-16 ${sectionClass} ${className}`}
      id={id}
    >
      <ContentWrapper
        fullWidth={fullWidth}
        className={containerClass}
      >
        {children}
      </ContentWrapper>
    </section>
  )
}

export default Section
