import React, { ChangeEvent } from 'react';
import classSet from 'classnames';

import css from './Textarea.css';

interface TextareaProps {
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    id?: string;
    cols?: number;
    rows?: number;
    value: string;
    placeholder?: string;
    error?: boolean;
    qaId?: string;
    className?: string;
    maxLength?: number;
}

export const Textarea = ({
    onChange,
    name,
    id,
    cols,
    rows,
    value,
    placeholder,
    qaId,
    error,
    className,
    maxLength,
}: TextareaProps): JSX.Element => (
    <textarea
        data-qaid={qaId}
        className={classSet(
            css.wrapper,
            {
                [css.error]: error,
            },
            className,
        )}
        onChange={onChange}
        name={name}
        id={id}
        cols={cols}
        rows={rows}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
    />
);
