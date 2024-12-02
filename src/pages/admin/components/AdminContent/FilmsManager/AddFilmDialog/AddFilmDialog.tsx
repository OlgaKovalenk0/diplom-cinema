import { createPortal } from 'react-dom';
import './AddFilmDialog.css';
import { AdminDialogButtons, AdminDialogForm, AdminDialogFormFields, AdminDialogLayout } from '../../../AdminDialogLayout/AdminDialogLayout';
import { api } from '../../../../../../utils/api/api';
import { IFilm } from '../../../../../../utils/api/api.interfaces';
import { createRef, MutableRefObject, useEffect, useState } from 'react';

export interface IAddFilmDialogContgroller {
    show: (params: IShowDialogParams) => void;
}

type TProps = {
    controllerRef: MutableRefObject<IAddFilmDialogContgroller | undefined>
}

type TSate = {
    isVisible: boolean,
    films?: IFilm[],
} & IShowDialogParams

interface IShowDialogParams {
    onFilmAdded: (films: IFilm[]) => void;
}

export function AddFilmDialog({ controllerRef }: TProps) {

    const [state, setState] = useState<TSate>({
        isVisible: false,
        onFilmAdded: () => { }
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
        if (state.films) {
            state.onFilmAdded(state.films);
        }
    }, [state.films])

    const fileInputRef = createRef<HTMLInputElement>()

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
                <AdminDialogForm id="add-film-form">
                    <AdminDialogFormFields>
                        <div>
                            <label htmlFor="filmName">Название фильма</label>
                            <input id="filmName" type="text" name="filmName" placeholder='Например, «Гражданин Кейн»' />
                        </div>
                        <div>
                            <label htmlFor="filmDuration">Продолжительность фильма (мин.)</label>
                            <input id="filmDuration" type="number" name="filmDuration" />
                        </div>
                        <div>
                            <label htmlFor="filmDescription">Описание фильма</label>
                            <textarea id="filmDescription" rows={4} name="filmDescription"></textarea>
                        </div>
                        <div>
                            <label htmlFor="filmOrigin">Страна</label>
                            <input id="filmOrigin" type="text" name="filmOrigin"/>
                        </div>
                        <input ref={fileInputRef} id="filePoster" type="file" name="filePoster"/>
                    </AdminDialogFormFields>
                    <AdminDialogButtons>
                        <button className='button' type="button" onClick={() => {
                            const form = document.getElementById('add-film-form');
                            if(!form) {
                                return;
                            }

                            const formData = new FormData(form as HTMLFormElement);

                            api.addFilm(formData).then((result) => {
                                setState({
                                    ...state,
                                    isVisible: false,
                                    films: result.films
                                })
                            })
                        }}>Добавить фильм</button>
                        <button className='button' type="button" onClick={() => {
                           fileInputRef.current?.click();
                        }}>Добавить постер</button>
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