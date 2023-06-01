import * as React from 'react';
import { Application } from '../../CatalogCollectionsPage/types';
import { Badge, Button, Spinner } from 'react-bootstrap';
import { Text } from '@chakra-ui/react';
import axios from 'axios';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { useState } from 'react';
interface ApplicationItemProps {
    item: Application;
    applications: Application[];
    setApplications: (application: Application[]) => void;
}

export const ApplicationItem = ({ item, applications, setApplications }: ApplicationItemProps) => {
    const { user } = useAuthUser();
    const [isLoading, setIsLoading] = useState(false);

    let bgBadge;
    if (item.status === 'Нове') {
        bgBadge = 'light';
    } else if (item.status === 'Одобрено') {
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
        <div className='col card center m-2 position-relative'>
            <img src={item.requestedCollection.picUrl} className='cardImg p-2' />
            <Badge className='badge' bg={item.requestedCollection.user.role == 'military' ? 'success' : 'warning'}>
                {item.requestedCollection.user.role === 'military' ? 'ЗСУ' : 'Влт'}
            </Badge>
            <Badge className='badgeStatus' bg={bgBadge}>
                {item.status}
            </Badge>

            <div className='card-body'>
                <Text className='title'>{item.requestedCollection.title}</Text>
                <p className='card-text'>{item.requestedCollection.amount} грн</p>
                <Button onClick={removeApplication}>Видалити заявку</Button>
            </div>
        </div>
    );
};
