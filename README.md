
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

## 🪪 License

[MIT](./LICENSE)

---

## 👤 Maintainer

[@sklinet](https://www.npmjs.com/package/@sklinet/strapi-plugin-form-builder)
