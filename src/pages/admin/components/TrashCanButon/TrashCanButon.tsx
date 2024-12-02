import { ButtonHTMLAttributes } from 'react'
import './TrashCanButon.css'
import classNames from 'classnames'

export function TrashCanButon({ className, ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={classNames('trash-can-button', className)} {...restProps}>
        <div></div>
    </button>
}