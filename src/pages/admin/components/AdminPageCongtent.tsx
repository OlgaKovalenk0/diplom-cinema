import { useEffect, useRef, useState } from "react"
import { AuthDialog, IAuthlDialogContgroller } from "./AuthDialog/AuthDialog";
import { AdminContent } from "./AdminContent/AdminContent";

export function AdminPageContent() {


    const [isAuthorized, setIsAuthorized] = useState(false);


    const authDialogControllerRef = useRef<IAuthlDialogContgroller>();

    useEffect(() => {
        if(!isAuthorized) {
            authDialogControllerRef.current?.show({
                onAuth: () => setIsAuthorized(true)
            })
        }

    },[isAuthorized])


    if(!isAuthorized) {
        return <AuthDialog controllerRef={authDialogControllerRef}/>
    }

    return <AdminContent/>
}