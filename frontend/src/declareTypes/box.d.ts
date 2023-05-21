declare module 'evokit-box' {
    import { FC, ReactNode } from 'react';

    type BoxProps = {
        className?: string;
        'box-align'?: string;
        'box-margin'?: (string | null)[] | string;
        'box-padding'?: string[] | string | number;
        children: ReactNode | ReactNode[];
    };
    export const Box: FC<BoxProps>;
}
