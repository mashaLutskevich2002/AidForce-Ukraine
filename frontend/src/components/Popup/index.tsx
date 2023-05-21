import React, { ChangeEvent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Popup.css';

interface PopupProps {
    isShowPopup: boolean;
    onClick: () => void;
    message: string;
    isShowButton?: boolean;
    fullscreen?: true | string | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down';
    animation?: boolean;
}

export const Popup = ({ isShowPopup, onClick, message, isShowButton = true, fullscreen, animation }: PopupProps) => {
    const [showPopup, setShowPopup] = useState(isShowPopup);
    const onHide = () => {
        onClick();
        setShowPopup(false);
    };
    return (
        <Modal
            animation={animation}
            size='xl'
            fullscreen={fullscreen}
            show={showPopup}
            onHide={onHide}
            aria-labelledby='example-modal-sizes-title-sm'
            centered
        >
            <Modal.Body className='modal'>
                <Modal.Title id='example-modal-sizes-title-lg'>{message}</Modal.Title>
                {isShowButton && (
                    <div>
                        <Button onClick={onClick} style={{ marginTop: 15 }}>
                            Увійти
                        </Button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};
