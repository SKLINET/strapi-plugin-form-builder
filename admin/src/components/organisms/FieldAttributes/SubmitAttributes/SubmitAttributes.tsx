import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface SubmitAttributesProps {
    data: {
        // TODO: split into separate components
        type: 'submit' | 'message';
        label: string | null;
    };
    app: IApp;
}

const SubmitAttributes = ({
    data: { label },
    app: {
        controls: { onFieldChange },
        loading,
    },
}: SubmitAttributesProps) => (
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

export { SubmitAttributes };
