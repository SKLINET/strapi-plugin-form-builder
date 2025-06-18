import { useMemo } from 'react';
import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { SelectMultiple } from '../../../primitives/SelectMultiple/SelectMultiple';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';
import { labelToJsonAttribute } from '../../../../utils/labelToJsonAttribute';

interface AmountAttributesProps {
    data: {
        type: 'amount';
        name: string | null;
        label: string | null;
        fields: string[];
        onFullWidth: boolean;
        useOnly: boolean;
    };
    app: IApp;
}

const AmountAttributes = ({
    data: { name, label, fields, onFullWidth, useOnly },
    app: {
        controls: { onFieldChange },
        loading,
        ...rest
    },
}: AmountAttributesProps) => {
    const fieldsOptions = useMemo(() => {
        const options: { label: string; value: string }[] = [];

        rest.fields.forEach((field) => {
            if (field.type === 'productsSelection') {
                const value = field.name || null;
                const label = field.label || field.name || null;

                if (label && value) {
                    options.push({
                        label: label,
                        value: value,
                    });
                }
            }
        });

        return options;
    }, [rest]);

    return (
        <>
            <TextInput
                name="name"
                value={name || ''}
                onChange={(e) => onFieldChange('name', e)}
                label={getSystemResource('attributes.name')}
                placeholder={labelToJsonAttribute(label || '')}
                disabled={loading}
                hint={getSystemResource('attributes.name.hint')}
            />
            <TextInput
                name="label"
                value={label || ''}
                onChange={(e) => onFieldChange('label', e)}
                label={getSystemResource('attributes.label')}
                disabled={loading}
            />
            <SelectMultiple
                name="fields"
                value={fields}
                options={fieldsOptions}
                onChange={(e) => onFieldChange('fields', e)}
                label={getSystemResource('attributes.fields')}
                disabled={loading}
            />
            <Switch
                name="onFullWidth"
                value={onFullWidth || false}
                onChange={(e) => onFieldChange('onFullWidth', e)}
                label={getSystemResource('attributes.onFullWidth')}
                disabled={loading}
                width="calc(50% - 8px)"
            />
            <Switch
                name="useOnly"
                value={useOnly}
                onChange={(e) => onFieldChange('useOnly', e)}
                label={getSystemResource('attributes.useOnly')}
                disabled={loading}
                width="calc(50% - 8px)"
            />
        </>
    );
};

export { AmountAttributes };
