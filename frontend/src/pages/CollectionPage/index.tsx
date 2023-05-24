import React, { useEffect, useState } from 'react';
import { Collection } from '../CatalogCollectionsPage/types';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useAuthUser, User } from '../../hooks/useAuthUser';

export const CollectionPage = () => {
    const [collection, setCollection] = useState<Collection>();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuthUser();

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/collection/${id}`);
                const collectionData = response.data;
                setCollection(collectionData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCollection();
    }, []);
    if (!collection) {
        return null;
    }

    const isCurrentUserOwner = user?._id === collection.user.id;
    return (
        <p>
            <Button href={collection.monoBankaUrl}></Button>
            {collection._id} {collection.title}
            {isCurrentUserOwner && !collection.report && (
                <Button onClick={() => navigate(`/closeCollection/${collection?._id}`)}>Закрити збір</Button>
            )}
            {collection.report && <Button disabled> Збір Закрит </Button>}
        </p>
    );
};
