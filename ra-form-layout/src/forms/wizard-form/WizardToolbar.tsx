import * as React from 'react';
import { FC, ComponentProps } from 'react';
import { Toolbar as MUIToolbar, Button, Grid } from '@material-ui/core';
import { SaveButton, Toolbar, useTranslate } from 'react-admin';

type BaseToolbarSubmitProps = Pick<
    ComponentProps<typeof Toolbar>,
    | 'handleSubmit'
    | 'handleSubmitWithRedirect'
    | 'invalid'
    | 'redirect'
    | 'saving'
    | 'submitOnEnter'
>;

export type WizardToolbarProps = {
    hasPreviousStep?: boolean;
    hasNextStep?: boolean;
    onPreviousClick?: () => void;
    onNextClick?: () => void;
} & BaseToolbarSubmitProps;

const noop = (): void => null;

/**
 * The Toolbar displayed at the bottom of WizardForm.
 *
 * @prop {boolean} hasPreviousStep Optionnal. Does the wizard have a previous step?
 * @prop {boolean} hasNextStep Optionnal. Does the wizard have a next step?
 * @prop {Function} onPreviousClick Optionnal. Previous button click action
 * @prop {Function} onNextClick Optionnal. Next button click action
 * @prop {...BaseToolbarSubmitProps}
 */
const WizardToolbar: FC<WizardToolbarProps> = ({
    hasPreviousStep = false,
    hasNextStep = false,
    onPreviousClick = noop,
    onNextClick = noop,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    redirect,
    saving,
    submitOnEnter,
}) => {
    const translate = useTranslate();

    return (
        <MUIToolbar>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                    {hasPreviousStep ? (
                        <Button variant="text" onClick={onPreviousClick}>
                            {translate('ra-form-layout.action.previous')}
                        </Button>
                    ) : null}
                </Grid>
                <Grid item>
                    {hasNextStep ? (
                        <Button
                            disabled={invalid}
                            variant="contained"
                            color="primary"
                            onClick={onNextClick}
                        >
                            {translate('ra-form-layout.action.next')}
                        </Button>
                    ) : (
                        <SaveButton
                            handleSubmitWithRedirect={
                                handleSubmitWithRedirect || handleSubmit
                            }
                            disabled={invalid}
                            invalid={invalid}
                            redirect={redirect}
                            saving={saving}
                            submitOnEnter={submitOnEnter}
                        />
                    )}
                </Grid>
            </Grid>
        </MUIToolbar>
    );
};

export default WizardToolbar;
