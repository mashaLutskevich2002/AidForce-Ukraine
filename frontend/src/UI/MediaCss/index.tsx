import React, { ReactNode } from 'react';
import classSet from 'classnames';

import css from './MediaCss.css';

type breakpoint = 'small' | 'medium' | 'large';

interface MediaCssProps {
    children: ReactNode;
    show?: breakpoint;
    hide?: breakpoint;
}

export const MediaCss = ({ children, show, hide }: MediaCssProps) => (
    <div
        className={classSet({
            [css[`show_${show}`]]: !!show,
            [css[`hide_${hide}`]]: !!hide,
        })}
    >
        {children}
    </div>
);
