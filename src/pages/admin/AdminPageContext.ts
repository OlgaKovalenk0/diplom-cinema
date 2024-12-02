import { createContext, MutableRefObject } from "react";
import { IConfirmDialogContgroller } from "./components/ConfirmDialog/ConfirmDialog";

interface IAdminPageContext {
    confirmDialogRef?: MutableRefObject<IConfirmDialogContgroller | undefined>
}

export const AdminPageContext = createContext<IAdminPageContext>({});