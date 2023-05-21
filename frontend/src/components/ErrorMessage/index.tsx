import React from 'react';
import {Alert} from "react-bootstrap";
import './ErrorMessage.css'

interface ErrorMessageProps{
    message: string
    variant?: 'info' | 'primary' | 'success' | 'danger',
}

export const ErrorMessage = ({ variant = "info", message }: ErrorMessageProps) => {
    return (
        <div className='wrapper'>
            <Alert variant={variant} style={{ fontSize: 20 }} className='alert'>
                <strong className='message'>{message}</strong>
            </Alert>
        </div>
    );
};
