import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Collection, Collections } from './types';
import { Badge, Button, Form, InputGroup, Pagination } from 'react-bootstrap';
import './CatalogCollectionStyle.css';
import { Text, VStack } from '@chakra-ui/react';
import { Grid, Box } from '../../UI';
import { useNavigate } from 'react-router';
import Paginator from '../../components/Paginator';
import { Header } from '../../components/Header';
import { isEmpty } from '../../utils/isEmpty';
import { useLocation } from 'react-router-dom';

export const CatalogCollectionsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [collections, setCollections] = useState<Collections>();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get(`/api/collections`, {
                    params: {
                        page: currentPage,
                        search_term: searchQuery,
                    },
                });
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
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/collections`, {
                params: {
                    page: currentPage,
                    search_term: searchQuery,
                },
            });
            setCollections(response.data);
            setTotalPages(response.data.totalPages);
            setCurrentPage(1);
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('search_term', searchQuery);
            searchParams.set('page', '1');
            if (Boolean(searchQuery)) {
                navigate({ search: searchParams.toString() });
            } else {
                navigate('/catalogCollections');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <Box>
                <Box className='search'>
                    <InputGroup className='mb-3'>
                        <Form.Control
                            placeholder='Шукаю..'
                            type='text'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                    <Button onClick={handleSearch}>Пошук</Button>
                </Box>
                <Grid.Item>
                    <Text textAlign='center'>Пріорітетні збори</Text>
                </Grid.Item>
                <div className='d-flex justify-content-center '>
                    <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 containerCollections'>
                        {militaryCollections &&
                            militaryCollections.map((item: Collection) => {
                                const hryvnia = Math.floor(item.collectedSum / 100);
                                const kopiyka = item.collectedSum % 100;
                                const collectedSum = item.collectedSum ? `${hryvnia}.${kopiyka} грн` : `0 грн`;
                                return (
                                    <div
                                        className={
                                            item.report ? 'col card center m-2 background' : 'col card center m-2'
                                        }
                                    >
                                        <div className='position-relative'>
                                            <img
                                                src={item.report ? item.report.photoUrl : item.picUrl}
                                                className='cardImg p-2'
                                                onClick={() => navigate(`/collection/${item._id}`)}
                                            />
                                            <Badge className='badge'>ЗСУ</Badge>

                                            <div className='card-body'>
                                                <Text
                                                    className='title'
                                                    onClick={() => navigate(`/collection/${item._id}`)}
                                                >
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

                <Grid.Item>
                    <Box box-align='center'>
                        <Text>Всі збори</Text>
                    </Box>
                </Grid.Item>

                <div className='d-flex justify-content-center '>
                    <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center width'>
                        {nonMilitaryCollections &&
                            nonMilitaryCollections.map((item: Collection) => {
                                const hryvnia = Math.floor(item.collectedSum / 100);
                                const kopiyka = item.collectedSum % 100;
                                const collectedSum = item.collectedSum ? `${hryvnia}.${kopiyka} грн` : `0 грн`;
                                return (
                                    <div
                                        className={
                                            item.report ? 'col card center m-2 background' : 'col card center m-2'
                                        }
                                    >
                                        <div className='position-relative'>
                                            <img
                                                src={item.report ? item.report.photoUrl : item.picUrl}
                                                className='cardImg p-2'
                                                onClick={() => navigate(`/collection/${item._id}`)}
                                            />
                                            <Badge className='badge yellow'>Влт</Badge>
                                            <div className='card-body'>
                                                <Text
                                                    className='title'
                                                    onClick={() => navigate(`/collection/${item._id}`)}
                                                >
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
                {totalPages > 1 && (
                    <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                )}
            </Box>
        </>
    );
};
