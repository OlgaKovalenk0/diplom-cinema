import { Component, ErrorInfo, MutableRefObject, PropsWithChildren, useRef } from 'react';
import { Layout } from './components/Layout/Layout';
import './AdminPage.css';
import { AdminPageContext } from './AdminPageContext';
import { AdminPageContent } from './components/AdminPageCongtent';
import { ConfirmDialog, IConfirmDialogContgroller } from './components/ConfirmDialog/ConfirmDialog';
import { AlertDialog, IAlertDialogContgroller } from './components/AlertDialog/AlertDialog';

export const alertControllerRef: MutableRefObject<IAlertDialogContgroller | undefined> = { current: undefined };

export function AdminPage() {

    const confirmDialogRef = useRef<IConfirmDialogContgroller>()

    return <Layout>
        <AdminPageContext.Provider value={{
            confirmDialogRef
        }}>
            <AdminPageContent />
            <ConfirmDialog controllerRef={confirmDialogRef} />
            <AlertDialog controllerRef={alertControllerRef} />
        </AdminPageContext.Provider>
    </Layout>
}