import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { CreateCollectionPage } from './pages/CreateCollectionPage';
import { CatalogCollectionsPage } from './pages/CatalogCollectionsPage';
import { CollectionPage } from './pages/CollectionPage';
import { CloseCollectionPage } from './pages/CloseCollectionPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={MainPage} />
                <Route path='/login' Component={LoginPage} />
                <Route path='/registration' Component={RegistrationPage} />
                <Route path='/createCollection' Component={CreateCollectionPage} />
                <Route path='/catalogCollections' Component={CatalogCollectionsPage} />
                <Route path='/collection/:id' Component={CollectionPage} />
                <Route path='/closeCollection/:id' Component={CloseCollectionPage} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
