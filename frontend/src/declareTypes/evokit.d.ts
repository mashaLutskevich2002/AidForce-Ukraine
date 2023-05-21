declare module 'evokit-grid' {
    import { FC, ReactNode } from 'react';

    type GridProps = {
        className?: string;
        'grid-as'?: string;
        'grid-align'?: string[] | string;
        'grid-column'?: string[] | string | number;
        'grid-direction'?: string[] | string;
        'grid-display'?: string[] | string;
        'grid-divider'?: string[] | string;
        'grid-indent'?: string[] | string;
        'grid-valign'?: string[] | string;
        'grid-wrap'?: string[] | string;
        'grid-divider-column'?: string[] | string | number;
        'grid-height'?: string;
        children: ReactNode | ReactNode[];
    };
    type GridItemProps = {
        className?: string;
        onClick?: () => void;
        'grid-item-as'?: string;
        'grid-item-order'?: string[] | string;
        'grid-item-width'?: string[] | string;
        'grid-item-display'?: string[] | string;
        children: ReactNode;
    };

    const GridItem: FC<GridItemProps>;

    export const Grid: FC<GridProps> & { Item: GridItem };
}
