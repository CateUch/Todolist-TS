import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react/types-6-0';
import AppWithRedux from '../AppWithRedux';
import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Todolist/AppWithReduxStories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxStories = (props: any) => {
    return (<AppWithRedux />)
}