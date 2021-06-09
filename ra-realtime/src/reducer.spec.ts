import { reducer } from '.';
import { LOCK, UNLOCK, GET_LOCK, GET_LOCKS } from './actions';

describe('Locks Reducer', () => {
    it('should return the state if the meta is not defined', () => {
        const initialState = {};
        const payload = {};
        const meta = undefined;

        expect(
            reducer(initialState, {
                type: 'ANY',
                payload,
                meta,
            })
        ).toStrictEqual({});
    });

    it('should return the state if the meta.fetchResponse is not defined', () => {
        const initialState = {};
        const payload = {};
        const meta = {
            resource: 'cars',
            fetchResponse: undefined,
        };

        expect(
            reducer(initialState, {
                type: 'ANY',
                payload,
                meta,
            })
        ).toStrictEqual({});
    });

    it('should return the state if the meta.resource is not defined', () => {
        const initialState = {};
        const payload = {};
        const meta = {
            resource: undefined,
            fetchResponse: LOCK,
        };

        expect(
            reducer(initialState, {
                type: 'ANY',
                payload,
                meta,
            })
        ).toStrictEqual({});
    });

    describe('On LOCK', () => {
        it('should not update the state if the record id is not defined', () => {
            const initialState = {};
            const payload = {
                data: {
                    recordId: undefined,
                },
            };
            const meta = {
                resource: 'cars',
                fetchResponse: LOCK,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({});
        });

        it('should update the state by registering a lock', () => {
            const initialState = {};
            const payload = {
                data: {
                    resource: 'cars',
                    recordId: '1',
                    identity: 'adrien',
                    createdAt: '2020-08-19',
                },
            };
            const meta = {
                resource: 'cars',
                fetchResponse: LOCK,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                },
            });
        });

        it('should not erase the existing locks', () => {
            const initialState = {
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                },
            };
            const payload = {
                data: {
                    resource: 'cars',
                    recordId: '2',
                    identity: 'adrien',
                    createdAt: '2020-08-20',
                },
            };
            const meta = {
                resource: 'cars',
                fetchResponse: LOCK,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                    '2': {
                        resource: 'cars',
                        recordId: '2',
                        identity: 'adrien',
                        createdAt: '2020-08-20',
                    },
                },
            });
        });
    });

    describe('On GET_LOCK', () => {
        it('should not update the state if the record id is not defined', () => {
            const initialState = {};
            const payload = {
                data: {
                    recordId: undefined,
                },
            };
            const meta = {
                resource: 'cars',
                fetchResponse: GET_LOCK,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({});
        });

        it('should update the state by registering a lock', () => {
            const initialState = {};
            const payload = {
                data: {
                    resource: 'cars',
                    recordId: '1',
                    identity: 'adrien',
                    createdAt: '2020-08-19',
                },
            };
            const meta = {
                resource: 'cars',
                fetchResponse: GET_LOCK,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                },
            });
        });

        it('should not erase the existing locks', () => {
            const initialState = {
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                },
            };
            const payload = {
                data: {
                    resource: 'cars',
                    recordId: '2',
                    identity: 'adrien',
                    createdAt: '2020-08-20',
                },
            };
            const meta = {
                resource: 'cars',
                fetchResponse: LOCK,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                    '2': {
                        resource: 'cars',
                        recordId: '2',
                        identity: 'adrien',
                        createdAt: '2020-08-20',
                    },
                },
            });
        });
    });

    describe('On UNLOCK', () => {
        it('should not update the state if the record id is not defined', () => {
            const initialState = {
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                },
            };
            const payload = {
                data: {
                    recordId: undefined,
                },
            };
            const meta = {
                resource: 'cars',
                fetchResponse: UNLOCK,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                },
            });
        });

        it('should update the state by unregistering a lock', () => {
            const initialState = {
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                },
            };
            const payload = {
                data: {
                    resource: 'cars',
                    recordId: '1',
                    identity: 'adrien',
                    createdAt: '2020-08-19',
                },
            };
            const meta = {
                resource: 'cars',
                fetchResponse: UNLOCK,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {},
            });
        });

        it('should not erase the existing locks', () => {
            const initialState = {
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                    '2': {
                        resource: 'cars',
                        recordId: '2',
                        identity: 'adrien',
                        createdAt: '2020-08-20',
                    },
                },
            };
            const payload = {
                data: {
                    resource: 'cars',
                    recordId: '1',
                    identity: 'adrien',
                    createdAt: '2020-08-19',
                },
            };
            const meta = {
                resource: 'cars',
                fetchResponse: UNLOCK,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {
                    '2': {
                        resource: 'cars',
                        recordId: '2',
                        identity: 'adrien',
                        createdAt: '2020-08-20',
                    },
                },
            });
        });
    });

    describe('On GET_LOCKS', () => {
        it('should not update the state if the record id is not defined', () => {
            const initialState = {
                cars: {},
            };
            const payload = {
                data: [
                    {
                        recordId: undefined,
                    },
                ],
            };
            const meta = {
                resource: 'cars',
                fetchResponse: GET_LOCKS,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {},
            });
        });

        it('should update the state by registering several locks', () => {
            const initialState = {};
            const payload = {
                data: [
                    {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                    {
                        resource: 'cars',
                        recordId: '2',
                        identity: 'adrien',
                        createdAt: '2020-08-20',
                    },
                ],
            };
            const meta = {
                resource: 'cars',
                fetchResponse: GET_LOCKS,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                    '2': {
                        resource: 'cars',
                        recordId: '2',
                        identity: 'adrien',
                        createdAt: '2020-08-20',
                    },
                },
            });
        });

        it('should not erase the existing locks', () => {
            const initialState = {
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                    '2': {
                        resource: 'cars',
                        recordId: '2',
                        identity: 'adrien',
                        createdAt: '2020-08-20',
                    },
                },
            };
            const payload = {
                data: [
                    {
                        resource: 'cars',
                        recordId: '3',
                        identity: 'adrien',
                        createdAt: '2020-08-21',
                    },
                ],
            };
            const meta = {
                resource: 'cars',
                fetchResponse: GET_LOCKS,
            };

            expect(
                reducer(initialState, {
                    type: 'ANY',
                    payload,
                    meta,
                })
            ).toStrictEqual({
                cars: {
                    '1': {
                        resource: 'cars',
                        recordId: '1',
                        identity: 'adrien',
                        createdAt: '2020-08-19',
                    },
                    '2': {
                        resource: 'cars',
                        recordId: '2',
                        identity: 'adrien',
                        createdAt: '2020-08-20',
                    },
                    '3': {
                        resource: 'cars',
                        recordId: '3',
                        identity: 'adrien',
                        createdAt: '2020-08-21',
                    },
                },
            });
        });
    });
});
