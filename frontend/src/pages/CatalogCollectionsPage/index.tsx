import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import {  Button, Form, InputGroup } from 'react-bootstrap';

import { Text } from '@chakra-ui/react';
import { Box, Grid } from '../../UI';

import { Collection, Collections } from './types';

import Paginator from '../../components/Paginator';
import { Header } from '../../components/Header';

import './CatalogCollectionStyle.css';
import { CatalogCollectionItem } from './views/CatalogCollectionItem';

export const CatalogCollectionsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [collections, setCollections] = useState<Collections>();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const fetchCollections = async () => {
            setIsLoading(true);
            try {
                // @ts-ignore
                const response = await axios.get(`/api/collection/getCollections`, {
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
            } finally {
                setIsLoading(false);
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

    console.log(isLoading);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            // @ts-ignore
            const response = await axios.get(`/api/collection/getCollections`, {
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Box className='wrap'>
                <InputGroup className='mb-3 searchBlock'>
                    <Form.Control
                        placeholder='Шукаю..'
                        className='search'
                        type='text'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Button onClick={handleSearch} className='button'>
                        Пошук
                    </Button>
                </InputGroup>

                <Grid.Item>
                    <Text textAlign='center'>
                        <h2>Пріорітетні збори</h2>
                    </Text>
                </Grid.Item>
                <div className='d-flex justify-content-center'>
                    <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 containerCollections'>
                        {militaryCollections &&
                            militaryCollections.map((item: Collection) => {
                                return <CatalogCollectionItem item={item} />;
                            })}
                    </div>
                </div>

                <Grid.Item>
                    <Box box-align='center'>
                        <Text>
                            <h2>Всі збори</h2>
                        </Text>
                    </Box>
                </Grid.Item>

                <div className='d-flex justify-content-center '>
                    <div className='card-container '>
                        {nonMilitaryCollections &&
                            nonMilitaryCollections.map((item: Collection) => {
                                return <CatalogCollectionItem item={item} />;
                            })}
                    </div>
                </div>
                <Box box-margin={['s', null, null, null]}>
                    {totalPages > 1 && (
                        <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    )}
                </Box>
            </Box>
        </>
    );
};
