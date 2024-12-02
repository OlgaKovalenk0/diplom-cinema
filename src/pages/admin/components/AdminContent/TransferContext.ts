import { createContext } from "react";
import { IFilm, ISeance } from "../../../../utils/api/api.interfaces";

interface ITransferContext {
    filmToHall?: IFilm,
    seanceToTrash?: ISeance,
}

export const TransferContext = createContext<ITransferContext>({});