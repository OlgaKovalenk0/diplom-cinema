import './FilmList.css';
import { IAllData, ISeance } from '../../../../utils/api/api.interfaces';
import classNames from 'classnames';

type TProps = {
    selectedDate: Date,
    allData: IAllData,
    onSeanceSelect: (seance: ISeance) => void 
}

export function FilmList({ selectedDate, allData, onSeanceSelect }: TProps) {

        return <section className='films-list'>
        {allData.films.filter(film => allData.seances.some(seance => seance.seance_filmid == film.id)).map(film => {

            const filmSeanses = allData.seances
                .filter(seance => seance.seance_filmid == film.id)
                .sort((a, b) => a.seance_time > b.seance_time ? 1 : a.seance_time < b.seance_time ? -1 : 0)
            const filmHalls = allData.halls.filter(hall => filmSeanses.some(seance => seance.seance_hallid == hall.id));


            return <article className='films-list__film' key={film.id}>
                <div className='films-list__film-info'>
                    <img src={film.film_poster} />
                    <div className='films-list__film-text'>
                        <div className='films-list__film-name'>{film.film_name}</div>
                        <div className='films-list__film-description'>{film.film_description}</div>
                        <div className='films-list__film-duration-country'>
                            <div>{film.film_duration} минут</div>
                            <div>{film.film_origin}</div>
                        </div>
                    </div>
                </div>

                <ul className='films-list__halls'>
                    {filmHalls.map((hall) => <li key={hall.id} className='films-list__hall'>
                        <div className='films-list__hall-name'>{hall.hall_name}</div>
                        <ul className='films-list__hall-schedule'>
                            {filmSeanses.filter(seance => seance.seance_hallid == hall.id).map(seance => {

                                const compareDate = new Date(selectedDate);
                                const seanceMinutes = seance.seance_time.split(':').reduce((acc, cur, index) => acc + Number(cur) * (index == 0 ? 60 : 1), 0);
                                const isDead = new Date().getTime() > compareDate.setMinutes(compareDate.getMinutes() + seanceMinutes);

                                return <li
                                    key={seance.id}
                                    className={classNames('films-list__hall-schedule-seance', {
                                        'films-list__hall-schedule-seance_dead': isDead
                                    })}
                                    onClick={(e) => {
                                        if (isDead) {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        } else {
                                            onSeanceSelect(seance);
                                        }
                                    }}>
                                    {seance.seance_time}
                                </li>
                            })}
                        </ul>
                    </li>)}
                </ul>
            </article>
        })}
    </section>
}