import React, { useEffect, useState } from 'react';
import { Grid } from '../../../UI';
import axios from 'axios';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { Collection } from '../../CatalogCollectionsPage/types';
import { Badge, Button, Spinner } from 'react-bootstrap';
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import '../CabinetLayoutPage.css';
import { AdminApplications } from '../../../components/AdminApllications';
import { CollectionItem } from './CollectionItem';

export const CabinetMainCollections = () => {
    const { user } = useAuthUser();
    const [collections, setCollections] = useState<Collection[]>();
    const [isLoading, setIsLoading] = useState(false);
    const fetchCollections = async () => {
        setIsLoading(true);
        try {
            // @ts-ignore
            const response = await axios.get(`http://localhost:5001/api/cabinet`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setCollections(response.data.collections);
        } catch (e) {
            console.log(e);
            // setError({ errorMessage: e ? e.response.data.message : undefined });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (user?.role !== 'admin') {
            fetchCollections();
        }
    }, []);

    if (user?.role === 'admin') {
        return <AdminApplications />;
    }

    return (
        <Grid grid-direction='column' grid-align='center' grid-valign='middle'>
            <h3> Мої збори </h3>
            {isLoading && <Spinner />}
            <div className='d-flex justify-content-center '>
                <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center '>
                    {collections &&
                        collections.map((item: Collection) => {
                            return (
                                <CollectionItem item={item} collections={collections} setCollections={setCollections} />
                            );
                        })}
                </div>
            </div>
        </Grid>
    );
};
