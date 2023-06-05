import React from 'react';
import { Grid, Line, Link } from "../../UI";
import { useNavigate } from 'react-router';
import  { useLocation } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import './CabinetOverlay.css'

export const CabinetOverlay = () => {
    const { user } = useAuthUser();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Grid grid-direction='column' grid-indent='l' className='overlay'>
            <Grid.Item>
                {user?.role === 'admin' ? (
                    <Link
                        onClick={() => navigate('/cabinet/adminApplications')}
                    >
                      <span className={location.pathname === '/cabinet/adminApplications' ? 'danger' : 'link-dark'}>
                      <i className="fas fa-file-alt"  style={{marginRight: '10px'}}></i>
                        Заявки
                      </span>
                    </Link>
                ) : (
                    <Link

                        onClick={() => navigate('/cabinet/collections')}
                    >
                      <span  className={location.pathname === '/cabinet/collections' ? 'danger' : 'link-dark'}>
                      <i className="fas fa-shopping-basket"  style={{marginRight: '10px'}}></i>
                        Мої збори
                        </span>
                    </Link>
                )}
            </Grid.Item>
          <Line/>
            <Grid.Item>
                <Link

                    onClick={() => navigate('/cabinet/setupProfile')}
                >
                  <span  className={location.pathname === '/cabinet/setupProfile' ? 'danger' : 'link-dark'}>
                  <i className="fas fa-cog"  style={{marginRight: '10px'}}></i>
                    Налаштування профілю
                    </span>
                </Link>
            </Grid.Item>
            {user?.role !== 'admin' && (
              <>
              <Line/>
                <Grid.Item>
                    <Link

                        onClick={() => navigate('/cabinet/applications')}
                    >
                      <span  className={location.pathname === '/cabinet/applications' ? 'danger' : 'link-dark'}>
                      <i className="fas fa-file-alt" style={{marginRight: '10px'}}></i>
                        Мої заявки
                      </span>
                    </Link>
                </Grid.Item>
              </>
            )}
        </Grid>
    );
};
