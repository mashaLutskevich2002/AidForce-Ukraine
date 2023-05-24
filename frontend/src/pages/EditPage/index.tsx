import React, { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Grid } from '../../UI';
import { Button, Form, InputGroup } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useAuthUser } from '../../hooks/useAuthUser';

interface EditPageProps {
    setIsEdit: (bol: boolean) => void;
}

export const EditPage = ({ setIsEdit }: EditPageProps) => {
    const { user } = useAuthUser();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Record<string, string | undefined>>({});
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [photoUrl, setPhotoUrl] = useState<string | number | readonly string[] | undefined>();

    const editForm = async (e: ChangeEvent<HTMLFormElement>) => {
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
            const response = await axios.put(
                `/api/edit`,
                {
                    name: name ? name : user?.name,
                    last_name: lastName ? lastName : user?.last_name,
                    password: password && password,
                    email: email ? email : user?.email,
                    photoUrl: photoUrl ? photoUrl : user?.photoUrl,
                    phone: phone ? phone : user?.phone,
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${user?.token}`,
                    },
                },
            );

            const updatedUserData = {
                ...user,
                name: name ? response.data.name : user?.name,
                last_name: lastName ? response.data.last_name : user?.last_name,
                phone: phone ? response.data.phone : user?.phone,
                email: email ? response.data.email : user?.email,
                photoUrl: photoUrl ? response.data.photoUrl : user?.photoUrl,
            };

            // Сохранение обновленных данных в локальном хранилище
            localStorage.setItem('userInfo', JSON.stringify(updatedUserData));
            setError({});
            navigate('/cabinet/setupProfile');
            setIsEdit(false);
        } catch (e: any) {
            console.log(e);
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
                    console.log(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return;
        }
    };
    return (
        <Form onSubmit={editForm}>
            <Grid grid-column={2} grid-indent='s'>
                <Grid.Item>
                    <Grid grid-indent='xl' grid-column={1}>
                        <Grid.Item>Ім'я:</Grid.Item>
                        <Grid.Item>Прізвище:</Grid.Item>
                        <Grid.Item>Електронна пошта:</Grid.Item>
                        <Grid.Item>Номер телефону:</Grid.Item>
                        <Grid.Item>Пароль:</Grid.Item>
                        <Grid.Item>Підтвердіть пароль:</Grid.Item>
                    </Grid>
                </Grid.Item>
                <Grid.Item>
                    <Grid grid-indent='xs' grid-column={1}>
                        <InputGroup className='mb-3'>
                            <Form.Control
                                placeholder="Ваше ім'я"
                                type='text'
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <Form.Control
                                placeholder='Ваше прізвище'
                                type='text'
                                value={lastName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <Form.Control
                                placeholder='email: examle@gmail.com'
                                type='text'
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <InputMask
                                mask='+380(99)-99-99-999'
                                value={phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                                className='mask'
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
                        <InputGroup className='mb-3'>
                            <Form.Control
                                placeholder='повторити пароль'
                                type='password'
                                value={confirmPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </InputGroup>
                    </Grid>
                </Grid.Item>
            </Grid>

            {error.confirmPassword && <ErrorMessage variant='danger' message={error.confirmPassword} />}
            <Form.Label htmlFor='basic-url'>Ваше фото</Form.Label>
            <InputGroup>
                <Form.Control
                    accept='image/*'
                    placeholder='upload file'
                    type='file'
                    onChange={(e: any) => postPic(e.target.files[0])}
                />
            </InputGroup>
            <Button type='submit' style={{ marginTop: 15 }}>
                Редагувати
            </Button>
        </Form>
    );
};
