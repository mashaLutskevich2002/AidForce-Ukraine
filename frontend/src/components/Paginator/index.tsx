import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './Paginator.css';
import { useNavigate } from 'react-router';

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Paginator = ({ currentPage, totalPages, onPageChange }: PaginatorProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageParam = searchParams.get('page');
        const page = pageParam ? parseInt(pageParam, 10) : 1;

        onPageChange(page);
    }, [location.search, onPageChange]);

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);

            const searchParams = new URLSearchParams(location.search);
            searchParams.set('page', page.toString());

            navigate({ search: searchParams.toString() });
        }
    };

    const renderPages = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={i === currentPage ? 'active' : ''}>
                    <button onClick={() => handlePageClick(i)}>{i}</button>
                </li>,
            );
        }

        return pages;
    };

    return (
        <ul className='paginator'>
            <li>
                <button disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)}>
                    Previous
                </button>
            </li>
            {renderPages()}
            <li>
                <button disabled={currentPage === totalPages} onClick={() => handlePageClick(currentPage + 1)}>
                    Next
                </button>
            </li>
        </ul>
    );
};

export default Paginator;
