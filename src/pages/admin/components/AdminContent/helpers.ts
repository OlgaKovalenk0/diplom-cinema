import { IAllData, IHall, TSeatStatus } from "../../../../utils/api/api.interfaces";

export const createHallCopy = (hall: IHall, size?: { rows?: number, places?: number }): IHall => {
    const hallCopy: IHall = JSON.parse(JSON.stringify(hall));
    hallCopy.hall_rows = size?.rows ?? hallCopy.hall_rows;
    hallCopy.hall_places = size?.places ?? hallCopy.hall_places;
    hallCopy.hall_config = [];
    for (var i = 0; i < hallCopy.hall_rows; i++) {
        const row: TSeatStatus[] = [];
        for (var j = 0; j < hallCopy.hall_places; j++) {
            row.push('standart');
        }
        hallCopy.hall_config.push(row);
    }
    return hallCopy;
}

export const getNewAllDataByHall = (hall: IHall, allData: IAllData): IAllData => {
    const index = allData.halls.findIndex(h => h.id == hall.id);
    const newHalls = [...allData.halls];
    if (index == -1) {
        newHalls.push(hall)
    } else {
        newHalls[index] = hall;
    }
    return {
        films: allData.films,
        seances: allData.seances,
        halls: newHalls
    }
}