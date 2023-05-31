import * as React from 'react';
import './Footer.css';
import { Grid } from '../../UI';

export const Footer = () => {
    return (
        <footer>
            <Grid className='contact-info' grid-indent='l' grid-align='center' grid-valign='middle'>
                <Grid.Item>
                    <a href='mailto:masha.lutskevich@gmail.com'>
                        <i className='fas fa-envelope'></i> masha.lutskevich@gmail.com
                    </a>
                </Grid.Item>
                <Grid.Item>
                    <a href='tel:+380952472697'>
                        <i className='fas fa-phone'></i> +380952472697
                    </a>
                </Grid.Item>
                <Grid.Item>
                    <a href='https://telegram.me/ave_mary'>
                        <i className='fab fa-telegram'></i> Telegram
                    </a>
                </Grid.Item>
            </Grid>
        </footer>
    );
};
