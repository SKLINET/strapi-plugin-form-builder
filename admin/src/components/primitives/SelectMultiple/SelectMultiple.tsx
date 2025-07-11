import { MultiSelect, MultiSelectOption, Field } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { IConfig } from '../../../hooks/useConfig';

interface SelectMultipleProps extends Record<string, any> {
    name: string;
    label?: string;
    value: string[];
    onChange: (e: string[]) => void;
    options: { label: string; value: string }[];
    disabled?: boolean;
    placeholder?: string;
    width?: string;
    config: IConfig;
}

const SelectMultiple = ({
    name,
    label,
    value,
    onChange,
    disabled,
    options,
    width = '100%',
    placeholder,
    config,
    ...rest
}: SelectMultipleProps) => (
    <Field.Root width={width} {...rest}>
        {label && <Field.Label>{nbsp(label)}</Field.Label>}
        <MultiSelect
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder || getSystemResource('select.placeholder', config.language)}
            name={name}
            withTags
        >
            {options.map((option) => (
                <MultiSelectOption key={option.value} value={option.value}>
                    {nbsp(option.label)}
                </MultiSelectOption>
            ))}
        </MultiSelect>
    </Field.Root>
);

export { SelectMultiple };
