import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuthUser } from '../../hooks/useAuthUser';
import { Popup } from '../../components/Popup';
import { useNavigate } from 'react-router';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Box } from "../../UI";
import './CreateCollectionPage.css'

export const CreateCollectionPage = () => {
    const { user } = useAuthUser();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState<number>();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [picUrl, setPicUrl] = useState<string>();
    const [location, setLocation] = useState<string>();
    const [monoBankaUrl, setMonoBankaUrl] = useState<string>();
    const [error, setError] = useState<Record<string, string | undefined>>({});
    const [showPopup, setShowPopup] = useState(false);

    const [regions, setRegions] = useState([]);

    if (!user) {
        navigate('/login');
    }

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(
                '/api/application/createApplication',
                {
                    title,
                    description,
                    amount,
                    picUrl,
                    location,
                    monoBankaUrl,
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
                    setPicUrl(data.url.toString());
                    console.log(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return;
        }
    };

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await axios.get('https://api.auto.ria.com/states');
                const regionsData = response.data;
                setRegions(regionsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRegions();
    }, []);

    return (
           <Box box-align='center' className='createCollectionWrap'>
               <Box box-margin={[null, null, 'm', null]}>
                   <h3>Відкривай збір, допомагай нашим захисникам  <i className="fas fa-heart"></i></h3>
               </Box>

                {showPopup && (
                    <Popup
                        isShowPopup={showPopup}
                        animation
                        isShowButton={false}
                        onClick={() => navigate('/')}
                        message='Збір успішно створений і знаходиться в процесі обробки :)'
                    />
                )}
                <Form onSubmit={onSubmit} className='formCreateCollection'>
                    {error.errorMessage && <ErrorMessage variant='danger' message={error.errorMessage} />}
                    {isLoading && <Spinner />}
                    <InputGroup className='mb-3'>
                        <Form.Control
                            placeholder='Збір на..'
                            type='text'
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Опис'
                            value={description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <Form.Control
                            placeholder='Cума збору'
                            type='number'
                            value={amount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
                        />
                    </InputGroup>
                    <Form.Label htmlFor='basic-url'>Місце призначення збору (область)</Form.Label>
                    <InputGroup className='mb-3'>
                        <Form.Select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLocation(e.target.value)}
                            value={location}
                        >
                            {regions.map((region: Record<string, string | number>) => (
                                <option key={region.value} value={region.name}>
                                    {region.name}
                                </option>
                            ))}
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <Form.Control
                            placeholder='Силка на банку монобанка'
                            type='text'
                            value={monoBankaUrl}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonoBankaUrl(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Form.Control
                            accept='image/*'
                            placeholder='upload file'
                            type='file'
                            onChange={(e: any) => postPic(e.target.files[0])}
                        />
                    </InputGroup>
                    <Button type='submit' style={{ marginTop: 15 }}>
                        Відкрити збір
                    </Button>
                </Form>
           </Box>
    );
};
