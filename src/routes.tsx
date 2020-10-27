import React from 'react';

import {Route, Switch, useLocation} from 'react-router-dom';

import {AnimatePresence} from 'framer-motion';

import NoteList from './pages/note_list';
import TodoList from './pages/todo_list';
import NoteCreate from './pages/note_create';

export default function Routes(){

    const location = useLocation();

    return(
        <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
                    <Route path='/' exact component={NoteList}/>
                    <Route path='/todolist/:id' component={TodoList}/>
                    <Route path='/createNote' component={NoteCreate}/>
            </Switch>
        </AnimatePresence>
    );
}