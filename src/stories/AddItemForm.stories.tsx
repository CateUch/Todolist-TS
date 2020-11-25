import React from 'react';
import {action} from '@storybook/addon-actions';
import { AddItemForm } from '../AddItemForm';
import { Meta } from '@storybook/react/types-6-0';


export default {
    title: 'Todolist/AddItemFormStoryBook',
    component: AddItemForm
} as Meta;

export const AddItemFormStoryBook = (props: any) => {
    return ( <AddItemForm
        addItem={action('Button inside form clicked')}
        />
    )
}
