import { NumberInput as StrapiNumberInput } from '@strapi/design-system';
import { Flex } from '../Flex/Flex';
import { Text } from '../Text/Text';

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
    <Flex width={width} {...rest} direction="column" gap={1}>
        {label && <Text color="black" size="xs" label={label} />}
        <StrapiNumberInput
            name={name}
            value={value}
            onValueChange={(e: number | undefined) => onChange(e)}
            placeholder={placeholder}
            disabled={disabled}
            size="M"
        />
    </Flex>
);

export { NumberInput };
