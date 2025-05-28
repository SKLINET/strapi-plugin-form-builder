import { useState } from 'react';
import { UseBuiltFormProps } from '../../../hooks/useBuiltForm';
import { useNotification } from '@strapi/strapi/admin';
import { Flex } from '../../primitives/Flex/Flex';
import { IBuiltForm, IFormField } from '../../../types/form';
import { IApp } from '../../../types/app';
import { Topbar } from '../../organisms/Topbar/Topbar';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { getLocale } from '../../../utils/getLocale';
import { Controller } from '../../organisms/Controller/Controller';
import { FieldAttributes } from '../../organisms/FieldAttributes/FieldAttributes';
import { v4 as uuidv4 } from 'uuid';
import { labelToJsonAttribute } from '../../../utils/labelToJsonAttribute';

interface BuilderProps {
    form: IBuiltForm;
    controls: UseBuiltFormProps;
    updateForm: (data: IBuiltForm) => void;
}

const Builder = ({ form, controls, updateForm }: BuilderProps) => {
    const [formData, setFormData] = useState(form.data || []);

    const [activeField, setActiveField] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const { toggleNotification } = useNotification();

    const locale = getLocale();

    const addField = (type: IFormField['type']) => {
        switch (type) {
            case 'textinput':
            case 'textarea':
            case 'email':
            case 'phone': {
                const newField: IFormField = {
                    id: uuidv4(),
                    name: null,
                    type: type,
                    label: null,
                    placeholder: null,
                    required: false,
                };

                setFormData([...formData, newField]);

                return;
            }
            case 'checkbox': {
                const newField: IFormField = {
                    id: uuidv4(),
                    name: null,
                    type: type,
                    label: null,
                    required: false,
                };

                setFormData([...formData, newField]);

                return;
            }
            case 'file': {
                const newField: IFormField = {
                    id: uuidv4(),
                    name: null,
                    type: type,
                    label: null,
                    placeholder: null,
                    required: false,
                    maxFileCount: 1,
                    allowedFileTypes: null,
                    maxFileSize: null,
                };

                setFormData([...formData, newField]);

                return;
            }
            case 'select': {
                const newField: IFormField = {
                    id: uuidv4(),
                    name: null,
                    type: type,
                    label: null,
                    placeholder: null,
                    required: false,
                    options: [],
                };

                setFormData([...formData, newField]);

                return;
            }
            case 'submit':
            case 'title':
            case 'message': {
                const newField: IFormField = {
                    id: uuidv4(),
                    type: type,
                    label: null,
                };

                setFormData([...formData, newField]);

                return;
            }
            case 'divider': {
                const newField: IFormField = {
                    id: uuidv4(),
                    type: type,
                };

                setFormData([...formData, newField]);

                return;
            }
            default:
                return <></>;
        }
    };

    const onFieldChange = (key: string, value: any) => {
        const processValue = () => {
            if (Array.isArray(value)) {
                return value;
            } else {
                switch (typeof value) {
                    case 'string':
                        return value.length > 0 ? value : null;
                    case 'boolean':
                        return value || false;
                    case 'number':
                        return Math.floor(value);
                    default:
                        return null;
                }
            }
        };

        setFormData((prev) =>
            prev.map((item) => {
                if (item.id === activeField) {
                    return { ...item, [key]: processValue() };
                }
                return item;
            }),
        );
    };

    const removeField = (id: string) => {
        setFormData((prev) => prev.filter((field) => field.id !== id));
        if (id === activeField) {
            setActiveField(null);
        }
    };

    const moveFieldUp = () => {
        if (!activeField) return;
        const index = formData.findIndex((field) => field.id === activeField);
        if (index > 0) {
            const newFormData = [...formData];
            const fieldToMove = newFormData[index];
            newFormData[index] = newFormData[index - 1];
            newFormData[index - 1] = fieldToMove;
            setFormData(newFormData);
        }
    };

    const moveFieldDown = () => {
        if (!activeField) return;
        const index = formData.findIndex((field) => field.id === activeField);
        if (index < formData.length - 1) {
            const newFormData = [...formData];
            const fieldToMove = newFormData[index];
            newFormData[index] = newFormData[index + 1];
            newFormData[index + 1] = fieldToMove;
            setFormData(newFormData);
        }
    };

    const successMessage = getSystemResource('success.message');
    const errorMessage = getSystemResource('error.message');

    const saveForm = async () => {
        setLoading(true);

        const data = formData.reduce((prev, next) => {
            let name: string | null | undefined = undefined;

            switch (next.type) {
                case 'textinput':
                case 'textarea':
                case 'email':
                case 'phone':
                case 'checkbox':
                case 'file':
                case 'select':
                    name = next.name || (next.label ? labelToJsonAttribute(next.label) : null);
                    break;
            }

            if (typeof name === 'undefined') return [...prev, next];

            return [...prev, { ...next, name: name }];
        }, [] as IFormField[]);

        const newForm = await controls.updateForm(form.documentId, {
            data: data,
            locale: locale,
        });

        if (newForm) {
            updateForm({ ...newForm });
            setFormData([...(newForm.data || [])]);

            toggleNotification({
                type: 'success',
                message: successMessage,
            });
        } else {
            toggleNotification({
                type: 'danger',
                message: errorMessage,
            });
        }

        setLoading(false);
    };

    const app: IApp = {
        form: form,
        fields: formData,
        activeField: activeField,
        unsavedChanges: JSON.stringify(formData) !== JSON.stringify(form.data),
        loading: loading,
        controls: {
            addField: addField,
            removeField: removeField,
            focusField: setActiveField,
            moveFieldUp: moveFieldUp,
            moveFieldDown: moveFieldDown,
            onFieldChange: onFieldChange,
            saveForm: saveForm,
        },
        locale: locale,
    };

    return (
        <Flex padding={10} direction="column" gap={10}>
            <Topbar app={app} />
            <Flex gap="80px">
                <Controller app={app} />
                {activeField && <FieldAttributes app={app} />}
            </Flex>
        </Flex>
    );
};

export default Builder;
