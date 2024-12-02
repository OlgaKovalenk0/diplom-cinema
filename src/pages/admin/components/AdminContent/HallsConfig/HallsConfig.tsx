import { useEffect, useState } from 'react';
import { IHall } from '../../../../../utils/api/api.interfaces';
import './HallsConfig.css';
import classNames from 'classnames';
import { HallConfig } from './HallConfig/HallConfig';
import { HallSelectionSection } from '../HallSelectionSection/HallSelectionSection';

type THallsConfigProps = {
    halls: IHall[],
    onHallSave: (hall: IHall) => void;
}

export function HallsConfig({ halls, onHallSave }: THallsConfigProps) {

    const [activeHall, setActiveHall] = useState<IHall>();

    useEffect(() => {
        const currentHall = halls.find(hall => hall.id == activeHall?.id);
        setActiveHall(currentHall ?? halls[0]);
    }, [halls])

    return <div className='admin-halls-config'>
        <HallSelectionSection
            halls={halls}
            activeHall={activeHall}
            onHallSelect={(hall) => {
                setActiveHall(hall);
            }}
            sectionHeaderText='Выберите зал для конфигурации:'
        />
        {activeHall
            ? <HallConfig hall={activeHall} onHallSave={(hall) => {
                onHallSave(hall);
            }} />
            : <div>Зал не выбран</div>}
    </div>
}