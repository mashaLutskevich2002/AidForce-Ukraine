import React, { ReactNode } from 'react';
import { Grid } from '../../UI';
import { CabinetOverlay } from '../../components/CabinetOverlay';
import { Header } from '../../components/Header';

export const CabinetLayoutPage = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <Grid grid-column={2} className='wrap'>
                <Grid.Item grid-item-width='1-5'>
                    <CabinetOverlay />
                </Grid.Item>
                <Grid.Item grid-item-width='expend'>{children}</Grid.Item>
            </Grid>
        </>
    );
};
