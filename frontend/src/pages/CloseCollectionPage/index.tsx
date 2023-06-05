import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useAuthUser } from '../../hooks/useAuthUser';
import { Popup } from '../../components/Popup';
import { Box } from "../../UI";

export const CloseCollectionPage = () => {
    const { user } = useAuthUser();
    const [isLoading, setIsLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<Record<string, string | undefined>>({});
    const [showPopup, setShowPopup] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.put(
                `/api/collection/closeCollection/${id}`,
                {
                    photoUrl,
                    description,
                },
                // @ts-ignore
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${user?.token}`,
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
        <Box className='wrap' box-align='center'>
            {error.errorMessage && <ErrorMessage variant='danger' message={error.errorMessage} />}
            {showPopup && (
                <Popup
                    isShowPopup={showPopup}
                    animation
                    isShowButton={false}
                    onClick={() => navigate('/catalogCollections')}
                    message='Збір успішно закрит :)'
                />
            )}
            <Box box-align='center' box-margin={[null, null, 's', null]}>
                <h3>Закрити збір</h3>

            </Box>

            <Form onSubmit={handleFormSubmit}>
                <Box box-align='center'>
                    {isLoading && <Spinner />}
                </Box>
                <Form.Label htmlFor='basic-url'>Фотозвіт</Form.Label>
                <InputGroup>
                    <Form.Control
                        accept='image/*'
                        placeholder='upload file'
                        type='file'
                        onChange={(e: any) => postPic(e.target.files[0])}
                    />
                </InputGroup>
                <Form.Label htmlFor='basic-url'>Опис</Form.Label>
                <InputGroup className='mb-3'>
                    <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='Опис'
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    />
                </InputGroup>
                <Button type='submit' style={{ marginTop: 15 }}>
                    Закрити збір
                </Button>
            </Form>
        </Box>
    );
};
