import React from 'react';
import { render } from '@testing-library/react';

import { Line } from '../index';

describe('<Line />', () => {
    test('Line render', () => {
        render(<Line />);
    });
});
