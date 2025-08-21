"use client";

import ButtonPhu from "@/components/Clients/ui/ButtonPhu";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const BookingTour = () => {
  const router = useRouter();
  const locale = useLocale();

  // State để quản lý ngày được chọn và số lượng người tham gia
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [participants, setParticipants] = useState<number>(1);

  // Khởi tạo với tháng và năm hiện tại
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const pricePerPerson = 35000000; // VND 35,000,000

  // Tạo calendar cho tháng hiện tại
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatSelectedDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  // Kiểm tra xem có thể điều hướng về tháng trước không
  const canGoToPreviousMonth = () => {
    const today = new Date();
    const currentMonthYear = new Date(currentYear, currentMonth);
    const thisMonth = new Date(today.getFullYear(), today.getMonth());
    return currentMonthYear > thisMonth;
  };

  // Tạo logic cho các ngày có sẵn - cho phép tất cả ngày từ hôm nay trở đi
  const getTodayDate = () => {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
    };
  };

  const isDateAvailable = (day: number, month: number, year: number) => {
    const today = getTodayDate();
    const currentDate = new Date(year, month, day);
    const todayDate = new Date(today.year, today.month, today.day);

    // Cho phép đặt từ hôm nay trở đi
    return currentDate >= todayDate;
  };

  const monthNames = [
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

  // Xử lý khi nhấn Book Tour
  const handleBookTour = () => {
    if (!selectedDate) {
      alert("Vui lòng chọn ngày khởi hành!");
      return;
    }

    if (participants < 1) {
      alert("Vui lòng chọn ít nhất 1 người tham gia!");
      return;
    }

    // Chuyển hướng đến trang booking với params
    const bookingUrl = `/${locale}/booking?booking_date=${selectedDate}&total_participants=${participants}`;
    router.push(bookingUrl);
  };

  return (
    <div>
      <section id="book-tour" className="py-4">
        <Card className="space-y-4 p-3 md:p-6">
          <h2 className="uppercase text-2xl font-bold text-gray-800">Book Tour</h2>
          <div className="rounded-[8px] bg-gray-50 md:flex md:gap-6 p-3 md:p-6">
            {/* Calendar với chức năng chọn ngày */}
            <div className="md:w-1/2 bg-white p-4 rounded-[8px] relative">
              <div className="space-y-4">
                {/* Header calendar với điều hướng tháng */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      // Chỉ cho phép quay lại nếu không phải tháng hiện tại
                      if (canGoToPreviousMonth()) {
                        if (currentMonth === 0) {
                          setCurrentMonth(11);
                          setCurrentYear(currentYear - 1);
                        } else {
                          setCurrentMonth(currentMonth - 1);
                        }
                      }
                    }}
                    className={`p-1 rounded ${
                      canGoToPreviousMonth()
                        ? "hover:bg-gray-100 cursor-pointer"
                        : "opacity-50 cursor-not-allowed text-gray-400"
                    }`}
                  >
                    &#8249;
                  </button>
                  <div className="text-gray-900 font-semibold">
                    {monthNames[currentMonth]} {currentYear}
                  </div>
                  <button
                    onClick={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0);
                        setCurrentYear(currentYear + 1);
                      } else {
                        setCurrentMonth(currentMonth + 1);
                      }
                    }}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    &#8250;
                  </button>
                </div>

                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-medium">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-700">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square"></div>
                  ))}

                  {/* Days of month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                    const isAvailable = isDateAvailable(day, currentMonth, currentYear);
                    const isSelected = selectedDate === dateStr;

                    return (
                      <div
                        key={day}
                        onClick={() => isAvailable && setSelectedDate(dateStr)}
                        className={[
                          "aspect-square border border-gray-100 grid place-items-center rounded-sm cursor-pointer",
                          isSelected ? "bg-primary text-white border-primary" : "",
                          isAvailable
                            ? "hover:bg-primary/10 hover:border-primary"
                            : "opacity-50 pointer-events-none text-gray-400",
                        ].join(" ")}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2 items-center">
                  <span className="text-gray-700 text-sm">Availability</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-primary/20 rounded-sm"></div>
                    <span className="text-xs text-gray-600">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking summary */}
            <div className="flex-1 flex flex-col justify-between gap-4 mt-4 md:mt-0">
              <div className="space-y-4">
                {/* Hiển thị ngày đã chọn */}
                <div className="text-gray-900 text-sm">
                  {selectedDate ? formatSelectedDate(selectedDate) : "Chọn ngày khởi hành"}
                </div>

                <label className="inline-flex items-center gap-2 px-4 py-1 rounded border border-primary w-fit">
                  <input type="radio" name="slot" defaultChecked />
                  <span className="text-sm">All day</span>
                  <span className="w-1 h-1 bg-gray-900 rounded-full" />
                  <span className="text-sm text-gray-900">10 Available</span>
                </label>

                {/* Chọn số lượng người tham gia */}
                <div className="text-gray-900 font-semibold">Select Number of Participants *</div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">Participant</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setParticipants(Math.max(1, participants - 1))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={participants}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setParticipants(Math.max(1, Math.min(50, value))); // Giới hạn từ 1-50 người
                      }}
                      className="w-16 text-center text-sm font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                      min="1"
                      max="50"
                    />
                    <button
                      onClick={() => setParticipants(Math.min(50, participants + 1))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm">
                    VND {new Intl.NumberFormat("vi-VN").format(pricePerPerson)}/pax
                  </div>
                </div>

                <div className="h-px bg-gray-100" />
                <div className="flex items-center justify-between">
                  <div className="text-gray-900 font-semibold">Total</div>
                  <div className="text-primary font-medium">
                    VND {new Intl.NumberFormat("vi-VN").format(pricePerPerson * participants)}
                  </div>
                </div>
              </div>

              <ButtonPhu
                name="Book Tour"
                onClick={handleBookTour}
                className={!selectedDate ? "opacity-50 cursor-not-allowed" : ""}
              />
            </div>
          </div>

          <p className="text-primary text-sm">
            *Please note: This product is on request. We will confirm availability within the
            shortest possible time after we receive your order.
          </p>
        </Card>
      </section>
    </div>
  );
};

export default BookingTour;
