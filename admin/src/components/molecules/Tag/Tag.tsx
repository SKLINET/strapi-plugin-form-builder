import { Tag as StrapiTag } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { nbsp } from '../../../utils/nbsp';

type TagProps = Record<string, any> & {
    label: string;
    onRemove: () => void;
};

const Tag = ({ label, onRemove, ...rest }: TagProps) => (
    <StrapiTag icon={<Cross aria-hidden />} onClick={onRemove} {...rest}>
        {nbsp(label)}
    </StrapiTag>
);

export { Tag };
