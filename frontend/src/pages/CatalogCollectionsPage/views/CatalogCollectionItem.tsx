import React from 'react';
import { useNavigate } from 'react-router';
import { Collection } from '../types';
import { Badge, Button, ProgressBar } from 'react-bootstrap';
import { Text } from '@chakra-ui/react';
import { Box } from '../../../UI';

import '../CatalogCollectionStyle.css';

interface CatalogCollectionItemProps {
    item: Collection;
}
export const CatalogCollectionItem = ({ item }: CatalogCollectionItemProps) => {
    const navigate = useNavigate();
    const hryvnia = Math.round(item.collectedSum / 100);
    const collectedSum = item.collectedSum ? `${hryvnia} грн` : `0 грн`;
    const percent = Math.round((hryvnia / item.amount) * 100) || 0;
    return (
        <div className={item.report ? 'card background m-2' : 'card m-2'}>
            <div className='position-relative'>
                <img
                    src={item.report ? item.report.photoUrl : item.picUrl}
                    className='cardImg p-2'
                    onClick={() => navigate(`/collection/${item._id}`)}
                />
                <Badge
                    bg={item.user.role === 'military' ? 'success' : 'warning'}
                    className={item.user.role === 'volunteer' ? 'badgeBlack' : undefined}
                >
                    {item.user.role === 'military' ? 'ЗСУ' : 'Волонтер'}
                </Badge>
                <div className='card-body'>
                    <Text className='title' onClick={() => navigate(`/collection/${item._id}`)}>
                        {item.title}
                    </Text>
                    <Text>
                        зібрано {collectedSum}/{item.amount} грн
                    </Text>
                    <Box box-margin={['s', null]}>
                        <ProgressBar
                            variant={percent >= 50 ? 'success' : 'danger'}
                            now={percent}
                            animated
                            label={`${percent}%`}
                        />
                    </Box>

                    {item.report ? (
                        <Button disabled>Зібрано</Button>
                    ) : (
                        <Button href={item.monoBankaUrl} className='button'>
                            Допомогти
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
