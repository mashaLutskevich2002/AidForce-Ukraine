import React from 'react';
import { render, screen } from '@testing-library/react';

import { Box } from '../index';

describe('<Box />', () => {
    test('Box render', () => {
        render(<Box>qwe</Box>);
        expect(screen.getByText('qwe')).toBeInTheDocument();
    });
    test('Box render margin', () => {
        render(<Box margin={['m', 'm', 'm']}>qwe</Box>);
        expect(screen.getByText('qwe')).toBeInTheDocument();
    });
});
