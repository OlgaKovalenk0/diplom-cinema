import { createPortal } from 'react-dom';
import './AddHallDialog.css';
import { AdminDialogButtons, AdminDialogForm, AdminDialogFormFields, AdminDialogLayout } from '../../../AdminDialogLayout/AdminDialogLayout';
import { api } from '../../../../../../utils/api/api';
import { IHall } from '../../../../../../utils/api/api.interfaces';
import { MutableRefObject, useEffect, useState } from 'react';

export interface IAddHallDialogContgroller {
    show: (params: IShowDialogParams) => void;
}

type TProps = {
    controllerRef: MutableRefObject<IAddHallDialogContgroller | undefined>
}

type TSate = {
    isVisible: boolean,
    halls?: IHall[],
} & IShowDialogParams

interface IShowDialogParams {
    onHallAdded: (halls: IHall[]) => void;
}

export function AddHallDialog({ controllerRef }: TProps) {

    const [state, setState] = useState<TSate>({
        isVisible: false,
        onHallAdded: () => { }
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
        if (state.halls) {
            state.onHallAdded(state.halls);
        }
    }, [state.halls])

    if (!state.isVisible) {
        return null;
    }

    const container = document.getElementById('dialog-container');

    return container
        ? createPortal(
            <AdminDialogLayout className="add-hall-dialog" headerText='Добавление Зала' onCloseClick={() => {
                setState({
                    ...state,
                    isVisible: false
                })
            }}>
                <AdminDialogForm id="add-hall-form">
                    <AdminDialogFormFields>
                        <div>
                            <label htmlFor="hallName">Название зала</label>
                            <input id="hallName" type="text" name="hallName" placeholder='Например, «Зал 1»' />
                        </div>
                    </AdminDialogFormFields>
                    <AdminDialogButtons>
                        <button className='button' type="button" onClick={() => {
                            const form = document.getElementById('add-hall-form');
                            if (!form) {
                                return;
                            }

                            const formData = new FormData(form as HTMLFormElement);

                            api.addHall(formData).then((result) => {
                                setState({
                                    ...state,
                                    isVisible: false,
                                    halls: result.halls
                                });
                            })
                        }}>Добавить зал</button>
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