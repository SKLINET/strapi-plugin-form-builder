import { ArrowUp, ArrowDown } from '@strapi/icons';
import { IApp } from '../../../types/app';
import { Button } from '../../primitives/Button/Button';
import { Flex } from '../../primitives/Flex/Flex';
import { IconButton } from '../../primitives/IconButton/IconButton';
import { FieldItem } from '../../molecules/FieldItem/FieldItem';
import { Popover } from '@strapi/design-system';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { IFormField } from '../../../types/form';
import { FieldIcon } from '../../primitives/FieldIcon/FieldIcon';

interface Controller {
    app: IApp;
}

const Controller = ({
    app: {
        fields,
        activeField,
        controls: { addField, removeField, focusField, moveFieldUp, moveFieldDown },
        loading,
    },
}: Controller) => {
    const renderFiledButton = (type: IFormField['type']) => (
        <Button
            label={getSystemResource(`field.item.${type}`)}
            variant="tertiary"
            width="calc(50% - 6px)"
            size="M"
            disabled={loading}
            onClick={() => addField(type)}
            startIcon={<FieldIcon type={type} size="s" />}
        />
    );

    return (
        <Flex direction="column" gap={10} width="40%">
            {fields.length > 0 && (
                <Flex direction="column" gap={4}>
                    {fields.map((e) => {
                        const isActive = e.id === activeField;

                        return (
                            <FieldItem
                                key={e.id}
                                data={e}
                                isActive={isActive}
                                onClick={() => focusField(isActive ? null : e.id)}
                                onRemove={() => removeField(e.id)}
                                disabled={loading}
                            />
                        );
                    })}
                </Flex>
            )}
            <Flex direction="row" gap={3}>
                <Popover.Root>
                    <Popover.Trigger>
                        <button style={{ width: '100%' }} disabled={loading}>
                            <Button label={getSystemResource('field.add')} variant="default" fullWidth size="M" />
                        </button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Flex padding={6} gap={3} width="600px" direction="row" wrap="wrap">
                            {renderFiledButton('textinput')}
                            {renderFiledButton('textarea')}
                            {renderFiledButton('email')}
                            {renderFiledButton('phone')}
                            {renderFiledButton('checkbox')}
                            {renderFiledButton('file')}
                            {renderFiledButton('select')}
                            {renderFiledButton('submit')}
                            {renderFiledButton('title')}
                            {renderFiledButton('message')}
                            {renderFiledButton('divider')}
                        </Flex>
                    </Popover.Content>
                </Popover.Root>
                <IconButton
                    icon={<ArrowUp />}
                    variant="tertiary"
                    size="M"
                    onClick={() => moveFieldUp()}
                    disabled={!activeField || loading}
                />
                <IconButton
                    icon={<ArrowDown />}
                    variant="tertiary"
                    size="M"
                    onClick={() => moveFieldDown()}
                    disabled={!activeField || loading}
                />
            </Flex>
        </Flex>
    );
};

export { Controller };
