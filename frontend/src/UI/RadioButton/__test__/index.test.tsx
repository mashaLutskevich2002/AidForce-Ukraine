import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { RadioButton } from '../index';

describe('<RadioButton />', () => {
    test('RadioButton render', () => {
        const handle = jest.fn();
        render(<RadioButton id='radio-button' value={0} title='text' handleChange={handle} name='str' />);
        expect(screen.getByText('text')).toBeInTheDocument();
        const element = document.getElementById('radio-button') as HTMLInputElement;
        expect(element).toBeInTheDocument();
        fireEvent.change(element);
    });
});
