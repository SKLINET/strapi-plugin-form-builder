import { Trash } from '@strapi/icons';
import { IFormField } from '../../../types/form';
import { Flex } from '../../primitives/Flex/Flex';
import { IconButton } from '../../primitives/IconButton/IconButton';
import { Text } from '../../primitives/Text/Text';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { FieldIcon } from '../../primitives/FieldIcon/FieldIcon';

interface FieldItemProps {
    data: IFormField;
    isActive: boolean;
    onClick: () => void;
    onRemove: () => void;
    disabled?: boolean;
}

const FieldItem = ({ data, isActive, onClick, onRemove, disabled }: FieldItemProps) => {
    const getLabel = () => {
        switch (data.type) {
            case 'textinput':
            case 'textarea':
            case 'email':
            case 'phone':
            case 'checkbox':
            case 'file':
            case 'select':
            case 'submit':
            case 'title':
            case 'message': {
                return data.label;
            }
            default:
                return null;
        }
    };

    const label = getLabel();

    return (
        <Flex gap={3} alignItems="center">
            <button type="button" onClick={onClick} style={{ flexGrow: 1, cursor: 'pointer' }}>
                <Flex
                    bordered
                    rounded="small"
                    gap={6}
                    padding={4}
                    alignItems="center"
                    borderColor={isActive ? 'primary600' : 'neutral200'}
                    style={{ transition: 'border-color 0.2s ease-in-out' }}
                >
                    <Flex width="fit-content" flexShrink={0} color="neutral600">
                        <FieldIcon type={data.type} />
                    </Flex>
                    <Text
                        label={label && label.length > 0 ? label : getSystemResource('field.item.' + data.type)}
                        color={label && label.length > 0 ? 'black' : 'gray'}
                        size="sm"
                        textAlign="left"
                    />
                </Flex>
            </button>
            <IconButton
                icon={<Trash />}
                variant="danger-light"
                size="L"
                onClick={() => onRemove()}
                flexShrink={0}
                disabled={disabled}
            />
        </Flex>
    );
};

export { FieldItem };
