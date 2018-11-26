import React from 'react';
import { BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom';
import App from './components/Main/App';
import MainLogin from './components/Main/MainLogin'
import Loadable from 'react-loadable';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
)

const loadAsync = (opts) => {
    return Loadable(Object.assign({
        loading: () => {
            return (
                // <Loading/>
                <div>...Loading</div>
            )
        }
    }, opts));
}

export default () => {
    return (
        <BrowserRouter>

            <Switch>
                <AppRoute exact path="/dashboard" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/login" layout={App} component={loadAsync({ loader: () => import('./components/Login/Login') })} />

                <AppRoute exact path="/register" layout={App} component={loadAsync({ loader: () => import('./components/Register') })} />

                {/* <AppRoute exact path="/forgot-password" layout={MainLogin} component={loadAsync({ loader: () => import('./components/ForgotPassword') })} />

                <AppRoute exact path="/reset-password/:code" layout={MainLogin} component={loadAsync({ loader: () => import('./components/ForgotPassword/ResetPassword') })} /> */}


                <AppRoute exact path="/distributor/new" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/distributor/list" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />


                <AppRoute exact path="/provider/new" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/provider/list" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />


                <AppRoute exact path="/product/new" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/product/list" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />


                <AppRoute exact path="/supermarket/new" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/supermarket/list" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />


                <AppRoute exact path="/container/new" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/container/list" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/container/report" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />


                <AppRoute exact path="/order/receiver" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/order/ordder" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

                <AppRoute exact path="/order/export" layout={App} component={loadAsync({ loader: () => import('./components/Dashboard') })} />

            </Switch>

        </BrowserRouter>
    )
}