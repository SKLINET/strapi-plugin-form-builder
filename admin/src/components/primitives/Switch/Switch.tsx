import { Toggle, Field } from '@strapi/design-system';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { nbsp } from '../../../utils/nbsp';

interface SwitchProps extends Record<string, any> {
    label?: string;
    value: boolean;
    onChange: (e: boolean) => void;
    disabled?: boolean;
    width?: string;
    labels?: 'yes/no' | 'checked/unchecked' | 'or/and';
}

const Switch = ({ label, value, onChange, disabled, width = '100%', labels = 'yes/no', ...rest }: SwitchProps) => (
    <Field.Root width={width} {...rest}>
        <Field.Label>{nbsp(label)}</Field.Label>
        <Toggle
            onLabel={getSystemResource(labels.split('/')[0])}
            offLabel={getSystemResource(labels.split('/')[1])}
            checked={value}
            onChange={() => onChange(!value)}
        />
    </Field.Root>
);

export { Switch };
