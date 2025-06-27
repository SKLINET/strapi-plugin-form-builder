import { IProductRecord, ISelectedOption } from '../../../types/form';
import { getFormattedPrice } from '../../../utils/getFormattedPrice';
import { getSystemResource } from '../../../utils/getSystemResorce';
import { Flex } from '../../primitives/Flex/Flex';
import { Text } from '../../primitives/Text/Text';

interface CustomFieldProps {
    disabled?: boolean;
    error?: string;
    name: string;
    onChange: (e: any) => void;
    required?: boolean;
    label?: string;
    placeholder?: string;
    hint?: string;
    value?: Record<string, any>;
    attribute?: any;
}

const formatFieldName = (key: string) => {
    // Replace underscores with spaces, then insert spaces before capital letters (except the first), then capitalize the first letter
    const withSpaces = key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

const CustomField = ({ value }: CustomFieldProps) => {
    const records: JSX.Element[] = [];

    const renderValue = (value: any) => {
        if (typeof value === 'string') {
            return <Text label={value} size="sm" color="gray" />;
        }

        if (typeof value === 'boolean') {
            return <Text label={getSystemResource(value ? 'yes' : 'no')} size="sm" color="gray" />;
        }

        if (typeof value === 'number') {
            return <Text label={getFormattedPrice(value)} size="sm" color="gray" />;
        }

        if (Array.isArray(value)) {
            if (value.length === 0) {
                return <Text label={''} size="sm" color="gray" />;
            }

            if (value[0].key) {
                // Selected options
                const options: ISelectedOption[] = value;

                return (
                    <>
                        {options.map((option) => (
                            <Text key={option.key} label={option.label} size="sm" color="gray" />
                        ))}
                    </>
                );
            } else {
                // Products
                const products: IProductRecord[] = value;

                return (
                    <>
                        {products.map((product) => (
                            <Text
                                key={product.id}
                                label={
                                    product.amount +
                                    'x - ' +
                                    product.name +
                                    ' = ' +
                                    getFormattedPrice(product.totalPrice)
                                }
                                size="sm"
                                color="gray"
                            />
                        ))}
                    </>
                );
            }
        }

        if (typeof value === 'object') {
            const attributes: JSX.Element[] = [];

            for (const [key, data] of Object.entries(value)) {
                attributes.push(
                    <Text key={key} label={formatFieldName(key) + ': ' + String(data)} size="sm" color="gray" />,
                );
            }

            return <>{attributes}</>;
        }

        return <></>;
    };

    const renderItem = (key: string, data: any, index: number) => {
        return (
            <Flex
                key={key}
                direction="row"
                gap={6}
                alignItems="flex-start"
                paddingTop={index > 0 ? 4 : 0}
                style={{
                    borderTop: index > 0 ? '1px solid #dcdce4' : 'none',
                }}
            >
                <Text
                    label={formatFieldName(key)}
                    size="sm"
                    color="black"
                    width="40%"
                    fontWeight={600}
                    flexShrink={0}
                />
                <Flex direction="column" gap={2} width="60%">
                    {renderValue(data)}
                </Flex>
            </Flex>
        );
    };

    if (typeof value !== 'object') return <></>;

    let index = 0;
    for (const [key, data] of Object.entries(value)) {
        records.push(renderItem(key, data, index));
        index++;
    }

    return (
        <Flex
            direction="column"
            gap={4}
            background="neutral100"
            border="1px solid"
            borderColor="neutral200"
            borderRadius={2}
            paddingTop={4}
            paddingBottom={4}
            paddingLeft={5}
            paddingRight={5}
        >
            {records}
        </Flex>
    );
};

export default CustomField;
