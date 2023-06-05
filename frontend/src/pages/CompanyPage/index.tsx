import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Collection } from '../CatalogCollectionsPage/types';
import { User } from '../../hooks/useAuthUser';
import { Picture } from '../../components/Picture';
import moment from 'moment';
import 'moment/locale/uk';
import './CompanyPage.css'
import { CatalogCollectionItem } from "../CatalogCollectionsPage/views/CatalogCollectionItem";

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
    moment.locale('uk');
    const formattedDate = moment(user?.createdAt).format('DD MMMM YYYY');

    return (
          <div className="company-page">
            <div className="company-info">
              <div className="profile-picture">
                <Picture width='100px' roundedCircle src={user?.photoUrl!} />
              </div>
              <div>
                <h2 className="company-name">Компанія: {`${user?.name} ${user?.last_name}`}</h2>
                <h5 className="company-name" >Телефон: <a href={`tel:${user?.phone}`}>{user?.phone}</a></h5>
                <h5 className="company-name" >Роль:  {user?.role=== 'military'? 'Військовий': 'Волонтер'}</h5>
              </div>
            </div>
            <div className="company-stats">
              <div className="stat-block">
                <h3>Компанія створена</h3>
                <p>{formattedDate}</p>
              </div>
            <div className="stat-block">
              <h3>Зборів створено</h3>
              <p>{collections.length}</p>
            </div>
            <div className="stat-block">
              <h3>Фотозвітів зроблено</h3>
              <p>{countReports}</p>
            </div>
            </div>
            <div className="company-collections">
              <h3>Збори {user?.role === 'military' ? 'військового' : 'волонтера'}</h3>
              <div className='card-container m-auto'>
                {collections.map((collection) => (
                  <CatalogCollectionItem item={collection}/>
                ))}
              </div>
            </div>
          </div>
    );
};
