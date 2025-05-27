'use client'

import React, { FC, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type CustomEditorProps = {
    data: string
    maxLength?: number
    disabled?: boolean
    onChangeData: (data: string) => void
}

const CustomEditor: FC<CustomEditorProps> = ({
    data,
    maxLength,
    disabled,
    onChangeData
}) => {
    const [editorValue, setEditorValue] = useState(data);
    const [length, setLength] = useState(0);

    useEffect(() => {
        const textLength = getTextLength(data);
        setLength(textLength);
        setEditorValue(data);
    }, [data]);

    const getTextLength = (html: string) =>
        new DOMParser().parseFromString(html, 'text/html').body.textContent?.trim().length || 0;

    const handleInit = (_evt: any, editor: any) => {
        const textLength = getTextLength(editor.getContent());
        setLength(textLength);
    };

    const handleUpdate = async (value: string, editor: any) => {
        const textLength = getTextLength(editor.getContent());
        if (!maxLength || textLength <= maxLength) {
            setEditorValue(value);
            setLength(textLength);
        }
    };

    const handleBlur = (_evt: any, editor: any) => {
        const value = editor.getContent();
        onChangeData(value);
    };

    return (
        <>
            <div className='position-relative w-full'>
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
                    initialValue={data}
                    value={editorValue}
                    init={INIT}
                    onInit={handleInit}
                    onEditorChange={handleUpdate}
                    onBlur={handleBlur}
                    disabled={disabled}
                />
                {
                    maxLength && <small style={{ right: "45%", bottom: '5px' }} className='position-absolute ps-1 uppercase text-xs'>
                        Max Characters: {maxLength} - Remaining: {maxLength - length}
                    </small>
                }
            </div>
        </>
    );
};

export default CustomEditor;

const INIT = {
    height: 300,
    menubar: false,
    toolbar: 'undo redo | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_style: 'body { font-family: Helvetica,Arial,sans-serif; font-size:14px; }'
};
