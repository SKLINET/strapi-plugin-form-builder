import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { Checkbox } from '../../../primitives/Checkbox/Checkbox';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface TextAttributesProps {
    data: {
        // TODO: split into separate components
        type: 'textinput' | 'textarea' | 'email' | 'phone' | 'checkbox';
        name: string | null;
        label: string | null;
        placeholder: string | null;
        required: boolean;
    };
    app: IApp;
}

const TextAttributes = ({
    data: { name, label, placeholder, required },
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
            disabled={loading}
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
        <Checkbox
            name="required"
            value={required}
            onChange={(e) => onFieldChange('required', e)}
            label={getSystemResource('attributes.required')}
            disabled={loading}
            width="100%"
        />
    </>
);

export { TextAttributes };
