import { Children, MutableRefObject, useEffect, useState } from 'react';
import { AdminDialogButtons, AdminDialogForm, AdminDialogFormFields, AdminDialogLayout } from '../AdminDialogLayout/AdminDialogLayout';
import './AuthDialog.css';
import { createPortal } from 'react-dom';
import { api } from '../../../../utils/api/api';

export interface IAuthlDialogContgroller {
    show: (params: IShowDialogParams) => void;
}

type TProps = {
    controllerRef: MutableRefObject<IAuthlDialogContgroller | undefined>
}

type TSate = {
    isVisible: boolean,
    isAuthorized: boolean
} & IShowDialogParams

interface IShowDialogParams {
    onAuth: () => void;
}

export function AuthDialog({ controllerRef }: TProps) {

    const [state, setState] = useState<TSate>({
        isVisible: false,
        isAuthorized: false,
        onAuth: () => { }
    })

    useEffect(() => {
        controllerRef.current = {
            show: (params) => {
                setState({
                    isAuthorized: false,
                    isVisible: true,
                    ...params
                });
            }
        }
    }, [controllerRef])

    useEffect(() => {
        if (state.isAuthorized) {
            state.onAuth();
        }
    }, [state.isAuthorized])

    if (!state.isVisible) {
        return null;
    }

    const container = document.getElementById('dialog-container');

    return container
        ? createPortal(
            <AdminDialogLayout headerText='Авторизация' className='auth-dialog'>
                <AdminDialogForm id="auth-dialog-form">
                    <AdminDialogFormFields>
                        <div>
                            <label htmlFor="login">E-mail</label>
                            <input id="login" name="login" type="text" placeholder='example@domain.ru' />
                        </div>
                        <div>
                            <label htmlFor="password">Пароль</label>
                            <input type="password" name="password"/>
                        </div>
                    </AdminDialogFormFields>
                    <AdminDialogButtons>
                        <button className='button' type="button" onClick={() => {

                            const form = document.getElementById('auth-dialog-form');
                            if (!form) {
                                return;
                            }

                            const formData = new FormData(form as HTMLFormElement);

                            api.login(formData).then(() => {
                                setState({
                                    ...state,
                                    isVisible: false,
                                    isAuthorized: true
                                })
                            })

                        }}>Авторизоваться</button>
                    </AdminDialogButtons>
                </AdminDialogForm>
            </AdminDialogLayout>,
            container)
        : null
}