import React from 'react';
import { render, screen } from '@testing-library/react';

import { Badge } from '../index';

describe('<Badge />', () => {
    test('Badge render without count', () => {
        render(<Badge theme='red' count={0} />);
        expect(screen.queryByTestId('badge-count')).not.toBeInTheDocument();
    });
    test('Badge render with count', () => {
        render(<Badge theme='red' count={2} />);

        expect(screen.queryByTestId('badge-count')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('Badge render with red theme', () => {
        render(<Badge theme='red' count={2} />);

        const label = screen.getByTestId('badge-count');
        expect(label.className).toBe('label theme_red');
    });
    test('Badge render with red yellow', () => {
        render(<Badge theme='yellow' count={2} />);

        const label = screen.getByTestId('badge-count');
        expect(label.className).toBe('label theme_yellow');
    });

    test('Badge render isAbsolutePosition', () => {
        render(<Badge theme='yellow' count={2} isAbsolutePosition />);

        const label = screen.getByTestId('badge-count');
        expect(label.className).toBe('label theme_yellow labelPosition');
    });
});
