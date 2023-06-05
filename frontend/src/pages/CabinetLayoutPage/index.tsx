import React, { ReactNode, useEffect, useState } from "react";
import { Grid } from "../../UI";
import { CabinetOverlay } from '../../components/CabinetOverlay';
import { Header } from '../../components/Header';
import './CabinetLayoutPage.css'
import { useAuthUser } from "../../hooks/useAuthUser";

export const CabinetLayoutPage = ({ children }: { children: ReactNode }) => {
  const [screenSize, setScreenSize] = useState('');
  const {user} = useAuthUser()

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 600px)').matches) {
        setScreenSize('small');
      } else if (window.matchMedia('(min-width: 601px) and (max-width: 991px)').matches) {
        setScreenSize('medium');
      } else if (window.matchMedia('(min-width: 992px)').matches) {
        setScreenSize('large');
      }
    };

    handleResize(); // Вызываем функцию при первой загрузке компонента
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
        <>
            <Header />
            <Grid className='cabinetLayoutPageWrap' grid-indent='l'>
                <Grid.Item grid-item-width='2-10' className={user?.role !== 'admin'? 'cabinetLayoutPageWrap-overlay': 'admin'} grid-item-display={screenSize ==='large' ? 'block' : 'none'}>
                    <CabinetOverlay />
                </Grid.Item>
                <Grid.Item grid-item-width={screenSize === 'large' ? '6-10' : '1-1'}>{children}</Grid.Item>
            </Grid>
        </>
    );
};
