import { useContext, useRef } from 'react';
import { IHall, ISeance } from '../../../../../utils/api/api.interfaces';
import { TrashCanButon } from '../../TrashCanButon/TrashCanButon';
import { AddHallDialog, IAddHallDialogContgroller } from './AddHallDialog/AddHallDialog';
import './Halls.css';
import { api } from '../../../../../utils/api/api';
import { TransferContext } from '../TransferContext';
import { AdminPageContext } from '../../../AdminPageContext';


type TProps = {
    halls: IHall[];
    onHallAction: (params: {
        halls: IHall[],
        seances?: ISeance[]
    }) => void;
}

export function Halls({ halls, onHallAction }: TProps) {

    const addHallDialogControllerRef = useRef<IAddHallDialogContgroller>();

    const adminContext = useContext(AdminPageContext);

    return <div className="admin-halls">
        <div>
            <div className='admin-halls__header'>Доступные залы:</div>
            {halls.length === 0
                ? <div>Залов пока нет</div>
                : <ul className='admin-halls__halls-list'>
                    {halls.map((hall) => <li key={hall.id}>
                        <span>– {hall.hall_name}</span>
                        <TrashCanButon onClick={() => {
                            adminContext.confirmDialogRef?.current?.show({
                                confirmText: 'Удалить зал?',
                                onOk: () => {
                                    api.deleteHall(hall.id).then((data) => onHallAction(data))
                                }
                            })
                            
                        }} />
                    </li>)}
                </ul>}
        </div>
        <button className='button admin-halls__craete-hall-button' onClick={() => {
            addHallDialogControllerRef.current?.show({
                onHallAdded: (halls) => onHallAction({ halls })
            });
        }}>Создать зал</button>
        <AddHallDialog controllerRef={addHallDialogControllerRef} />
    </div>
}
