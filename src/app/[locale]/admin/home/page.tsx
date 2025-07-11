"use client"
import React, { useState } from 'react'

const HomePage = () => {
  const [count, setCount] = useState(0);

  const handleSetcount = (type: 'tang' | 'giam') => {
    if (type === 'tang') {
      setCount(prev => prev + 1);
    } else {
      if (count <= 0) {
        alert('Điểm số không thể nhỏ hơn 0');
        return;
      }
      setCount(prev => prev - 1);
    }
  }
  return (
    <div >
      <p className='flex justify-center pt-2 mb-2'>Điểm số: {count}</p>
      <div className='flex justify-center gap-2'>
        <button className='p-2 bg-amber-400 hover:bg-amber-500 rounded-2xl cursor-pointer' onClick={() => handleSetcount('tang')}>Tăng điểm số</button>
        <button className='p-2 bg-amber-400 hover:bg-amber-500 rounded-2xl cursor-pointer' onClick={() => handleSetcount('giam')}>giảm điểm số</button>
      </div>
    </div>
  )
}

export default HomePage
