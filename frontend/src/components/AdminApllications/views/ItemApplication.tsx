import { Application } from '../../../pages/CatalogCollectionsPage/types';
import { Badge } from 'react-bootstrap';
import { Link, Text } from '@chakra-ui/react';
import { Box } from '../../../UI';
import { ButtonsPanel } from './ButtonsPanel';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router";

interface ItemApllicationProps {
    item: Application;
}
export const ItemApplication = ({ item }: ItemApllicationProps) => {
    const navigate = useNavigate()
    const [status, setStatus] = useState(item.status);
    let bgBadge;
    if (status === 'Нова') {
        bgBadge = 'light';
    } else if (status === 'Схвалено') {
        bgBadge = 'success';
    } else {
        bgBadge = 'danger';
    }
    return (
        <div className='card col center w-100 mb-4'>
            <div className='position-relative w-100'>
                <img src={item.requestedCollection.picUrl} className='img' />
                <Badge className='badge' bg={item.requestedCollection.user?.role == 'military' ? 'success' : 'warning'}>
                    {item.requestedCollection.user?.role === 'military' ? 'ЗСУ' : 'Волонтер'}
                </Badge>
                <Badge className='badgeStatus' bg={bgBadge}>
                    {status}
                </Badge>

                <div className='card-body'>
                    <Text className='title'>{item.requestedCollection.title}</Text>
                    <Box className='cursor'>
                        <p onClick={()=> navigate(`/company/${item.requestedCollection.user.id}`)}>Власник збору: {item.requestedCollection.user.name} {item.requestedCollection.user.last_name}</p>
                    </Box>
                    <Text className='card-text'>Cума збору: {item.requestedCollection.amount} грн</Text>
                    <Text className='card-text'>{item.requestedCollection.description}</Text>
                    <Link target='_blank' color='black' href={item.requestedCollection.monoBankaUrl}>
                        Лінк на Монобанк
                    </Link>
                    <Box box-margin={['s', null]}>
                        <ButtonsPanel status={status} setStatus={setStatus} id={item._id} />
                    </Box>
                </div>
            </div>
        </div>
    );
};
