export interface IFilm {
    film_description: string;
    film_duration: number;
    film_name: string;
    film_origin: string;
    film_poster: string;
    id: number;
}

export interface IAllData {
    films: IFilm[],
    halls: IHall[],
    seances: ISeance[]
}

export interface IApiResponse<T> {
    success: boolean,
    error: string,
    result: T
}

export type TSeatStatus = 'disabled' | 'taken' | 'vip' | 'standart'

export type THallStatus = 0 | 1

export interface IHall {
    hall_config: TSeatStatus[][];
    hall_name: string;
    hall_open: THallStatus;
    hall_places: number;
    hall_price_standart: number;
    hall_price_vip: number;
    hall_rows: number;
    id: number;
}

export interface ISeance {
    id: number;
    seance_filmid: number;
    seance_hallid: number;
    seance_time: string;
}

export interface ITicketRequest {
    seanceId: number,
    ticketDate: Date,
    tickets: {
        row: number,
        place: number,
        coast: number,
    }[]
}

export interface ITicket {
    id: number,
    ticket_date: string,
    ticket_time: string,
    ticket_filmname: string,
    ticket_hallname: string,
    ticket_row: number,
    ticket_place: number,
    ticket_price: number
}

interface IHalls {
    halls: IHall[]
}

interface IFilms {
    films: IFilm[]
}

interface ISeances {
    seances: ISeance[]
}

export interface IDeleteHallResult extends IHalls, ISeances {
}

export interface IAddHallResult extends IHalls {
}

export interface IChangeHallStatusResult extends IHalls {
}

export interface IAddFilmResult extends IFilms {
}

export interface IDeleteFilmResult extends IFilms, ISeances {
}

export interface IAddSeanceResult extends ISeances {
}

export interface IDeleteSeanceResult extends ISeances {
}



