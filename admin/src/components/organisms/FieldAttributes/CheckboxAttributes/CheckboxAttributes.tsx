import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../../utils/labelToJsonAttribute';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface CheckboxAttributesProps {
    data: {
        type: 'checkbox';
        name: string | null;
        label: string | null;
        required: boolean;
        useOnly: boolean;
        onFullWidth: boolean;
    };
    app: IApp;
}

const CheckboxAttributes = ({
    data: { name, label, required, useOnly, onFullWidth },
    app: {
        controls: { onFieldChange },
        loading,
        config,
    },
}: CheckboxAttributesProps) => (
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
        <Switch
            name="required"
            value={required}
            onChange={(e) => onFieldChange('required', e)}
            label={getSystemResource('attributes.required', config.language)}
            disabled={loading}
            width="calc(50% - 8px)"
            config={config}
        />
        {config.allowFullWidth && (
            <Switch
                name="onFullWidth"
                value={onFullWidth || false}
                onChange={(e) => onFieldChange('onFullWidth', e)}
                label={getSystemResource('attributes.onFullWidth', config.language)}
                disabled={loading}
                width="calc(50% - 8px)"
                config={config}
            />
        )}
        {config.allowUseOnly && (
            <Switch
                name="useOnly"
                value={useOnly}
                onChange={(e) => onFieldChange('useOnly', e)}
                label={getSystemResource('attributes.useOnly', config.language)}
                disabled={loading}
                width="calc(50% - 8px)"
                config={config}
            />
        )}
    </>
);

export { CheckboxAttributes };
