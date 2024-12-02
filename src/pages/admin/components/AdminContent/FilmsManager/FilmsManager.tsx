import { useContext, useRef } from 'react';
import { IFilm, ISeance } from '../../../../../utils/api/api.interfaces';
import { TrashCanButon } from '../../TrashCanButon/TrashCanButon';
import './FilmsManager.css';
import { AddFilmDialog, IAddFilmDialogContgroller } from './AddFilmDialog/AddFilmDialog';
import { api } from '../../../../../utils/api/api';
import { TransferContext } from '../TransferContext';
import { AdminPageContext } from '../../../AdminPageContext';

type TProps = {
    films: IFilm[];
    onFilmAction: (params: {
        films: IFilm[],
        seances?: ISeance[]
    }) => void;
}

export function FilmsManager({ films, onFilmAction }: TProps) {

    const addFilmDialogController = useRef<IAddFilmDialogContgroller>();

    const transferContext = useContext(TransferContext);
    const adminContext = useContext(AdminPageContext);

    return <div className='admin-films-manager'>
        <div>
            <button className='button' onClick={() => {
                addFilmDialogController.current?.show({
                    onFilmAdded: (films) => onFilmAction({ films })
                })
            }}>Добавить фильм</button>
        </div>
        <ul className='admin-films-manager__films-list'>
            {films.map(film => <li
                key={film.id}
                draggable
                className='admin-films-manager__film'
                onDragStart={(e) => {
                    transferContext.filmToHall = film;
                }}
                onDragEnd={(e) => {
                    transferContext.filmToHall = undefined;
                }}>
                <div className='admin-films-manager__film-poster'>
                    <img src={film.film_poster} />
                </div>
                <div className='admin-films-manager__film-info'>
                    <div className='admin-films-manager__film-name'>{film.film_name}</div>
                    <div className='admin-films-manager__film-duration'>{film.film_duration} минут</div>
                </div>
                <TrashCanButon onClick={() => {
                    adminContext.confirmDialogRef?.current?.show({
                        confirmText: 'Удалить фильм?',
                        onOk: () => {
                            api.deleteFilm(film.id).then((data) => {
                                onFilmAction(data);
                            })
                        }
                    })                    
                }} />
            </li>)}
        </ul>
        <AddFilmDialog controllerRef={addFilmDialogController}/>
    </div>
}