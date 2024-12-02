import { createRef, useEffect, useState } from 'react';
import { IHall } from '../../../../../utils/api/api.interfaces';
import './PriceConfig.css';
import { HallSelectionSection } from '../HallSelectionSection/HallSelectionSection';
import { AdminDialogFormFields } from '../../AdminDialogLayout/AdminDialogLayout';
import { api } from '../../../../../utils/api/api';

type TPriceConfigProps = {
    halls: IHall[],
    onHallSave: (hall: IHall) => void;
}

export function PriceConfig({ halls, onHallSave }: TPriceConfigProps) {

    const [activeHall, setActiveHall] = useState<IHall>();

    useEffect(() => {
        const currentHall = halls.find(hall => hall.id == activeHall?.id);
        setActiveHall(currentHall ?? halls[0]);
    }, [halls])

    const priceStandartInputRef = createRef<HTMLInputElement>();
    const priceVipInputRef = createRef<HTMLInputElement>();

    useEffect(() => {
        if (activeHall) {
            if (priceStandartInputRef.current) {
                priceStandartInputRef.current.value = activeHall.hall_price_standart.toString();
            }
            if (priceVipInputRef.current) {
                priceVipInputRef.current.value = activeHall.hall_price_vip.toString();
            };
        }
    }, [activeHall])

    return <div className='admin-price-config'>
        <HallSelectionSection
            halls={halls}
            activeHall={activeHall}
            onHallSelect={(hall) => {
                setActiveHall(hall);
            }}
            sectionHeaderText='Выберите зал для конфигурации:'
        />
        {activeHall
            ? <div className='admin-price-config__section'>
                <div className='admin-price-config__section-header'>Установите цены для типов кресел:</div>
                <div>
                    <AdminDialogFormFields className='admin-price-config__fields'>
                        <div>
                            <label htmlFor="priceStandart">Цена, рублей</label>
                            <div>
                                <input ref={priceStandartInputRef} id="priceStandart" type="number" name="priceStandart" />
                                <span>за</span>
                                <div className='admin-hall-config__place admin-hall-config__place_standart'></div>
                                <span>обычные кресла</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="priceVip">Цена, рублей</label>
                            <div>
                                <input ref={priceVipInputRef} id="priceVip" type="number" name="priceVip" />
                                <span>за</span>
                                <div className='admin-hall-config__place admin-hall-config__place_vip'></div>
                                <span>VIP кресла</span>
                            </div>

                        </div>
                    </AdminDialogFormFields>
                    {activeHall && <div className='admin-price-config__footer'>
                        <button className='button' onClick={() => {
                            const priceStandartNum = Number(priceStandartInputRef.current?.value);
                            if (!priceStandartNum) {
                                return;
                            }
                            const priceVipNum = Number(priceVipInputRef.current?.value);
                            if (!priceVipNum) {
                                return;
                            }

                            api.savePriceConfig(activeHall.id, priceStandartNum, priceVipNum)
                                .then((hall) => {
                                    onHallSave(hall);
                                })
                        }}>СОХРАНИТЬ</button>
                    </div>}
                </div>
            </div>
            : <div>Зал не выбран</div>}
    </div>
}