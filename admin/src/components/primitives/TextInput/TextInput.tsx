import { TextInput as StrapiTextInput, Field } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';

interface TextInputProps extends Record<string, any> {
    name: string;
    label?: string;
    value: string;
    onChange: (e: string) => void;
    hint?: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    width?: string;
}

const TextInput = ({
    name,
    label,
    value,
    onChange,
    hint,
    error,
    placeholder,
    disabled,
    width = '100%',
    ...rest
}: TextInputProps) => (
    <Field.Root error={error} hint={hint} width={width} {...rest}>
        {label && <Field.Label>{nbsp(label)}</Field.Label>}
        <StrapiTextInput
            name={name}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
        />
        <Field.Error />
        <Field.Hint />
    </Field.Root>
);

export { TextInput };
