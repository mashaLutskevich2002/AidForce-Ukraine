import React, { ReactNode } from 'react';
import classSet from 'classnames';

import css from './Text.css';

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
    size,
    color,
    weight,
    wrap,
    transform,
    qaId,
    className,
    decoration,
    titleText,
}: TextProps): JSX.Element => {
    const Tag = tag;

    return (
        <Tag
            title={titleText}
            data-qaid={qaId}
            className={classSet(
                css.wrapper,
                {
                    [css[`size_${size}`]]: !!size,
                    [css[`color_${color}`]]: !!color,
                    [css[`weight_${weight}`]]: !!weight,
                    [css[`wrap_${wrap}`]]: !!wrap,
                    [css[`transform_${transform}`]]: !!transform,
                    [css[`decoration_${decoration}`]]: !!decoration,
                },
                className,
            )}
        >
            {children}
        </Tag>
    );
};
