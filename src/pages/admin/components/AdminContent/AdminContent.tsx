import { createContext, useEffect, useRef, useState } from 'react'
import { AdminContentSection } from '../AdminContentSection/AdminContentSection'
import './AdminContent.css'
import { Halls } from './Halls/Halls'
import { api } from '../../../../utils/api/api'
import { IAllData } from '../../../../utils/api/api.interfaces'
import { HallsConfig } from './HallsConfig/HallsConfig'
import { PriceConfig } from './PriceConfig/PriceConfig'
import { getNewAllDataByHall } from './helpers'
import { SalesOpening } from './SalesOpening/SalesOpening'
import { FilmsManager } from './FilmsManager/FilmsManager'
import { SeancesConfig } from './SeancesConfig/SeancesConfig'
import { TransferContext } from './TransferContext'

export function AdminContent() {

    const [allData, setAllData] = useState<IAllData>()

    useEffect(() => {
        api.getAllData().then(data => {
            setAllData(data);
        })
    }, [])

    if (!allData) {
        return null;
    }

    return <main>
        <AdminContentSection headerText='Управление залами'>
            <Halls halls={allData.halls} onHallAction={(data) => {
                setAllData({
                    films: allData.films,
                    seances: data.seances ?? allData.seances,
                    halls: data.halls
                })
            }} />
        </AdminContentSection>
        <AdminContentSection headerText='Конфигурация залов'>
            <HallsConfig
                halls={allData.halls}
                onHallSave={(savedHall) => {
                    setAllData(getNewAllDataByHall(savedHall, allData))
                }} />
        </AdminContentSection>
        <AdminContentSection headerText='Конфигурация цен'>
            <PriceConfig
                halls={allData.halls}
                onHallSave={(savedHall) => {
                    setAllData(getNewAllDataByHall(savedHall, allData))
                }} />
        </AdminContentSection>
        <AdminContentSection headerText='Сетка сеансов' className='admin-seances'>
            <TransferContext.Provider value={{}}>
                <FilmsManager films={allData.films} onFilmAction={(data) => {
                    setAllData({
                        films: data.films,
                        seances: data.seances ?? allData.seances,
                        halls: allData.halls
                    })
                }} />
                <SeancesConfig data={allData} onSeanceAction={(seances) => {
                    setAllData({
                        films: allData.films,
                        seances: seances ?? allData.seances,
                        halls: allData.halls
                    })
                }} />
            </TransferContext.Provider>
        </AdminContentSection>
        <AdminContentSection headerText='Открыть продажи'>
            <SalesOpening
                halls={allData.halls}
                onHallSave={(halls) => {
                    setAllData({
                        films: allData.films,
                        seances: allData.seances,
                        halls
                    })
                }} />
        </AdminContentSection>
    </main>
}