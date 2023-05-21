import React from 'react';
import { render, screen } from '@testing-library/react';

import { Input } from '../index';

describe('<Input />', () => {
    test('Input render', () => {
        render(<Input qaId='input' value='' onChange={() => jest.fn()} error={false} />);

        expect(screen.getByTestId('input')).toBeInTheDocument();
    });
    test('Input render with placeholder', () => {
        render(<Input qaId='input' value='' onChange={() => jest.fn()} error={false} placeholder='placeholder' />);

        expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
    });
    test('Input render with value', () => {
        render(<Input qaId='input' value='value' onChange={() => jest.fn()} error={false} placeholder='placeholder' />);
        const inputValue = screen.getByDisplayValue('value');
        expect(inputValue).toBeInTheDocument();
    });
});
