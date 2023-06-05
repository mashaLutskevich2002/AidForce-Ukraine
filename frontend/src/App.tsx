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
import { CabinetMainApplication } from './pages/CabinetLayoutPage/views/CabinetMainApplication';
import { CompanyPage } from './pages/CompanyPage';
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
            <Routes>
                <Route path='/' Component={MainPage} />
                <Route path='/login' Component={LoginPage} />
                <Route path='/registration' Component={RegistrationPage} />
                <Route path='/createCollection' Component={CreateCollectionPage} />
                <Route path='/catalogCollections' Component={CatalogCollectionsPage} />
                <Route path='/collection/:id' Component={CollectionPage} />
                <Route path='/closeCollection/:id' Component={CloseCollectionPage} />
                <Route path='/company/:id' Component={CompanyPage} />
                <Route path='/cabinet' Component={CabinetPage}>
                    <Route path='/cabinet/collections' Component={CabinetMainCollections} />
                    <Route path='/cabinet/setupProfile' Component={CabinetMainSetupProfile} />
                    <Route path='/cabinet/setupProfile/edit' Component={CabinetMainSetupProfile} />
                    <Route path='/cabinet/adminApplications' Component={CabinetMainCollections} />
                    <Route path='/cabinet/applications' Component={CabinetMainApplication} />
                </Route>
            </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
