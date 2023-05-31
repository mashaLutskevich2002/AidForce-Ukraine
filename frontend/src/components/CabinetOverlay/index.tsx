import React from 'react';
import { Grid, Link } from '../../UI';
import { useNavigate } from 'react-router';
import RouteMatch, { useLocation } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';

interface CabinetOverlayProps {}
export const CabinetOverlay = ({}: CabinetOverlayProps) => {
    const { user } = useAuthUser();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Grid grid-direction='column' grid-indent='m'>
            <Grid.Item>
                {user?.role === 'admin' ? (
                    <Link
                        className={location.pathname === '/cabinet/adminApplications' ? 'link-danger' : 'link-dark'}
                        onClick={() => navigate('/cabinet/adminApplications')}
                    >
                        Заявки
                    </Link>
                ) : (
                    <Link
                        className={location.pathname === '/cabinet/collections' ? 'link-danger' : 'link-dark'}
                        onClick={() => navigate('/cabinet/collections')}
                    >
                        Мої збори
                    </Link>
                )}
            </Grid.Item>
            <Grid.Item>
                <Link
                    className={location.pathname === '/cabinet/setupProfile' ? 'link-danger' : 'link-dark'}
                    onClick={() => navigate('/cabinet/setupProfile')}
                >
                    Налаштування профілю
                </Link>
            </Grid.Item>
            {user?.role !== 'admin' && (
                <Grid.Item>
                    <Link
                        className={location.pathname === '/cabinet/applications' ? 'link-danger' : 'link-dark'}
                        onClick={() => navigate('/cabinet/applications')}
                    >
                        Мої заявки
                    </Link>
                </Grid.Item>
            )}
        </Grid>
    );
};
