import * as React from 'react';
import { Application } from '../../CatalogCollectionsPage/types';
import { Badge, Button, Spinner } from "react-bootstrap";
import axios from 'axios';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { useState } from 'react';
import { Grid } from "../../../UI";
interface ApplicationItemProps {
    item: Application;
    applications: Application[];
    setApplications: (application: Application[]) => void;
}

export const ApplicationItem = ({ item, applications, setApplications }: ApplicationItemProps) => {
    const { user } = useAuthUser();
    const [isLoading, setIsLoading] = useState(false);

    let bgBadge;
    if (item.status === 'Нова') {
        bgBadge = 'light';
    } else if (item.status === 'Схвалено') {
        bgBadge = 'success';
    } else {
        bgBadge = 'danger';
    }

    const removeApplication = async () => {
        setIsLoading(true);
        try {
            await axios.delete(
                `/api/application/delete/${item._id}`,
                // @ts-ignore
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${user?.token}`,
                    },
                },
            );
            const arr = (prevCollections: Application[]) =>
                prevCollections.filter((application) => application._id !== item._id);
            setApplications(arr(applications));
            // @ts-ignore
        } catch (error: any) {
            console.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
      <div className="cabinet position-relative ">
          <div className="orders-container">
              <h2 className="orders-heading">
                  <Grid grid-align='justify'>
                      <Grid.Item>
                          {item.requestedCollection.title}
                      </Grid.Item>
                  </Grid>

              </h2>
              <div className="order-item">
                  <img
                    src={item.requestedCollection.picUrl}
                    className="cardImg p-2"
                  />
                  <Badge className='badge' bg={item.requestedCollection.user.role == 'military' ? 'success' : 'warning'}>
                      {item.requestedCollection.user.role === 'military' ? 'ЗСУ' : 'Волонтер'}
                  </Badge>
                  <Badge className='badgeStatus' bg={bgBadge}>
                      {item.status}
                  </Badge>
                  <div className="order-info">
                      <p className='card-text'>Сума збору: {item.requestedCollection.amount} грн</p>
                      <div className="order-actions">
                          <Button onClick={removeApplication}>Видалити заявку</Button>
                      </div>
                  </div>

              </div>
          </div>
      </div>
    );
};
