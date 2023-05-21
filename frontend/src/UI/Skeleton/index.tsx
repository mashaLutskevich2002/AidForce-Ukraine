import React, { memo } from 'react';
import classSet from 'classnames';

import css from './Skeleton.css';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    style?: Record<string, unknown>;
    theme?: 'grey' | 'light';
    variation?: 'circle' | 'square' | 'text';
    qaId?: string;
    className?: string;
    round?: 'xs' | 'l';
}

export const Skeleton = memo(
    ({ width, height, style, theme = 'grey', variation = 'text', qaId, className, round }: SkeletonProps) => {
        const blockStyle = React.useMemo(() => ({ height, width, ...style }), [height, width, style]);

        return (
            <div
                data-qaid={qaId}
                className={classSet(
                    css.wrapper,
                    {
                        [css[`theme_${theme}`]]: !!theme,
                        [css[`variant_${variation}`]]: !!variation,
                        [css[`round_${round}`]]: !!round,
                    },
                    className,
                )}
                style={blockStyle}
            />
        );
    },
);
