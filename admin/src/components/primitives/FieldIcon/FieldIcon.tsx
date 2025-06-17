import {
    Italic,
    Paragraph,
    Mail,
    Phone,
    SealCheck,
    Cursor,
    List,
    HeadingOne,
    Minus,
    File,
    Link,
    Code,
    Faders,
    Shirt,
    ShoppingCart,
} from '@strapi/icons';
import { IFormField } from '../../../types/form';

interface FieldIconProps {
    type: IFormField['type'];
    size?: 's' | 'm';
}

const FieldIcon = ({ type, size = 'm' }: FieldIconProps) => {
    const props = size === 'm' ? { width: '24px', height: '24px' } : { width: '16px', height: '16px' };

    switch (type) {
        case 'textinput':
            return <Italic {...props} />;
        case 'textarea':
            return <Paragraph {...props} />;
        case 'email':
            return <Mail {...props} />;
        case 'phone':
            return <Phone {...props} />;
        case 'checkbox':
            return <SealCheck {...props} />;
        case 'file':
            return <File {...props} />;
        case 'select':
            return <Link {...props} />;
        case 'checkboxGroup':
            return <Faders {...props} />;
        case 'productsSelection':
            return <Shirt {...props} />;
        case 'amount':
            return <ShoppingCart {...props} />;
        case 'submit':
            return <Cursor {...props} />;
        case 'title':
            return <HeadingOne {...props} />;
        case 'message':
            return <List {...props} />;
        case 'divider':
            return <Minus {...props} />;
        case 'special':
            return <Code {...props} />;
        default:
            return <Italic {...props} />;
    }
};

export { FieldIcon };
