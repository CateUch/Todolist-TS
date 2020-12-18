import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react/types-6-0';
import App from './App';
import { ReduxStoreProviderDecorator } from '../stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Todolist/AppWithReduxStories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

export const AppWithReduxStories = (props: any) => {
    return (<App />)
}