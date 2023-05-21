import React, { ChangeEvent, KeyboardEvent } from 'react';
import classSet from 'classnames';

import css from './Input.css';

export interface InputProps {
    type?: string;
    value?: string;
    id?: string;
    name?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    innerRef?: React.Ref<HTMLInputElement> | ((ref: HTMLInputElement) => void);
    required?: boolean;
    placeholder?: string;
    error?: boolean;
    qaId?: string;
    className?: string;
    inputMode?: 'text' | 'search' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal';
}

export const Input = ({
    type = 'text',
    value,
    id,
    name,
    onChange,
    onKeyDown,
    required = false,
    placeholder,
    error,
    qaId,
    className,
    innerRef,
    inputMode,
}: InputProps) => (
    <input
        className={classSet(
            css.wrapper,
            {
                [css.error]: error,
            },
            className,
        )}
        id={id}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        placeholder={placeholder}
        data-qaid={qaId}
        ref={innerRef}
        inputMode={inputMode}
    />
);
