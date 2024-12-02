import { MutableRefObject, useEffect, useState } from 'react';
import './ConfirmDialog.css';
import { AdminDialogButtons, AdminDialogLayout } from '../AdminDialogLayout/AdminDialogLayout';
import { createPortal } from 'react-dom';

export interface IConfirmDialogContgroller {
    show: (params: IShowDialogParams) => void;
}

type TProps = {
    controllerRef: MutableRefObject<IConfirmDialogContgroller | undefined>
}

type TSate = {
    isVisible: boolean,
    isConfirmed: boolean,
} & IShowDialogParams

interface IShowDialogParams {
    onOk: () => void,
    confirmText?: string
}

const DEFAULT_CONFIRM_TEXT = 'Подтвердить действие?'

export function ConfirmDialog({ controllerRef }: TProps) {

    const [state, setState] = useState<TSate>({
        isConfirmed: false,
        isVisible: false,
        confirmText: DEFAULT_CONFIRM_TEXT,
        onOk: () => { }
    })

    useEffect(() => {
        controllerRef.current = {
            show: (params) => {
                setState({
                    isConfirmed: false,
                    isVisible: true,
                    ...params,
                    confirmText: params.confirmText || DEFAULT_CONFIRM_TEXT
                });
            }
        }
    }, [controllerRef])

    useEffect(() => {
        if (state.isConfirmed) {
            state.onOk();
        }
    }, [state.isConfirmed])

    if (!state.isVisible) {
        return null;
    }

    const container = document.getElementById('dialog-container');

    return container
        ? createPortal(
            <AdminDialogLayout headerText='Предупреждение' onCloseClick={() => {
                setState({
                    ...state,
                    isVisible: false
                });
            }}>
                <div className='admin-dialog__confirm-text'>{state.confirmText}</div>
                <AdminDialogButtons>
                    <button className='button' type="button" onClick={() => {
                        setState({
                            ...state,
                            isVisible: false,
                            isConfirmed: true
                        });
                    }}>Ok</button>
                    <button className='button button_white' type="button" onClick={() => {
                        setState({
                            ...state,
                            isVisible: false
                        });
                    }}>Отмена</button>
                </AdminDialogButtons>
            </AdminDialogLayout>,
            container)
        : null
}