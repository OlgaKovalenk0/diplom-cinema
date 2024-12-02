import { HTMLAttributes, PropsWithChildren } from 'react'
import './AdminContentSection.css'
import classNames from 'classnames';

type AdminContentSectionProps = {
    headerText: string;
} & HTMLAttributes<HTMLElement>


export function AdminContentSection({ children, headerText, className, ...restProps }: PropsWithChildren<AdminContentSectionProps>) {

    return <section className={classNames('admin-section', className)} {...restProps}>
        <div className='admin-section__header'>
            <div>{headerText}</div>
            <img src='/images/arrow.png' />
        </div>
        <div className='admin-section__body'>
            {children}
        </div>
    </section>
}