import { SingleSelect, SingleSelectOption, Field } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { IConfig } from '../../../hooks/useConfig';

interface SelectProps extends Record<string, any> {
    name: string;
    label?: string;
    value: string;
    onChange: (e: string) => void;
    options: string[];
    disabled?: boolean;
    placeholder?: string;
    width?: string;
    config: IConfig;
}

const Select = ({
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
}: SelectProps) => (
    <Field.Root width={width} {...rest}>
        {label && <Field.Label>{nbsp(label)}</Field.Label>}
        <SingleSelect
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder || getSystemResource('select.placeholder', config.language)}
            name={name}
        >
            {options.map((option) => (
                <SingleSelectOption key={option} value={option}>
                    {nbsp(option)}
                </SingleSelectOption>
            ))}
        </SingleSelect>
    </Field.Root>
);

export { Select };
