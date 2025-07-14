import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface LabelAttributesProps {
    data: {
        type: 'submit' | 'message';
        label: string | null;
        onFullWidth: boolean;
    };
    app: IApp;
}

const LabelAttributes = ({
    data: { type, label, onFullWidth },
    app: {
        controls: { onFieldChange },
        loading,
        config,
    },
}: LabelAttributesProps) => (
    <>
        <TextInput
            name="label"
            value={label || ''}
            onChange={(e) => onFieldChange('label', e)}
            label={getSystemResource(type === 'submit' ? 'button.text' : 'attributes.label', config.language)}
            disabled={loading}
        />
        {type === 'message' && config.allowFullWidth && (
            <Switch
                name="onFullWidth"
                value={onFullWidth || false}
                onChange={(e) => onFieldChange('onFullWidth', e)}
                label={getSystemResource('attributes.onFullWidth', config.language)}
                disabled={loading}
                width="calc(50% - 8px)"
                config={config}
            />
        )}
    </>
);

export { LabelAttributes };
