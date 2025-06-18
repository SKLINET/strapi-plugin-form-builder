import { IApp } from '../../../../types/app';
import { ISelectedOption } from '../../../../types/form';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../../utils/labelToJsonAttribute';
import { OptionsInput } from '../../../primitives/OptionsInput/OptionsInput';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface CheckboxGroupAttributesProps {
    data: {
        type: 'checkboxGroup';
        name: string | null;
        label: string | null;
        options: ISelectedOption[];
        useOnly: boolean;
        onFullWidth: boolean;
    };
    app: IApp;
}

const CheckboxGroupAttributes = ({
    data: { name, label, options, useOnly, onFullWidth },
    app: {
        controls: { onFieldChange },
        loading,
    },
}: CheckboxGroupAttributesProps) => (
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
        <OptionsInput
            name="options"
            label={getSystemResource('attributes.options')}
            value={options || []}
            onChange={(e) => onFieldChange('options', e)}
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

export { CheckboxGroupAttributes };
