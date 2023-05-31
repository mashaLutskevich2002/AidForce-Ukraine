import Image from 'react-bootstrap/Image';
import React from 'react';

interface PictureProps {
    src: string;
    fluid?: boolean;
    width?: string;
    height?: string;
    roundedCircle?: boolean;
}

export const Picture = ({ src, fluid, width = '100%', height = 'auto', roundedCircle }: PictureProps) => {
    return <Image fluid={fluid} roundedCircle={roundedCircle} src={src} width={width} height={height} />;
};
