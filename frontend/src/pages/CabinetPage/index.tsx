import React from 'react';
import { CabinetLayoutPage } from '../CabinetLayoutPage';
import { Outlet } from 'react-router';

export const CabinetPage = () => {
    return (
        <CabinetLayoutPage>
            <Outlet />
        </CabinetLayoutPage>
    );
};
