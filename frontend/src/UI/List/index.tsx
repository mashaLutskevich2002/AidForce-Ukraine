import React, { ReactNode } from 'react';
import classSet from 'classnames';

import css from './List.css';

interface ListProps {
    children: ReactNode;
    icon?: 'dash';
    indent?: 'xs' | 's' | 'm';
    className?: string;
    qaId?: string;
}

interface ListItemProps {
    children: ReactNode;
    qaId?: string;
}

export const List = ({ children, indent, icon, className, qaId }: ListProps) => {
    return (
        <ul
            className={classSet(
                css.wrapper,
                {
                    [css[`indent_${indent}`]]: !!indent,
                    [css[`icon_${icon}`]]: !!icon,
                },
                className,
            )}
            data-qaid={qaId}
        >
            {children}
        </ul>
    );
};

export const ListItem = ({ children, qaId }: ListItemProps) => {
    return (
        <li className={css.item} data-qaid={qaId}>
            {children}
        </li>
    );
};
