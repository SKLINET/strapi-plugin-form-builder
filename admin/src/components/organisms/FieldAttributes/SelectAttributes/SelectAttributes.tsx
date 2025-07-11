import { IApp } from '../../../../types/app';
import { ISelectedOption } from '../../../../types/form';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../../utils/labelToJsonAttribute';
import { OptionsInput } from '../../../primitives/OptionsInput/OptionsInput';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface SelectAttributesProps {
    data: {
        type: 'select';
        name: string | null;
        label: string | null;
        placeholder: string | null;
        required: boolean;
        options: ISelectedOption[];
        useOnly: boolean;
        onFullWidth: boolean;
    };
    app: IApp;
}

const SelectAttributes = ({
    data: { name, label, placeholder, required, options, useOnly, onFullWidth },
    app: {
        controls: { onFieldChange },
        loading,
        config,
    },
}: SelectAttributesProps) => (
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
        <TextInput
            name="placeholder"
            value={placeholder || ''}
            onChange={(e) => onFieldChange('placeholder', e)}
            label={getSystemResource('attributes.placeholder', config.language)}
            disabled={loading}
        />
        <OptionsInput
            name="options"
            label={getSystemResource('attributes.options', config.language)}
            value={options || []}
            onChange={(e) => onFieldChange('options', e)}
            disabled={loading}
            config={config}
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

export { SelectAttributes };
