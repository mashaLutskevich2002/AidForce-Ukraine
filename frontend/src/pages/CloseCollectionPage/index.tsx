import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

export const CloseCollectionPage = () => {
    const [photoUrl, setPhotoUrl] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();

    const handleFormSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:5001/api/closeCollection/${id}`, {
                photoUrl,
                description,
            });
            console.log('Сбор закрыт', response.data);
            // Очистка полей формы
            setPhotoUrl('');
            setDescription('');
        } catch (error) {
            console.error('Ошибка при закрытии сбора', error);
        }
    };

    return (
        <div>
            <h2>Закрытие сбора</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor='photoUrl'>Фотозвіт:</label>
                    <input type='text' id='photoUrl' value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='description'>Опис:</label>
                    <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type='submit'>Закрыть сбор</button>
            </form>
        </div>
    );
};
