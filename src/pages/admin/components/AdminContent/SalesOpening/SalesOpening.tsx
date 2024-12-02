import { useEffect, useState } from 'react';
import { IHall } from '../../../../../utils/api/api.interfaces';
import './SalesOpening.css'
import { HallSelectionSection } from '../HallSelectionSection/HallSelectionSection';
import { api } from '../../../../../utils/api/api';

type TSalesOpeningProps = {
    halls: IHall[],
    onHallSave: (halls: IHall[]) => void;
}

export function SalesOpening({ halls, onHallSave }: TSalesOpeningProps) {

    const [activeHall, setActiveHall] = useState<IHall>();

    useEffect(() => {
        const currentHall = halls.find(hall => hall.id == activeHall?.id);
        setActiveHall(currentHall ?? halls[0]);
    }, [halls])

    return <div className='admin-sales-opening'>
        <HallSelectionSection
            halls={halls}
            activeHall={activeHall}
            onHallSelect={(hall) => {
                setActiveHall(hall);
            }}
            sectionHeaderText='Выбирите залл для открытия/закрытия продаж:'
        />
        {activeHall
            ? <>
                <div className='admin-sales-opening__hall-status'>{!activeHall.hall_open ? 'Всё готово к открытию' : 'Зал открыт!'}</div>
                <div className='admin-sales-opening__footer'>
                    <button className='button' onClick={() => {
                        api.changeHallStatus(activeHall.id, !activeHall.hall_open ? 1 : 0).then(data => {
                            onHallSave(data.halls);
                        })
                    }}>{`${activeHall.hall_open ? 'Приостановить' : 'Открыть'} продажу билетов`}</button>
                </div>
            </>
            : <div>Зал не выбран</div>}
    </div>
}