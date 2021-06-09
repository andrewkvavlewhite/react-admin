import { AuthProvider, DataProvider } from 'react-admin';
import { DefaultAuditLogResource } from '../constants';
import { buildMatchActionOnResource } from './buildMatchActionOnResource';
import { DefaultOptions } from './options';
import { AddAuditLogsOptions } from './types';

export const addEventsForMutations = (
    dataProvider: DataProvider,
    authProvider: AuthProvider,
    options: AddAuditLogsOptions = DefaultOptions
): DataProvider => {
    const {
        name: eventsResource = DefaultAuditLogResource,
        shouldAudit = buildMatchActionOnResource(options),
    } = options;

    if (!authProvider.getIdentity) {
        throw new Error(
            'The getIdentity method of the authProvider is required for audit logs. Please refer to the documentation to implement it: https://marmelab.com/react-admin/Authentication.html#building-your-own-auth-provider'
        );
    }

    const proxy = new Proxy(defaultDataProvider, {
        get(_, name) {
            return async (...args) => {
                const action = name.toString();
                const result = await dataProvider[action](...args);
                const [resource, params] = args;

                if (shouldAudit(action, ...args)) {
                    await dataProvider.create(eventsResource, {
                        data: {
                            date: new Date().toISOString(),
                            author: await authProvider.getIdentity(),
                            resource:
                                typeof resource === 'string'
                                    ? resource
                                    : undefined,
                            action,
                            payload:
                                action === 'create'
                                    ? result
                                    : params || resource,
                        },
                    });
                }

                return result;
            };
        },
    });

    return proxy;
};

const defaultDataProvider = {
    create: () => Promise.resolve(null),
    delete: () => Promise.resolve(null),
    deleteMany: () => Promise.resolve(null),
    getList: () => Promise.resolve(null),
    getMany: () => Promise.resolve(null),
    getManyReference: () => Promise.resolve(null),
    getOne: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
    updateMany: () => Promise.resolve(null),
};
