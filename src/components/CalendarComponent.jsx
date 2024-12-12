import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

const CalendarComponent = ({ devices, remainingTime }) => {
    const [markedDates, setMarkedDates] = useState([]);
    const [dateValue, setDateValue] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const [deviceNames, setDeviceNames] = useState([]); // State for device names
    const [showMessage, setShowMessage] = useState(false); // State to control message visibility
    const calendarRef = useRef(null);

    useEffect(() => {
        updateMarkedDates(devices);
    }, [devices, remainingTime]);

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false); // Hide message after 60 seconds
            }, 60000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [showMessage]);

    const updateMarkedDates = (devicesData) => {
        const newMarkedDates = devicesData.reduce((acc, device) => {
            const timeLeft = remainingTime[device.id];
            if (timeLeft !== undefined && timeLeft > 0) {
                const daysLeft = Math.ceil(timeLeft / 86400);
                const targetDate = new Date();
                targetDate.setDate(targetDate.getDate() + daysLeft);

                const riskLevel = getRiskLevel(daysLeft);
                acc.push({ date: targetDate.toDateString(), riskLevel, deviceName: device.nama }); // Change 'device.name' to 'device.nama'
            }
            return acc;
        }, []);
        setMarkedDates(newMarkedDates);
    };

    const getRiskLevel = (days) => {
        if (days <= 4) return 'critical'; 
        if (days <= 9) return 'moderate'; 
        return 'low'; 
    };

    const isDateMarked = (date) => {
        return markedDates.filter(marked => marked.date === date.toDateString());
    };

    const tileClassName = ({ date }) => {
        const marked = isDateMarked(date);
        if (marked.length > 0) {
            return marked[0].riskLevel === 'critical' ? 'highlight-red' :
                   marked[0].riskLevel === 'moderate' ? 'highlight-yellow' :
                   marked[0].riskLevel === 'low' ? 'highlight-green' :
                   'highlight-red';
        }
        return null;
    };

    const tileDisabled = ({ date }) => {
        return !isDateMarked(date); // Disable unmarked dates
    };

    // Function to handle date selection
    const handleDateChange = (date) => {
        setDateValue(date);
        setSelectedDate(date);
        updateDeviceNames(date); // Update device names when date is selected
        setShowMessage(true); // Show the message
    };

    const updateDeviceNames = (date) => {
        const formattedDate = date.toDateString();
        const devicesOnDate = markedDates.filter(marked => marked.date === formattedDate);
        setDeviceNames(devicesOnDate.map(device => device.deviceName)); // Get device names
    };

    return (
        <div className="mt-2" ref={calendarRef}>
            <div className="calendar-container w-full">
                <Calendar
                    onChange={handleDateChange} // Handle date selection
                    value={dateValue}
                    tileClassName={tileClassName}
                    className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
                    tileDisabled={tileDisabled} // Disable unmarked dates
                    locale="id-ID" // Set locale to Indonesian
                />
            </div>
            {/* Display selected date and device names */}
            {showMessage && selectedDate && (
                <div className="device-info mt-4 p-4 bg-gray-200 rounded shadow">
                    <h3>Device yang terjadwal pada {selectedDate.toLocaleDateString('id-ID')}:</h3>
                    {deviceNames.length > 0 ? (
                        <ul>
                            {deviceNames.map((name, index) => (
                                <li key={index}>{name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Tidak ada device yang terjadwal pada tanggal ini.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;