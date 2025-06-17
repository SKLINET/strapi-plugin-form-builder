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
    },
}: ProductsSelectionAttributesProps) => (
    <>
        <TextInput
            name="name"
            value={name || ''}
            onChange={(e) => onFieldChange('name', e)}
            label={getSystemResource('attributes.name')}
            placeholder={labelToJsonAttribute(label || '')}
            disabled={loading}
            hint={getSystemResource('attributes.name.hint')}
        />
        <TextInput
            name="label"
            value={label || ''}
            onChange={(e) => onFieldChange('label', e)}
            label={getSystemResource('attributes.label')}
            disabled={loading}
        />
        <ProductsInput
            name="products"
            value={products}
            onChange={(e) => onFieldChange('products', e)}
            label={getSystemResource('attributes.products')}
            disabled={loading}
        />
        <Switch
            name="onFullWidth"
            value={onFullWidth || false}
            onChange={(e) => onFieldChange('onFullWidth', e)}
            label={getSystemResource('attributes.onFullWidth')}
            disabled={loading}
            width="calc(50% - 8px)"
            secondaryLabels
        />
        <Switch
            name="useOnly"
            value={useOnly}
            onChange={(e) => onFieldChange('useOnly', e)}
            label={getSystemResource('attributes.useOnly')}
            disabled={loading}
            width="calc(50% - 8px)"
            secondaryLabels
        />
    </>
);

export { ProductsSelectionAttributes };
