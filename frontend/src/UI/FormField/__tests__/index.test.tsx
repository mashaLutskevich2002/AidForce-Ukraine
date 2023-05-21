import React from 'react';
import { render, screen } from '@testing-library/react';

import { FormField } from '../index';

describe('<FormField />', () => {
    test('FormField render', () => {
        render(<FormField>input</FormField>);
        expect(screen.getByText('input')).toBeInTheDocument();
    });
    test('FormField render with title', () => {
        render(<FormField title='title'>input</FormField>);
        expect(screen.getByText('title')).toBeInTheDocument();
    });
    test('FormField render with error', () => {
        render(<FormField error='error'>input</FormField>);
        expect(screen.getByText('error')).toBeInTheDocument();
    });
    test('FormField render without children', () => {
        render(<FormField />);
    });
    test('FormField render without children with title', () => {
        render(<FormField title='title' />);
    });
});
