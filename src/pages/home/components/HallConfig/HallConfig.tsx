import { useEffect, useState } from 'react';
import './HallConfig.css';
import { TSeatStatus } from '../../../../utils/api/api.interfaces';
import { api } from '../../../../utils/api/api';
import classNames from 'classnames';


type HallConfigProps = {
    seanceId: number,
    date: Date,
    hall_price_standart: number;
    hall_price_vip: number;
    selectedSeats: TSelectedSeat[];
    onChangeSelectedSeats: (seats: TSelectedSeat[]) => void
}

export type TSelectedSeat = {
    row: number,
    seat: number,
    price: number
}

export function HallConfig({
    seanceId,
    date,
    hall_price_standart,
    hall_price_vip,
    selectedSeats,
    onChangeSelectedSeats
}: HallConfigProps) {

    const [hallConfig, setHallConfig] = useState<TSeatStatus[][]>([]);

    useEffect(() => {
        api.getHallConfig(seanceId, date).then(data => {
            setHallConfig(data);
        })
    }, [])


    return <div className='hall-config__hall'>
        <div className='hall-config__hall-plan'>
            <div className='hall-config__hall-screen'>
                <img src='/images/screen.png' />
            </div>
            <div className='hall-config__hall-seats'>
                {hallConfig.map((row, rowIndex) => <div className="hall-config__seats_row" key={rowIndex}>{
                    row.map((status, seatIndex) => <div
                        onClick={() => {
                            if (status != 'taken') {

                                const selectedIndex = selectedSeats.findIndex(seat => seat.row == rowIndex && seat.seat == seatIndex);

                                if (selectedIndex == -1) {
                                    onChangeSelectedSeats([...selectedSeats, {
                                        row: rowIndex,
                                        seat: seatIndex,
                                        price: status == 'vip' ? hall_price_vip : hall_price_standart
                                    }])
                                } else {
                                    const seats = [...selectedSeats];
                                    seats.splice(selectedIndex, 1);
                                    onChangeSelectedSeats(seats);
                                }
                            }
                        }}
                        className={classNames('hall-config__seat', {
                            'hall-config__seat_inactive': status == 'disabled', 
                            'hall-config__seat_active': status != 'disabled',
                            'hall-config__seat_free': status == 'standart',
                            'hall-config__seat_busy': status == 'taken',
                            'hall-config__seat_free-vip': status == 'vip',
                            'hall-config__seat_selected': selectedSeats.findIndex(seat => seat.row == rowIndex && seat.seat == seatIndex) != -1
                        })}
                        key={seatIndex}></div>)
                }</div>)}
            </div>
        </div>
        <div className='hall-config__hall-legend'>
            <div>
                <div className='hall-config__seat hall-config__seat_active hall-config__seat_free'></div>
                <div>Свободно ({hall_price_standart} руб)</div>
            </div>
            <div>
                <div className='hall-config__seat hall-config__seat_active hall-config__seat_busy'></div>
                <div>Занято</div>
            </div>
            <div>
                <div className='hall-config__seat hall-config__seat_active hall-config__seat_free-vip'></div>
                <div>Свободно VIP ({hall_price_vip} руб)</div>
            </div>
            <div>
                <div className='hall-config__seat hall-config__seat_active hall-config__seat_selected'></div>
                <div>Выбрано</div>
            </div>
        </div>
    </div>
}