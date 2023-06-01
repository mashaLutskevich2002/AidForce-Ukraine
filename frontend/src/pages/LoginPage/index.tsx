import React, { ChangeEvent, useState } from 'react';
import { Link, VStack } from '@chakra-ui/react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Button, Form, Spinner } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<Record<string, string | undefined>>({});

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                '/api/users/login',
                {
                    email,
                    password,
                },
                // @ts-ignore
                {
                    headers: {
                        'Content-type': 'application/json',
                    },
                },
            );
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
            // @ts-ignore
        } catch (e: any) {
            setError({ errorMessage: e ? e.response.data.message : undefined });
        }
        setIsLoading(false);
    };

    return (
        <VStack spacing='10px'>
            {isLoading && <Spinner />}
            {error.errorMessage && <ErrorMessage variant='danger' message={error.errorMessage} />}
            <Form onSubmit={onSubmit}>
                <InputGroup className='mb-3'>
                    <Form.Control
                        placeholder='email: examle@gmail.com'
                        type='text'
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className='mb-3'>
                    <Form.Control
                        placeholder='пароль'
                        type='password'
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <Button type='submit' style={{ marginTop: 15 }}>
                    Увійти
                </Button>
            </Form>
            <Link onClick={() => navigate('/registration')}>Зареєструватись</Link>
        </VStack>
    );
};
