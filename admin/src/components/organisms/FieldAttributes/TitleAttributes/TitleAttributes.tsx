import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface TitleAttributesProps {
    data: {
        type: 'submit' | 'title' | 'message';
        label: string | null;
        isLarge: boolean;
        onFullWidth: boolean;
    };
    app: IApp;
}

const TitleAttributes = ({
    data: { label, isLarge, onFullWidth },
    app: {
        controls: { onFieldChange },
        loading,
        config,
    },
}: TitleAttributesProps) => (
    <>
        <TextInput
            name="label"
            value={label || ''}
            onChange={(e) => onFieldChange('label', e)}
            label={getSystemResource('attributes.label', config.language)}
            disabled={loading}
        />
        <Switch
            name="isLarge"
            value={isLarge || false}
            onChange={(e) => onFieldChange('isLarge', e)}
            label={getSystemResource('attributes.isLarge', config.language)}
            disabled={loading}
            width="calc(50% - 8px)"
            config={config}
        />
        {config.allowFullWidth && (
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

export { TitleAttributes };
