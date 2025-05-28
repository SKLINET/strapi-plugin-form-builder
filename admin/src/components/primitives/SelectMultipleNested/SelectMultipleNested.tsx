import { MultiSelectNested } from '@strapi/design-system';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';
import { getSystemResource } from '../../../utils/getSystemResorce';

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
    <Flex width={width} {...rest} direction="column" gap={1}>
        {label && <Text color="black" size="xs" label={label} />}
        <MultiSelectNested
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder || getSystemResource('select.placeholder')}
            options={options}
            name={name}
            withTags
        />
    </Flex>
);

export { SelectMultipleNested };
