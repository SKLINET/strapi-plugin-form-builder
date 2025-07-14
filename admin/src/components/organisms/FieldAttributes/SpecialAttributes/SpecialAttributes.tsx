import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface SpecialAttributesProps {
    data: {
        type: 'special';
        codename: string | null;
        onFullWidth: boolean;
    };
    app: IApp;
}

const SpecialAttributes = ({
    data: { codename, onFullWidth },
    app: {
        controls: { onFieldChange },
        loading,
        config,
    },
}: SpecialAttributesProps) => (
    <>
        <TextInput
            name="codename"
            value={codename || ''}
            onChange={(e) => onFieldChange('codename', e)}
            label={getSystemResource('attributes.codename', config.language)}
            disabled={loading}
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

export { SpecialAttributes };
