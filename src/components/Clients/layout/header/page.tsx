"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const HeaderComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <header>
        <div className={`fixed top-0 left-0 z-[1000] flex items-center w-full duration-700 ease-in-out header-wrapper ${isScrolled ? 'h-[50px] lg:h-[60px] bg-[#34430f] shadow-lg backdrop-blur-sm' : 'h-[70px] lg:h-24 max-lg:bg-[#34430f]'}`}>
          {/* Background overlay khi scroll */}
          {isScrolled && (
            <div className="absolute inset-0 w-full h-full opacity-20">
              <div className="w-full h-full bg-gradient-to-r from-green-900/30 via-primary-900/50 to-green-800/30"></div>
              <div className="absolute inset-0 w-full h-full bg-[url('/bg-texture.jpg')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
            </div>
          )}
          <div className="relative z-50 w-full">
            <div className="container">
              <div className="flex items-center justify-between w-full">
                {/* Desktop menu button */}
                <button className="hidden text-[#eef4b7] md:block">
                  <svg width={isScrolled ? "28" : "32"} height={isScrolled ? "28" : "32"} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-ecb57835="" className="transition-all duration-300"><path d="M28.0419 8.52177C26.5422 8.39509 25.0336 8.25351 23.5339 8.26842C21.1148 8.29822 18.7046 8.44726 16.2943 8.54413C11.9649 7.68719 7.54613 8.179 3.1631 8.00016C2.96671 7.9927 2.6632 8.25351 2.56501 8.43235C2.37754 8.79748 2.61857 9.103 2.99349 9.334C4.21645 10.1015 5.69829 10.4368 7.20691 10.5263C10.8401 10.7424 14.4733 11.0702 18.1243 10.8243C18.5796 10.8541 19.0259 10.8839 19.4812 10.9063C22.3467 11.033 25.2211 11.0702 28.0687 10.7647C28.881 10.6753 29.5506 10.3325 29.497 9.66187C29.4434 9.05084 28.8721 8.59629 28.0419 8.52177Z" fill="currentColor"></path><path d="M28.0419 15.5218C26.5422 15.3951 25.0336 15.2535 23.5339 15.2684C21.1148 15.2982 18.7046 15.4473 16.2943 15.5441C11.9649 14.6872 7.54613 15.179 3.1631 15.0002C2.96671 14.9927 2.6632 15.2535 2.56501 15.4324C2.37754 15.7975 2.61857 16.103 2.99349 16.334C4.21645 17.1015 5.69829 17.4368 7.20691 17.5263C10.8401 17.7424 14.4733 18.0702 18.1243 17.8243C18.5796 17.8541 19.0259 17.8839 19.4812 17.9063C22.3467 18.033 25.2211 18.0702 28.0687 17.7647C28.881 17.6753 29.5506 17.3325 29.497 16.6619C29.4434 16.0434 28.8721 15.5888 28.0419 15.5218Z" fill="currentColor" className=""></path><path d="M28.0419 22.3478C26.5422 22.2634 25.0336 22.169 23.5339 22.1789C21.1148 22.1988 18.7046 22.2982 16.2943 22.3628C11.9649 21.7915 7.54613 22.1193 3.1631 22.0001C2.96671 21.9951 2.6632 22.169 2.56501 22.2882C2.37754 22.5317 2.61857 22.7353 2.99349 22.8893C4.21645 23.401 5.69829 23.6246 7.20691 23.6842C10.8401 23.8282 14.4733 24.0468 18.1243 23.8829C18.5796 23.9028 19.0259 23.9226 19.4812 23.9375C22.3467 24.022 25.2211 24.0468 28.0687 23.8431C28.881 23.7835 29.5506 23.555 29.497 23.1079C29.4434 22.6956 28.8721 22.3926 28.0419 22.3478Z" fill="currentColor" className=""></path></svg>
                </button>

                {/* Mobile menu button */}
                <div className="md:hidden ml-4">
                  <button className={`text-[#eef4b7] transition-all duration-300 ${isScrolled ? 'w-7' : 'w-8'}`}>
                    <svg data-v-ecb57835="" width={isScrolled ? "28" : "32"} height={isScrolled ? "28" : "32"} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.0419 8.52177C26.5422 8.39509 25.0336 8.25351 23.5339 8.26842C21.1148 8.29822 18.7046 8.44726 16.2943 8.54413C11.9649 7.68719 7.54613 8.179 3.1631 8.00016C2.96671 7.9927 2.6632 8.25351 2.56501 8.43235C2.37754 8.79748 2.61857 9.103 2.99349 9.334C4.21645 10.1015 5.69829 10.4368 7.20691 10.5263C10.8401 10.7424 14.4733 11.0702 18.1243 10.8243C18.5796 10.8541 19.0259 10.8839 19.4812 10.9063C22.3467 11.033 25.2211 11.0702 28.0687 10.7647C28.881 10.6753 29.5506 10.3325 29.497 9.66187C29.4434 9.05084 28.8721 8.59629 28.0419 8.52177Z" fill="currentColor"></path><path d="M28.0419 15.5218C26.5422 15.3951 25.0336 15.2535 23.5339 15.2684C21.1148 15.2982 18.7046 15.4473 16.2943 15.5441C11.9649 14.6872 7.54613 15.179 3.1631 15.0002C2.96671 14.9927 2.6632 15.2535 2.56501 15.4324C2.37754 15.7975 2.61857 16.103 2.99349 16.334C4.21645 17.1015 5.69829 17.4368 7.20691 17.5263C10.8401 17.7424 14.4733 18.0702 18.1243 17.8243C18.5796 17.8541 19.0259 17.8839 19.4812 17.9063C22.3467 18.033 25.2211 18.0702 28.0687 17.7647C28.881 17.6753 29.5506 17.3325 29.497 16.6619C29.4434 16.0434 28.8721 15.5888 28.0419 15.5218Z" fill="currentColor"></path><path d="M28.0419 22.3478C26.5422 22.2634 25.0336 22.169 23.5339 22.1789C21.1148 22.1988 18.7046 22.2982 16.2943 22.3628C11.9649 21.7915 7.54613 22.1193 3.1631 22.0001C2.96671 21.9951 2.6632 22.169 2.56501 22.2882C2.37754 22.5317 2.61857 22.7353 2.99349 22.8893C4.21645 23.401 5.69829 23.6246 7.20691 23.6842C10.8401 23.8282 14.4733 24.0468 18.1243 23.8829C18.5796 23.9028 19.0259 23.9226 19.4812 23.9375C22.3467 24.022 25.2211 24.0468 28.0687 23.8431C28.881 23.7835 29.5506 23.555 29.497 23.1079C29.4434 22.6956 28.8721 22.3926 28.0419 22.3478Z" fill="currentColor"></path></svg>
                  </button>
                </div>

                {/* Logo */}
                <div>
                  <a href="/vi" aria-current="page">
                    <div className="relative w-full">
                      <div className={`duration-500 ease-in-out xl:max-w-[265px] md:max-w-[186px] max-w-[170px] ${isScrolled ? 'scale-100 opacity-0' : 'scale-100 opacity-100'}`}>
                        <picture>
                          <source media="(max-width: 767px)" srcSet="/logo.webp?w=500" />
                          <source media="(max-width: 1439px)" srcSet="/logo.webp?w=1000" />
                          <img className="xl:max-w-[180px] md:max-w-[160px] max-w-[180px]" src="/logo.webp" alt="logo" loading="lazy" />
                        </picture>
                      </div>
                      <div className={`absolute flex items-center justify-center w-full mx-auto duration-1000 ease-in-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${isScrolled ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                        <picture>
                          <source media="(max-width: 767px)" srcSet="/logo-mobile.webp?w=500" />
                          <source media="(max-width: 1439px)" srcSet="/logo-mobile.webp?w=1000" />
                          <img
                            className="xl:max-w-[50px] md:max-w-[60px] max-w-[40px]"
                            src="/logo-mobile.webp"
                            alt="logo mobile"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    </div>
                  </a>
                </div>



                {/* Icons search */}
                <div className="flex items-center justify-between space-x-[22px]">
                  <div className={`cursor-pointer text-[#eef4b7] transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none" data-v-ecb57835=""><path d="M6.6979 1.12156C4.59338 1.66512 2.71318 3.22604 1.70593 5.15345C0.552054 7.36147 0.487662 10.1184 1.53717 12.379C3.47436 16.5516 8.59573 18.359 12.9533 16.0008C13.95 17.6361 15.1954 19.1822 16.4236 20.5391C17.03 21.2091 18.1258 21.6574 18.9996 21.3069C19.7452 21.1427 20.277 20.4958 20.277 19.7223C20.277 19.331 20.1377 18.9531 19.885 18.6577C18.4329 16.9642 17.055 15.252 15.7756 13.561C16.3974 12.7187 16.8509 11.762 17.0696 10.7346C19.0956 4.59833 12.8579 -1.28273 6.6979 1.12156ZM19.5106 18.9788C20.1731 19.7522 19.5604 20.9407 18.5506 20.8506C18.22 20.8217 17.9201 20.6499 17.7287 20.3799C16.5553 18.7161 15.2848 17.0335 13.9533 15.3679C14.5107 14.9603 15.0197 14.4881 15.4613 13.962C16.7249 15.6274 18.0816 17.3121 19.5106 18.9788ZM16.8599 9.53634C16.3684 12.5662 13.8127 15.1219 10.7832 15.6137C7.63689 16.1253 4.20934 14.3608 2.89075 11.333C1.17511 7.15604 3.27976 2.29263 7.99029 1.23851C12.8865 0.142925 17.6963 4.37901 16.8599 9.53634Z" fill="currentColor"></path></svg>
                  </div>

                  {/* Language switcher */}
                  <div className="relative languages">
                    <div className="items-center hidden space-x-2 cursor-pointer md:flex">
                      <div className="max-w-[27px] w-full border border-primary-100 rounded overflow-hidden">
                        <img src="/flag-vi.webp" alt="flag vi" className="object-cover w-full h-full" />
                      </div>
                  <svg className="text-[#eef4b7]" xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none" data-v-ecb57835=""><path d="M14.5739 0.920555C10.0879 0.623555 5.60192 0.537556 1.11592 0.530556C0.270921 0.500556 -0.208078 1.62656 0.419922 2.21156C2.65092 4.53656 5.04192 6.95456 7.33892 9.19855C7.69492 9.56055 8.27992 9.56055 8.63492 9.19855C10.7479 7.04955 12.8209 4.86156 14.8279 2.60656C15.1349 2.27356 15.2069 1.96656 15.1299 1.77456C15.6119 1.51256 15.4919 0.989555 14.5739 0.920555ZM8.03692 7.26756C6.53592 5.66756 4.97692 4.03956 3.42192 2.45156C6.96592 2.37156 10.5089 2.22756 14.0529 1.95556C11.9999 3.67956 10.0049 5.45956 8.03692 7.26756Z" fill="#FCFFDF"></path></svg>
                    </div>

                    {/* Dropdown (hidden by default) */}
                    <div className="absolute top-0 w-[90px] -translate-x-1/2 left-1/2 space-y-3 duration-300 ease-in-out pt-10 z-40 opacity-0 invisible">
                      <div className="overflow-hidden rounded-md bg-primary-darker">
                        <Link
                          href="/"
                          className="flex items-center px-4 py-3 space-x-3 text-white duration-300 ease-in-out cursor-pointer label-1 lg:hover:bg-primary-50 lg:hover:text-primary-900"
                        >
                          <div className="w-8">
                            <img src="/flag-en.webp" alt="flag en" className="object-cover w-full h-full" />
                          </div>
                          <span className="flex-1">EN</span>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div className={`-translate-x-full fixed z-[51] w-screen h-screen overflow-hidden duration-500 ease-in-out bg-white ${isScrolled ? 'top-[60px] h-[calc(100vh-60px)]' : 'top-[70px] h-[calc(100vh-70px)]'}`}>
          <div className="absolute inset-0 w-full h-full">
            <picture>
              <source media="(max-width: 767px)" srcSet="/bg-overlay-main.webp?w=500" />
              <source media="(max-width: 1439px)" srcSet="/bg-overlay-main.webp?w=1000" />
              <img className="object-cover w-full h-full" src="/bg-overlay-main.webp" alt="background menu" loading="lazy" />
            </picture>
          </div>
          <div className="relative xl:py-[68px] md:py-[48px] py-[34px] xl:px-[120px] lg:pr-[20px] lg:pl-[80px] px-8 md:px-[60px] h-full flex flex-col justify-between xl:space-y-14 md:space-y-10 space-y-7 overflow-y-auto">
            {/* Menu content here */}
          </div>
        </div>

        {/* Black overlay */}
        <div className="opacity-0 invisible fixed top-0 left-0 z-[999] w-screen h-screen duration-300 ease-in-out bg-black cursor-pointer"></div>
      </header>
    </div>
  )
}

export default HeaderComponent
