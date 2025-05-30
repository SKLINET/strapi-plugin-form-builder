import { Toggle, Field } from '@strapi/design-system';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { nbsp } from '../../../utils/nbsp';

interface SwitchProps extends Record<string, any> {
    label?: string;
    value: boolean;
    onChange: (e: boolean) => void;
    disabled?: boolean;
    width?: string;
}

const Switch = ({ label, value, onChange, disabled, width = '100%', ...rest }: SwitchProps) => (
    <Field.Root width={width} {...rest}>
        <Field.Label>{nbsp(label)}</Field.Label>
        <Toggle
            onLabel={getSystemResource('checked')}
            offLabel={getSystemResource('unchecked')}
            checked={value}
            onChange={() => onChange(!value)}
        />
    </Field.Root>
);

export { Switch };
