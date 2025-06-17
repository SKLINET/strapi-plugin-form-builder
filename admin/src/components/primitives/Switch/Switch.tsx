import { Toggle, Field } from '@strapi/design-system';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { nbsp } from '../../../utils/nbsp';

interface SwitchProps extends Record<string, any> {
    label?: string;
    value: boolean;
    onChange: (e: boolean) => void;
    disabled?: boolean;
    width?: string;
    secondaryLabels?: boolean;
}

const Switch = ({
    label,
    value,
    onChange,
    disabled,
    width = '100%',
    secondaryLabels = false,
    ...rest
}: SwitchProps) => (
    <Field.Root width={width} {...rest}>
        <Field.Label>{nbsp(label)}</Field.Label>
        <Toggle
            onLabel={getSystemResource(secondaryLabels ? 'yes' : 'checked')}
            offLabel={getSystemResource(secondaryLabels ? 'no' : 'unchecked')}
            checked={value}
            onChange={() => onChange(!value)}
        />
    </Field.Root>
);

export { Switch };
