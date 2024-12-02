import { useState, useEffect } from 'react'
import { IFilm, IHall, ISeance } from '../../../../utils/api/api.interfaces'
import { HallConfig, TSelectedSeat } from '../HallConfig/HallConfig'
import './Seance.css'

type TProps = {
    date: Date,
    seance: ISeance & {
        film: IFilm,
        hall: IHall
    },
    onReserve: (params: {
        seats: TSelectedSeat[]
    }) => void
}

type TState = {
    selectedSeats: TSelectedSeat[]
}

export function Seance({ seance, date, onReserve }: TProps) {
    
    const [state, setState] = useState<TState>({
        selectedSeats: []
    });

    return <div className='seance'>
        <div className='seance__header'>
            <div className='seance__film-name'>{seance.film.film_name}</div>
            <div className='seance__film-time'>Начало сеанса: {seance.seance_time}</div>
            <div className='seance__hall-name'>{seance.hall.hall_name}</div>
        </div>

            <HallConfig
                hall_price_standart={seance.hall.hall_price_standart}
                hall_price_vip={seance.hall.hall_price_vip}
                seanceId={seance.id}
                date={date}
                selectedSeats={state.selectedSeats}
                onChangeSelectedSeats={(selectedSeats) => {
                    setState({
                        selectedSeats
                    })
                }}
            />
        <div className='seance__footer'>
            <button
                className='button seance__button-reserve'
                onClick={() => {
                    if(!state.selectedSeats.length) {
                        return;
                    }
                    onReserve({ seats: state.selectedSeats })
                }}>Забронировать</button>
        </div>
    </div>
}