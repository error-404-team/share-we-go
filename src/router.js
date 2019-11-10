import React from 'react';
import Login from './pages/login';
import Private from './pages/private';
import Profile from './pages/profile';
import DocTaxi from './pages/doc_taxi';
import ShareLocation from './pages/share_location';
import History from './pages/history';

export const routerPublic = [
    {
        path: "/",
        exact: true,
        page: () => (<Login />)
    },
    {
        path: "/login",
        page: () => (<Login />)
    }
];

export const routerPrivate = [
    {
        path: "/",
        exact: true,
        page: () => (<Private />)
    },
    {
        path: "/private",
        page: () => (<Private />)
    },
    {
        path: "/profile/:id",
        page: ({ match }) => {
            return (<Profile match={{...match}} />)
        }
    },
    {
        path: "/share_location",
        page: () => (<ShareLocation />)
    },
    {
        path: "/history",
        page: () => (<History />)
    },
    {
        path: "/doc_taxi",
        page: () => (<DocTaxi />)
    }
]