import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../../utils/labelToJsonAttribute';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface TextAttributesProps {
    data: {
        type: 'textinput' | 'textarea' | 'email' | 'phone';
        name: string | null;
        label: string | null;
        placeholder: string | null;
        required: boolean;
        useOnly: boolean;
        onFullWidth: boolean;
    };
    app: IApp;
}

const TextAttributes = ({
    data: { name, label, placeholder, required, useOnly, onFullWidth },
    app: {
        controls: { onFieldChange },
        loading,
    },
}: TextAttributesProps) => (
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
        <TextInput
            name="placeholder"
            value={placeholder || ''}
            onChange={(e) => onFieldChange('placeholder', e)}
            label={getSystemResource('attributes.placeholder')}
            disabled={loading}
        />
        <Switch
            name="required"
            value={required}
            onChange={(e) => onFieldChange('required', e)}
            label={getSystemResource('attributes.required')}
            disabled={loading}
            width="calc(50% - 8px)"
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

export { TextAttributes };
