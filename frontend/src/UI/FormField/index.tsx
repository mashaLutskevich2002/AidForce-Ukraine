import React, { ReactNode } from 'react';

import { Box } from '../Box';
import { Text } from '../Text';

interface FormFieldProps {
    children?: ReactNode;
    error?: string | null;
    title?: string | ReactNode;
    required?: boolean;
}

export const FormField = ({ children, error, title, required }: FormFieldProps) => (
    <>
        {!!title && (
            <Box box-margin={children ? [null, null, 'xs', null] : undefined}>
                <Text>
                    {title}
                    {required && (
                        <Text color='red' weight='bold'>
                            {' *'}
                        </Text>
                    )}
                </Text>
            </Box>
        )}
        {!!error && (
            <Box box-margin={['xxs', null, 'xxs', null]}>
                <Text color='error' qaId='alert-message'>
                    {error}
                </Text>
            </Box>
        )}
        {children}
    </>
);
