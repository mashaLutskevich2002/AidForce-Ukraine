import React, { useState } from 'react';
import { Box, Flex, Button, Spacer, Heading, ButtonGroup, Wrap, WrapItem, Text, Image, Link } from '@chakra-ui/react';
import { useAuthUser } from '../../hooks/useAuthUser';
import './Header.css';
import { Picture } from '../Picture';
import { useNavigate } from 'react-router';
import { Overlay } from '../../UI';
import { CabinetOverlay } from '../CabinetOverlay';

export const Header = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { user } = useAuthUser();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };
    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' bg='#FAFA8B'>
            <Box p='2'>
                <Heading size='md'>NameProject</Heading>
            </Box>
            <Spacer />
            {user ? (
                <Wrap>
                    <WrapItem>
                        <Text>
                            {user.name} {user.last_name}
                        </Text>
                        <Image src={user.photoUrl as string} boxSize='50px' className='avatar' onClick={handleShow} />
                        <Overlay handleClose={handleClose} title='Кабінет' show={show} placement='end'>
                            <CabinetOverlay />
                        </Overlay>
                        <Link onClick={logout}>Вийти</Link>
                    </WrapItem>
                </Wrap>
            ) : (
                <ButtonGroup gap='2'>
                    <Button colorScheme='teal' onClick={() => navigate('/registration')}>
                        Sign Up
                    </Button>
                    <Button colorScheme='teal' onClick={() => navigate('/login')}>
                        Log in
                    </Button>
                </ButtonGroup>
            )}
        </Flex>
    );
};
