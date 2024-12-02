import { useEffect, useState } from "react";
import { Calendar } from "./Calendar/Calendar";
import { FilmList } from "./FilmList/FilmList";
import { dateToISODate, getDateParts } from "./Calendar/utils";
import { api } from "../../../utils/api/api";
import { IAllData, IFilm, IHall, ISeance, ITicket } from "../../../utils/api/api.interfaces";
import { TSelectedSeat } from "./HallConfig/HallConfig";
import { alertControllerRef } from "../../admin/AdminPage";
import { Seance } from "./Seance/Seance";
import { PaymentInfo } from "./PaymentInfo/PaymentInfo";
import { Ticket } from "./Ticket/Ticket";

type TState = {
    allData: IAllData,
    selectedDate: Date,
    selectedSeance?: ISeance & {
        film: IFilm,
        hall: IHall
    },
    selectedPlaces?: TSelectedSeat[],
    tickets?: ITicket[]
}

export function HomePageContent() {

    const [state, setState] = useState<TState>({
        selectedDate: new Date(...getDateParts()),
        allData: {
            films: [],
            halls: [],
            seances: []
        }
    })

    useEffect(() => {
        api.getAllData().then(allData => {
            setState({
                ...state,
                allData
            });
        })
    }, [])

    if(state.tickets) {
        return  <>{state.tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket}/>)}</>
    }

    if (state.selectedPlaces && state.selectedSeance) {
        return <PaymentInfo
            seanceId={state.selectedSeance.id}
            filmName={state.selectedSeance.film.film_name}
            hallName={state.selectedSeance.hall.hall_name}
            seats={state.selectedPlaces}
            date={state.selectedDate}
            time={state.selectedSeance.seance_time}
            onByTickets={(tickets) => {
                setState({
                    ...state,
                    tickets
                })
            }}
        />
    }

    if (state.selectedSeance) {
        return <Seance seance={state.selectedSeance} date={state.selectedDate} onReserve={({ seats }) => {
            setState({
                ...state,
                selectedPlaces: seats
            })
        }} />
    }

    return <>
        <Calendar selectedDate={state.selectedDate} onDateChange={(selectedDate) => {
            setState({
                ...state,
                selectedDate
            })
        }} />
        <FilmList selectedDate={state.selectedDate} allData={state.allData} onSeanceSelect={(selectedSeance) => {

            const film = state.allData.films.find(film => film.id == selectedSeance.seance_filmid);
            const hall = state.allData.halls.find(hall => hall.id == selectedSeance.seance_hallid);

            if (film && hall) {
                setState({
                    ...state,
                    selectedSeance: {
                        ...selectedSeance,
                        film,
                        hall
                    },
                })
            } else {
                alertControllerRef.current?.show({
                    alertText: 'Не найден зал либо фильм. Обновите страницу'
                })
            }
        }} />
    </>

}