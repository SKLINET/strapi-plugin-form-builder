import { IApp } from '../../../types/app';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { Button } from '../../primitives/Button/Button';
import { Flex } from '../../primitives/Flex/Flex';
import { Text } from '../../primitives/Text/Text';
import { TextButton } from '../../primitives/TextButton/TextButton';
import { ArrowLeft, WarningCircle } from '@strapi/icons';
import { Dialog } from '../Dialog/Dialog';

interface TopbarProps {
    app: IApp;
}

const Topbar = ({
    app: {
        form,
        unsavedChanges,
        loading,
        controls: { saveForm },
        locale,
    },
}: TopbarProps) => (
    <Flex gap={8}>
        <Flex flexGrow={1} direction="column" gap={6}>
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
            <Text size="xxl" color="black" label={'📋 ' + form.title} />
        </Flex>
        <Flex width="fit-content" flexShrink={0}>
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

export { Topbar };
