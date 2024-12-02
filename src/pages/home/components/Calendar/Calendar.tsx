import classNames from 'classnames';
import './Calendar.css';
import { getDateParts } from './utils';

const dayNames = new Map<number, string>([
    [0, 'Вс'],
    [1, 'Пн'],
    [2, 'Вт'],
    [3, 'Ср'],
    [4, 'Чт'],
    [5, 'Пт'],
    [6, 'Сб']
])

type CalendarProps = {
    selectedDate: Date,
    onDateChange: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateChange }: CalendarProps) {

    const [currentYear, currentMonth, currentDate] = getDateParts();

    const days: Date[] = [];
    const today = new Date(currentYear, currentMonth, currentDate);

    for (var i = 0; i < 5; i++) {
        const day = new Date(new Date(today).setDate(today.getDate()+i));
        days.push(day);
    }

    return <ul className='calendar__week'>
        {days.map((day, index) => {

            const dayOfWeek = day.getDay();
            const dayNumber = day.getDate();
            const todayString = days[0].toDateString();
            const dayString = day.toDateString();
            const activeDatString = selectedDate.toDateString();
            const dayOfWeekName = dayNames.get(dayOfWeek);

            return <li key={index} className={classNames('calendar__day', {
                'calendar__day_holiday': dayOfWeek == 0 || dayOfWeek == 6,
                'calendar__day_active': dayString == activeDatString
            })} onClick={() => {
                onDateChange(day);
            }}>
                {todayString == dayString ? <>
                    <div>Сегодня</div>
                    <div>{dayOfWeekName}, {dayNumber}</div>
                </> : <>
                    <div>{dayOfWeekName},</div>
                    <div>{dayNumber}</div>
                </>}
            </li>
        })}
        <li className='calendar__day calendar__arrow'>{">"}</li>
    </ul>
}