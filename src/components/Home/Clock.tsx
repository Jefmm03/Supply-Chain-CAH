import { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString();
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="text-white mt-4">
            <div className="text-sm">{formatDate(time)}</div>
            <div className="text-lg m-1">{formatTime(time)}</div>
        </div>
    );
};

export default Clock; 
