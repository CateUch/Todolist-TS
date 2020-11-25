import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react/types-6-0';
import { EditableSpan } from '../EditableSpan';

export default {
    title: 'Todolist/EditableSpanStories',
    component: EditableSpan
}

export const EditableSpanStories = (props: any) => {
    return ( <EditableSpan title={'StartValue'} onChange={action('Value changed')}/>
    )
}