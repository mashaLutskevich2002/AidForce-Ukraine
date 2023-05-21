import Image from 'react-bootstrap/Image';
import React from 'react';

interface PictureProps {
    src: string;
    fluid?: boolean;
    width?: string;
    height?: string;
}

export const Picture = ({ src, fluid, width = '100%', height = 'auto' }: PictureProps) => {
    return <Image fluid={fluid} src={src} width={width} height={height} />;
};
