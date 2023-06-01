import React, { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router-dom';

interface LinkProps {
    href?: string;
    size?: 'xxs' | 'xs' | 's';
    children: ReactNode;
    title?: string;
    className?: string;
    qaId?: string;
    weight?: 'medium' | 'bold';
    transform?: 'dotted' | 'no-underline' | 'capitalize';
    target?: string;
    onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
    color?: 'default' | 'red';
    itemProp?: string;
    rel?: string;
    legacyMode?: boolean;
}

export const Link = ({
    href,
    children,
    size,
    title,
    className,
    qaId,
    weight,
    transform,
    target,
    onClick,
    color,
    itemProp,
    legacyMode = true,
}: LinkProps) => {
    const props = {
        title,
        // className: classSet(
        //     css.wrapper,
        //     {
        //         [css[`size_${size}`]]: !!size,
        //         [css[`weight_${weight}`]]: !!weight,
        //         [css[`transform_${transform}`]]: !!transform,
        //         [css[`color_${color}`]]: !!color,
        //     },
        //     className,
        // ),
        'data-qaid': qaId,
        onClick,
    };
    if (!legacyMode && href) {
        return (
            <ReactLink to={href} {...props} itemProp={itemProp}>
                {children}
            </ReactLink>
        );
    }

    return (
        <a href={href} target={target} {...props}>
            {children}
        </a>
    );
};
