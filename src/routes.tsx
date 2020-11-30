import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';

import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

import Login from './pages/user/Login';
import ForgotPassword from './pages/user/ForgotPassword';
import passwordRedefined from './pages/user/PasswordRedefined';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />

                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" exact component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />

                <Route path="/users/login" exact component={Login} />
                <Route path="/users/forgotpassword" exact component={ForgotPassword} />
                <Route path="/users/password" exact component={passwordRedefined} />

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;