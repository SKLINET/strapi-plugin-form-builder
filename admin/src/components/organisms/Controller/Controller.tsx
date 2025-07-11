import { IApp } from '../../../types/app';
import { Flex } from '../../primitives/Flex/Flex';
import { FieldItem } from '../../molecules/FieldItem/FieldItem';
import { Text } from '../../primitives/Text/Text';
import { getSystemResource } from '../../../utils/getSystemResorce';

interface Controller {
    app: IApp;
}

const Controller = ({
    app: {
        fields,
        activeField,
        controls: { removeField, focusField },
        loading,
        config,
    },
}: Controller) => (
    <Flex direction="column" gap={10} width="40%" shrink={0}>
        {fields.length > 0 ? (
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
                            withConditions={
                                (e.conditions || []).filter((e) => fields.map((k) => k.id).includes(e.fieldId)).length >
                                0
                            }
                            config={config}
                        />
                    );
                })}
            </Flex>
        ) : (
            <Flex bordered rounded="small" padding={7}>
                <Text size="sm" color="black" label={getSystemResource('no.fields', config.language)} textAlign="center" />
            </Flex>
        )}
    </Flex>
);

export { Controller };
