import React from 'react';
import { render, screen } from '@testing-library/react';

import { Link } from '../index';

describe('<Link />', () => {
    test('Link component render', () => {
        render(<Link href='https://bigl.ua/'>Сылочка</Link>);
        expect(screen.getByText('Сылочка')).toBeInTheDocument();
    });
});
