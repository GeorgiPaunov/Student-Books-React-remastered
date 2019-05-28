import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BookDetails from './book-details/book-details';
import BookCreate from './book-create/book-create';
import BookEdit from './book-edit/book-edit';
import BookDelete from './book-delete/book-delete';

const BookPaths = (props) => {
    const { path } = props.match;

    return (
        <Switch>
            <Route path={`${path}/create`} component={BookCreate} />
            <Route path={`${path}/details/:id`} component={BookDetails} />
            <Route path={`${path}/edit/:id`} component={BookEdit} />
            <Route path={`${path}/delete/:id`} component={BookDelete} />
        </Switch>
    );
};

export default BookPaths;