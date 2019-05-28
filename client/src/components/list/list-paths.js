import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ListCreate from './list-create/list-create';
import ListAll from './list-all/list-all';
import ListDetails from './list-details/list-details';

const ListPaths = (props) => {
    const { path } = props.match;

    return (
        <Switch>
            <Route path={`${path}/create`} component={ListCreate}/>
            <Route path={`${path}/myLists`} component={ListAll}/>
            <Route path={`${path}/details/:id`} component={ListDetails}/>
        </Switch>
    );
};

export default ListPaths;