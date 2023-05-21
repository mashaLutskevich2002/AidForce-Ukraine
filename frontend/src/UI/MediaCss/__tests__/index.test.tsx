import React from 'react';
import { render, screen } from '@testing-library/react';

import { MediaCss } from '../index';

describe('<MediaCss />', () => {
    test('MediaCss render', () => {
        render(<MediaCss hide='large'>test</MediaCss>);
        const element = screen.getByText('test');
        expect(element.className).toBe('hide_large');
    });
});
