'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Portal from '@/components/Clients/ui/Portal';

interface SearchHeaderProps {
  isScrolled: boolean;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ isScrolled }) => {
  const [value, setValue] = useState<string>('');
  const [showSearchPopup, setShowSearchPopup] = useState<boolean>(false);

  const toggleSearchPopup = () => {
    setShowSearchPopup((prev) => !prev);
  };

  useEffect(() => {
    if (showSearchPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSearchPopup]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(`Search value: ${e.target.value}`);
  };

  const handleClosePopup = () => {
    setValue('');
    toggleSearchPopup();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      console.log('Searching for:', value);
    }
  };

  return (
    <div>
      {/* Search Icon */}
      <div
        className={`cursor-pointer text-[#eef4b7] transition-all duration-300 ${
          isScrolled ? 'scale-90' : 'scale-100'
        }`}
        onClick={toggleSearchPopup}
      >
        <Image
          src="/images/homePage/ic-search.svg"
          width={25}
          height={25}
          alt="search icon"
          style={{
            filter:
              'invert(83%) sepia(10%) saturate(241%) hue-rotate(47deg) brightness(97%) contrast(85%)',
          }}
        />
      </div>

      {showSearchPopup && (
        <Portal>
          <div
            className="fixed inset-0 h-[100%] bg-black/50 backdrop-blur-md flex items-start justify-center pt-20 px-4"
            style={{ zIndex: 1100 }}
            onClick={handleClosePopup}
          >
            {/* Search Container */}
            <div
              className="w-full max-w-4xl bg-[#34430f] rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Ngăn đóng khi click vào form
            >
              {/* Header với Close Button */}
              <div className="flex justify-between items-center p-6 border-b border-[#5a6b20]">
                <h3 className="text-[#eef4b7] text-xl font-medium">Tìm kiếm</h3>
                <button
                  onClick={handleClosePopup}
                  className="text-[#eef4b7] hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Form Content */}
              <div className="p-8">
                {/* Search Input */}
                <div className="relative mb-8">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="text-gray-400"
                    >
                      <path
                        d="M23.0588 21.0476L25.9561 24.1514C26.2919 24.4855 26.5894 24.8561 26.8431 25.2561C27.0445 25.5491 27.1544 25.8952 27.1592 26.2506C27.1639 26.6061 27.0633 26.9549 26.8698 27.2532C26.7275 27.5192 26.4855 27.7178 26.1968 27.8054C25.9081 27.893 25.5965 27.8624 25.3303 27.7204C24.7198 27.2985 24.1609 26.8065 23.6649 26.2545C22.132 24.7691 20.9003 23.0045 19.2959 21.6001C19.1393 21.4547 19.1289 21.4756 18.8399 21.6051C14.6415 23.7293 8.98748 23.6966 6.20548 19.3077C4.86561 16.9652 4.50264 14.1891 5.19519 11.5809C5.88774 8.97261 7.58004 6.74226 9.90548 5.37298C12.2808 4.04233 15.4163 3.61043 17.8455 4.94158C19.7455 6.05539 21.1853 7.81115 21.9055 9.89253C22.9031 12.469 22.8674 15.3311 21.8059 17.8819C21.6081 18.3195 21.3789 18.7465 21.2539 19.0382C21.1623 19.2518 21.6349 19.6617 21.7505 19.7834C22.0485 20.097 22.9349 20.915 23.0588 21.0476ZM13.1732 19.9972C16.0489 20.3289 18.6224 18.0455 19.5505 15.4666C20.5283 12.1896 18.274 7.10768 14.4629 7.11273C11.3706 7.11683 8.44418 9.73373 7.85533 12.7093C7.19188 16.0618 9.36138 20.288 13.1732 19.9972Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <form onSubmit={handleSubmit} className="w-full">
                    <input
                      onChange={handleChange}
                      value={value}
                      placeholder="Nhập từ khóa tìm kiếm..."
                      className="w-full h-14 pl-12 pr-12 text-gray-900 bg-white rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-[#6c8a1f] text-lg placeholder:text-gray-500 shadow-lg"
                      autoFocus
                    />
                  </form>

                  {/* Clear Button */}
                  {value && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <button
                        type="button"
                        onClick={() => setValue('')}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Search Suggestions */}
                {value && (
                  <div className="mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="text-gray-600 text-sm mb-4 font-medium">Gợi ý tìm kiếm:</div>
                      <div className="space-y-3">
                        <div className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg text-gray-800 transition-colors duration-200 flex items-center space-x-3">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{value} - Tour du lịch</span>
                        </div>
                        <div className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg text-gray-800 transition-colors duration-200 flex items-center space-x-3">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{value} - Địa điểm</span>
                        </div>
                        <div className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg text-gray-800 transition-colors duration-200 flex items-center space-x-3">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{value} - Trải nghiệm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                {!value && (
                  <div>
                    <div className="text-[#eef4b7] text-center mb-6 text-lg">Tìm kiếm phổ biến</div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {[
                        'Sapa',
                        'Hạ Long',
                        'Phú Quốc',
                        'Đà Lạt',
                        'Tour miền Bắc',
                        'Du lịch sinh thái',
                      ].map((keyword, index) => (
                        <button
                          key={index}
                          onClick={() => setValue(keyword)}
                          className="px-6 py-3 bg-white/10 text-[#eef4b7] rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105 border border-white/20"
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default SearchHeader;
