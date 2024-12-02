import { QRCodeSVG } from 'qrcode.react';
import './Ticket.css';
import { ITicket } from '../../../../utils/api/api.interfaces';

type TProps = {
    ticket: ITicket
}

export function Ticket({ ticket }: TProps) {

    const formattedDate = ticket.ticket_date.split('-').reverse().join('.')

    return <div className="ticket">
        <div className='ticket__header'>Электрический билет</div>
        <div className='ticket__body'>
            <div className='ticket__session-info'>
                <div>На фильм: <span>{ticket.ticket_filmname}</span></div>
                <div>Ряд: <span>{ticket.ticket_row}</span>, Место: <span>{ticket.ticket_place}</span></div>
                <div>В зале: <span>{ticket.ticket_hallname}</span></div>
                <div>Начало сеанса: <span>{formattedDate} {ticket.ticket_time}</span></div>
                <div>Стоимость: <span>{ticket.ticket_price}</span> рублей</div>
            </div>
            <div className='ticket__qrcode-area'>
                <div className='ticket__qrcode-container'>
                    <QRCodeSVG
                        //Дата, Время, Название фильма, Зал, Ряд, Место, Стоимость, Фраза "Билет действителен строго на свой сеанс"
                        value={`Дата: ${formattedDate}
Время:  ${ticket.ticket_time}
Зал: ${ticket.ticket_hallname}
Ряд: ${ticket.ticket_row}
Место: ${ticket.ticket_place}
Стоиость: ${ticket.ticket_price} рублей
Билет действителен строго на свой сеанс`}
                        size={200}
                        marginSize={2} />
                </div>
            </div>
            <div className='ticket__information'>
                <div>Покажите QR-код нашему контроллеру для подтверждения бронирования.</div>
                <div>Приятного просмотра!</div>
            </div>
        </div>
    </div>
}