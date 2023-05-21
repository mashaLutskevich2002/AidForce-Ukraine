import React from 'react';
import { render, screen } from '@testing-library/react';

import { Skeleton } from '../index';

describe('<Skeleton />', () => {
    test('Skeleton component render', () => {
        render(<Skeleton qaId='skeleton' />);
        const element = screen.getByTestId('skeleton');
        expect(element).toBeInTheDocument();
    });
});
