import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren, forwardRef } from 'react'
import './AdminDialogLayout.css'
import classNames from 'classnames';

type AdminDialogLayoutProps = {
    headerText: string;
    onCloseClick?: () => void;
} & HTMLAttributes<HTMLDivElement>


export function AdminDialogLayout({ children, headerText, onCloseClick, className, ...restProps }: PropsWithChildren<AdminDialogLayoutProps>) {
    return <div className='admin-dialog-overlay'>
        <div className={classNames(className, 'admin-dialog')} {...restProps}>
            <div className='admin-dialog__header'>
                <div>{headerText}</div>
                {onCloseClick ? <button onClick={() => {
                    onCloseClick()
                }}></button> : null}
            </div>
            <div className='admin-dialog__body'>
                {children}
            </div>
        </div>
    </div>
}

export function AdminDialogForm({ children, className, ...restProps }: PropsWithChildren<HTMLAttributes<HTMLFormElement>>) {
    return <form className={classNames(className, 'admin-dialog__form')} {...restProps}>
        {children}
    </form>
}

export function AdminDialogFormFields({ children, className, ...restProps }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    return <div className={classNames(className, 'admin-dialog__fields')} {...restProps}>
        {children}
    </div>
}

export function AdminDialogButtons({ children }: PropsWithChildren) {
    return <div className='admin-dialog__buttons'>
        {children}
    </div>
}