import * as React from 'react';
import { FC } from 'react';
import { SimpleForm as RaSimpleForm, SimpleFormProps } from 'react-admin';
import Toolbar from './Toolbar';

const SimpleForm: FC<SimpleFormProps> = props => (
    <RaSimpleForm toolbar={<Toolbar />} {...props} />
);

export default SimpleForm;
