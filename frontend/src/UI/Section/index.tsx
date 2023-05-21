import React, { ReactNode } from 'react';
import classSet from 'classnames';

import css from './Section.css';

interface SectionProps {
    children: ReactNode;
    height?: '1-1';
    className?: string;
    padding?: 'xs_small' | 'none_small';
    id?: string;
}

export const Section = ({ children, height, className, padding, id }: SectionProps) => (
    <div
        id={id}
        className={classSet(className, css.wrapper, {
            [css[`height_${height}`]]: !!height,
            [css[`padding_${padding}`]]: !!padding,
        })}
    >
        {children}
    </div>
);
