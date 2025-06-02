import { IApp } from '../../../../types/app';
import { ISelectedOption } from '../../../../types/form';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../../utils/labelToJsonAttribute';
import { Checkbox } from '../../../primitives/Checkbox/Checkbox';
import { OptionsInput } from '../../../primitives/OptionsInput/OptionsInput';
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
    };
    app: IApp;
}

const SelectAttributes = ({
    data: { name, label, placeholder, required, options, useOnly },
    app: {
        controls: { onFieldChange },
        loading,
    },
}: SelectAttributesProps) => (
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
        <OptionsInput
            name="options"
            label={getSystemResource('attributes.options')}
            value={options || []}
            onChange={(e) => onFieldChange('options', e)}
            disabled={loading}
        />
        <Checkbox
            name="required"
            value={required}
            onChange={(e) => onFieldChange('required', e)}
            label={getSystemResource('attributes.required')}
            disabled={loading}
            width="calc(50% - 8px)"
        />
        <Checkbox
            name="useOnly"
            value={useOnly}
            onChange={(e) => onFieldChange('useOnly', e)}
            label={getSystemResource('attributes.useOnly')}
            disabled={loading}
            width="calc(50% - 8px)"
        />
    </>
);

export { SelectAttributes };
