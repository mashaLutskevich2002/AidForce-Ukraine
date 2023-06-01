import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Grid } from '../../../UI';
import axios from 'axios';
import {  useState } from 'react';
import { useAuthUser } from '../../../hooks/useAuthUser';

interface ButtonsPanelProps {
    id: string;
    setStatus: (status: string) => void;
    status: string;
}
export const ButtonsPanel = ({ id, setStatus, status }: ButtonsPanelProps) => {
    const [, setIsLoading] = useState(false);
    const { user } = useAuthUser();

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, status: string) => {
        console.log(status);
        e.preventDefault();
        setIsLoading(true);
        try {
            // @ts-ignore
            const response = await axios.put(
                `/api/application/changeStatus`,
                {
                    id,
                    status,
                },
                // @ts-ignore
                {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${user?.token}`,
                    },
                },
            );
            setStatus(response.data.status);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Grid grid-indent='xs' grid-align='center'>
                <Grid.Item>
                    <Button
                        disabled={Boolean(status !== 'Нове')}
                        type='submit'
                        variant='danger'
                        onClick={(e) => onSubmit(e, 'Відхилено')}
                    >
                        <Grid grid-indent='xs' grid-valign='middle' grid-align='justify'>
                            <Grid.Item>
                                <span> Відхилити</span>
                            </Grid.Item>
                            <Grid.Item>
                                <svg
                                    fill='white'
                                    width='14px'
                                    height='14px'
                                    viewBox='0 0 16 16'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M4 0H0v10h4v6h6v-4h6V0H4zm2 14V2h8v1h-2v2h2v1h-2v2h2v2H8v4H6zM2 8V2h2v6H2z'
                                        fill-rule='evenodd'
                                    />
                                </svg>
                            </Grid.Item>
                        </Grid>
                    </Button>
                </Grid.Item>
                <Grid.Item>
                    <Button
                        disabled={Boolean(status !== 'Нове')}
                        type='submit'
                        variant='success'
                        onClick={(e) => onSubmit(e, 'Одобрено')}
                    >
                        <Grid grid-indent='xs' grid-valign='middle' grid-align='justify'>
                            <Grid.Item>
                                <span> Одобрити</span>
                            </Grid.Item>
                            <Grid.Item>
                                <svg
                                    fill='white'
                                    width='14px'
                                    height='14px'
                                    viewBox='0 0 16 16'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M4 16H0V6h4V0h6v4h6v12H4zM6 2v12h8v-1h-2v-2h2v-1h-2V8h2V6H8V2H6zM2 8v6h2V8H2z'
                                        fill-rule='evenodd'
                                    />
                                </svg>
                            </Grid.Item>
                        </Grid>
                    </Button>
                </Grid.Item>
            </Grid>
        </>
    );
};
