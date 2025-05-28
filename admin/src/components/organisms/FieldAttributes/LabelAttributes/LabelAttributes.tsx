import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface LabelAttributesProps {
    data: {
        type: 'submit' | 'title' | 'message';
        label: string | null;
    };
    app: IApp;
}

const LabelAttributes = ({
    data: { label },
    app: {
        controls: { onFieldChange },
        loading,
    },
}: LabelAttributesProps) => (
    <>
        <TextInput
            name="label"
            value={label || ''}
            onChange={(e) => onFieldChange('label', e)}
            label={getSystemResource('attributes.label')}
            disabled={loading}
        />
    </>
);

export { LabelAttributes };
