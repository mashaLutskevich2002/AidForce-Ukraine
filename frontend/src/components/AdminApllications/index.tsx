import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Spinner } from 'react-bootstrap';
import { Grid } from '../../UI';

import { Application } from '../../pages/CatalogCollectionsPage/types';
import { useAuthUser } from '../../hooks/useAuthUser';

import './AdminApllications.css';
import { ItemApplication } from './views/ItemApplication';

export const AdminApplications = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthUser();
    const [applications, setApplications] = useState<Application[]>();

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            // @ts-ignore
            const response = await axios.get(`/api/application/getApplications`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setApplications(response.data.applications);
        } catch (e) {
            console.log(e);
            // setError({ errorMessage: e ? e.response.data.message : undefined });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <Grid grid-direction='column' grid-align='center' grid-valign='middle'>
            <h2> Заявки </h2>
            {isLoading && <Spinner />}
            {applications &&
                applications.map((item: Application) => {
                    return <ItemApplication item={item} />;
                })}
        </Grid>
    );
};
