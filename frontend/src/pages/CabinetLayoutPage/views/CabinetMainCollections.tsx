import React, { useEffect, useState } from 'react';
import { Grid } from '../../../UI';
import axios from 'axios';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { Collection } from '../../CatalogCollectionsPage/types';
import { Badge, Button, Spinner } from 'react-bootstrap';
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export const CabinetMainCollections = () => {
    const { user } = useAuthUser();
    const [collections, setCollections] = useState<Collection[]>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCollections = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:5001/api/cabinet`, {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                setCollections(response.data.collections);
            } catch (e: any) {
                console.log(e);
                // setError({ errorMessage: e ? e.response.data.message : undefined });
            }
            setIsLoading(false);
        };
        fetchCollections();
    }, []);

    return (
        <Grid grid-direction='column' grid-align='center' grid-valign='middle'>
            <Text> Мої збори </Text>
            {isLoading && <Spinner />}
            <div className='d-flex justify-content-center '>
                <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center width'>
                    {collections &&
                        collections.map((item: Collection) => {
                            const hryvnia = Math.floor(item.collectedSum / 100);
                            const kopiyka = item.collectedSum % 100;
                            const collectedSum = item.collectedSum ? `${hryvnia}.${kopiyka} грн` : `0 грн`;
                            return (
                                <div className={item.report ? 'col card center m-2 background' : 'col card center m-2'}>
                                    <div className='position-relative'>
                                        <img
                                            src={item.report ? item.report.photoUrl : item.picUrl}
                                            className='cardImg p-2'
                                            onClick={() => navigate(`/collection/${item._id}`)}
                                        />
                                        <Badge className='badge'>ЗСУ</Badge>

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
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </Grid>
    );
};
