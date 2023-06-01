import React, { ReactNode } from 'react';

interface TextProps {
    tag?: keyof JSX.IntrinsicElements;
    children: ReactNode;
    size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';
    color?: 'link' | 'red' | 'muted' | 'success' | 'error' | 'warning' | 'black' | 'light' | null;
    weight?: 'medium' | 'bold';
    wrap?: 'break' | 'nowrap' | 'spaces' | 'ellipses' | 'three-line';
    transform?: 'capitalize' | 'lowercase' | 'uppercase' | 'uppercase-first-letter';
    qaId?: string;
    className?: string;
    decoration?: 'strike';
    titleText?: string;
}

export const Text = ({
    tag = 'span',
    children,
    qaId,
    titleText,
}: TextProps): JSX.Element => {
    const Tag = tag;

    return (
        <Tag
            title={titleText}
            data-qaid={qaId}
        >
            {children}
        </Tag>
    );
};
