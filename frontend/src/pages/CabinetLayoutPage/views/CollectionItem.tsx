import * as React from 'react';
import { Collection } from '../../CatalogCollectionsPage/types';
import { Badge, Button, Spinner } from 'react-bootstrap';
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useAuthUser } from '../../../hooks/useAuthUser';
interface CollectionItemProps {
    item: Collection;
    collections: Collection[];
    setCollections: (collection: Collection[]) => void;
}

export const CollectionItem = ({ item, collections, setCollections }: CollectionItemProps) => {
    const { user } = useAuthUser();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const hryvnia = Math.floor(item.collectedSum / 100);
    const kopiyka = item.collectedSum % 100;
    const collectedSum = item.collectedSum ? `${hryvnia}.${kopiyka} грн` : `0 грн`;
    const removeCollection = async () => {
        setIsLoading(true);
        try {
            await axios.delete(
                `/api/collection/delete/${item._id}`,
                // @ts-ignore
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${user?.token}`,
                    },
                },
            );
            const arr = (prevCollections: Collection[]) =>
                prevCollections.filter((collection) => collection._id !== item._id);
            setCollections(arr(collections));
            // @ts-ignore
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className={item.report ? 'col card center m-2 background' : 'col card center m-2'}>
            <div className='position-relative'>
                <img
                    src={item.report ? item.report.photoUrl : item.picUrl}
                    className='cardImg p-2'
                    onClick={() => navigate(`/collection/${item._id}`)}
                />
                <Badge className='badge' bg={item.user.role == 'military' ? 'success' : 'warning'}>
                    {item.user.role === 'military' ? 'ЗСУ' : 'Волонтер'}
                </Badge>

                <div className='card-body'>
                    <Text className='title' onClick={() => navigate(`/collection/${item._id}`)}>
                        {item.title}
                    </Text>
                    <Text>Вже зібрано {collectedSum}</Text>
                    <p className='card-text'>{item.amount}</p>
                    {item.report ? (
                        <Button disabled> Зібрано </Button>
                    ) : (
                        <Button href={item.monoBankaUrl}>Допомогти</Button>
                    )}
                    <Button onClick={() => navigate(`/closeCollection/${item?._id}`)}>Закрити збір</Button>
                    <Button onClick={removeCollection}>Видалити збір</Button>
                </div>
            </div>
        </div>
    );
};
