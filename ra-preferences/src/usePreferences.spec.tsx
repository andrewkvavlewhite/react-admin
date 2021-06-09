import React, { FC } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import PreferencesSetter, { Preferences } from './PreferencesSetter';
import usePreferences, { RA_PREFERENCE_WORKSPACE } from './usePreferences';

describe('usePreferences', () => {
    afterEach(() => {
        cleanup();
        window.localStorage.removeItem(RA_PREFERENCE_WORKSPACE);
    });

    it('should allow to read a preference by path', () => {
        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences('foo') as any;
            return <div>pref:{preferences}</div>;
        };
        const { queryByText } = render(
            <PreferencesSetter path="foo" value="bar">
                <ComponentToTest />
            </PreferencesSetter>
        );
        expect(queryByText('pref:bar')).not.toBeNull();
    });

    it('should allow to read all preferences when called without a path', () => {
        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences() as any;
            return <div>pref:{preferences.foo}</div>;
        };

        const { queryByText } = render(
            <PreferencesSetter path="" value={{ foo: 'bar' }}>
                <ComponentToTest />
            </PreferencesSetter>
        );

        expect(queryByText('pref:bar')).not.toBeNull();
    });

    it('should allow to set a preference by path', () => {
        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences('foo') as any;
            return <div>pref:{preferences}</div>;
        };

        const PreferenceChanger: FC = () => {
            const [_, setPreferences] = usePreferences('foo') as any;
            return (
                <button onClick={(): void => setPreferences('baz')}>
                    click me
                </button>
            );
        };

        const { queryByText } = render(
            <PreferencesSetter path="foo" value="bar">
                <>
                    <ComponentToTest />
                    <PreferenceChanger />
                </>
            </PreferencesSetter>
        );

        expect(queryByText('pref:bar')).not.toBeNull();
        fireEvent.click(queryByText('click me'));
        expect(queryByText('pref:baz')).not.toBeNull();
    });

    it('should allow to set a falsy preference by path', () => {
        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences('foo') as any;
            return <div>pref:{preferences.toString()}</div>;
        };

        const PreferenceChanger: FC = () => {
            const [_, setPreferences] = usePreferences('foo') as any;
            return (
                <button onClick={(): void => setPreferences(false)}>
                    click me
                </button>
            );
        };

        const { queryByText } = render(
            <PreferencesSetter path="foo" value="bar">
                <>
                    <ComponentToTest />
                    <PreferenceChanger />
                </>
            </PreferencesSetter>
        );

        expect(queryByText('pref:bar')).not.toBeNull();
        fireEvent.click(queryByText('click me'));
        expect(queryByText('pref:false')).not.toBeNull();
    });

    it('should allow to set all preferences when called without a path', () => {
        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences('foo') as any;
            return <div>pref:{preferences}</div>;
        };

        const PreferenceChanger: FC = () => {
            const [_, setPreferences] = usePreferences() as any;
            return (
                <button onClick={(): void => setPreferences({ foo: 'bazz' })}>
                    click me
                </button>
            );
        };

        const { queryByText } = render(
            <PreferencesSetter path="foo" value="bar">
                <>
                    <ComponentToTest />
                    <PreferenceChanger />
                </>
            </PreferencesSetter>
        );

        expect(queryByText('pref:bar')).not.toBeNull();
        fireEvent.click(queryByText('click me'));
        expect(queryByText('pref:bazz')).not.toBeNull();
    });

    it('should work with a path that does not point to a direct value', () => {
        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences('foo') as any;
            return <div>pref:{preferences.bar}</div>;
        };

        const { queryByText } = render(
            <PreferencesSetter path="foo.bar" value="baz">
                <ComponentToTest />
            </PreferencesSetter>
        );

        expect(queryByText('pref:baz')).not.toBeNull();
    });

    it('should work with a complex path', () => {
        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences('foo.bar') as any;
            return <div>pref:{preferences}</div>;
        };

        const { queryByText } = render(
            <PreferencesSetter path="foo.bar" value="coucou">
                <ComponentToTest />
            </PreferencesSetter>
        );

        expect(queryByText('pref:coucou')).not.toBeNull();
    });

    it('should return the default value', () => {
        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences('foo', 'hello') as any;
            return <div>pref:{preferences}</div>;
        };

        const { queryByText } = render(
            <PreferencesSetter path="toto" value="titi">
                <ComponentToTest />
            </PreferencesSetter>
        );

        expect(queryByText('pref:hello')).not.toBeNull();
    });

    it('should return undefined for non existing path', () => {
        let value;
        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences('foo') as any;
            value = preferences;
            return <div />;
        };

        render(<ComponentToTest />);

        expect(value).toBeUndefined();
    });

    it('should initialize preferences with localStorage', () => {
        window.localStorage.setItem(
            RA_PREFERENCE_WORKSPACE,
            JSON.stringify({ foo: 'bar' })
        );

        const ComponentToTest: FC = () => {
            const [preferences] = usePreferences('foo') as any;
            return <div>pref:{preferences}</div>;
        };

        const { queryByText } = render(<ComponentToTest />);

        expect(queryByText('pref:bar')).not.toBeNull();
    });

    it('should store preferences in localStorage', () => {
        const PreferenceChanger: FC = () => {
            const [_, setPreferences] = usePreferences('foo') as any;
            return (
                <button onClick={(): void => setPreferences('covfefe')}>
                    click me
                </button>
            );
        };

        const { queryByText } = render(
            <PreferencesSetter path="foo" value="coucou">
                <PreferenceChanger />
            </PreferencesSetter>
        );

        const getPreferencesFromLocalStorage = (): Preferences =>
            JSON.parse(window.localStorage.getItem(RA_PREFERENCE_WORKSPACE));

        const initialStoredPreferences = getPreferencesFromLocalStorage();
        expect(initialStoredPreferences.foo).toEqual('coucou');

        fireEvent.click(queryByText('click me'));

        const storedPreferences = getPreferencesFromLocalStorage();
        expect(storedPreferences.foo).toEqual('covfefe');
    });
});
