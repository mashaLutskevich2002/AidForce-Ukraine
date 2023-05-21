import React from 'react';
import { useAuthUser } from '../../hooks/useAuthUser';
import { Header } from '../../components/Header';
import { Center, Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export const MainPage = () => {
    const { user } = useAuthUser();
    const navigate = useNavigate();

    const onClickCreateCollection = () => {
        if (user) {
            navigate('/createCollection');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <Header />
            <Center>
                <Image src='https://images.prom.ua/3729460909_patrioticheskij-banner-flag.jpg'></Image>
            </Center>
            <Center>
                <Button onClick={() => navigate('/catalogCollections')}>Хочу допомагати</Button>
                <Button onClick={onClickCreateCollection}>Відкрити збір</Button>
            </Center>
        </>
    );
};
