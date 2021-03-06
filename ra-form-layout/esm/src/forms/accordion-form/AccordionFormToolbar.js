var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { Children, Fragment, isValidElement } from 'react';
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
var AccordionFormToolbar = function (props) {
    var _a;
    var alwaysEnableSaveButton = props.alwaysEnableSaveButton, basePath = props.basePath, children = props.children, className = props.className, classesOverride = props.classes, handleSubmit = props.handleSubmit, handleSubmitWithRedirect = props.handleSubmitWithRedirect, invalid = props.invalid, pristine = props.pristine, record = props.record, redirect = props.redirect, resource = props.resource, saving = props.saving, submitOnEnter = props.submitOnEnter, undoable = props.undoable, width = props.width, rest = __rest(props, ["alwaysEnableSaveButton", "basePath", "children", "className", "classes", "handleSubmit", "handleSubmitWithRedirect", "invalid", "pristine", "record", "redirect", "resource", "saving", "submitOnEnter", "undoable", "width"]);
    var classes = useStyles(props);
    // Use form pristine to enable or disable the save button
    // if alwaysEnableSaveButton is undefined
    var disabled = !valueOrDefault(alwaysEnableSaveButton, !pristine);
    return (React.createElement(Fragment, null,
        React.createElement(Toolbar, __assign({ className: classnames(classes.toolbar, (_a = {},
                _a[classes.mobileToolbar] = width === 'xs',
                _a[classes.desktopToolbar] = width !== 'xs',
                _a), className), role: "toolbar" }, rest), Children.count(children) === 0 ? (React.createElement("div", { className: classes.defaultToolbar },
            React.createElement(SaveButton, { handleSubmitWithRedirect: handleSubmitWithRedirect || handleSubmit, disabled: disabled, invalid: invalid, redirect: redirect, saving: saving, submitOnEnter: submitOnEnter }),
            record && typeof record.id !== 'undefined' && (React.createElement(DeleteButton, { basePath: basePath, record: record, resource: resource, undoable: undoable })))) : (Children.map(children, function (button) {
            return button && isValidElement(button)
                ? React.cloneElement(button, {
                    basePath: basePath,
                    handleSubmit: valueOrDefault(button.props.handleSubmit, handleSubmit),
                    handleSubmitWithRedirect: valueOrDefault(button.props.handleSubmitWithRedirect, handleSubmitWithRedirect),
                    onSave: button.props.onSave,
                    invalid: invalid,
                    pristine: pristine,
                    record: record,
                    resource: resource,
                    saving: saving,
                    submitOnEnter: valueOrDefault(button.props.submitOnEnter, submitOnEnter),
                    undoable: valueOrDefault(button.props.undoable, undoable),
                })
                : null;
        }))),
        React.createElement("div", { className: classes.spacer })));
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
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
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
        spacer: (_a = {},
            _a[theme.breakpoints.down('xs')] = {
                height: '5em',
            },
            _a),
    });
}, { name: 'RaAccordionFormToolbar' });
var valueOrDefault = function (value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
};
export default withWidth({ initialWidth: 'xs' })(AccordionFormToolbar);
