import classNames from 'classnames';
import { IHall } from '../../../../../utils/api/api.interfaces';
import './HallSelectionSection.css';

type HallSelectionSectionProps = {
    halls: IHall[],
    onHallSelect: (hall: IHall) => void,
    activeHall?: IHall,
    sectionHeaderText: string
}

export function HallSelectionSection({ halls, onHallSelect, activeHall, sectionHeaderText }: HallSelectionSectionProps) {
    return <div className='admin-halls-config__section'>
        <div className='admin-halls-config__section-header'>{sectionHeaderText}</div>
        <div>
            <ul className='admin-halls-selection__halls-list'>
                {halls.map((hall) => <li key={hall.id} className={classNames('admin-halls-selection__hall', {
                    'admin-halls-selection__hall_active': hall.id == activeHall?.id
                })}>
                    <button className={classNames('button', {
                        'button_grey': hall.id != activeHall?.id,
                        'button_white': hall.id == activeHall?.id
                    })} onClick={() => {
                        onHallSelect(hall);
                    }}>{hall.hall_name}</button>
                </li>)}
            </ul>
        </div>
    </div>
}