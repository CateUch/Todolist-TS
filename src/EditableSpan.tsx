import React, { useState, ChangeEvent, useCallback } from 'react';

export type EditableSpanType = {
    title: string
    onChange: (value: string) => void
};
export const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log("EditableSpan")

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    };
    const deActivateEditMode = () => {
        if (title.trim()) {
            props.onChange(title);
        } else {
            setTitle(props.title);
        }
        setEditMode(false);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={deActivateEditMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}
)