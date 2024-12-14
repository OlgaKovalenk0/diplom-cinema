import classNames from 'classnames'
import { IHall, TSeatStatus } from '../../../../../../utils/api/api.interfaces'
import { AdminDialogFormFields } from '../../../AdminDialogLayout/AdminDialogLayout'
import './HallConfig.css'
import { createRef, useEffect, useState } from 'react'
import { createHallCopy } from './helpers'
import { api } from '../../../../../../utils/api/api'

type THallConfigProps = {
    hall: IHall,
    onHallSave: (hall: IHall) => void;
}

const placesLegendMap: [TSeatStatus, string][] = [
    ['standart', '— обычные кресла'],
    ['vip', '— VIP кресла'],
    ['disabled', '— заблокированные (нет кресла)']
]

const getNextSeatStatus = (seatStatus: TSeatStatus): TSeatStatus => {
    const statuses = placesLegendMap.map(([status, title]) => status);
    const index = statuses.findIndex(f => f == seatStatus);
    if (index == -1) {
        return seatStatus;
    }
    const nextIndex = index == 2 ? 0 : index + 1;
    return statuses[nextIndex];
}

export function HallConfig({ hall, onHallSave }: THallConfigProps) {

    const [hallState, setHallState] = useState(hall);

    const rowsInputRef = createRef<HTMLInputElement>();
    const placesInputRef = createRef<HTMLInputElement>();

    useEffect(() => {
        if (rowsInputRef.current) {
            rowsInputRef.current.value = hall.hall_rows.toString();
        }
        if (placesInputRef.current) {
            placesInputRef.current.value = hall.hall_places.toString();
        }
        setHallState(hall);
    }, [hall])

    return <>
        <div className='admin-halls-config__section'>
            <div className='admin-halls-config__section-header'>Укажите количество рядов и максимальное количество кресел в ряду:</div>
            <div>
                <AdminDialogFormFields className='admin-halls-config__fields'>
                    <div>
                        <label htmlFor="rows">Рядов, шт.</label>
                        <input ref={rowsInputRef} id="rows" type="number" name="rows" onChange={(event) => {
                            const numValue = Number(event.target.value);
                            if (!isNaN(numValue) && numValue > 0) {
                                const hallCopy = createHallCopy(hallState, { rows: numValue })
                                setHallState(hallCopy);
                            }
                        }} />
                    </div>
                    <span>x</span>
                    <div>
                        <label htmlFor="places">Мест, шт.</label>
                        <input ref={placesInputRef} id="places" type="number" name="places" onChange={(event) => {
                            const numValue = Number(event.target.value);
                            if (!isNaN(numValue) && numValue > 0) {
                                const hallCopy = createHallCopy(hallState, { places: numValue })
                                setHallState(hallCopy);
                            }
                        }} />
                    </div>
                </AdminDialogFormFields>
            </div>
        </div>
        <div className='admin-halls-config__section'>
            <div className='admin-halls-config__section-header'>Теперь вы можете указать типы кресел на схеме зала:</div>
            <div className='admin-hall-config__hall-content'>
                <div className='admin-hall-config__hall-legend'>
                    {placesLegendMap.map(([status, name]) => <div
                        key={status}
                    >
                        <div className={`admin-hall-config__place admin-hall-config__place_${status}`}></div>
                        <div>{name}</div>
                    </div>)}
                </div>
                <div>Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</div>
                <div>
                    <div className='admin-hall-config__hall-plan'>
                        <div className='admin-hall-config__hall-plan-screen'>ЭКРАН</div>
                        <div className='admin-hall-config__hall-plan-places'>
                            {hallState.hall_config.map((row, rowIndex) => <div key={rowIndex}>
                                {row.map((place, placeIndex) => <div
                                    className={classNames('admin-hall-config__place', {
                                        'admin-hall-config__place_standart': place == 'standart',
                                        'admin-hall-config__place_vip': place == 'vip',
                                        'admin-hall-config__place_disabled': place == 'disabled'
                                    })}
                                    key={`${rowIndex}${placeIndex}`}
                                    onClick={() => {
                                        const hallStr = JSON.stringify(hallState);
                                        const hallCopy: IHall = JSON.parse(hallStr);
                                        hallCopy.hall_config[rowIndex][placeIndex] = getNextSeatStatus(place);
                                        setHallState(hallCopy);
                                    }}
                                ></div>)}
                            </div>)}
                        </div>
                    </div>
                </div>
                <div className='admin-hall-config__footer'>
                    <button className='button' onClick={() => {
                        api.saveHallConfig(hallState.id, hallState.hall_rows, hallState.hall_places, hallState.hall_config)
                            .then((hall) => {
                                onHallSave(hall);
                            })
                    }}>СОХРАНИТЬ</button>
                </div>
            </div>
        </div>
    </>
}