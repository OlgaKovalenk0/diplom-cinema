import { createPortal } from 'react-dom';
import './AddSeanceDialog.css';
import { AdminDialogButtons, AdminDialogForm, AdminDialogFormFields, AdminDialogLayout } from '../../../AdminDialogLayout/AdminDialogLayout';
import { api } from '../../../../../../utils/api/api';
import { IFilm, IHall, ISeance } from '../../../../../../utils/api/api.interfaces';
import { MutableRefObject, useEffect, useState } from 'react';

export interface IAddSeanceDialogContgroller {
    show: (params: IShowDialogParams) => void;
}

type TProps = {
    controllerRef: MutableRefObject<IAddSeanceDialogContgroller | undefined>
}

type TSate = {
    isVisible: boolean,
    seances?: ISeance[],
} & IShowDialogParams

interface IShowDialogParams {
    onSeanceAdded: (seances: ISeance[]) => void;
    films: IFilm[];
    halls: IHall[];
    selectedFilm?: IFilm;
    selectedHall?: IHall;
}

export function AddSeanceDialog({ controllerRef }: TProps) {

    const [state, setState] = useState<TSate>({
        isVisible: false,
        onSeanceAdded: () => { },
        films: [],
        halls: []
    })

    useEffect(() => {
        controllerRef.current = {
            show: (params) => {
                setState({
                    isVisible: true,
                    ...params
                });
            }
        }
    }, [controllerRef])

    useEffect(() => {
        if (state.seances) {
            state.onSeanceAdded(state.seances);
        }
    }, [state.seances])

    if (!state.isVisible) {
        return null;
    }

    const container = document.getElementById('dialog-container');

    return container
        ? createPortal(
            <AdminDialogLayout className="add-film-dialog" headerText='Добавление Зала' onCloseClick={() => {
                setState({
                    ...state,
                    isVisible: false
                })
            }}>
                <AdminDialogForm id="add-seance-form">
                    <AdminDialogFormFields>
                        <div>
                            <label htmlFor="seanceHallid">Название зала</label>
                            <select id="seanceHallid" name="seanceHallid" defaultValue={state.selectedHall?.id || ''}>
                                <option value="" disabled>Название зала</option>
                                {state.halls.map(hall => <option key={hall.id} value={hall.id}>{hall.hall_name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="seanceFilmid">Название фильма</label>
                            <select id="seanceFilmid" name="seanceFilmid" defaultValue={state.selectedFilm?.id || ''}>
                                <option value="" disabled>Название фильма</option>
                                {state.films.map(film => <option key={film.id} value={film.id}>{film.film_name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="seanceTime">Время начала</label>
                            <input id="seanceTime" type="time" name="seanceTime" defaultValue={'00:00'} />
                        </div>
                    </AdminDialogFormFields>
                    <AdminDialogButtons>
                        <button className='button' type="button" onClick={() => {
                            const form = document.getElementById('add-seance-form');
                            if (!form) {
                                return;
                            }

                            const formData = new FormData(form as HTMLFormElement);

                            api.addSeance(formData).then((result) => {
                                setState({
                                    ...state,
                                    isVisible: false,
                                    seances: result.seances
                                })
                            })
                        }}>Добавить фильм</button>
                        <button className='button button_white' type="button" onClick={() => {
                            setState({
                                ...state,
                                isVisible: false
                            })
                        }}>Отмена</button>
                    </AdminDialogButtons>
                </AdminDialogForm>
            </AdminDialogLayout>,
            container)
        : null
}