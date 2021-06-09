import * as React from 'react';
import { FC } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import DashboardIcon from '@material-ui/icons/Dashboard';
import inflection from 'inflection';
import DefaultIcon from '@material-ui/icons/ViewList';
import { getResources, useTranslate, Translate } from 'react-admin';
import { MenuItemCategory, MultiLevelMenu } from '@react-admin/ra-navigation';

const translatedResourceName = (resource: any, translate: Translate): string =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _:
            resource.options && resource.options.label
                ? translate(resource.options.label, {
                      smart_count: 2,
                      _: resource.options.label,
                  })
                : inflection.humanize(inflection.pluralize(resource.name)),
    });

const Menu: FC<MenuProps> = ({ hasDashboard }) => {
    const translate = useTranslate();
    const resources = useSelector(getResources, shallowEqual) as Array<any>;

    return (
        <MultiLevelMenu variant="categories">
            {hasDashboard && (
                <MenuItemCategory
                    name="dashboard"
                    to="/"
                    exact
                    label="Dashboard"
                    icon={<DashboardIcon />}
                />
            )}
            {resources
                .filter(r => r.hasList)
                .map(resource => (
                    <MenuItemCategory
                        key={resource.name}
                        name={resource.name}
                        to={`/${resource.name}`}
                        exact
                        label={translatedResourceName(resource, translate)}
                        icon={
                            resource.icon ? <resource.icon /> : <DefaultIcon />
                        }
                    />
                ))}
        </MultiLevelMenu>
    );
};

export interface MenuProps {
    hasDashboard: boolean;
}

Menu.propTypes = {
    hasDashboard: PropTypes.bool,
};

export default Menu;
