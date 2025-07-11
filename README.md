
# Strapi 5 Plugin – Form Builder

A **visual form-builder plugin** for **Strapi v5** that lets you design and manage forms straight from the admin panel.

---

## ✨ Features
- **Auto-generated Content Type:** `Forms` (collection name: **`built-forms`**)
- Form designer
- Multilingual UI (English `en` / Czech `cs`)
- Fine-grained field-type allow-listing
- Supports a rich set of input components (text, e-mail, file upload, product pickers, etc.)
- Conditional fields

---

## 🚀 Installation

```bash
npm i @sklinet/strapi-plugin-form-builder
```

---

## 🔌 Enable the plugin

Create or edit `config/plugins.js` (or `.ts`):

```js
module.exports = {
  'form-builder': {
    enabled: true,
  },
};
```

---

## ⚙️ Optional configuration

```js
module.exports = {
  'form-builder': {
    enabled: true,
    config: {
      language: 'en',      // 'en' (default) | 'cs'
      fields: '*',         // '*' = all field types, OR array of allowed types
    },
  },
};
```

| Option     | Type                         | Purpose                                                          |
|------------|-----------------------------|------------------------------------------------------------------|
| `language` | `'en'` \| `'cs'`            | Sets the plugin’s UI language.                                   |
| `fields`   | `"*"` \| `string[]`         | Which field types a user may add. Use `"*"` for **all** types.   |

---

## 📋 Supported field types

```
'textinput' | 'textarea' | 'email' | 'phone' | 'file'
'select'    | 'checkbox' | 'checkboxGroup'
'productsSelection' | 'amount'
'submit' | 'title' | 'message' | 'divider' | 'special'
```

---

## 🗄️ Data model

| Collection | UID                      | Notes                           |
|------------|--------------------------|---------------------------------|
| **Forms**  | `plugin::form-builder.form` | Auto-generated; collection name **`built-forms`** |

Each saved form instance is stored as a document in **`built-forms`**, making it manageable like any other Strapi content type.

---


---

## 🧩 TypeScript Interfaces

If you're using TypeScript, here are the types used by the plugin so you can safely access form data:

```ts
export interface IBuiltForm {
    id: number;
    documentId: string;
    title: string;
    data: IFormField[] | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export type IFormField = {
    id: string;
    onFullWidth: boolean;
    conditionsEval?: 'and' | 'or';
    conditions?: ICondition[];
    type:
        | 'textinput'
        | 'textarea'
        | 'email'
        | 'phone'
        | 'file'
        | 'select'
        | 'checkbox'
        | 'checkboxGroup'
        | 'productsSelection'
        | 'amount'
        | 'submit'
        | 'title'
        | 'message'
        | 'divider'
        | 'special';
} & (
    | {
          type: 'textinput';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'textarea';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'email';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'phone';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'file';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          maxFileCount: number | null;
          allowedFileTypes: string[] | null;
          maxFileSize: number | null;
          useOnly: boolean;
      }
    | {
          type: 'select';
          name: string | null;
          label: string | null;
          placeholder: string | null;
          required: boolean;
          options: ISelectedOption[];
          useOnly: boolean;
      }
    | {
          type: 'checkbox';
          name: string | null;
          label: string | null;
          required: boolean;
          useOnly: boolean;
      }
    | {
          type: 'checkboxGroup';
          name: string | null;
          label: string | null;
          options: ISelectedOption[];
          useOnly: boolean;
      }
    | {
          type: 'productsSelection';
          name: string | null;
          label: string | null;
          products: IProduct[];
          useOnly: boolean;
      }
    | {
          type: 'amount';
          name: string | null;
          label: string | null;
          fields: string[];
          useOnly: boolean;
      }
    | {
          type: 'submit';
          label: string | null;
      }
    | {
          type: 'title';
          label: string | null;
          isLarge: boolean;
      }
    | {
          type: 'message';
          label: string | null;
      }
    | {
          type: 'divider';
      }
    | {
          type: 'special';
          codename: string | null;
      }
);

export interface ISelectedOption {
    key: string;
    label: string;
}

export interface IProduct {
    id: string;
    name: string;
    label: string;
    price: number;
}

export type IProductRecord = {
    id: string;
    name: string;
    totalPrice: number;
    amount: number;
};

export type IOperator = 'equals' | 'not-equals' | 'contains' | 'not-contains' | 'empty' | 'not-empty' | 'has-checked';

export interface ICondition {
    id: string;
    fieldId: string;
    operator: IOperator;
    value: string | boolean | ISelectedOption | undefined;
}
```

---

## 🪪 License

[MIT](./LICENSE)

---

## 👤 Maintainer

[@sklinet](https://www.npmjs.com/package/@sklinet/strapi-plugin-form-builder)
