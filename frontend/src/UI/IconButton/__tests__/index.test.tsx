import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { IconButton } from '../index';

describe('<IconButton />', () => {
    test('IconButton render', () => {
        render(<IconButton qaId='button'>нажми меня</IconButton>);
        expect(screen.getByTestId('button')).toBeInTheDocument();
        expect(screen.getByText(/нажми меня/)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    test('IconButton render click event', () => {
        const handleClick = jest.fn();
        render(
            <IconButton qaId='button' onClick={handleClick}>
                нажми меня
            </IconButton>,
        );
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
