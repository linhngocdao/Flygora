"use client"
import React, {useState} from 'react'
import Image from 'next/image'

interface SearchHeaderProps {
    isScrolled: boolean,
    showSearchPopup: boolean,
    toggleSearchPopup: () => void
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ isScrolled, showSearchPopup, toggleSearchPopup }) => {
    const [value, setValue] = useState<string>('')


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        console.log(`Search value: ${e.target.value}`)
    }
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

            {/* Search Popup */}
            { showSearchPopup && (
                <div className="block opacity-100 visible top-[50px] md:top-16 absolute z-50 left-0 w-full bg-white xl:py-[68px] md:py-[48px] py-[34px] duration-300 ease-in-out popup-search">
                    <div className="xl:max-w-[790px] md:max-w-[553px] max-w-[94vw] w-full bg-gray-50 rounded-full xl:py-3 py-2 xl:px-6 md:px-4 px-3 mx-auto flex items-center justify-center space-x-1">
                        {/* Search SVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            className="duration-300 ease-in-out cursor-pointer lg:hover:text-primary"
                        >
                            <path
                                d="M23.0588 21.0476L25.9561 24.1514C26.2919 24.4855 26.5894 24.8561 26.8431 25.2561C27.0445 25.5491 27.1544 25.8952 27.1592 26.2506C27.1639 26.6061 27.0633 26.9549 26.8698 27.2532C26.7275 27.5192 26.4855 27.7178 26.1968 27.8054C25.9081 27.893 25.5965 27.8624 25.3303 27.7204C24.7198 27.2985 24.1609 26.8065 23.6649 26.2545C22.132 24.7691 20.9003 23.0045 19.2959 21.6001C19.1393 21.4547 19.1289 21.4756 18.8399 21.6051C14.6415 23.7293 8.98748 23.6966 6.20548 19.3077C4.86561 16.9652 4.50264 14.1891 5.19519 11.5809C5.88774 8.97261 7.58004 6.74226 9.90548 5.37298C12.2808 4.04233 15.4163 3.61043 17.8455 4.94158C19.7455 6.05539 21.1853 7.81115 21.9055 9.89253C22.9031 12.469 22.8674 15.3311 21.8059 17.8819C21.6081 18.3195 21.3789 18.7465 21.2539 19.0382C21.1623 19.2518 21.6349 19.6617 21.7505 19.7834C22.0485 20.097 22.9349 20.915 23.0588 21.0476ZM13.1732 19.9972C16.0489 20.3289 18.6224 18.0455 19.5505 15.4666C20.5283 12.1896 18.274 7.10768 14.4629 7.11273C11.3706 7.11683 8.44418 9.73373 7.85533 12.7093C7.19188 16.0618 9.36138 20.288 13.1732 19.9972Z"
                                fill="currentColor"
                            ></path>
                        </svg>

                        {/* Input Form */}
                        <form className="w-full">
                            <input
                                onChange={handleChange}
                                value={value}
                                placeholder="Type Keyword"
                                className="w-full h-6 text-gray-900 bg-transparent outline-none focus:outline-none body-1 placeholder:text-gray-500"
                            />
                        </form>

                        {/* Close SVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                            className="hidden text-gray-900 duration-300 cursor-pointer lg:hover:text-primary ease-in-out"
                        >
                            <path
                                d="M3.5756 17.3878C3.34963 17.6761 3.0282 17.8742 2.66915 17.9466C2.31011 18.019 1.93702 17.9608 1.61705 17.7825C1.35573 17.6475 1.15489 17.419 1.05454 17.1425C0.954195 16.866 0.961712 16.5618 1.0756 16.2906C2.2414 13.9803 3.86255 11.2784 5.0056 9.44939C5.58315 8.52534 5.78725 8.35789 5.145 7.51284C4.61075 6.80984 3.9017 5.94719 3.44685 5.39654C2.65685 4.44049 1.5162 3.12259 1.21445 2.41564C1.08905 2.06418 1.07938 1.68183 1.18684 1.32449C1.2943 0.967139 1.51325 0.65354 1.8117 0.429539C2.4267 -0.0221607 2.9967 0.130389 3.69625 0.824089C4.15005 1.27409 6.8019 4.64764 7.16715 5.12634C7.6081 5.70434 7.71895 5.68929 8.18555 5.04324C8.65945 4.38699 10.5472 1.97049 11.0329 1.32294C11.9058 0.159039 12.9012 -0.317061 13.527 0.283739C13.6754 0.399258 13.7995 0.542949 13.8921 0.706561C13.9848 0.870173 14.0443 1.05048 14.0671 1.23713C14.0899 1.42379 14.0756 1.6131 14.025 1.79421C13.9744 1.97532 13.8886 2.14465 13.7723 2.29249C12.9067 3.65249 11.8436 4.88489 10.8828 6.17684C10.6141 6.49856 10.3676 6.8382 10.145 7.19339C9.6684 8.04564 9.6172 8.08229 10.1147 8.93634C10.4605 9.53004 11.0894 10.3463 11.4505 10.86C12.4467 12.2777 13.5269 13.8341 14.6311 15.1656C15.5755 16.3045 14.6253 17.24 14.0911 17.5159C13.7708 17.7032 13.3899 17.7576 13.0299 17.6677C12.67 17.5777 12.3595 17.3505 12.1649 17.0345C11.5187 16.1771 10.9888 15.223 10.3873 14.3332C9.89615 13.6064 9.29414 12.5132 8.77004 11.8045C7.97289 10.7266 7.82145 10.3311 7.4796 10.9385C6.29425 13.045 4.2235 16.5121 3.5756 17.3878Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchHeader
