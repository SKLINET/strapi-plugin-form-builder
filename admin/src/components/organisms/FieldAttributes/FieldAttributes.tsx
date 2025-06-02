import { IApp } from '../../../types/app';
import { Flex } from '../../primitives/Flex/Flex';
import { TextAttributes } from './TextAttributes/TextAttributes';
import { LabelAttributes } from './LabelAttributes/LabelAttributes';
import { CheckboxAttributes } from './CheckboxAttributes/CheckboxAttributes';
import { FileAttributes } from './FileAttributes/FileAttributes';
import { SelectAttributes } from './SelectAttributes/SelectAttributes';
import { ConditionInput } from '../../molecules/ConditionInput/ConditionInput';
import { SpecialAttributes } from './SpecialAttributes/SpecialAttributes';

interface FieldAttributesProps {
    app: IApp;
}

const FieldAttributes = ({ app }: FieldAttributesProps) => {
    const { fields, activeField } = app;
    const field = fields.find((e) => e.id === activeField);

    if (!field) return <></>;

    const renderContent = () => {
        switch (field.type) {
            case 'textinput':
            case 'textarea':
            case 'email':
            case 'phone':
                return <TextAttributes data={field} app={app} />;
            case 'checkbox':
                return <CheckboxAttributes data={field} app={app} />;
            case 'file':
                return <FileAttributes data={field} app={app} />;
            case 'select':
                return <SelectAttributes data={field} app={app} />;
            case 'submit':
            case 'title':
            case 'message':
                return <LabelAttributes data={field} app={app} />;
            case 'special':
                return <SpecialAttributes data={field} app={app} />;
            default:
                return <></>;
        }
    };

    return (
        <Flex direction="column" gap={4} width="auto" grow={1} position="sticky" top="168px">
            {field.type !== 'divider' && (
                <Flex direction="row" flexWrap="wrap" gap={4} bordered rounded="large" padding={8}>
                    {renderContent()}
                </Flex>
            )}
            <Flex direction="column" gap={4} bordered rounded="large" padding={8}>
                <ConditionInput field={field} app={app} />
            </Flex>
        </Flex>
    );
};

export { FieldAttributes };
