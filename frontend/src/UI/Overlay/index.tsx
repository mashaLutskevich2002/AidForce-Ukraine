import React from 'react';
import { OffcanvasProps } from 'react-bootstrap/Offcanvas';
import { Offcanvas } from 'react-bootstrap';

export const Overlay = ({ name, children, show, handleClose, title, ...props }: OffcanvasProps) => {
    return (
        <Offcanvas show={show} onHide={handleClose} {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{children}</Offcanvas.Body>
        </Offcanvas>
    );
};
