import React, { ChangeEvent, useState } from 'react';
import { Link } from '@chakra-ui/react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './LoginPage.css'

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
            console.log(error.message);
            setError({ errorMessage: e ? e.response.data.message : undefined });
        }
        setIsLoading(false);
    };

    return (
          <div className='login-page'>
              {isLoading && <Spinner animation='border' />}
              {error.errorMessage && <ErrorMessage variant='danger' message={error.errorMessage} />}
              <h2>Вхід</h2>
              <form className='login-form' onSubmit={onSubmit}>
                  <div className='form-group'>
                      <label htmlFor='email'>
                          <i className='material-icons'>mail</i>
                          Email:
                      </label>
                      <input
                        type='email'
                        id='email'
                        placeholder='email: examle@gmail.com'
                        value={email}
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      />
                  </div>
                  <div className='form-group'>
                      <label htmlFor='password'>
                          <i className='material-icons'>lock</i>
                          Пароль:
                      </label>
                      <input
                        type='password'
                        placeholder='password'
                        id='password'
                        value={password}
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      />
                  </div>
                  <button type='submit'>
                      <i className='material-icons'>login</i>
                      Увійти
                  </button>
                  <p style={{marginTop: '20px'}}>
                      Ще не зареєстровані? <Link onClick={() => navigate('/registration')}>Зареєструватись</Link>
                  </p>
              </form>

          </div>
    );
};
