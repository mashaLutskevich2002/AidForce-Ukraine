import React, { useState } from 'react';
import { Grid } from '../../../UI';
import { Button, Spinner } from 'react-bootstrap';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { Text, VStack } from '@chakra-ui/react';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { EditPage } from '../../EditPage';

export const CabinetMainSetupProfile = () => {
    const { user } = useAuthUser();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Record<string, string | undefined>>({});
    const navigate = useNavigate();
    const location = useLocation();
    const [isEdit, setIsEdit] = useState(false);

    return (
        <VStack spacing='10px'>
            {isLoading && <Spinner />}
            {error.errorMessage && <ErrorMessage variant='danger' message={error.errorMessage} />}
            <Text>Профіль</Text>
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
                    <Button
                        type='submit'
                        onClick={() => {
                            navigate('/cabinet/setupProfile/edit');
                            setIsEdit(true);
                        }}
                        style={{ marginTop: 15 }}
                    >
                        Редагувати профіль
                    </Button>
                </>
            )}
            {isEdit && location.pathname === '/cabinet/setupProfile/edit' && (
                <>
                    <EditPage setIsEdit={setIsEdit} />
                </>
            )}
        </VStack>
    );
};
