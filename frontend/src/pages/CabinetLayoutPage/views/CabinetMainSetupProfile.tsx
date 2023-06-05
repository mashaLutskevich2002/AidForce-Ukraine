import React, { useState } from "react";
import { Box, Grid } from "../../../UI";
import { Button, Spinner } from 'react-bootstrap';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { EditPage } from '../../EditPage';
import axios from 'axios';


export const CabinetMainSetupProfile = () => {
    const { user } = useAuthUser();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Record<string, string | undefined>>({});
    const navigate = useNavigate();
    const location = useLocation();
    const [isEdit, setIsEdit] = useState(false);

    const removeUser = async () => {
        setIsLoading(true);
        try {
            await axios.delete(
                `/api/users/delete/${user?._id}`,
                // @ts-ignore
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${user?.token}`,
                    },
                },
            );
            localStorage.removeItem('userInfo');
            window.location.href = '/';
            // @ts-ignore
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
     <Box box-padding={['s']} box-align='center' className='backgroundSetupProfile'>
            {isLoading && <Spinner />}
            {error.errorMessage && <ErrorMessage variant='danger' message={error.errorMessage} />}
         <Box box-align='center'> <h3>Профіль користувача</h3></Box>
         <Box box-margin='s'>
            {!isEdit && (
                <>
                    <Grid grid-column={2} grid-indent='l'>
                        <Grid.Item>
                            <Grid grid-indent='s' grid-column={1}>
                                <Grid.Item>Ім'я:</Grid.Item>
                                <Grid.Item>Прізвище:</Grid.Item>
                                <Grid.Item>Електронна пошта:</Grid.Item>
                                <Grid.Item>Номер телефону:</Grid.Item>
                            </Grid>
                        </Grid.Item>
                        <Grid.Item>
                            <Grid grid-indent='s' grid-column={1}>
                                <Grid.Item>{user?.name}</Grid.Item>
                                <Grid.Item>{user?.last_name}</Grid.Item>
                                <Grid.Item>{user?.email}</Grid.Item>
                                <Grid.Item>{user?.phone}</Grid.Item>
                            </Grid>
                        </Grid.Item>
                    </Grid>
                    <Box box-margin={['m']} box-align='center'>
                        <Button
                          type='submit'
                          onClick={() => {
                              navigate('/cabinet/setupProfile/edit');
                              setIsEdit(true);
                          }}
                        >
                            Редагувати профіль
                        </Button>
                    </Box>

                </>
            )}
         </Box>
            {isEdit && location.pathname === '/cabinet/setupProfile/edit' && (
                <>
                    <EditPage setIsEdit={setIsEdit} removeUser={removeUser} />
                </>
            )}
        </Box>
    );
};
