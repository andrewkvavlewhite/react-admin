import { FC, ComponentProps } from 'react';
import { Toolbar } from 'react-admin';
declare type BaseToolbarSubmitProps = Pick<ComponentProps<typeof Toolbar>, 'handleSubmit' | 'handleSubmitWithRedirect' | 'invalid' | 'redirect' | 'saving' | 'submitOnEnter'>;
export declare type WizardToolbarProps = {
    hasPreviousStep?: boolean;
    hasNextStep?: boolean;
    onPreviousClick?: () => void;
    onNextClick?: () => void;
} & BaseToolbarSubmitProps;
/**
 * The Toolbar displayed at the bottom of WizardForm.
 *
 * @prop {boolean} hasPreviousStep Optionnal. Does the wizard have a previous step?
 * @prop {boolean} hasNextStep Optionnal. Does the wizard have a next step?
 * @prop {Function} onPreviousClick Optionnal. Previous button click action
 * @prop {Function} onNextClick Optionnal. Next button click action
 * @prop {...BaseToolbarSubmitProps}
 */
declare const WizardToolbar: FC<WizardToolbarProps>;
export default WizardToolbar;
