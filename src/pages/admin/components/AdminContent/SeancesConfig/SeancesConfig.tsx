import { IAllData, ISeance } from '../../../../../utils/api/api.interfaces'
import './SeancesConfig.css'
import { useRef } from 'react';
import { AddSeanceDialog, IAddSeanceDialogContgroller } from './AddSeanceDialog/AddSeanceDialog';
import { Hall } from './Hall/Hall';

type TProps = {
    data: IAllData;
    onSeanceAction: (seances: ISeance[]) => void;
}

export interface IInternalSeance extends ISeance {
    film_name: string;
    film_duration: number;
    isInternal?: boolean;
}

export function SeancesConfig({ data: { halls, films, seances }, onSeanceAction }: TProps) {

    const addSeanceDialogRef = useRef<IAddSeanceDialogContgroller>();

    return <ul className='admin-seances-config'>
        {halls.map(hall => {


            const halleances: IInternalSeance[] = [];

            const filteredSeances = seances.filter(seance => seance.seance_hallid == hall.id);
            filteredSeances.sort((a, b) => a.seance_time > b.seance_time ? 1 : a.seance_time < b.seance_time ? -1 : 0)

            let prevSeanceEnd = 0;

            for (let i = 0; i < filteredSeances.length; i++) {
                const seance = filteredSeances[i];

                const film = films.find(film => film.id == seance.seance_filmid)
                if (!film) {
                    continue;
                }

                const startTimeMinutes = seance.seance_time
                    .split(':')
                    .reduce((acc, curr, index) => acc + (index == 0 ? Number(curr) * 60 : Number(curr)), 0);

                halleances.push({
                    isInternal: true,
                    id: Math.random(),
                    seance_filmid: 0,
                    seance_hallid: 0,
                    seance_time: '',
                    film_name: '',
                    film_duration: startTimeMinutes - prevSeanceEnd
                });

                halleances.push({
                    ...seance,
                    film_name: film.film_name,
                    film_duration: film.film_duration
                });

                prevSeanceEnd = startTimeMinutes + film.film_duration
            }

            let lastDuratioon = 1440 - prevSeanceEnd;
            lastDuratioon = lastDuratioon < 0 ? 0 : lastDuratioon;

            halleances.push({
                isInternal: true,
                id: Math.random(),
                seance_filmid: 0,
                seance_hallid: 0,
                seance_time: '',
                film_name: '',
                film_duration: lastDuratioon
            });

            return <Hall
                key={hall.id}
                hall={hall}
                seances={halleances}
                onFilmDrop={(film) => {
                    addSeanceDialogRef.current?.show({
                        selectedFilm: film,
                        selectedHall: hall,
                        films,
                        halls,
                        onSeanceAdded: (seances) => {
                            onSeanceAction(seances);
                        }
                    })
                }}
                onSeanceDelete={(seances) => {
                    onSeanceAction(seances);
                }}
            />
        })}
        <AddSeanceDialog controllerRef={addSeanceDialogRef}/>
    </ul>
}