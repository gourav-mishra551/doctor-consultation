import React, { useState } from 'react';
import classNames from 'classnames';

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const handleDateClick = (day) => {
        setSelectedDate(new Date(currentYear, currentMonth, day));
    };

    const handleMonthChange = (e) => {
        setCurrentMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setCurrentYear(parseInt(e.target.value));
    };

    const renderCalendar = () => {
        const totalDays = daysInMonth(currentYear, currentMonth);
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        const calendarDays = [];
        for (let i = 1; i <= totalDays; i++) {
            calendarDays.push(i);
        }

        return (
            <>
                {[...Array(firstDayOfMonth)].map((_, index) => (
                    <div key={`empty-${index}`} className="border"></div>
                ))}
                {calendarDays.map((day) => (
                    <div
                        key={day}
                        onClick={() => handleDateClick(day)}
                        className={classNames('cursor-pointer p-2 border border-gray-200 rounded', {
                            'bg-blue-200': selectedDate && selectedDate.getDate() === day,
                        })}
                    >
                        {day}
                    </div>
                ))}
            </>
        );
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                    <label htmlFor="month">Month:</label>
                    <select
                        id="month"
                        className="border border-gray-300 rounded px-0 py-1"
                        value={currentMonth}
                        onChange={handleMonthChange}
                    >
                        {Array.from({ length: 12 }).map((_, index) => (
                            <option key={index} value={index}>
                                {new Date(0, index).toLocaleDateString(undefined, { month: 'long' })}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="year">Year:</label>
                    <select
                        id="year"
                        className="border border-gray-300 rounded px-2 py-1"
                        value={currentYear}
                        onChange={handleYearChange}
                    >
                        {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-4">
                <div className="col-span-1 text-center text-gray-600 font-semibold">Sun</div>
                <div className="col-span-1 text-center text-gray-600 font-semibold">Mon</div>
                <div className="col-span-1 text-center text-gray-600 font-semibold">Tue</div>
                <div className="col-span-1 text-center text-gray-600 font-semibold">Wed</div>
                <div className="col-span-1 text-center text-gray-600 font-semibold">Thu</div>
                <div className="col-span-1 text-center text-gray-600 font-semibold">Fri</div>
                <div className="col-span-1 text-center text-gray-600 font-semibold">Sat</div>
                {renderCalendar()}
            </div>
            {selectedDate && (
                <div className="mt-4">
                    <p className="text-lg font-semibold">Selected Date: {selectedDate.toDateString()}</p>
                    {/* Add appointment booking form or logic here */}
                </div>
            )}
        </div>
    );
};

export default Calendar;
