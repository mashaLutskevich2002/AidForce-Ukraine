import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../index';

describe('<Button />', () => {
    test('Button render', () => {
        render(<Button>кнопка</Button>);
        expect(screen.getByText('кнопка')).toBeInTheDocument();
    });
    test('Button render with loading', () => {
        render(<Button loading>кнопка</Button>);
        expect(screen.getByTestId('preloader')).toBeInTheDocument();
    });
    test('Button render with disabled', () => {
        render(<Button disabled>кнопка</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toBe('wrapper disabled');
    });
    test('Button render with theme red', () => {
        render(<Button theme='red'>кнопка</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toBe('wrapper theme_red');
    });
    test('Button render with size fluid', () => {
        render(<Button size='fluid'>кнопка</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toBe('wrapper size_fluid');
    });
    test('Button render with check handle onClick', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>кнопка</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test('Button render with qaId', () => {
        render(<Button qaId='button'>кнопка</Button>);
        expect(screen.getByTestId('button')).toBeInTheDocument();
    });
    test('Button render href', () => {
        render(
            <MemoryRouter>
                <Button href='/' qaId='button'>
                    href
                </Button>
            </MemoryRouter>,
        );
        expect(screen.getByTestId('button')).toBeInTheDocument();
    });
    test('Button render href isAbsolute', () => {
        render(
            <MemoryRouter>
                <Button href='/' qaId='button' isAbsoluteUrl>
                    href isAbsoluteUrl
                </Button>
            </MemoryRouter>,
        );
        expect(screen.getByTestId('button')).toBeInTheDocument();
    });
});
