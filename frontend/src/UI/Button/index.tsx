import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import css from './Button.css';

interface ButtonTypes {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: () => void;
    theme?: 'red' | 'white' | 'gray' | 'red-border';
    size?: 'fluid' | 'small';
    qaId?: string;
    href?: string | null;
    mode?: 'link' | null;
    isAbsoluteUrl?: boolean;
    target?: string;
    className?: string;
    children: ReactNode;
}

export const Button = ({
    children,
    type = 'button',
    disabled = false,
    onClick,
    theme,
    size,
    qaId,
    href,
    mode = null,
    isAbsoluteUrl = false,
    target,
    className,
}: ButtonTypes) => {
    const classes = !!mode
        ? classNames(css.link, {
              [css.disabled]: disabled,
          })
        : classNames(
              css.wrapper,
              {
                  [css[`theme_${theme}`]]: !!theme,
                  [css[`size_${size}`]]: !!size,
                  [css.disabled]: disabled,
              },
              className,
          );

    if (href) {
        if (isAbsoluteUrl) {
            return (
                <Link onClick={onClick} to={href} data-qaid={qaId} className={classes}>
                    {children}
                </Link>
            );
        }
        return (
            <a onClick={onClick} href={href} data-qaid={qaId} className={classes} target={target}>
                {children}
            </a>
        );
    }
    return (
        <button data-qaid={qaId} onClick={onClick} type={type} className={classes}>
            <span className={classNames(css.spanWrapper, {})}>{children}</span>
        </button>
    );
};
