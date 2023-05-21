import React from 'react';
import { render, screen } from '@testing-library/react';

import { Viewport } from '../index';

describe('<Viewport />', () => {
    test('Viewport render', () => {
        render(
            <Viewport
                qaId='test-component'
                render={({ visible }) => {
                    if (!visible) return <div>none visible</div>;
                    return <div>visible</div>;
                }}
            />,
        );
        expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
});
