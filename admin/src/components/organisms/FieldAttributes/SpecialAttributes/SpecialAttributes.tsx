import { IApp } from '../../../../types/app';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface SpecialAttributesProps {
    data: {
        type: 'special';
        codename: string | null;
    };
    app: IApp;
}

const SpecialAttributes = ({
    data: { codename },
    app: {
        controls: { onFieldChange },
        loading,
    },
}: SpecialAttributesProps) => (
    <>
        <TextInput
            name="codename"
            value={codename || ''}
            onChange={(e) => onFieldChange('codename', e)}
            label={getSystemResource('attributes.codename')}
            disabled={loading}
        />
    </>
);

export { SpecialAttributes };
