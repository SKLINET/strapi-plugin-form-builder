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
    },
}: TitleAttributesProps) => (
    <>
        <TextInput
            name="label"
            value={label || ''}
            onChange={(e) => onFieldChange('label', e)}
            label={getSystemResource('attributes.label')}
            disabled={loading}
        />
        <Switch
            name="isLarge"
            value={isLarge || false}
            onChange={(e) => onFieldChange('isLarge', e)}
            label={getSystemResource('attributes.isLarge')}
            disabled={loading}
            width="calc(50% - 8px)"
        />
        <Switch
            name="onFullWidth"
            value={onFullWidth || false}
            onChange={(e) => onFieldChange('onFullWidth', e)}
            label={getSystemResource('attributes.onFullWidth')}
            disabled={loading}
            width="calc(50% - 8px)"
        />
    </>
);

export { TitleAttributes };
