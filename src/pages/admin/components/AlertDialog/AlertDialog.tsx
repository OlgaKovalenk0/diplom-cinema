import { MutableRefObject, useEffect, useState } from 'react';
import './AlertDialog.css';
import { AdminDialogButtons, AdminDialogLayout } from '../AdminDialogLayout/AdminDialogLayout';
import { createPortal } from 'react-dom';

export interface IAlertDialogContgroller {
    show: (params: IShowDialogParams) => void;
}

type TProps = {
    controllerRef: MutableRefObject<IAlertDialogContgroller | undefined>
}

type TSate = {
    isVisible: boolean,
} & IShowDialogParams

interface IShowDialogParams {
    alertText: string
}

export function AlertDialog({ controllerRef }: TProps) {

    const [state, setState] = useState<TSate>({
        isVisible: false,
        alertText: ''
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

    if (!state.isVisible) {
        return null;
    }

    const container = document.getElementById('dialog-container');

    return container
        ? createPortal(
            <AdminDialogLayout headerText='Внимание' onCloseClick={() => {
                setState({
                    ...state,
                    isVisible: false
                });
            }}>
                <div className='admin-dialog__alert-text'>{state.alertText}</div>
                <AdminDialogButtons>
                    <button className='button' type="button" onClick={() => {
                        setState({
                            ...state,
                            isVisible: false
                        });
                    }}>Ok</button>                   
                </AdminDialogButtons>
            </AdminDialogLayout>,
            container)
        : null
}