import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Collection, Collections } from './types';
import { Badge, Button, Pagination } from 'react-bootstrap';
import './CatalogCollectionStyle.css';
import { Text } from '@chakra-ui/react';
import { Grid, Box } from '../../UI';
import { useNavigate } from 'react-router';
import Paginator from '../../components/Paginator';

export const CatalogCollectionsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [collections, setCollections] = useState<Collections>();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/collections?page=${currentPage}&limit=10`);
                const collectionsData = response.data;
                setCollections(collectionsData);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCollections();
    }, [currentPage]);
    if (!collections) {
        return null;
    }
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const { militaryCollections, nonMilitaryCollections } = collections as Collections;

    return (
        <Grid grid-column={1} grid-align='center'>
            <Grid.Item>
                <Text textAlign='center'>Пріорітетні збори</Text>
            </Grid.Item>

            <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 containerCollections'>
                {militaryCollections &&
                    militaryCollections.map((item: Collection) => {
                        return (
                            <div className='col card center m-2'>
                                <div className='position-relative'>
                                    <img
                                        src={item.picUrl}
                                        className='cardImg p-2'
                                        onClick={() => navigate(`/collection/${item._id}`)}
                                    />
                                    <Badge className='badge'>ЗСУ</Badge>

                                    <div className='card-body'>
                                        <Text className='title' onClick={() => navigate(`/collection/${item._id}`)}>
                                            {item.title}
                                        </Text>
                                        <Text>Вже зібрано {item.collectedSum}</Text>
                                        <p className='card-text'>{item.amount} грн</p>
                                        <Button href={item.monoBankaUrl}>Допомогти</Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <Grid.Item>
                <Box box-align='center'>
                    <Text>Всі збори</Text>
                </Box>
            </Grid.Item>

            <div className='d-flex justify-content-center '>
                <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center width'>
                    {nonMilitaryCollections &&
                        nonMilitaryCollections.map((item: Collection) => {
                            return (
                                <div className='col card center m-2'>
                                    <div className='position-relative'>
                                        <img
                                            src={item.picUrl}
                                            className='cardImg p-2'
                                            onClick={() => navigate(`/collection/${item._id}`)}
                                        />
                                        <Badge className='badge yellow'>Влт</Badge>
                                        <div className='card-body'>
                                            <Text className='title' onClick={() => navigate(`/collection/${item._id}`)}>
                                                {item.title}
                                            </Text>
                                            <Text>Вже зібрано {item.collectedSum}</Text>
                                            <p className='card-text'>{item.amount} грн</p>
                                            <Button href={item.monoBankaUrl}>Допомогти</Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Grid>
    );
};
