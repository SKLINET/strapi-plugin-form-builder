import { IApp } from '../../../../types/app';
import { IProduct } from '../../../../types/form';
import { getSystemResource } from '../../../../utils/getSystemResorce';
import { labelToJsonAttribute } from '../../../../utils/labelToJsonAttribute';
import { ProductsInput } from '../../../primitives/ProductsInput/ProductsInput';
import { Switch } from '../../../primitives/Switch/Switch';
import { TextInput } from '../../../primitives/TextInput/TextInput';

interface ProductsSelectionAttributesProps {
    data: {
        type: 'productsSelection';
        name: string | null;
        label: string | null;
        products: IProduct[];
        useOnly: boolean;
        onFullWidth: boolean;
    };
    app: IApp;
}

const ProductsSelectionAttributes = ({
    data: { name, label, products, useOnly, onFullWidth },
    app: {
        controls: { onFieldChange },
        loading,
        config,
    },
}: ProductsSelectionAttributesProps) => (
    <>
        <TextInput
            name="name"
            value={name || ''}
            onChange={(e) => onFieldChange('name', e)}
            label={getSystemResource('attributes.name', config.language)}
            placeholder={labelToJsonAttribute(label || '')}
            disabled={loading}
            hint={getSystemResource('attributes.name.hint', config.language)}
        />
        <TextInput
            name="label"
            value={label || ''}
            onChange={(e) => onFieldChange('label', e)}
            label={getSystemResource('attributes.label', config.language)}
            disabled={loading}
        />
        <ProductsInput
            name="products"
            value={products}
            onChange={(e) => onFieldChange('products', e)}
            label={getSystemResource('attributes.products', config.language)}
            disabled={loading}
            config={config}
        />
        {config.allowFullWidth && (
            <Switch
                name="onFullWidth"
                value={onFullWidth || false}
                onChange={(e) => onFieldChange('onFullWidth', e)}
                label={getSystemResource('attributes.onFullWidth', config.language)}
                disabled={loading}
                width="calc(50% - 8px)"
                config={config}
            />
        )}
        {config.allowUseOnly && (
            <Switch
                name="useOnly"
                value={useOnly}
                onChange={(e) => onFieldChange('useOnly', e)}
                label={getSystemResource('attributes.useOnly', config.language)}
                disabled={loading}
                width="calc(50% - 8px)"
                config={config}
            />
        )}
    </>
);

export { ProductsSelectionAttributes };
