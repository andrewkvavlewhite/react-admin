import {
    isMenuActive,
    getActiveRecordIdFromRoute,
} from './RealTimeMenuItemLink';
import { Location } from 'history';

const getLocation = (pathname: string): Location => ({
    pathname,
    search: null,
    state: null,
    hash: null,
});

const defaultMenuProps = {
    sidebarIsOpen: true,
};

describe('RealTimeMenuItemLink', () => {
    describe('isMenuActive', () => {
        it('should return false when location is not pointed by the MenuItem path', () => {
            const menuProps = { ...defaultMenuProps, to: '/artists' };

            expect(isMenuActive(getLocation('/here'), menuProps)).toBe(false);
        });

        it('should return true when location is pointed by the MenuItem path', () => {
            const menuProps = { ...defaultMenuProps, to: '/artists' };

            expect(isMenuActive(getLocation('/artists'), menuProps)).toBe(true);
        });

        it('should return true when location is included by the MenuItem path', () => {
            const menuProps = { ...defaultMenuProps, to: '/artists' };

            expect(
                isMenuActive(getLocation('/artists/12/edit'), menuProps)
            ).toBe(true);
        });
    });

    describe('getActiveRecordIdFromRoute', () => {
        it('should return null when location is not pointed by the MenuItem path', () => {
            const menuProps = { ...defaultMenuProps, to: '/artists' };

            expect(
                getActiveRecordIdFromRoute(getLocation('/here'), menuProps)
            ).toBeNull();
        });

        it('should return null when location is pointing a record', () => {
            const menuProps = { ...defaultMenuProps, to: '/artists' };

            expect(
                getActiveRecordIdFromRoute(getLocation('/artists'), menuProps)
            ).toBeNull();
        });

        it('should return 12 for the /artists/12 location', () => {
            const menuProps = { ...defaultMenuProps, to: '/artists' };

            expect(
                getActiveRecordIdFromRoute(
                    getLocation('/artists/12'),
                    menuProps
                )
            ).toBe('12');
        });

        it('should return 12 for the /artists/12/edit location', () => {
            const menuProps = { ...defaultMenuProps, to: '/artists' };

            expect(
                getActiveRecordIdFromRoute(
                    getLocation('/artists/12/edit'),
                    menuProps
                )
            ).toBe('12');
        });

        it('should return uuid for the /artists/dd9nduin56ff6/edit location', () => {
            const menuProps = { ...defaultMenuProps, to: '/artists' };

            expect(
                getActiveRecordIdFromRoute(
                    getLocation('/artists/dd9nduin56ff6/edit'),
                    menuProps
                )
            ).toBe('dd9nduin56ff6');
        });
    });
});
