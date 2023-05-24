import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { CreateCollectionPage } from './pages/CreateCollectionPage';
import { CatalogCollectionsPage } from './pages/CatalogCollectionsPage';
import { CollectionPage } from './pages/CollectionPage';
import { CloseCollectionPage } from './pages/CloseCollectionPage';
import { CabinetPage } from './pages/CabinetPage';
import { CabinetMainCollections } from './pages/CabinetLayoutPage/views/CabinetMainCollections';
import { CabinetMainSetupProfile } from './pages/CabinetLayoutPage/views/CabinetMainSetupProfile';
import { EditPage } from './pages/EditPage';

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
                <Route path='/cabinet' Component={CabinetPage}>
                    <Route path='/cabinet/collections' Component={CabinetMainCollections} />
                    <Route path='/cabinet/setupProfile' Component={CabinetMainSetupProfile} />
                    <Route path='/cabinet/setupProfile/edit' Component={CabinetMainSetupProfile} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
