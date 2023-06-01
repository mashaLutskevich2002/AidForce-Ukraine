import React, { useEffect, useState } from 'react';
import { Collection } from '../CatalogCollectionsPage/types';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Button, ProgressBar } from 'react-bootstrap';
import { useAuthUser } from '../../hooks/useAuthUser';
import { Header } from '../../components/Header';
import { Box, Grid, Text } from '../../UI';
import { Picture } from '../../components/Picture';
import { GoogleMapUi } from '../../components/Map';

import './CollectionPage.css';
import { Link } from '@chakra-ui/react';

export const CollectionPage = () => {
    const [collection, setCollection] = useState<Collection>();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuthUser();

    const [screenSize, setScreenSize] = useState('');

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await axios.get(`/api/collection/${id}`);
                const collectionData = response.data;
                setCollection(collectionData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCollection();

        const handleResize = () => {
            if (window.matchMedia('(max-width: 600px)').matches) {
                setScreenSize('small');
            } else if (window.matchMedia('(min-width: 601px) and (max-width: 960px)').matches) {
                setScreenSize('medium');
            } else if (window.matchMedia('(min-width: 961px)').matches) {
                setScreenSize('large');
            }
        };

        handleResize(); // Вызываем функцию при первой загрузке компонента
        window.addEventListener('resize', handleResize); // Добавляем слушатель события изменения размера окна

        return () => {
            window.removeEventListener('resize', handleResize); // Удаляем слушатель при размонтировании компонента
        };
    }, []);

    if (!collection) {
        return null;
    }

    const hryvnia = Math.round(collection.collectedSum / 100);
    const collectedSum = collection.collectedSum ? `${hryvnia}` : `0`;
    const percent = Math.round((hryvnia / collection.amount) * 100) || 0;

    const isCurrentUserOwner = user?._id === collection.user.id;
    return (
        <>
            <Header />
            <Box className='wrap'>
                <h3 className='center m-auto w-100 mb-4'> {collection.title} </h3>
                {screenSize === 'large' && (
                    <Grid grid-indent='xl' grid-align='center'>
                        <Grid.Item grid-item-width='4-10'>
                            <Grid grid-column={1} grid-direction='column' grid-indent='l'>
                                <Grid.Item className='bgLight center'>
                                    <Picture
                                        src={collection.report ? collection.report.photoUrl : collection.picUrl}
                                        width='350px'
                                        height='350px'
                                    />
                                </Grid.Item>
                                <Grid.Item>
                                    <Box box-margin={['l', null, null, null]} box-padding='l' className='bgLight w-100'>
                                        <h4>Опис</h4>
                                        <Text>{collection.description}</Text>
                                    </Box>
                                </Grid.Item>
                            </Grid>

                            <GoogleMapUi location={collection.location} />
                        </Grid.Item>
                        {!collection.report && (
                            <Grid.Item grid-item-width='2-10'>
                                <Box className='bgLight radius' box-padding='xl'>
                                    <Grid grid-column={1} grid-direction='column' grid-indent='l'>
                                        <Grid.Item>
                                            <h5> Деталі </h5>
                                        </Grid.Item>
                                        <Grid.Item>
                                            <Grid grid-align='justify'>
                                                <Grid.Item>
                                                    <Text>Зібрано, грн</Text>
                                                </Grid.Item>
                                                <Grid.Item>
                                                    <Text className='weight_bold'>
                                                        {collectedSum}/{collection.amount}
                                                    </Text>
                                                </Grid.Item>
                                            </Grid>
                                        </Grid.Item>
                                        <Grid.Item>
                                            <ProgressBar
                                                variant={percent >= 50 ? 'success' : 'danger'}
                                                now={percent}
                                                animated
                                                label={`${percent}%`}
                                            />
                                        </Grid.Item>
                                        <Grid.Item>
                                            <Grid grid-column={1} grid-direction='column' grid-indent='xs'>
                                                <Grid.Item>
                                                    <Text>Організатор:</Text>
                                                </Grid.Item>
                                                <Grid.Item>
                                                    <Grid grid-indent='xs'>
                                                        <Grid.Item>
                                                            <Link
                                                                onClick={() =>
                                                                    navigate(`/company/${collection?.user.id}`)
                                                                }
                                                            >
                                                                <Picture
                                                                    roundedCircle
                                                                    width='30px'
                                                                    height='30px'
                                                                    src={collection.user.photoUrl}
                                                                />
                                                            </Link>
                                                        </Grid.Item>
                                                        <Grid.Item>
                                                            <Text>{collection.user.name}</Text>
                                                        </Grid.Item>
                                                        <Grid.Item>
                                                            <Text>{collection.user.last_name}</Text>
                                                        </Grid.Item>
                                                    </Grid>
                                                </Grid.Item>
                                                <Grid.Item>
                                                    <a href='tel:+380952472697' className='text-black'>
                                                        <i className='fas fa-phone'></i> {collection.user.phone}
                                                    </a>
                                                </Grid.Item>
                                            </Grid>
                                        </Grid.Item>

                                        <Grid.Item className='center'>
                                            <Button className='button w-100'>Допомогти</Button>
                                        </Grid.Item>
                                    </Grid>
                                </Box>
                                {isCurrentUserOwner && (
                                    <Button onClick={() => navigate(`/closeCollection/${collection?._id}`)}>
                                        Закрити збір
                                    </Button>
                                )}
                            </Grid.Item>
                        )}
                    </Grid>
                )}

                {screenSize === 'medium' && (
                    <Grid grid-indent='xl' grid-align='center' className='wrap'>
                        <Grid.Item>
                            <Grid grid-column={1} grid-direction='column' grid-indent='l'>
                                <Grid.Item className='bgLight center'>
                                    <Picture src={collection.picUrl} width='350px' height='350px' />
                                </Grid.Item>
                                <Grid.Item>
                                    <Box box-margin={['l', null, null, null]} box-padding='l' className='bgLight'>
                                        <h3>Опис</h3>
                                        <Text>{collection.description}</Text>
                                    </Box>
                                </Grid.Item>
                            </Grid>
                        </Grid.Item>
                        {!collection.report && (
                            <Grid.Item grid-item-width='5-10'>
                                <Box className='bgLight' box-padding='l'>
                                    <Grid grid-column={1} grid-direction='column' grid-indent='l'>
                                        <Grid.Item>
                                            <h3> {collection.title}</h3>
                                        </Grid.Item>

                                        <Grid.Item>
                                            <Button className='button'>Допомогти</Button>
                                        </Grid.Item>
                                    </Grid>
                                </Box>
                                <GoogleMapUi location={collection.location} />
                            </Grid.Item>
                        )}
                    </Grid>
                )}
            </Box>

            {/*<Grid grid-indent='xl' grid-align='center' className='wrap'>*/}
            {/*    <Grid.Item>*/}
            {/*        <Grid grid-column={1} grid-direction='column' grid-indent='l'>*/}
            {/*            <Grid.Item className='bgLight center'>*/}
            {/*                <Picture src={collection.picUrl} width='350px' height='350px' />*/}
            {/*            </Grid.Item>*/}
            {/*            <Grid.Item>*/}
            {/*                <Box box-margin={['l', null, null, null]} box-padding='l' className='bgLight'>*/}
            {/*                    <h3>Опис</h3>*/}
            {/*                    <Text>{collection.description}</Text>*/}
            {/*                </Box>*/}
            {/*            </Grid.Item>*/}
            {/*        </Grid>*/}
            {/*    </Grid.Item>*/}
            {/*    {!collection.report && (*/}
            {/*        <Grid.Item grid-item-width='5-10'>*/}
            {/*            <Box className='bgLight' box-padding='l'>*/}
            {/*                <Grid grid-column={1} grid-direction='column' grid-indent='l'>*/}
            {/*                    <Grid.Item>*/}
            {/*                        <h3> {collection.title}</h3>*/}
            {/*                    </Grid.Item>*/}

            {/*                    <Grid.Item>*/}
            {/*                        <Button className='button'>Допомогти</Button>*/}
            {/*                    </Grid.Item>*/}
            {/*                </Grid>*/}
            {/*            </Box>*/}
            {/*            <GoogleMapUi location={collection.location} />*/}
            {/*        </Grid.Item>*/}
            {/*    )}*/}
            {/*</Grid>*/}
        </>
    );
};
