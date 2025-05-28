import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';
import { getSystemResource } from '../../../utils/getSystemResorce';

interface SelectProps extends Record<string, any> {
    name: string;
    label?: string;
    value: string;
    onChange: (e: string) => void;
    options: string[];
    disabled?: boolean;
    placeholder?: string;
    width?: string;
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
    ...rest
}: SelectProps) => (
    <Flex width={width} {...rest} direction="column" gap={1}>
        {label && <Text color="black" size="xs" label={label} />}
        <SingleSelect
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder || getSystemResource('select.placeholder')}
            name={name}
        >
            {options.map((option) => (
                <SingleSelectOption key={option} value={option}>
                    {nbsp(option)}
                </SingleSelectOption>
            ))}
        </SingleSelect>
    </Flex>
);

export { Select };
