import React from 'react';
import { render, screen } from '@testing-library/react';

import { Textarea } from '../index';

describe('<Textarea />', () => {
    test('Textarea render', () => {
        render(<Textarea value='qwe' onChange={() => jest.fn()} qaId='textarea' />);

        expect(screen.getByTestId('textarea')).toBeInTheDocument();
    });
});
