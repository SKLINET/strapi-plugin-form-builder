import { NumberInput as StrapiNumberInput, Field } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';

interface NumberInputProps extends Record<string, any> {
    name: string;
    label?: string;
    value: number | undefined;
    onChange: (e: number | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    width?: string;
}

const NumberInput = ({
    name,
    label,
    value,
    onChange,
    placeholder,
    disabled,
    width = '100%',
    ...rest
}: NumberInputProps) => (
    <Field.Root width={width} {...rest}>
        <Field.Label>{nbsp(label)}</Field.Label>
        <StrapiNumberInput
            name={name}
            value={value}
            onValueChange={(e: number | undefined) => onChange(e)}
            placeholder={placeholder}
            disabled={disabled}
            size="M"
        />
    </Field.Root>
);

export { NumberInput };
