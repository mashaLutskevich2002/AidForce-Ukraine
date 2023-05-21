import React from 'react';
import { render } from '@testing-library/react';

import { Grid } from '../index';

describe('<Grid />', () => {
    test('Grid component render', () => {
        render(<Grid>qwe</Grid>);
    });
});
