import { useRef, useEffect } from 'react';
import { IApp } from '../../../types/app';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { Button } from '../../primitives/Button/Button';
import { Flex } from '../../primitives/Flex/Flex';
import { Text } from '../../primitives/Text/Text';
import { TextButton } from '../../primitives/TextButton/TextButton';
import { Popover } from '@strapi/design-system';
import { ArrowUp, ArrowDown, ArrowLeft, Plus, WarningCircle } from '@strapi/icons';
import { Dialog } from '../Dialog/Dialog';
import { IconButton } from '../../primitives/IconButton/IconButton';
import { IFormField } from '../../../types/form';
import { FieldIcon } from '../../primitives/FieldIcon/FieldIcon';

interface TopbarProps {
    app: IApp;
}

const Topbar = ({
    app: {
        form,
        activeField,
        unsavedChanges,
        loading,
        controls: { moveFieldUp, moveFieldDown, addField, saveForm },
        locale,
    },
}: TopbarProps) => {
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const setMaxWidth = () => {
            if (titleRef?.current) {
                const windowWidth = window.innerWidth;
                const sidebarWidth = document.getElementsByTagName('nav')[0]?.clientWidth || 0;

                const ref = titleRef.current.children[0] as HTMLDivElement;

                ref.style.maxWidth = `${windowWidth - sidebarWidth - 56 * 2 - 336}px`;
            }
        };

        setMaxWidth();
        window.addEventListener('resize', setMaxWidth, { passive: true });

        return () => window.removeEventListener('resize', setMaxWidth);
    }, []);

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
        <Flex
            gap={8}
            position="sticky"
            zIndex={10}
            top={0}
            background="neutral100"
            paddingTop={7}
            paddingBottom={7}
            style={{ borderBottom: '1px solid #dcdce4' }}
            alignItems="center"
        >
            <Flex grow={1} direction="column" gap={6}>
                {unsavedChanges ? (
                    <Dialog
                        title={getSystemResource('unsaved.changes.title')}
                        body={getSystemResource('unsaved.changes.message')}
                        icon={<WarningCircle fill="danger600" />}
                        trigger={
                            <TextButton
                                label={getSystemResource('back')}
                                disabled={loading}
                                startIcon={<ArrowLeft name="cancel" />}
                            />
                        }
                        cancel={
                            <Button
                                label={getSystemResource('unsaved.changes.discard')}
                                size="M"
                                variant="tertiary"
                                fullWidth
                            />
                        }
                        action={
                            <Button
                                label={getSystemResource('unsaved.changes.confirm')}
                                onClick={() =>
                                    window.open(
                                        `/admin/content-manager/collection-types/plugin::form-builder.built-form/${form.documentId}?plugins%5Bi18n%5D%5Blocale%5D=${locale}`,
                                        '_self',
                                    )
                                }
                                size="M"
                                variant="danger-light"
                                fullWidth
                            />
                        }
                    />
                ) : (
                    <TextButton
                        label={getSystemResource('back')}
                        onClick={() =>
                            window.open(
                                `/admin/content-manager/collection-types/plugin::form-builder.built-form/${form.documentId}?plugins%5Bi18n%5D%5Blocale%5D=${locale}`,
                                '_self',
                            )
                        }
                        disabled={loading}
                        startIcon={<ArrowLeft name="cancel" />}
                    />
                )}
                <div ref={titleRef}>
                    <Text
                        size="xxl"
                        color="black"
                        label={'📋 ' + form.title}
                        style={{ maxWidth: '0px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    />
                </div>
            </Flex>
            <Flex width="fit-content" shrink={0} gap={3}>
                <IconButton
                    icon={<ArrowUp />}
                    variant="tertiary"
                    size="L"
                    onClick={() => moveFieldUp()}
                    disabled={!activeField || loading}
                />
                <IconButton
                    icon={<ArrowDown />}
                    variant="tertiary"
                    size="L"
                    onClick={() => moveFieldDown()}
                    disabled={!activeField || loading}
                />
                <Popover.Root>
                    <Popover.Trigger>
                        <button style={{ width: 'fit-content' }} disabled={loading}>
                            <IconButton icon={<Plus />} variant="secondary" size="L" />
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
                            {renderFiledButton('special')}
                        </Flex>
                    </Popover.Content>
                </Popover.Root>
                <Button
                    width="140px"
                    label={getSystemResource('save')}
                    onClick={saveForm}
                    size="L"
                    variant="success-light"
                    loading={loading}
                />
            </Flex>
        </Flex>
    );
};

export { Topbar };
