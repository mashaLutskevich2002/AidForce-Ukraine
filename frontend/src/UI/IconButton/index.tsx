import React, { MouseEvent, ReactNode } from 'react';
import classSet from 'classnames';

import css from './IconButton.css';

interface IconButtonProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    qaId?: string;
    children: ReactNode;
    type?: 'button' | 'submit';
    'aria-label'?: string;
    width?: '1-1';
}

export const IconButton = ({
    children,
    disabled,
    loading,
    className,
    onClick,
    qaId,
    type = 'button',
    width,
    ...props
}: IconButtonProps) => {
    return (
        <button
            type={type}
            data-qaid={qaId}
            className={classSet(className, css.wrapper, {
                [css[`width_${width}`]]: !!width,
            })}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
