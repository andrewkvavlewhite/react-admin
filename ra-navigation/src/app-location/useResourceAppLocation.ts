import { useSelector, shallowEqual } from 'react-redux';
import { getResources } from 'react-admin';
import { useLocation } from 'react-router-dom';

import { AppLocation } from './AppLocationContext';

import {
    ResourceLocationInfo,
    resolveResourceLocationInfo,
} from './resolveResourceLocationInfo';

const recordSelector = (resource, id) => (state: any): any =>
    state.admin.resources[resource] && state.admin.resources[resource].data[id];

const buildResourceLocationInfoPath = ({
    resource,
    type,
}: ResourceLocationInfo): string =>
    `${resource}${type === 'list' ? '' : `.${type}`}`;

export const useResourceAppLocation = (): AppLocation | null => {
    const { pathname } = useLocation();
    const resources = useSelector(getResources, shallowEqual) as Array<any>;

    // Since this can be null at mount, don't memoize it
    const resourceLocationInfo = resolveResourceLocationInfo(
        pathname,
        resources
    );

    const record = useSelector(
        resourceLocationInfo &&
            ['show', 'edit'].includes(resourceLocationInfo.type)
            ? recordSelector(
                  resourceLocationInfo.resource,
                  resourceLocationInfo.resourceId
              )
            : (): void => undefined
    );

    if (pathname === '/') {
        return {
            path: '',
            values: {},
        };
    }

    return resourceLocationInfo
        ? {
              path: buildResourceLocationInfoPath(resourceLocationInfo),
              values: { record },
          }
        : null;
};
