import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../../utils/labelToJsonAttribute';
import { Checkbox } from '../../../primitives/Checkbox/Checkbox';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface CheckboxAttributesProps {
    data: {
        type: 'checkbox';
        name: string | null;
        label: string | null;
        required: boolean;
        useOnly: boolean;
    };
    app: IApp;
}

const CheckboxAttributes = ({
    data: { name, label, required, useOnly },
    app: {
        controls: { onFieldChange },
        loading,
    },
}: CheckboxAttributesProps) => (
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

export { CheckboxAttributes };
