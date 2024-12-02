import { api } from '../../../../utils/api/api';
import { ITicket } from '../../../../utils/api/api.interfaces';
import { TSelectedSeat } from '../HallConfig/HallConfig';
import './PaymentInfo.css';

type TPops = {
    seanceId: number,
    filmName: string,
    hallName: string,
    seats: TSelectedSeat[],
    date: Date,
    time: string,
    onByTickets: (tickets: ITicket[]) => void
}

export function PaymentInfo({ filmName, hallName, seats, date, time, onByTickets, seanceId }: TPops) {
    return <div className="payment">
    <div className='payment__header'>Вы выбрали билеты:</div>
    <div className='payment__body'>
        <div className='payment__session-info'>
            <div>На фильм: <span>{filmName}</span></div>
            <div className='payment__seats'>
                <div>Места:</div>
                <ul>
                    {seats.map((seat, index) => <li key={index}>
                        Ряд: <span>{seat.row + 1}</span>, Место: <span>{seat.seat + 1}</span>
                    </li>)}
                </ul>
            </div>
            <div>В зале: <span>{hallName}</span></div>
            <div>Начало сеанса: <span>{date.toLocaleDateString()} {time}</span></div>
            <div>Стоимость: <span>{seats.reduce((acc, cur) => acc + cur.price, 0)}</span> рублей</div>
        </div>
        <div className='payment__button-area'>
            <button className='button payment__button-getcode' onClick={() => {
                api.buyTicket({
                    seanceId,
                    ticketDate: date,
                    tickets: seats.map(seat => {
                        return {
                            row: seat.row + 1,
                            place: seat.seat + 1,
                            coast: seat.price
                        }
                    })
                }).then(tickets => {
                    onByTickets(tickets)
                })
            }}>Получить код бронирования</button>
        </div>
        <div className='payment__information'>
            <div>После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</div>
            <div>Приятного просмотра!</div>
        </div>
    </div>
</div>
}