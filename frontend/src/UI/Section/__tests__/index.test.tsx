import React from 'react';
import { render } from '@testing-library/react';

import { Section } from '../index';

describe('<Section />', () => {
    test('Section render', () => {
        render(<Section>children</Section>);

        const section = document.getElementsByTagName('div')[1];
        expect(section.className).toBe('wrapper');
    });
    test('Section render with height 100%', () => {
        render(<Section height='1-1'>children</Section>);

        const section = document.getElementsByTagName('div')[1];
        expect(section.className).toBe('wrapper height_1-1');
    });
    test('Section render with height with padding xs when media small', () => {
        render(<Section padding='xs_small'>children</Section>);

        const section = document.getElementsByTagName('div')[1];
        expect(section.className).toBe('wrapper padding_xs_small');
    });
    test('Section render with height with padding none when media small', () => {
        render(<Section padding='none_small'>children</Section>);

        const section = document.getElementsByTagName('div')[1];
        expect(section.className).toBe('wrapper padding_none_small');
    });
});
