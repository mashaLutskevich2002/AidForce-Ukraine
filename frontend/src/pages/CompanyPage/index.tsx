import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Collection } from '../CatalogCollectionsPage/types';
import { User } from '../../hooks/useAuthUser';
import { Picture } from '../../components/Picture';
import moment from 'moment';
import 'moment/locale/uk';

export const CompanyPage = () => {
    const [user, setUser] = useState<User>();
    const [collections, setCollections] = useState<Collection[]>([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const response = await axios.get(`/api/company/${id}`);
                const { user, collections } = response.data;
                setUser(user);
                setCollections(collections);
                // @ts-ignore
            } catch (error: any) {
                console.error('Error:', error.response.data.error);
            }
        };

        fetchCompanyInfo();
    }, [id]);

    const countReports = collections.reduce((count, obj) => {
        if (obj.report) {
            return count + 1;
        }
        return count;
    }, 0);
    // const date = new Date(user?.createdAt);
    moment.locale('uk');
    const formattedDate = moment(user?.createdAt).format('DD MMMM YYYY');
    console.log(formattedDate);

    // const options = { day: "numeric", month: "long" };
    // const formattedDate = user?.createdAt.toLocaleDateString("uk-UA", options);

    // console.log(formattedDate);

    return (
        <div>
            <h2>Компанія: {`${user?.name} ${user?.last_name}`}</h2>
            <Picture width='100px' roundedCircle src={user?.photoUrl!} />
            <h3>Компанія створена {formattedDate}</h3>
            <h3>Зборів створено: {collections.length}</h3>
            <h3>Фотозвітів зроблено: {countReports}</h3>
            <h3>Збори {user?.role === 'military' ? 'військового' : 'волонтера'}:</h3>
            <ul>
                {collections.map((collection) => (
                    <li key={collection._id}>{collection.title}</li>
                ))}
            </ul>
        </div>
    );
};
