import React from 'react';
import { render, screen } from '@testing-library/react';

import { Text } from '../index';

describe('<Text />', () => {
    test('Text component render', () => {
        render(<Text>Какойто текст</Text>);
        expect(screen.getByText('Какойто текст')).toBeInTheDocument();
    });
});
