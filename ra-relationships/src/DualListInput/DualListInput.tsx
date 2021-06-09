import * as React from 'react';
import { FC, useCallback, useState } from 'react';
import {
    useChoices,
    ChoicesProps,
    InputProps,
    useInput,
    useTranslate,
    ClassesOverride,
    Labeled,
} from 'react-admin';
import { Button, List, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowRightIcon from '@material-ui/icons/ChevronRight';
import classnames from 'classnames';
import { DualListInputItem } from './DualListInputItem';
import { DualListInputSkeleton } from './DualListInputSkeleton';

/**
 * An Input component displaying two list of selected or available items.
 * It allows multiple selections and uses an array of objects for the options.
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'programming', name: 'Programming' },
 *    { id: 'lifestyle', name: 'Lifestyle' },
 *    { id: 'photography', name: 'Photography' },
 * ];
 * <DualListInput source="tags" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <DualListInput source="authors" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <DualListInput source="authors" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <DualListInput source="authors" choices={choices} optionText={<FullNameField />}/>
 *
 * The choices are translated by default, so you can use translation identifiers as choices:
 * @example
 * const choices = [
 *    { id: 'programming', name: 'myroot.tags.programming' },
 *    { id: 'lifestyle', name: 'myroot.tags.lifestyle' },
 *    { id: 'photography', name: 'myroot.tags.photography' },
 * ];
 */
export const DualListInput: FC<DualListInputProps> = props => {
    const classes = useStyles(props);
    const {
        addButtonLabel = 'ra-relationships.duallistinput.select',
        availableItemsLabel = 'ra-relationships.duallistinput.availableItems',
        choices,
        className,
        dense = true,
        disableValue = 'disabled',
        label,
        loading,
        optionText = 'name',
        optionValue = 'id',
        removeButtonLabel = 'ra-relationships.duallistinput.unselect',
        resource,
        selectedItemsLabel = 'ra-relationships.duallistinput.selectedItems',
        translateChoice,
    } = props;

    // We need a fix in react-admin as children of Reference related inputs do not have to specify their source.
    // However, useInput requires it
    // @ts-ignore
    const { id, input, isRequired, meta, source } = useInput(props);
    const translate = useTranslate();

    const { getChoiceValue } = useChoices({
        optionText,
        optionValue,
        translateChoice,
    });

    // This handle the internal selection of items which can then be moved
    // from one list to the other
    const [selectedItems, setSelectedItems] = useState([]);

    // Toggle the selection of a single item
    const handleToggleItemSelection = useCallback(
        (event, item): void => {
            setSelectedItems(currentSelectedItems => {
                const isItemSelected = currentSelectedItems.some(
                    selectedItem =>
                        getChoiceValue(selectedItem) === getChoiceValue(item)
                );

                if (isItemSelected) {
                    return currentSelectedItems.filter(
                        selectedItem =>
                            getChoiceValue(selectedItem) !==
                            getChoiceValue(item)
                    );
                } else {
                    return [...currentSelectedItems, item];
                }
            });
        },
        [getChoiceValue]
    );

    const setInputValue = useCallback(
        (value: any[]): void => {
            input.onChange(value);
            setSelectedItems([]);
        },
        [input]
    );

    // Handler called when an item should be moved to the other list
    const handleMoveItem = useCallback(
        (event, choice) => {
            if (input.value.some(value => value === getChoiceValue(choice))) {
                setInputValue(
                    (input.value || []).filter(
                        item => item !== getChoiceValue(choice)
                    )
                );
                return;
            }

            setInputValue([...input.value, getChoiceValue(choice)]);
        },
        [getChoiceValue, input, setInputValue]
    );

    // Handler called when the selected items should be added to the input value
    const handleAddItems = useCallback(() => {
        const currentSet = new Set(input.value || []);
        selectedItems.forEach(item => currentSet.add(getChoiceValue(item)));
        setInputValue(Array.from(currentSet));
    }, [getChoiceValue, input, selectedItems, setInputValue]);

    // Handler called when the selected items should be removed from the input value
    const handleRemoveItems = useCallback(() => {
        const newValue = (input.value || []).filter(
            value =>
                !selectedItems.some(choice => getChoiceValue(choice) === value)
        );
        setInputValue(newValue);
    }, [getChoiceValue, input, selectedItems, setInputValue]);

    return (
        <Labeled
            id={id}
            input={input}
            meta={meta}
            isRequired={isRequired}
            label={label}
            resource={resource}
            source={source}
            className={className}
        >
            <div className={classes.root}>
                <div>
                    <ListSubheader
                        component="div"
                        id="selected-items-title"
                        className={classes.listHeader}
                    >
                        {translate(selectedItemsLabel, {
                            _: 'Selected items',
                        })}
                    </ListSubheader>
                    {loading ? (
                        <DualListInputSkeleton className={classes.list} />
                    ) : (
                        <List
                            className={classnames(
                                classes.list,
                                classes.selectedList
                            )}
                            dense={dense}
                            disablePadding
                            aria-labelledby="selected-items-title"
                            aria-multiselectable="true"
                            role="listbox"
                        >
                            {(input.value || []).map(value => {
                                const choice = choices.find(
                                    c => getChoiceValue(c) === value
                                );

                                return (
                                    <DualListInputItem
                                        key={value}
                                        choice={choice}
                                        disableValue={disableValue}
                                        onMove={handleMoveItem}
                                        onToggleSelection={
                                            handleToggleItemSelection
                                        }
                                        optionText={optionText}
                                        optionValue={optionValue}
                                        selected={selectedItems.some(
                                            selectedItem =>
                                                getChoiceValue(selectedItem) ===
                                                value
                                        )}
                                        translateChoice={translateChoice}
                                    />
                                );
                            })}
                        </List>
                    )}
                </div>
                <div className={classes.actions}>
                    <Button
                        className={classnames(
                            classes.button,
                            classes.addButton
                        )}
                        onClick={handleAddItems}
                        startIcon={<ArrowLeftIcon />}
                        variant="contained"
                        disabled={selectedItems.length === 0}
                    >
                        {translate(addButtonLabel, {
                            _: addButtonLabel,
                        })}
                    </Button>
                    <Button
                        className={classnames(
                            classes.button,
                            classes.removeButton
                        )}
                        onClick={handleRemoveItems}
                        endIcon={<ArrowRightIcon />}
                        variant="contained"
                        disabled={selectedItems.length === 0}
                    >
                        {translate(removeButtonLabel, {
                            _: removeButtonLabel,
                        })}
                    </Button>
                </div>
                <div>
                    <ListSubheader
                        component="div"
                        id="available-items-title"
                        className={classes.listHeader}
                    >
                        {translate(availableItemsLabel, {
                            _: 'Available items',
                        })}
                    </ListSubheader>
                    {loading ? (
                        <DualListInputSkeleton className={classes.list} />
                    ) : (
                        <List
                            className={classnames(
                                classes.list,
                                classes.availableList
                            )}
                            dense={dense}
                            disablePadding
                            aria-labelledby="available-items-title"
                            aria-multiselectable="true"
                            role="listbox"
                        >
                            {choices
                                .filter(
                                    choice =>
                                        !(input.value || []).some(
                                            val =>
                                                getChoiceValue(choice) === val
                                        )
                                )
                                .map(choice => (
                                    <DualListInputItem
                                        key={getChoiceValue(choice)}
                                        choice={choice}
                                        disableValue={disableValue}
                                        onMove={handleMoveItem}
                                        onToggleSelection={
                                            handleToggleItemSelection
                                        }
                                        optionText={optionText}
                                        optionValue={optionValue}
                                        selected={selectedItems.some(
                                            selectedItem =>
                                                getChoiceValue(selectedItem) ===
                                                getChoiceValue(choice)
                                        )}
                                        translateChoice={translateChoice}
                                    />
                                ))}
                        </List>
                    )}
                </div>
            </div>
        </Labeled>
    );
};

DualListInput.defaultProps = {
    defaultValue: [],
    source: '',
};

interface Props {
    choices?: any;
    className?: string;
    disableValue?: string;
    source?: string;
    classes?: ClassesOverride<typeof useStyles>;
    dense?: boolean;
    addButtonLabel?: string;
    removeButtonLabel?: string;
}

export type DualListInputProps = Props &
    Omit<ChoicesProps, 'choices'> &
    Omit<InputProps, 'source'>;

const useStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
        },
        actions: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        button: {
            '& + &': {
                marginTop: theme.spacing(1),
            },
        },
        addButton: {
            justifyContent: 'start',
        },
        removeButton: {
            justifyContent: 'end',
        },
        list: {
            minWidth: 256,
            height: 256,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
        },
        listHeader: {
            borderColor: theme.palette.divider,
            borderStyle: 'solid',
            borderWidth: 1,
            borderBottom: 'none',
        },
        selectedList: {},
        availableList: {},
    }),
    {
        name: 'RaDualListInput',
    }
);
