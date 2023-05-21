import React from 'react';
import { render, screen } from '@testing-library/react';

import { List, ListItem } from '../index';

describe('<List />', () => {
    test('List render ', () => {
        render(
            <List qaId='list'>
                <ListItem qaId='list-item-1'>1</ListItem>
                <ListItem qaId='list-item-2'>2</ListItem>
            </List>,
        );
        expect(screen.getByTestId('list')).toBeInTheDocument();
        expect(screen.getByTestId('list-item-1')).toBeInTheDocument();
        expect(screen.getByTestId('list-item-2')).toBeInTheDocument();
    });
    test('List render with indent', () => {
        render(
            <List indent='xs' qaId='list'>
                <ListItem qaId='list-item-1'>1</ListItem>
                <ListItem qaId='list-item-2'>2</ListItem>
            </List>,
        );

        const listWrapper = screen.getByTestId('list') as HTMLUListElement;
        expect(listWrapper).toBeInTheDocument();
        expect(listWrapper.className).toBe('wrapper indent_xs');
    });
    test('List render with indent icon', () => {
        render(
            <List indent='xs' qaId='list' icon='dash'>
                <ListItem qaId='list-item-1'>1</ListItem>
                <ListItem qaId='list-item-2'>2</ListItem>
            </List>,
        );

        const listWrapper = screen.getByTestId('list') as HTMLUListElement;
        expect(listWrapper).toBeInTheDocument();
        expect(listWrapper.className).toBe('wrapper indent_xs icon_dash');
    });
});
