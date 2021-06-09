import * as React from 'react';
import { FC } from 'react';
import { TabbedForm as RaTabbedForm, TabbedFormProps } from 'react-admin';
import Toolbar from './Toolbar';

const TabbedForm: FC<TabbedFormProps> = props => (
    <RaTabbedForm toolbar={<Toolbar />} {...props} />
);

export default TabbedForm;
