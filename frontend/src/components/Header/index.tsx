import React, { useState } from 'react';
import { Image, Link } from '@chakra-ui/react';
import { useAuthUser } from '../../hooks/useAuthUser';
import './Header.css';
import { useNavigate } from 'react-router';
import { Grid, Overlay, Box } from '../../UI';
import { CabinetOverlay } from '../CabinetOverlay';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
        <Navbar className='navbar' expand='lg'>
            <Container fluid className='d-flex align-items-center'>
                <Navbar.Toggle aria-controls='navbarScroll' className='burger' />
                <Navbar.Collapse id='navbarScroll' className='collapse'>
                    <Nav className='me-auto my-2 my-lg-0 logoCenter ' style={{ maxHeight: '100px' }} navbarScroll>
                        <Navbar.Brand onClick={() => navigate('/')} className='logo'>
                            Helping Hands
                        </Navbar.Brand>
                    </Nav>
                    <Box>
                        {user ? (
                            <Grid grid-valign='middle' grid-indent='m'>
                                <Grid.Item>
                                    <span className='textHeader'>
                                        {user.name} {user.last_name}
                                    </span>
                                </Grid.Item>
                                <Grid.Item>
                                    <Image
                                        src={user.photoUrl as string}
                                        boxSize='50px'
                                        className='avatar'
                                        onClick={handleShow}
                                    />
                                </Grid.Item>
                                <Overlay handleClose={handleClose} title='Кабінет' show={show} placement='end'>
                                    <CabinetOverlay />
                                </Overlay>
                                <Grid.Item>
                                    <Link className='link' onClick={logout}>
                                        Вийти
                                    </Link>
                                </Grid.Item>
                            </Grid>
                        ) : (
                            <Grid grid-valign='middle' grid-indent='m'>
                                <Grid.Item>
                                    <Button className='buttonHeader' onClick={() => navigate('/registration')}>
                                        <i className="material-icons" style={{ marginRight: '5px' }}>person_add</i>
                                        Sign Up
                                    </Button>
                                </Grid.Item>
                                <Grid.Item>
                                    <Button className='buttonHeader' onClick={() => navigate('/login')}>
                                        <i className="material-icons" style={{ marginRight: '5px' }}> login </i>
                                        Log in
                                    </Button>
                                </Grid.Item>
                            </Grid>
                        )}
                    </Box>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
