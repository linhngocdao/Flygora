"use client"
import React from 'react'
import HeaderComponent from "@/components/Clients/layout/header/page";
import ContentWrapper from "@/components/Clients/ui/ContentWrapper";
import Section from "@/components/Clients/ui/Section";

const LayoutExample = () => {
  return (
    <div>
      <HeaderComponent />

      {/* Hero Section - Full Width */}
      <Section fullWidth sectionClass="relative min-h-screen bg-gradient-to-br from-blue-600 to-green-600">
        <div className="flex items-center justify-center h-full min-h-screen text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Hero Section Full Width</h1>
            <p className="text-xl mb-8">Background này sẽ full width màn hình</p>
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Call to Action
            </button>
          </div>
        </div>
      </Section>

      {/* Content Section - Container 1200px */}
      <Section containerClass="max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Nội dung chính</h2>
          <p className="text-lg text-gray-600">
            Phần này sẽ được giới hạn trong container 1200px và căn giữa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-lg p-6 border">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">{item}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Feature {item}</h3>
              <p className="text-gray-600">
                Mô tả về tính năng {item}. Nội dung này sẽ nằm trong container 1200px.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Another Full Width Section */}
      <Section fullWidth sectionClass="bg-gray-900 text-white">
        <ContentWrapper>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Section với background full width</h2>
            <p className="text-xl mb-8">
              Background màu đen này sẽ full width, nhưng nội dung vẫn giới hạn trong 1200px
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-300">
                Đây là cách tốt nhất để tạo layout: background full width nhưng nội dung
                vẫn được giới hạn và căn giữa để dễ đọc trên mọi thiết bị.
              </p>
            </div>
          </div>
        </ContentWrapper>
      </Section>

      {/* Regular Content Section */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Cách sử dụng Layout</h2>

          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">1. Section với Container 1200px</h3>
              <p className="text-gray-700">
                Sử dụng <code className="bg-gray-200 px-2 py-1 rounded">{'<Section>'}</code> để tạo section với nội dung giới hạn trong 1200px.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-800">2. Section Full Width</h3>
              <p className="text-gray-700">
                Sử dụng <code className="bg-gray-200 px-2 py-1 rounded">{'<Section fullWidth>'}</code> để tạo section với background full width.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">3. ContentWrapper</h3>
              <p className="text-gray-700">
                Sử dụng <code className="bg-gray-200 px-2 py-1 rounded">{'<ContentWrapper>'}</code> để wrap nội dung cần giới hạn width.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default LayoutExample
