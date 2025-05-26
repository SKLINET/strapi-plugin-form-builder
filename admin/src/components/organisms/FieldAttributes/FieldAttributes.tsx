import { IApp } from '../../../types/app';
import { Flex } from '../../primitives/Flex/Flex';
import { TextAttributes } from './TextAttributes/TextAttributes';
import { SubmitAttributes } from './SubmitAttributes/SubmitAttributes';

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
            case 'checkbox':
                return <TextAttributes data={field} app={app} />;
            case 'submit':
            case 'message':
                return <SubmitAttributes data={field} app={app} />;
            default:
                return <></>;
        }
    };

    return (
        <Flex direction="column" gap={4} width="auto" grow={1} bordered rounded="large" padding={8}>
            {renderContent()}
        </Flex>
    );
};

export { FieldAttributes };
