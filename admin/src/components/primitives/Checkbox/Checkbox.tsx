import { Checkbox as StrapiCheckbox } from '@strapi/design-system';
import { nbsp } from '../../../utils/nbsp';
import { Flex } from '../Flex/Flex';

interface CheckboxProps extends Record<string, any> {
    name: string;
    label?: string;
    value: boolean;
    onChange: (e: boolean) => void;
    disabled?: boolean;
    width?: string;
}

const Checkbox = ({ name, label, value, onChange, disabled, width = '100%', ...rest }: CheckboxProps) => (
    <Flex width={width} {...rest}>
        <StrapiCheckbox
            name={name}
            checked={value || false}
            onCheckedChange={onChange}
            disabled={disabled}
            width={width}
        >
            {nbsp(label)}
        </StrapiCheckbox>
    </Flex>
);

export { Checkbox };
