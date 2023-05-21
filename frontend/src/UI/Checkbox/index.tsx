import React, { ReactNode } from 'react';

import { Grid } from '../Grid';

import css from './Checkbox.css';

interface CheckboxProps {
    children?: ReactNode;
    checked?: boolean;
    onChange: () => void;
    id?: string;
    name?: string;
    qaId?: string;
    className?: string;
}

export const Checkbox = ({ children, checked, onChange, name, id, qaId }: CheckboxProps) => {
    return (
        <label>
            <Grid grid-indent='xs' grid-valign='middle'>
                <Grid.Item>
                    <input
                        className={css.input}
                        data-qaid={qaId}
                        id={id}
                        name={name}
                        checked={checked}
                        onChange={onChange}
                        type='checkbox'
                    />
                    <span className={css.fake} />
                </Grid.Item>

                <Grid.Item grid-item-width='expand' data-qaid='checkbox-label'>
                    {children}
                </Grid.Item>
            </Grid>
        </label>
    );
};
