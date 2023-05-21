import React, { ChangeEvent } from 'react';

import css from './RadioButton.css';

interface RadioButtonProps {
    name: string;
    value: string | number;
    title: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    qaId?: string;
    isSelected?: boolean;
}

export const RadioButton = ({
    value,
    title,
    handleChange,
    id,
    qaId,
    name,
    isSelected,
}: RadioButtonProps): JSX.Element => (
    <label className={css.wrapper}>
        <input
            data-qaid={qaId}
            id={id}
            onChange={handleChange}
            className={css.input}
            type='radio'
            value={value}
            name={name}
            checked={isSelected}
        />
        <div className={css.body}>
            <span className={css.text}>{title}</span>
        </div>
    </label>
);
