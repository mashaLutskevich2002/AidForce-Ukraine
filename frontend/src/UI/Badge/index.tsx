import React from 'react';
import classSet from 'classnames';

import css from './Badge.css';

interface BadgeProps {
    count: number | string;
    withWrapper?: boolean;
    theme: 'red' | 'yellow' | 'green';
    isAbsolutePosition?: boolean;
}

export const Badge = ({ count, isAbsolutePosition, theme }: BadgeProps) => {
    if (!!count) {
        return (
            <div
                data-qaid='badge-count'
                className={classSet(css.label, {
                    [css[`theme_${theme}`]]: !!theme,
                    [css.labelPosition]: isAbsolutePosition,
                })}
            >
                {count}
            </div>
        );
    }
    return null;
};
