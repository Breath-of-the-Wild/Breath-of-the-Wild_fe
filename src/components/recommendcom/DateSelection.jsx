import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BsFillCalendarHeartFill } from 'react-icons/bs';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './DateSelection.css';

const DateSelection = ({ onSelectDate, label }) => {
    const [date, setDate] = useState('');
    const [open, setOpen] = useState(false);
    const format = 'YYYY-MM-DD';
    const calendarRef = useRef(null);
    const inputRef = useRef(null);

    const handleClickButton = () => {
        setOpen(!open);
    };

    const handleChangeCalendar = (selected) => {
        const formattedDate = selected.format(format);
        setDate(formattedDate);
        setOpen(false);

        onSelectDate(formattedDate, label);
    };

    const handleClickOut = useCallback(
        (e) => {
            if (open && inputRef?.current && calendarRef?.current) {
                const inputArea = inputRef.current;
                const calendarArea = calendarRef.current;
                const { target } = e;
                const outArea =
                    !inputArea.contains(target) && !calendarArea.contains(target);

                if (outArea) {
                    setOpen(false);
                }
            }
        },
        [open, inputRef, calendarRef]
    );

    useEffect(() => {
        if (open && inputRef?.current && calendarRef?.current) {
            document.addEventListener('click', handleClickOut);
        }
        return () => {
            document.removeEventListener('click', handleClickOut);
        };
    }, [open, inputRef, calendarRef, handleClickOut]);

    const isValidDate = (current) => {
        const today = new Date();
        const limitDate = new Date(today.setDate(today.getDate() + 16));
        return current.isBefore(limitDate);
    };
    
    return (
        <div ref={inputRef}>
            <input
                type='text'
                value={date}
                placeholder='날짜선택'
                size={11}
                readOnly
            />
            <button type='button' onClick={handleClickButton} style={{ display: 'inline-block' }}>
                <BsFillCalendarHeartFill />
            </button>
        
            {open && (
                <div ref={calendarRef} className='calendar'>
                    <Datetime
                        input={false}
                        timeFormat={false}
                        dateFormat={format}
                        value={date}
                        onChange={handleChangeCalendar}
                        isValidDate={isValidDate}
                    />
                </div>
            )}
        </div>
    );
};

export default DateSelection;
