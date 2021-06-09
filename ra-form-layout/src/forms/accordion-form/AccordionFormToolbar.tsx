import * as React from 'react';
import { Children, Fragment, isValidElement, ReactElement, FC } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import withWidth from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { SaveButton, DeleteButton } from 'react-admin';

/**
 * The Toolbar displayed at the bottom of AccordionForm.
 *
 * @example Always enable the <SaveButton />
 *
 * import * as React from 'react';
 * import { Edit } from 'react-admin';
 * import { AccordionForm, AccordionFormToolbar } from '@react-admin/ra-form-layout';
 *
 * const CommentEdit = props => (
 *     <Edit {...props}>
 *         <AccordionForm toolbar={<AccordionFormToolbar alwaysEnableSaveButton={true} />}>
 *             ....
 *         </AccordionForm>
 *     </Edit>
 * );
 *
 * @typedef {Object} Props the props you can use (other props are injected by the <SimpleForm>)
 * @prop {boolean} alwaysEnableSaveButton Force enabling the <SaveButton>. It it's not defined, the <SaveButton> will be enabled using the `pristine` prop (disabled if pristine, enabled otherwise).
 * @prop {ReactElement[]} children Customize the buttons you want to display in the <Toolbar>.
 * @prop {string} width Apply the mobile or the desktop classes depending on the width. Pass "xs" to display the mobile version.
 *
 */
const AccordionFormToolbar: FC<any> = props => {
    const {
        alwaysEnableSaveButton,
        basePath,
        children,
        className,
        classes: classesOverride,
        handleSubmit,
        handleSubmitWithRedirect,
        invalid,
        pristine,
        record,
        redirect,
        resource,
        saving,
        submitOnEnter,
        undoable,
        width,
        ...rest
    } = props;
    const classes = useStyles(props);

    // Use form pristine to enable or disable the save button
    // if alwaysEnableSaveButton is undefined
    const disabled = !valueOrDefault(alwaysEnableSaveButton, !pristine);

    return (
        <Fragment>
            <Toolbar
                className={classnames(
                    classes.toolbar,
                    {
                        [classes.mobileToolbar]: width === 'xs',
                        [classes.desktopToolbar]: width !== 'xs',
                    },
                    className
                )}
                role="toolbar"
                {...rest}
            >
                {Children.count(children) === 0 ? (
                    <div className={classes.defaultToolbar}>
                        <SaveButton
                            handleSubmitWithRedirect={
                                handleSubmitWithRedirect || handleSubmit
                            }
                            disabled={disabled}
                            invalid={invalid}
                            redirect={redirect}
                            saving={saving}
                            submitOnEnter={submitOnEnter}
                        />
                        {record && typeof record.id !== 'undefined' && (
                            <DeleteButton
                                basePath={basePath}
                                record={record}
                                resource={resource}
                                undoable={undoable}
                            />
                        )}
                    </div>
                ) : (
                    Children.map(children, (button: ReactElement) =>
                        button && isValidElement<any>(button)
                            ? React.cloneElement(button, {
                                  basePath,
                                  handleSubmit: valueOrDefault(
                                      button.props.handleSubmit,
                                      handleSubmit
                                  ),
                                  handleSubmitWithRedirect: valueOrDefault(
                                      button.props.handleSubmitWithRedirect,
                                      handleSubmitWithRedirect
                                  ),
                                  onSave: button.props.onSave,
                                  invalid,
                                  pristine,
                                  record,
                                  resource,
                                  saving,
                                  submitOnEnter: valueOrDefault(
                                      button.props.submitOnEnter,
                                      submitOnEnter
                                  ),
                                  undoable: valueOrDefault(
                                      button.props.undoable,
                                      undoable
                                  ),
                              })
                            : null
                    )
                )}
            </Toolbar>
            <div className={classes.spacer} />
        </Fragment>
    );
};

AccordionFormToolbar.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    handleSubmit: PropTypes.func,
    handleSubmitWithRedirect: PropTypes.func,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    submitOnEnter: PropTypes.bool,
    undoable: PropTypes.bool,
    width: PropTypes.string,
};

AccordionFormToolbar.defaultProps = {
    submitOnEnter: true,
};

const useStyles = makeStyles(
    theme => ({
        toolbar: {},
        desktopToolbar: {
            marginTop: theme.spacing(2),
        },
        mobileToolbar: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px',
            width: '100%',
            boxSizing: 'border-box',
            flexShrink: 0,
            zIndex: 2,
        },
        defaultToolbar: {
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
        },
        spacer: {
            [theme.breakpoints.down('xs')]: {
                height: '5em',
            },
        },
    }),
    { name: 'RaAccordionFormToolbar' }
);

const valueOrDefault = (value, defaultValue): any =>
    typeof value === 'undefined' ? defaultValue : value;

export default withWidth({ initialWidth: 'xs' })(AccordionFormToolbar);
