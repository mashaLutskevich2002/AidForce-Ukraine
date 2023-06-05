import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { Button, Spinner, Form, InputGroup } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router';
import { ErrorMessage } from '../../components/ErrorMessage';

import './RegistrationPage.css';
import { Popup } from '../../components/Popup';

export const RegistrationPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [photoUrl, setPhotoUrl] = useState<string | number | readonly string[] | undefined>();
    const [role, setRole] = useState<string>();
    const [militaryTicket, setMilitaryTicket] = useState<string>();
    const [error, setError] = useState<Record<string, string | undefined>>({});

    const [showPopup, setShowPopup] = useState(false);

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError((prevError) => ({
                ...prevError,
                confirmPassword: password !== confirmPassword ? 'Паролі не співпадають' : undefined,
            }));
            return;
        }
        setIsLoading(true);
        try {
            await axios.post(
                '/api/users',
                {
                    name,
                    last_name: lastName,
                    email,
                    password,
                    phone,
                    role,
                    militaryTicket,
                    photoUrl,
                },
                // @ts-ignore
                {
                    headers: {
                        'Content-type': 'application/json',
                    },
                },
            );
            setShowPopup(true);
            setError({});
            // @ts-ignore
        } catch (e: any) {
            setError({ errorMessage: e ? e.response.data.message : undefined });
        }
        setIsLoading(false);
    };

    const postPic = (pics: any) => {
        if (pics && (pics.type === 'image/jpeg' || pics.type === 'image/png')) {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'aidForce-Ukraine');
            data.append('cloud_name', 'ddp0dwq9j');
            fetch('https://api.cloudinary.com/v1_1/ddp0dwq9j/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPhotoUrl(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return;
        }
    };

    return (
      <div className='registration-page'>
          <h2 className="registration-title">Реєстрація</h2>
            {showPopup && (
                <Popup
                    isShowPopup={showPopup}
                    onClick={() => navigate('/login')}
                    message='Вітаємо! Ви успішно зареєструвались :)'
                />
            )}
            {isLoading && <Spinner />}
          <div className={error.errorMessage ? 'registration-error show': 'registration-error'}>
              {error.errorMessage && <ErrorMessage variant='danger' message={error.errorMessage} />}
          </div>


            <Form onSubmit={onSubmit} className='registration-form'>
                <Form.Label htmlFor='basic-url'>Ім'я  <p className='required-field'>*</p></Form.Label>
                <InputGroup className='mb-3'>
                    <Form.Control
                        placeholder="Ваше ім'я"
                        type='text'
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                </InputGroup>
                <Form.Label htmlFor='basic-url'>Прізвище  <p className='required-field'>*</p></Form.Label>
                <InputGroup className='mb-3'>

                    <Form.Control
                        placeholder='Ваше прізвище'
                        type='text'
                        value={lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                    />
                </InputGroup>
                <Form.Label htmlFor='basic-url'>Email <p className='required-field'>*</p></Form.Label>
                <InputGroup className='mb-3'>
                    <Form.Control
                        placeholder='email: examle@gmail.com'
                        type='text'
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                </InputGroup>
                <Form.Label htmlFor='basic-url'>Номер телефону  <p className='required-field'>*</p></Form.Label>
                <InputGroup className='mb-3'>
                    <InputMask
                        mask='+380(99)-99-99-999'
                        value={phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                        className='mask'
                    />
                </InputGroup>
                <Form.Label htmlFor='basic-url'>Пароль <p className='required-field'>*</p></Form.Label>
                <InputGroup className='mb-3'>
                    <Form.Control
                        placeholder='пароль'
                        type='password'
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <Form.Label htmlFor='basic-url'>Повторити пароль <p className='required-field'>*</p></Form.Label>
                <InputGroup className='mb-3'>
                    <Form.Control
                        placeholder='повторити пароль'
                        type='password'
                        value={confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    />
                </InputGroup>
                {error.confirmPassword && <ErrorMessage variant='danger' message={error.confirmPassword} />}
                <InputGroup className='mb-3'>
                    <Form.Select
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                        value={role}
                    >
                        <option value='volunteer'>Волонтер</option>
                        <option value='military'>Військовий</option>
                    </Form.Select>
                </InputGroup>
                {role === 'military' && (
                    <>
                        <Form.Label htmlFor='basic-url'>Номер військового квитка  <p className='required-field'>*</p></Form.Label>
                        <InputGroup className='mb-3'>
                            <InputMask
                                mask='aa-9999-aa'
                                value={militaryTicket}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMilitaryTicket(e.target.value)}
                                className='mask'
                            />
                        </InputGroup>
                    </>
                )}
                <Form.Label htmlFor='basic-url'>Фото профілю </Form.Label>
                <InputGroup>
                    <Form.Control
                        accept='image/*'
                        placeholder='upload file'
                        type='file'
                        onChange={(e: any) => postPic(e.target.files[0])}
                    />
                </InputGroup>
                <Button type='submit' style={{ marginTop: 15 }}>
                    Зареєструватися
                </Button>
            </Form>
      </div>
    );
};
