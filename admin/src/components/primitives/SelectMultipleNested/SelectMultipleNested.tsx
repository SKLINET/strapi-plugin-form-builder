import { MultiSelectNested, Field } from '@strapi/design-system';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { nbsp } from '../../../utils/nbsp';

interface SelectMultipleNestedProps extends Record<string, any> {
    name: string;
    label?: string;
    value: string[];
    onChange: (e: string[]) => void;
    options: { label: string; children: { label: string; value: string }[] }[];
    disabled?: boolean;
    placeholder?: string;
    width?: string;
}

const SelectMultipleNested = ({
    name,
    label,
    value,
    onChange,
    disabled,
    options,
    width = '100%',
    placeholder,
    ...rest
}: SelectMultipleNestedProps) => (
    <Field.Root width={width} {...rest}>
        {label && <Field.Label>{nbsp(label)}</Field.Label>}
        <MultiSelectNested
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder || getSystemResource('select.placeholder')}
            options={options}
            name={name}
            withTags
        />
    </Field.Root>
);

export { SelectMultipleNested };
