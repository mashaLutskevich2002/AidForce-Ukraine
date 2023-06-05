import * as React from 'react';
import { Collection } from '../../CatalogCollectionsPage/types';
import { Button, ProgressBar, Spinner } from "react-bootstrap";
import { Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { Grid } from "../../../UI";
interface CollectionItemProps {
    item: Collection;
    collections: Collection[];
    setCollections: (collection: Collection[]) => void;
}

export const CollectionItem = ({ item, collections, setCollections }: CollectionItemProps) => {
    const { user } = useAuthUser();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const hryvnia = Math.floor(item.collectedSum / 100);
    const kopiyka = item.collectedSum % 100;
    const collectedSum = item.collectedSum ? `${hryvnia}.${kopiyka}` : `0`;
    const percent = Math.round((hryvnia / item.amount) * 100) || 0;
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
            console.error(error.response.data.message)
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return <Spinner />;
    }
    return (
      <>
          <div className="cabinet">
              <div className="orders-container">
                  <h2 className="orders-heading">
                      <Grid grid-align='justify'>
                          <Grid.Item>
                              {item.title}
                          </Grid.Item>
                          <Grid.Item>
                              <i onClick={() => navigate(`/collection/${item._id}`)} className="fas fa-arrow-right cursor" > </i>
                          </Grid.Item>
                      </Grid>

                  </h2>
                  <div className="order-item">
                      <img
                        src={item.report ? item.report.photoUrl : item.picUrl}
                        className="cardImg p-2"
                        onClick={() => navigate(`/collection/${item._id}`)}
                      />
                      <div className="order-info">
                          <Grid grid-align='justify'>
                              <Grid.Item>
                                  <Text>Вже зібрано, грн:</Text>
                              </Grid.Item>
                              <Grid.Item>
                                  <span>{collectedSum}/{item.amount}</span>
                              </Grid.Item>
                          </Grid>
                          <ProgressBar
                            variant={percent >= 50 ? 'success' : 'danger'}
                            now={percent}
                            animated
                            label={`${percent}%`}
                          />
                          <div className="order-actions">
                              {item.report ? (
                                <Button disabled>Зібрано</Button>
                              ) : (
                                <Button href={item.monoBankaUrl}>Допомогти</Button>
                              )}
                              {!item.report &&(
                                <Button onClick={() => navigate(`/closeCollection/${item?._id}`)}>
                                    Закрити збір
                                </Button>
                              )}

                              <Button onClick={removeCollection}>Видалити збір</Button>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </>
    );
};
