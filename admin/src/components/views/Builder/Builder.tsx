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
import { IConfig } from '../../../hooks/useConfig';

interface BuilderProps {
    form: IBuiltForm;
    controls: UseBuiltFormProps;
    updateForm: (data: IBuiltForm) => void;
    config: IConfig;
}

const Builder = ({ form, controls, updateForm, config }: BuilderProps) => {
    const [formData, setFormData] = useState(form.data || []);

    const [activeField, setActiveField] = useState<string | null>(null);
    const [hideAttributes, setHideAttributes] = useState(false);

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
                    useOnly: false,
                    conditionsEval: 'and',
                    conditions: [],
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

                return;
            }
            case 'checkbox': {
                const newField: IFormField = {
                    id: uuidv4(),
                    name: null,
                    type: type,
                    label: null,
                    required: false,
                    useOnly: false,
                    conditionsEval: 'and',
                    conditions: [],
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

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
                    useOnly: false,
                    conditionsEval: 'and',
                    conditions: [],
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

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
                    useOnly: false,
                    conditionsEval: 'and',
                    conditions: [],
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

                return;
            }
            case 'checkboxGroup': {
                const newField: IFormField = {
                    id: uuidv4(),
                    name: null,
                    type: type,
                    label: null,
                    options: [],
                    conditionsEval: 'and',
                    conditions: [],
                    useOnly: false,
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

                return;
            }
            case 'productsSelection': {
                const newField: IFormField = {
                    id: uuidv4(),
                    name: null,
                    type: type,
                    label: null,
                    products: [],
                    conditionsEval: 'and',
                    conditions: [],
                    useOnly: false,
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

                return;
            }
            case 'amount': {
                const newField: IFormField = {
                    id: uuidv4(),
                    name: null,
                    label: null,
                    type: type,
                    fields: [],
                    conditionsEval: 'and',
                    conditions: [],
                    useOnly: false,
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

                return;
            }
            case 'submit':
            case 'message': {
                const newField: IFormField = {
                    id: uuidv4(),
                    type: type,
                    label: null,
                    conditionsEval: 'and',
                    conditions: [],
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

                return;
            }
            case 'title': {
                const newField: IFormField = {
                    id: uuidv4(),
                    type: type,
                    label: null,
                    isLarge: false,
                    conditionsEval: 'and',
                    conditions: [],
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

                return;
            }
            case 'divider': {
                const newField: IFormField = {
                    id: uuidv4(),
                    type: type,
                    conditionsEval: 'and',
                    conditions: [],
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

                return;
            }
            case 'special': {
                const newField: IFormField = {
                    id: uuidv4(),
                    type: type,
                    codename: null,
                    conditionsEval: 'and',
                    conditions: [],
                    onFullWidth: false,
                };

                setFormData([...formData, newField]);
                setActiveField(newField.id);

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

    const successMessage = getSystemResource('success.message', config.language);
    const errorMessage = getSystemResource('error.message', config.language);

    const saveForm = async () => {
        setLoading(true);

        const data = formData
            .reduce((prev, next) => {
                // Generate a unique ID for each field if it doesn't have one

                let name: string | null | undefined = undefined;

                switch (next.type) {
                    case 'textinput':
                    case 'textarea':
                    case 'email':
                    case 'phone':
                    case 'checkbox':
                    case 'file':
                    case 'select':
                    case 'checkboxGroup':
                    case 'productsSelection':
                    case 'amount':
                        name = next.name || (next.label ? labelToJsonAttribute(next.label) : null);
                        break;
                }

                if (typeof name === 'undefined') return [...prev, next];

                return [...prev, { ...next, name: name }];
            }, [] as IFormField[])
            .reduce((prev, next) => {
                // Remove conditions for fields that are not present in the form data

                const field = next;

                if (field.conditions && field.conditions.length > 0) {
                    field.conditions = field.conditions.reduce(
                        (conditionsPrev, condition) => {
                            const currentCondition = condition;

                            const field = formData.find((f) => f.id === currentCondition.fieldId);

                            // If the condition is old, remove it
                            if (!field) {
                                return conditionsPrev || [];
                            }

                            // Remove / update value condition in select or checkboxGroup field when is old
                            if (field.type === 'select' || field.type === 'checkboxGroup') {
                                const options = field.options || [];
                                const option = currentCondition.value;

                                if (typeof option !== 'object') {
                                    return conditionsPrev || [];
                                }

                                const newOption = options.find((o) => o.key === option.key);
                                if (!newOption) {
                                    return conditionsPrev || [];
                                }

                                currentCondition.value = newOption;
                            }

                            return [...(conditionsPrev || []), currentCondition];
                        },
                        [] as IFormField['conditions'],
                    );
                }

                // Remove fields from amount field that are not present in the form data
                if (field.type === 'amount') {
                    field.fields = field.fields.filter((field) =>
                        formData.find((f) => f.type === 'productsSelection' && f.name === field),
                    );
                }

                return [...prev, next];
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
        hideAttributes: hideAttributes,
        controls: {
            addField: addField,
            removeField: removeField,
            focusField: setActiveField,
            moveFieldUp: moveFieldUp,
            moveFieldDown: moveFieldDown,
            onFieldChange: onFieldChange,
            saveForm: saveForm,
            toggleAttributes: () => setHideAttributes(!hideAttributes),
        },
        locale: locale,
        config: config,
    };

    return (
        <Flex paddingLeft={10} paddingRight={10} paddingTop={3} paddingBottom={10} direction="column" gap={7}>
            <Topbar app={app} />
            <Flex gap="80px">
                <Controller app={app} />
                {activeField && <FieldAttributes app={app} />}
            </Flex>
        </Flex>
    );
};

export default Builder;
