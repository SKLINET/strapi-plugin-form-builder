import { Toggle, Field } from '@strapi/design-system';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { nbsp } from '../../../utils/nbsp';
import { IConfig } from '../../../hooks/useConfig';

interface SwitchProps extends Record<string, any> {
    label?: string;
    value: boolean;
    onChange: (e: boolean) => void;
    disabled?: boolean;
    width?: string;
    labels?: 'yes/no' | 'checked/unchecked' | 'or/and';
    config: IConfig;
}

const Switch = ({ label, value, onChange, disabled, width = '100%', labels = 'yes/no', config, ...rest }: SwitchProps) => (
    <Field.Root width={width} {...rest}>
        <Field.Label>{nbsp(label)}</Field.Label>
        <Toggle
            onLabel={getSystemResource(labels.split('/')[0], config.language)}
            offLabel={getSystemResource(labels.split('/')[1], config.language)}
            checked={value}
            onChange={() => onChange(!value)}
        />
    </Field.Root>
);

export { Switch };
