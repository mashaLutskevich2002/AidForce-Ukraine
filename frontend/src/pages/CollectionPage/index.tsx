import React, { useEffect, useState } from 'react';
import { Collection } from '../CatalogCollectionsPage/types';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Button, ProgressBar } from 'react-bootstrap';
import { useAuthUser } from '../../hooks/useAuthUser';
import { Box, Grid, Text, Link } from "../../UI";
import { Header } from '../../components/Header';
import { Picture } from '../../components/Picture';
import { GoogleMapUi } from "../../components/Map";

import './CollectionPage.css';

export const CollectionPage = () => {
    const [collection, setCollection] = useState<Collection>();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuthUser();

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
    }, []);

    if (!collection) {
        return null;
    }

    const hryvnia = Math.round(collection.collectedSum / 100);
    const collectedSum = collection.collectedSum ? `${hryvnia}` : `0`;
    const percent = Math.round((hryvnia / collection.amount) * 100) || 0;

    const isCurrentUserOwner = user?._id === collection.user.id || user?.role === 'admin';

    return (
        <Box className='wrap'>
            <h3 className='center m-auto w-100 mb-4'> {collection.title.toUpperCase()} </h3>
            <div className="product-container">
                <div className="product-image">
                    <Picture
                      src={collection.report ? collection.report.photoUrl : collection.picUrl}
                      width='350px'
                      height='350px'
                    />
                </div>
                <div className="product-info">
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
                </div>
            </div>
            <Grid grid-direction='column' className="product-description" grid-indent='s'>
              <Box box-margin={[null, null, 's', null]}>
                  <h5>Опис збору</h5>
              </Box>
                    <Grid.Item>
                        <span>{collection.description}</span>
                    </Grid.Item>
                    <Grid.Item>
                        <p><i className="fas fa-bullseye"></i> Ціль : {collection.amount} грн </p>
                    </Grid.Item>
            </Grid>
            <Box box-margin={['m', null, null,null]} className='map'>
                <GoogleMapUi location={collection.location} />
                {isCurrentUserOwner && (
                  <Box box-margin={['m', null, null, null]}>
                      <Button onClick={() => navigate(`/closeCollection/${collection?._id}`)}>
                          Закрити збір
                      </Button>
                  </Box>
                )}
            </Box>
        </Box>
    );
};
