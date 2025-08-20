import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import React, { useState } from "react";

interface BookingSectionProps {
  price: number;
  maxParticipants: number;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ price, maxParticipants }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [participants, setParticipants] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const totalPrice = price * participants;

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Vui lòng chọn ngày khởi hành");
      return;
    }

    console.log("Booking:", { selectedDate, participants, totalPrice });
    alert(
      `Đặt tour thành công!\nNgày: ${selectedDate}\nSố người: ${participants}\nTổng tiền: ${formatPrice(totalPrice)}`
    );
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const selectDate = (day: number) => {
    const dateStr = `${day}/${currentMonth.getMonth() + 1}/${currentMonth.getFullYear()}`;
    setSelectedDate(dateStr);
  };

  const isDateSelected = (day: number) => {
    const dateStr = `${day}/${currentMonth.getMonth() + 1}/${currentMonth.getFullYear()}`;
    return selectedDate === dateStr;
  };

  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <div id="booking" className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-teal-700 mb-6 uppercase">Đặt Tour</h2>

      <div className="space-y-6">
        {/* Calendar */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-left">
              <div className="text-lg font-semibold text-gray-900">
                {currentMonth.getDate()}/{String(currentMonth.getMonth() + 1).padStart(2, "0")}/
                {currentMonth.getFullYear()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">
                Thứ Bảy, {currentMonth.getDate()}/
                {String(currentMonth.getMonth() + 1).padStart(2, "0")}/{currentMonth.getFullYear()}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Selected Date Info */}
          {selectedDate && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Cả ngày • 100 Chỗ trống</span>
              </div>
            </div>
          )}

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <div key={index} className="aspect-square">
                {day && (
                  <button
                    onClick={() => selectDate(day)}
                    className={`w-full h-full text-sm rounded flex flex-col items-center justify-center transition-colors relative ${
                      isDateSelected(day)
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="font-medium">{day}</span>
                    {day % 3 === 0 && (
                      <div className="text-xs flex items-center space-x-1 mt-1">
                        <Users className="w-2 h-2" />
                        <span>100</span>
                      </div>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Số tour trống</span>
            </div>
          </div>
        </div>

        {/* Participants Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Chọn số lượng người tham gia *
          </label>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setParticipants(Math.max(1, participants - 1))}
                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-lg"
              >
                -
              </button>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-lg">{participants}</span>
                <span className="text-sm text-gray-600">người</span>
              </div>
              <button
                onClick={() => setParticipants(Math.min(maxParticipants, participants + 1))}
                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-lg"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-600">
              VND {new Intl.NumberFormat("vi-VN").format(price)}/người
            </span>
          </div>
        </div>

        {/* Total Price */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Tổng tiền</span>
            <span className="text-xl font-bold text-green-600">
              VND {new Intl.NumberFormat("vi-VN").format(totalPrice)}
            </span>
          </div>

          <Button
            onClick={handleBooking}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg"
          >
            Đặt lịch
          </Button>
        </div>
      </div>
    </div>
  );
};
