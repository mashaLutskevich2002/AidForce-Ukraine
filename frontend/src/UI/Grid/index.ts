import { FC } from 'react';
import { Grid as EGrid, GridItem as EGridItem, GridItemProps, GridProps } from 'evokit-grid';

import './style.css?global';

export const GridItem: FC<GridItemProps> = EGridItem;
export const Grid: FC<GridProps> & { Item: typeof GridItem } = EGrid;

Grid.Item = GridItem;
