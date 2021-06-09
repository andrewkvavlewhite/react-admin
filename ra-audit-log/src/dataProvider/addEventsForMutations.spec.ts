import { addEventsForMutations } from './addEventsForMutations';
import { AddAuditLogResourceOptions } from './types';

describe('addEventsForMutations', () => {
    const baseDataProvider = {
        create: jest.fn().mockResolvedValue({ data: { id: 123, name: 'foo' } }),
        delete: jest.fn().mockResolvedValue({}),
        deleteMany: jest.fn().mockResolvedValue({}),
        getList: jest.fn().mockResolvedValue({}),
        getMany: jest.fn().mockResolvedValue({}),
        getManyReference: jest.fn().mockResolvedValue({}),
        getOne: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({}),
    };

    const author = {
        id: 123,
        fullName: 'The author',
        avatar: 'http://an_url.png',
    };

    const authProvider = {
        login: jest.fn(),
        logout: jest.fn(),
        checkAuth: jest.fn(),
        checkError: jest.fn(),
        getIdentity: jest.fn().mockResolvedValue(author),
        getPermissions: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test.each([['getList'], ['getMany'], ['getManyReference'], ['getOne']])(
        'should not create a new log when calling dataProvider.%s',
        method => {
            const dataProvider = addEventsForMutations(
                baseDataProvider,
                authProvider
            );
            dataProvider[method]('products');

            expect(baseDataProvider.create).not.toHaveBeenCalled();
        }
    );

    test.each([
        ['create', { data: { id: 123, name: 'foo' } }],
        ['delete', { id: 123 }],
        ['deleteMany', { ids: [123, 456] }],
        ['update', { id: 123, data: { name: 'foo' } }],
        ['updateMany', { ids: [123, 456], data: { name: 'foo' } }],
    ])(
        'should create a new log when calling dataProvider.%s and no options have been provided',
        async (method, payload) => {
            const dataProvider = addEventsForMutations(
                baseDataProvider,
                authProvider
            );
            await dataProvider[method]('products', payload);

            expect(baseDataProvider.create).toHaveBeenCalled();
            const call =
                method === 'create'
                    ? baseDataProvider.create.mock.calls[1]
                    : baseDataProvider.create.mock.calls[0];
            const params = call[1];

            expect(params.data.date).toBeDefined();
            expect(params.data.author).toEqual(author);
            expect(params.data.resource).toEqual('products');
            expect(params.data.action).toEqual(method);
            expect(params.data.payload).toEqual(payload);
        }
    );

    // Forced to declare it like this to make TS happy
    const complexResourceOption: AddAuditLogResourceOptions = [
        'products',
        ['update'],
    ];

    test.each([
        [undefined],
        [{ resources: ['products'] }],
        [{ resources: [complexResourceOption] }],
    ])(
        'should create a new log when calling a mutation and resource is matching',
        async options => {
            const payload = {
                id: 123,
                data: { id: 123, name: 'foo' },
                previousData: { id: 123, name: 'bar' },
            };
            const dataProvider = addEventsForMutations(
                baseDataProvider,
                authProvider,
                options
            );
            await dataProvider.update('products', payload);

            expect(baseDataProvider.create).toHaveBeenCalled();
            const call = baseDataProvider.create.mock.calls[0];
            const params = call[1];

            expect(params.data.date).toBeDefined();
            expect(params.data.author).toEqual(author);
            expect(params.data.resource).toEqual('products');
            expect(params.data.action).toEqual('update');
            expect(params.data.payload).toEqual(payload);
        }
    );

    test('should allow to specify the events resource', async () => {
        const payload = {
            id: 123,
            data: { id: 123, name: 'foo' },
            previousData: { id: 123, name: 'bar' },
        };
        const dataProvider = addEventsForMutations(
            baseDataProvider,
            authProvider,
            { name: 'audit-logs' }
        );
        await dataProvider.update('products', payload);

        expect(baseDataProvider.create).toHaveBeenCalled();
        const call = baseDataProvider.create.mock.calls[0];
        expect(call[0]).toEqual('audit-logs');
    });

    test('should use a custom matcher function to determine whether to audit a dataProvider call', async () => {
        const shouldAudit = jest.fn(
            (action: string, customArg: any): boolean => {
                return customArg?.auditMe || false;
            }
        );

        const customDataProvider = {
            ...baseDataProvider,
            bazinga: jest.fn(),
        };

        const dataProvider = addEventsForMutations(
            customDataProvider,
            authProvider,
            { shouldAudit }
        );
        await dataProvider.bazinga({ auditMe: true });

        expect(baseDataProvider.create).toHaveBeenCalled();
        const call = baseDataProvider.create.mock.calls[0];
        const params = call[1];

        expect(params.data.date).toBeDefined();
        expect(params.data.author).toEqual(author);
        expect(params.data.resource).toBeUndefined();
        expect(params.data.action).toEqual('bazinga');
        expect(params.data.payload).toEqual({ auditMe: true });
    });
});
