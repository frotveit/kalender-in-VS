import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import Calendar from './components/Calendar/Calendar';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={Counter} />
    <Route path='/calendar' component={Calendar} />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
</Layout>;
