"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomCalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  isInModal?: boolean;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selected,
  onSelect,
  disabled,
  className,
  isInModal = false,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
        setIsMonthDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Get previous month's last days to fill the grid
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate year options (from 1800 to current year + 50)
  const currentYearValue = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 1900; year <= currentYearValue + 50; year++) {
    yearOptions.push(year);
  }

  // Generate calendar days
  const calendarDays = [];

  // Previous month's days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(currentYear, currentMonth - 1, day);
    calendarDays.push({
      date,
      day,
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    calendarDays.push({
      date,
      day,
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

  // Next month's days to complete the grid
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day);
    calendarDays.push({
      date,
      day,
      isCurrentMonth: false,
      isPrevMonth: false,
    });
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setAnimationDirection(direction === "prev" ? "right" : "left");

    setTimeout(() => {
      if (direction === "prev") {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
      } else {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
      }

      setTimeout(() => {
        setAnimationDirection(null);
      }, 150);
    }, 150);
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selected && date.toDateString() === selected.toDateString();
  };

  const isDisabled = (date: Date) => {
    return disabled ? disabled(date) : false;
  };

  const handleDateClick = (date: Date, isCurrentMonth: boolean) => {
    if (!isCurrentMonth || isDisabled(date)) return;
    onSelect?.(date);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentDate(new Date(currentYear, monthIndex, 1));
    setIsMonthDropdownOpen(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentMonth, 1));
    setIsYearDropdownOpen(false);
  };

  // Scroll to current year when dropdown opens
  const scrollToCurrentYear = () => {
    setTimeout(() => {
      const yearDropdown = document.querySelector("[data-year-dropdown]");
      const currentYearButton = document.querySelector(`[data-year="${currentYear}"]`);
      if (yearDropdown && currentYearButton) {
        currentYearButton.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  return (
    <div
      ref={calendarRef}
      className={cn(
        "bg-white rounded-2xl shadow-xl border border-gray-100",
        isInModal ? "w-80" : "w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-96",
        "p-4 sm:p-6",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Month Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsMonthDropdownOpen(!isMonthDropdownOpen);
                setIsYearDropdownOpen(false);
              }}
              className="text-base sm:text-lg font-semibold text-gray-900 tracking-wide hover:bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200 flex items-center space-x-1"
            >
              <span>{months[currentMonth]}</span>
              <ChevronLeftIcon
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isMonthDropdownOpen ? "rotate-90" : "-rotate-90"
                )}
              />
            </button>

            {isMonthDropdownOpen && (
              <div
                className={cn(
                  "absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto w-64 sm:min-w-[280px]",
                  isInModal ? "z-[100000]" : "z-50"
                )}
              >
                <div className="grid grid-cols-3 gap-1 sm:gap-2 p-2 sm:p-4">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => handleMonthSelect(index)}
                      className={cn(
                        "px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:bg-[#6c8a1f]/10 text-center",
                        currentMonth === index && "bg-[#6c8a1f] text-white font-semibold shadow-md"
                      )}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Year Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setIsYearDropdownOpen(!isYearDropdownOpen);
                setIsMonthDropdownOpen(false);
                if (!isYearDropdownOpen) {
                  scrollToCurrentYear();
                }
              }}
              className="text-base sm:text-lg font-semibold text-gray-600 hover:bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200 flex items-center space-x-1"
            >
              <span>{currentYear}</span>
              <ChevronLeftIcon
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isYearDropdownOpen ? "rotate-90" : "-rotate-90"
                )}
              />
            </button>

            {isYearDropdownOpen && (
              <div
                data-year-dropdown
                className={cn(
                  "absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 sm:max-h-72 overflow-y-auto w-72 sm:min-w-[320px]",
                  isInModal ? "z-[100000]" : "z-50"
                )}
              >
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-3 sm:px-4 py-2 text-xs text-gray-500 font-medium">
                  Select Year (1900 - {currentYearValue + 50})
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-1 p-2 sm:p-3">
                  {yearOptions.map((year) => (
                    <button
                      key={year}
                      data-year={year}
                      onClick={() => handleYearSelect(year)}
                      className={cn(
                        "px-1 sm:px-2 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:bg-[#6c8a1f]/10 text-center min-w-[36px] sm:min-w-[44px]",
                        currentYear === year &&
                        "bg-[#6c8a1f] text-white font-semibold shadow-md ring-2 ring-[#6c8a1f]/30"
                      )}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => navigateMonth("next")}
          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-[15px] font-medium text-gray-500 py-1 sm:py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        className={cn(
          "grid grid-cols-7 gap-1 transition-all duration-300",
          animationDirection === "left" && "transform translate-x-2 opacity-50",
          animationDirection === "right" && "transform -translate-x-2 opacity-50"
        )}
      >
        {calendarDays.map((dayObj, index) => {
          const { date, day, isCurrentMonth } = dayObj;
          const todayClass = isToday(date);
          const selectedClass = isSelected(date);
          const disabledClass = isDisabled(date);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date, isCurrentMonth)}
              disabled={!isCurrentMonth || disabledClass}
              className={cn(
                "relative cursor-pointer w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-[16px] font-medium rounded-lg transition-all duration-200",
                "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6c8a1f] focus:ring-offset-1",
                "transform hover:scale-105 hover:text-[#6c8a1f] active:scale-95",

                // Current month days
                isCurrentMonth && "text-gray-900",

                // Other month days
                !isCurrentMonth && "text-gray-300 cursor-not-allowed",

                // Today
                todayClass &&
                isCurrentMonth &&
                !selectedClass &&
                "bg-blue-50 text-blue-600 font-semibold ring-2 ring-blue-200",

                // Selected
                selectedClass && "bg-[#6c8a1f] text-white font-semibold shadow-lg",

                // Disabled
                disabledClass &&
                isCurrentMonth &&
                "text-gray-300 cursor-not-allowed hover:bg-transparent hover:scale-100",

                // Animation delay for staggered effect
                "animate-in fade-in duration-200"
              )}
              style={{
                animationDelay: `${(index % 7) * 20}ms`,
              }}
            >
              {day}

              {/* Today indicator dot */}
              {todayClass && !selectedClass && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
              )}

              {/* Selected date ring effect */}
              {selectedClass && (
                <div className="absolute inset-0 rounded-lg ring-2 ring-[#6c8a1f] ring-offset-2 ring-offset-white animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer with today button */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={() => {
            const today = new Date();
            setCurrentDate(today);
            setIsYearDropdownOpen(false);
            setIsMonthDropdownOpen(false);
          }}
          className="flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-300"
        >
          Go to Today
        </button>
        <button
          onClick={() => {
            const today = new Date();
            setCurrentDate(today);
            onSelect?.(today);
            setIsYearDropdownOpen(false);
            setIsMonthDropdownOpen(false);
          }}
          className="flex-1 py-2 px-3 sm:px-4 text-xs sm:text-sm font-medium text-[#6c8a1f] hover:bg-[#6c8a1f] hover:text-white rounded-lg transition-all duration-200 border border-[#6c8a1f]"
        >
          Select Today
        </button>
      </div>
    </div>
  );
};

export default CustomCalendar;
