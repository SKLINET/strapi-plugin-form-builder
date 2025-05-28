import { MultiSelect, MultiSelectOption } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';
import { getSystemResource } from '../../../utils/getSystemResorce';

interface SelectMultipleProps extends Record<string, any> {
    name: string;
    label?: string;
    value: string[];
    onChange: (e: string[]) => void;
    options: string[];
    disabled?: boolean;
    placeholder?: string;
    width?: string;
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
    ...rest
}: SelectMultipleProps) => (
    <Flex width={width} {...rest} direction="column" gap={1}>
        {label && <Text color="black" size="xs" label={label} />}
        <MultiSelect
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder || getSystemResource('select.placeholder')}
            name={name}
            withTags
        >
            {options.map((option) => (
                <MultiSelectOption key={option} value={option}>
                    {nbsp(option)}
                </MultiSelectOption>
            ))}
        </MultiSelect>
    </Flex>
);

export { SelectMultiple };
