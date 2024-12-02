import { alertControllerRef } from "../../pages/admin/AdminPage";
import { IAddFilmResult, IAddHallResult, IAddSeanceResult, IAllData, IApiResponse, IChangeHallStatusResult, IDeleteFilmResult, IDeleteHallResult, IDeleteSeanceResult, IHall, ITicket, ITicketRequest, THallStatus, TSeatStatus } from "./api.interfaces";

class Api {

    private host = 'https://shfe-diplom.neto-server.ru';

    private request = <T>(...args: Parameters<typeof fetch>) => {

        return fetch(...args)
            .then(response => response.json())
            .then((data: IApiResponse<T>) => {
                return new Promise<T>((resolve) => {
                    if (data.success) {
                        resolve(data.result)
                    } else {
                        alertControllerRef.current?.show({ alertText: data.error })
                        console.error(data.error)
                    }
                })
            })
    }

    // CLIENT

    getAllData = (): Promise<IAllData> =>
        this.request<IAllData>(`${this.host}/alldata`)

    getHallConfig = (seanceId: number, date: Date): Promise<TSeatStatus[][]> =>
        this.request<TSeatStatus[][]>(`${this.host}/hallconfig?seanceId=${seanceId}&date=${date.toLocaleDateString().split('.').reverse().join('-')}`)

    buyTicket = (data: ITicketRequest): Promise<ITicket[]> => {
        const fd = new FormData();
        fd.append('seanceId', data.seanceId.toString());
        fd.append('ticketDate', data.ticketDate.toLocaleDateString().split('.').reverse().join('-'));
        fd.append('tickets', JSON.stringify(data.tickets))

        return this.request<ITicket[]>(`${this.host}/ticket`, {
            method: 'POST',
            body: fd
        })
    }


    //ADMIN

    addHall = (formData: FormData): Promise<IAddHallResult> =>
        this.request<IAddHallResult>(`${this.host}/hall`, {
            method: 'POST',
            body: formData
        })

    deleteHall = (hallId: number): Promise<IDeleteHallResult> =>
        this.request<IDeleteHallResult>(`${this.host}/hall/${hallId}`, {
            method: 'DELETE',
        })

    saveHallConfig = (hallId: number, rowsCount: number, placesCount: number, hallConfig: TSeatStatus[][]): Promise<IHall> => {
        const params = new FormData()
        params.set('rowCount', rowsCount.toString());
        params.set('placeCount', placesCount.toString());
        params.set('config', JSON.stringify(hallConfig));

        return this.request<IHall>(`${this.host}/hall/${hallId}`, {
            method: 'POST',
            body: params
        })
    }

    savePriceConfig = (hallId: number, priceStandart: number, priceVip: number): Promise<IHall> => {
        const params = new FormData()
        params.set('priceStandart', priceStandart.toString());
        params.set('priceVip', priceVip.toString());

        return this.request<IHall>(`${this.host}/price/${hallId}`, {
            method: 'POST',
            body: params
        })
    }

    changeHallStatus = (hallId: number, hallStatus: THallStatus): Promise<IChangeHallStatusResult> => {
        const params = new FormData()
        params.set('hallOpen', hallStatus.toString());

        return this.request<IChangeHallStatusResult>(`${this.host}/open/${hallId}`, {
            method: 'POST',
            body: params
        })
    }

    addFilm = (formData: FormData): Promise<IAddFilmResult> =>
        this.request<IAddFilmResult>(`${this.host}/film`, {
            method: 'POST',
            body: formData
        })

    deleteFilm = (filmId: number): Promise<IDeleteFilmResult> =>
        this.request<IDeleteFilmResult>(`${this.host}/film/${filmId}`, {
            method: 'DELETE',
        })


    addSeance = (formData: FormData): Promise<IAddSeanceResult> =>
        this.request<IAddSeanceResult>(`${this.host}/seance`, {
            method: 'POST',
            body: formData
        })

    deleteSeance = (seanceId: number): Promise<IDeleteSeanceResult> =>
        this.request<IDeleteSeanceResult>(`${this.host}/seance/${seanceId}`, {
            method: 'DELETE',
        })

    login = (formData: FormData): Promise<void> =>
        this.request(`${this.host}/login`, {
            method: 'POST',
            body: formData
        });

}

export const api = new Api();