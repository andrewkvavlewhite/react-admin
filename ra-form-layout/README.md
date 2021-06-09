# ra-form-layout

New form layouts for complex data entry tasks (accordion, wizard, etc.).

![ra-accordion-form](./assets/ra-accordion-form-overview.gif)

## Installation

```sh
npm install --save @react-admin/ra-form-layout
# or
yarn add @react-admin/ra-form-layout
```

**Tip**: `ra-form-layout` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

The package contains new translation messages (in English and French). You should add them to your `i18nProvider`:

```jsx
    import { Admin } from 'react-admin';
    import polyglotI18nProvider from 'ra-i18n-polyglot';
    import englishMessages from 'ra-language-english';
    import frenchMessages from 'ra-language-french';

    import {
        raFormLayoutLanguageEnglish,
        raFormLayoutLanguageFrench,
    } from '@react-admin/ra-form-layout';

    const messages = {
        en: { ...englishMessages, ...raFormLayoutLanguageEnglish },
        fr: { ...frenchMessages, ...raFormLayoutLanguageFrench },
    };

    const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'en');

    const App = () => (
        <Admin i18nProvider={is18nProvider}>
            {/* ... */}
        </Admin>
    );
```

## `<AccordionForm>`

Alternative to `<SimpleForm>`, to be used as child of `<Create>` or `<Edit>`. Expects `<AccordionFormPanel>` elements as children.

![AccordionForm](./assets/ra-accordion-form-overview.gif)

By default, each child accordion element handles its expanded state independently.

```jsx
import {
    Edit,
    TextField,
    TextInput,
    DateInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    BooleanInput,
} from 'react-admin';

import { AccordionForm, AccordionFormPanel } from '@react-admin/ra-form-layout';

// don't forget the component="div" prop on the main component to disable the main Card
const CustomerEdit: FC = props => (
    <Edit {...props} component="div">
        <AccordionForm autoClose>
            <AccordionFormPanel label="Identity">
                <TextField source="id" />
                <TextInput source="first_name" validate={required()} />
                <TextInput source="last_name" validate={required()} />
                <DateInput source="dob" label="born" validate={required()} />
                <SelectInput source="sex" choices={sexChoices} />
            </AccordionFormPanel>
            <AccordionFormPanel label="Occupations">
                <ArrayInput source="occupations" label="">
                    <SimpleFormIterator>
                        <TextInput source="name" validate={required()} />
                        <DateInput source="from" validate={required()} />
                        <DateInput source="to" />
                    </SimpleFormIterator>
                </ArrayInput>
            </AccordionFormPanel>
            <AccordionFormPanel label="Preferences">
                <SelectInput
                    source="language"
                    choices={languageChoices}
                    defaultValue="en"
                />
                <BooleanInput source="dark_theme" />
                <BooleanInput source="accepts_emails_from_partners" />
            </AccordionFormPanel>
        </AccordionForm>
    </Edit>
);
```

### `autoClose`

When setting `autoClose` in the `<AccordionForm>`, only one accordion remains open at a time. The first accordion is open by default, and when a user opens another one, the current open accordion closes.

```diff
import { Edit, TextField, TextInput, DateInput, SelectInput, ArrayInput, SimpleFormIterator, BooleanInput } from 'react-admin';
import { AccordionForm, AccordionFormPanel } from '@react-admin/ra-form-layout';

// don't forget the component="div" prop on the main component to disable the main Card
const CustomerEdit: FC = props => (
    <Edit {...props} component="div">
-       <AccordionForm>
+       <AccordionForm autoClose>
            <AccordionFormPanel label="Identity" defaultExpanded>
                <TextField source="id" />
                ...
```

### `toolbar`

You can customize the form Toolbar by passing a custom element in the `toolbar` prop. The form expects the same type of element as `<SimpleForm>`, see [the `<SimpleForm toolbar>` prop documentation](https://marmelab.com/react-admin/CreateEdit.html#toolbar) in the react-admin docs.

### `<AccordionFormPanel>`

Renders [a material-ui `<Accordion>` component](https://material-ui.com/components/accordion/). In the `<AccordionDetails>`, renders each child inside a `<FormInput>` (the same layout as in `<SimpleForm>`).

| Prop              | Required | Type        | Default | Description                                                                                      |
| ----------------- | -------- | ----------- | ------- | ------------------------------------------------------------------------------------------------ |
| `label`           | Required | `string`    | -       | The main label used as the accordion summary. Appears in red when the accordion has errors       |
| `children`        | Required | `ReactNode` | -       | A list of `<Input>` elements                                                                     |
| `secondary`       | Optional | `string`    | -       | The secondary label used as the accordion summary                                                |
| `defaultExpanded` | Optional | `boolean`   | `false` | Set to true to have the accordion expanded by default (except if autoClose = true on the parent) |
| `disabled`        | Optional | `boolean`   | `false` | If true, the accordion will be displayed in a disabled state.                                    |
| `square`          | Optional | `boolean`   | `false` | If true, rounded corners are disabled.                                                           |

```jsx
import {
    Edit,
    TextField,
    TextInput,
    DateInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    BooleanInput,
} from 'react-admin';

import { AccordionForm, AccordionFormPanel } from '@react-admin/ra-form-layout';

const CustomerEdit: FC = props => (
    <Edit {...props} component="div">
        <AccordionForm>
            <AccordionFormPanel label="Identity" defaultExpanded>
                <TextField source="id" />
                <TextInput source="first_name" validate={required()} />
                <TextInput source="last_name" validate={required()} />
                <DateInput source="dob" label="born" validate={required()} />
                <SelectInput source="sex" choices={sexChoices} />
            </AccordionFormPanel>
        </AccordionFormPanel>
    </Edit>
);
```

## `<AccordionSection>`

Renders children (Inputs) inside a material-ui `<Accordion>` element without a Card style. To be used as child of a `<SimpleForm>` or a `<TabbedForm>` element.

![AccordionSection](./assets/ra-accordion-section-overview.gif)

Prefer `<AccordionSection>` to `<AccordionForm>` to always display a list of important inputs, then offer accordions for secondary inputs.

| Prop              | Required | Type        | Default | Description                                                   |
| ----------------- | -------- | ----------- | ------- | ------------------------------------------------------------- |
| `Accordion`       | Optional | `Component` | -       | The component to use as the accordion.                        |
| `AccordionDetails`| Optional | `Component` | -       | The component to use as the accordion details.                |
| `AccordionSummary`| Optional | `Component` | -       | The component to use as the accordion summary.                |
| `label`           | Required | `string`    | -       | The main label used as the accordion summary.                 |
| `children`        | Required | `ReactNode` | -       | A list of `<Input>` elements                                  |
| `fullWidth`       | Optional | `boolean`   | `false` | If true, the Accordion take sthe entire form width.           |
| `className`       | Optional | `string`    | -       | A class name to style the underlying `<Accordion>`            |
| `secondary`       | Optional | `string`    | -       | The secondary label used as the accordion summary             |
| `defaultExpanded` | Optional | `boolean`   | `false` | Set to true to have the accordion expanded by default         |
| `disabled`        | Optional | `boolean`   | `false` | If true, the accordion will be displayed in a disabled state. |
| `square`          | Optional | `boolean`   | `false` | If true, rounded corners are disabled.                        |

```jsx
import {
    Edit,
    TextField,
    TextInput,
    DateInput,
    SelectInput,
    ArrayInput,
    SimpleForm,
    SimpleFormIterator,
    BooleanInput,
} from 'react-admin';

import { AccordionForm, AccordionFormPanel } from '@react-admin/ra-form-layout';

const CustomerEdit: FC = props => (
    <Edit {...props} component="div">
        <SimpleForm>
            <TextField source="id" />
            <TextInput source="first_name" validate={required()} />
            <TextInput source="last_name" validate={required()} />
            <DateInput source="dob" label="born" validate={required()} />
            <SelectInput source="sex" choices={sexChoices} />
            <AccordionSection label="Occupations" fullWidth>
                <ArrayInput source="occupations" label="">
                    <SimpleFormIterator>
                        <TextInput source="name" validate={required()} />
                        <DateInput source="from" validate={required()} />
                        <DateInput source="to" />
                    </SimpleFormIterator>
                </ArrayInput>
            </AccordionSection>
            <AccordionSection label="Preferences" fullWidth>
                <SelectInput
                    source="language"
                    choices={languageChoices}
                    defaultValue="en"
                />
                <BooleanInput source="dark_theme" />
                <BooleanInput source="accepts_emails_from_partners" />
            </AccordionSection>
        </SimpleFormForm>
    </Edit>
);
```

## `<WizardForm>`

Alternative to `<SimpleForm>`, to be used as child of `<Create>`. Expects `<WizardFormStep>` elements as children.

Note: You can also use the `<WizardForm>` as child of `<Edit>` but it's considered as a bad practice to provide a wizard form for existing resources.

![WizardForm](./assets/ra-wizard-form-overview.gif)

```jsx
import React, { FC } from 'react';
import { Create, TextInput, required } from 'react-admin';
import { WizardForm, WizardFormStep } from '@react-admin/ra-form-layout';

const PostCreate: FC = props => (
    <Create {...props}>
        <WizardForm>
            <WizardFormStep label="First step">
                <TextInput source="title" validate={required()} />
            </WizardFormStep>
            <WizardFormStep label="Second step">
                <TextInput source="description" />
            </WizardFormStep>
            <WizardFormStep label="Third step">
                <TextInput source="fullDescription" validate={required()} />
            </WizardFormStep>
        </WizardForm>
    </Create>
);
```

### `toolbar`

You can customize the form toolbar by passing a custom component in the `toolbar` prop.

```jsx
import React, { FC } from 'react';
import { Create, TextInput, required } from 'react-admin';
import { WizardForm, WizardFormStep } from '@react-admin/ra-form-layout';

const MyToolbar: FC = ({
    hasPreviousStep,
    hasNextStep,
    onPreviousClick,
    onNextClick,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    redirect,
    saving,
    submitOnEnter,
}) => {
    const save = handleSubmitWithRedirect || handleSubmit;

    return (
        <ul>
            {hasPreviousStep ? (
                <li>
                    <Button onClick={onPreviousClick}>
                        PREVIOUS
                    </Button>
                </li>
            ) : null}
            {hasNextStep ? (
                <li>
                    <Button disabled={invalid} onClick={onNextClick}>
                        NEXT
                    </Button>
                </li>
            ) : (
                <li>
                    <Button disabled={invalid} onClick={save}>
                        SAVE
                    </Button>
                </li>
            )}
        </ul>
    );
};

const PostCreate: FC = props => (
    <Create {...props}>
        <WizardForm toolbar={MyToolbar}>
            <WizardFormStep label="First step">
                <TextInput source="title" validate={required()} />
            </WizardFormStep>
            <WizardFormStep label="Second step">
                <TextInput source="description" />
            </WizardFormStep>
            <WizardFormStep label="Third step">
                <TextInput source="fullDescription" validate={required()} />
            </WizardFormStep>
        </WizardForm>
    </Create>
);
```

### `progress`

You can also customize the progress stepper by passing a custom component in the `progress` prop.

```jsx
const MyProgress: FC = ({
    currentStep,
    onStepClick,
    steps,
}) => (
    <ul>
        {steps.map((step, index) => {
            const label = React.cloneElement(step, { intent: 'label' });

            return (
                <li key={`step_${index}`}>
                    {!onStepClick ? (
                        <span className={currentStep === index ? 'active' : undefined}>
                        {label}
                        </span>
                    ) : (
                        <button onClick={() => onStepClick(index)}>
                            {label}
                        </button>
                    )}
                </li>
            );
        })}
    </ul>
);

const PostCreate: FC = props => (
    <Create {...props}>
        <WizardForm progress={MyProgress}>
            <WizardFormStep label="First step">
                <TextInput source="title" validate={required()} />
            </WizardFormStep>
            <WizardFormStep label="Second step">
                <TextInput source="description" />
            </WizardFormStep>
            <WizardFormStep label="Third step">
                <TextInput source="fullDescription" validate={required()} />
            </WizardFormStep>
        </WizardForm>
    </Create>
);
```

## `<CreateDialog>` & `<EditDialog>`

Sometimes it makes sense to edit or create a resource without leaving the context of the list page.
For those cases, you can use the `<CreateDialog>` and `<EditDialog>` components.

![EditDialog](./assets/edit-dialog.gif)

They accept a single child which is the form, either a `<SimpleForm>`, a `<TabbedForm>` or a custom one, just like the `<Create>` and `<Edit>` components.

```jsx
import React from 'react';
import { List, Datagrid, SimpleForm, TextField, TextInput, DateInput, required } from 'react-admin';
import { EditDialog, CreateDialog } from '@react-admin/ra-form-layout';

const CustomerList = props => (
    <>
        <List {...props}>
            <Datagrid>
                ...
            </Datagrid>
        </List>
        <EditDialog {...props}>
            <SimpleForm>
                <TextField source="id" />
                <TextInput source="first_name" validate={required()} />
                <TextInput source="last_name" validate={required()} />
                <DateInput source="date_of_birth" label="born" validate={required()} />
            </SimpleForm>
        </EditDialog>
        <CreateDialog {...props}>
            <SimpleForm>
                <TextField source="id" />
                <TextInput source="first_name" validate={required()} />
                <TextInput source="last_name" validate={required()} />
                <DateInput source="date_of_birth" label="born" validate={required()} />
            </SimpleForm>
        </CreateDialog>
    </>
);
```

Unlike the `<Create>` and `<Edit>` components, their title will be displayed in the `<Dialog>`, not in the `<AppBar>`.

```jsx
import React from 'react';
import { List, Datagrid, SimpleForm, TextField, TextInput, DateInput, required } from 'react-admin';
import { EditDialog, CreateDialog } from '@react-admin/ra-form-layout';

const CustomerEditTitle = ({ record }) =>
    record
        ? <span>{record.last_name} {record.first_name}</span>
        : null;

const CustomerList = props => (
    <>
        <List {...props}>
            <Datagrid>
                ...
            </Datagrid>
        </List>
        <EditDialog {...props} title={<CustomerEditTitle />}>
            <SimpleForm>
                <TextField source="id" />
                <TextInput source="first_name" validate={required()} />
                <TextInput source="last_name" validate={required()} />
                <DateInput source="date_of_birth" label="born" validate={required()} />
            </SimpleForm>
        </EditDialog>
        <CreateDialog {...props} title="Create a new customer">
            <SimpleForm>
                <TextField source="id" />
                <TextInput source="first_name" validate={required()} />
                <TextInput source="last_name" validate={required()} />
                <DateInput source="date_of_birth" label="born" validate={required()} />
            </SimpleForm>
        </CreateDialog>
    </>
);
```

Besides, you can also pass the props accepted by the material-ui [`<Dialog>`](https://material-ui.com/api/dialog/) like `fullWidth` or `maxWidth`.

```jsx
import React from 'react';
import { List, Datagrid, SimpleForm, TextField, TextInput, DateInput, required } from 'react-admin';
import { EditDialog, CreateDialog } from '@react-admin/ra-form-layout';

const CustomerList = props => (
    <>
        <List {...props}>
            <Datagrid>
                ...
            </Datagrid>
        </List>
        <EditDialog {...props} fullWidth maxWidth="md">
            <SimpleForm>
                <TextField source="id" />
                <TextInput source="first_name" validate={required()} />
                <TextInput source="last_name" validate={required()} />
                <DateInput source="date_of_birth" label="born" validate={required()} />
            </SimpleForm>
        </EditDialog>
        <CreateDialog {...props} fullWidth maxWidth="md">
            <SimpleForm>
                <TextField source="id" />
                <TextInput source="first_name" validate={required()} />
                <TextInput source="last_name" validate={required()} />
                <DateInput source="date_of_birth" label="born" validate={required()} />
            </SimpleForm>
        </CreateDialog>
    </>
);
```
