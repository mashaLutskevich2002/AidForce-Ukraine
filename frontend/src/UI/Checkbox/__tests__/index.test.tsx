import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Checkbox } from '../index';

describe('<Checkbox />', () => {
    const handleClick = jest.fn();
    test('Checkbox render', () => {
        render(
            <Checkbox qaId='checkbox' checked={false} onChange={handleClick}>
                title
            </Checkbox>,
        );
        expect(screen.getByText('title')).toBeInTheDocument();
        expect(screen.getByTestId('checkbox')).toBeInTheDocument();
        expect(screen.getByTestId('checkbox-label')).toBeInTheDocument();
    });
    test('Checkbox render handle click', () => {
        render(
            <Checkbox qaId='checkbox' checked={false} onChange={handleClick}>
                title
            </Checkbox>,
        );
        fireEvent.click(screen.getByTestId('checkbox'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
