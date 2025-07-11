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
        config,
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
                label={getSystemResource('attributes.name', config.language)}
                placeholder={labelToJsonAttribute(label || '')}
                disabled={loading}
                hint={getSystemResource('attributes.name.hint', config.language)}
            />
            <TextInput
                name="label"
                value={label || ''}
                onChange={(e) => onFieldChange('label', e)}
                label={getSystemResource('attributes.label', config.language)}
                disabled={loading}
            />
            <SelectMultiple
                name="fields"
                value={fields}
                options={fieldsOptions}
                onChange={(e) => onFieldChange('fields', e)}
                label={getSystemResource('attributes.fields', config.language)}
                disabled={loading}
                config={config}
            />
            <Switch
                name="onFullWidth"
                value={onFullWidth || false}
                onChange={(e) => onFieldChange('onFullWidth', e)}
                label={getSystemResource('attributes.onFullWidth', config.language)}
                disabled={loading}
                width="calc(50% - 8px)"
                config={config}
            />
            <Switch
                name="useOnly"
                value={useOnly}
                onChange={(e) => onFieldChange('useOnly', e)}
                label={getSystemResource('attributes.useOnly', config.language)}
                disabled={loading}
                width="calc(50% - 8px)"
                config={config}
            />
        </>
    );
};

export { AmountAttributes };
