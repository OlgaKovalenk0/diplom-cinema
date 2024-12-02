import { useContext, useState } from 'react';
import { IFilm, IHall, ISeance } from '../../../../../../utils/api/api.interfaces';
import './Hall.css';
import { TransferContext } from '../../TransferContext';
import { IInternalSeance } from '../SeancesConfig';
import classNames from 'classnames';
import { AdminPageContext } from '../../../../AdminPageContext';
import { api } from '../../../../../../utils/api/api';

type THallProps = {
    hall: IHall,
    onFilmDrop: (film: IFilm) => void,
    seances: IInternalSeance[],
    onSeanceDelete: (seances: ISeance[]) => void
}

export function Hall({ hall, onFilmDrop, seances, onSeanceDelete }: THallProps) {

    const [seanceForDelete, setSeanceForDelete] = useState<IInternalSeance>();

    const transferContext = useContext(TransferContext);
    const adminContext = useContext(AdminPageContext);

    return <li>
        <div className='admin-seances-config__hall-name'>{hall.hall_name}</div>
        <ul className='admin-seances-config__hall-plan' onDrop={() => {
            if (!transferContext.filmToHall) {
                return;
            }
            onFilmDrop(transferContext.filmToHall);
        }} onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
        }}>
            {seances.map(seance => {
                return <li
                    title={seance.film_name}
                    key={seance.id}
                    style={{ flex: seance.film_duration }}>
                    <div
                        onDragStart={() => setSeanceForDelete(seance)}
                        onDragEnd={() => setSeanceForDelete(undefined)}
                        draggable
                        className={classNames({
                            'admin-seances-config__hall-plan-film': !seance.isInternal
                        })}>
                        <div>
                            <div>{seance.film_name}</div>
                        </div>
                    </div>
                    {!seance.isInternal && <span className='admin-seances-config__hall-plan-seance-time'>{seance.seance_time}</span>}
                </li>
            })}
            {seanceForDelete && <div
                onDrop={() => {
                    console.log(adminContext)
                    adminContext.confirmDialogRef?.current?.show({
                        confirmText: `Вы действительно хотите снять с просмотра фильм: "${seanceForDelete.film_name}"`,
                        onOk: () => {
                            api.deleteSeance(seanceForDelete.id)
                                .then((data) => onSeanceDelete(data.seances))                      }
                    })
                }} onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className='admin-seances-config__hall-plan-trashcan'></div>}
        </ul>
    </li>
}