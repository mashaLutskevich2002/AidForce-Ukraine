import * as React from 'react';
import axios from 'axios';
import { Application} from '../../CatalogCollectionsPage/types';
import {  Spinner } from 'react-bootstrap';
import { Grid } from '../../../UI';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { useEffect, useState } from 'react';
import { ApplicationItem } from './ApplicationItem';

export const CabinetMainApplication = () => {
    const { user } = useAuthUser();
    const [applications, setApplications] = useState<Application[]>();
    const [isLoading, setIsLoading] = useState(false);
    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            // @ts-ignore
            const response = await axios.get(`/api/cabinet`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setApplications(response.data.applications);
        } catch (e) {
            console.log(e);
            // setError({ errorMessage: e ? e.response.data.message : undefined });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <Grid grid-direction='column' grid-align='center' grid-valign='middle'>
            <h3> Мої заявки </h3>
            {isLoading && <Spinner />}
            <div className='d-flex justify-content-center '>
                <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center '>
                    {applications &&
                        applications.map((item: Application) => {
                            return (
                                <ApplicationItem
                                    item={item}
                                    applications={applications}
                                    setApplications={setApplications}
                                />
                            );
                        })}
                </div>
            </div>
        </Grid>
    );
    // <div className={item.report ? 'col card center m-2 background' : 'col card center m-2'}>
    //     <div className='position-relative'>
    //         <img
    //             src={item.report ? item.report.photoUrl : item.picUrl}
    //             className='cardImg p-2'
    //             onClick={() => navigate(`/collection/${item._id}`)}
    //         />
    //         <Badge className='badge' bg={item.user.role == 'military' ? 'success' : 'warning'}>
    //             {item.user.role === 'military' ? 'ЗСУ' : 'Волонтер'}
    //         </Badge>
    //
    //         <div className='card-body'>
    //             <Text className='title' onClick={() => navigate(`/collection/${item._id}`)}>
    //                 {item.title}
    //             </Text>
    //             <Text>Вже зібрано {collectedSum}</Text>
    //             <p className='card-text'>{item.amount}</p>
    //             {item.report ? (
    //                 <Button disabled> Зібрано </Button>
    //             ) : (
    //                 <Button href={item.monoBankaUrl}>Допомогти</Button>
    //             )}
    //         </div>
    //     </div>
    // </div>
};
