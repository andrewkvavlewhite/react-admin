import { AppLocation } from './AppLocationContext';
declare type SetAppLocation = (path: string, values?: any) => void;
declare type AppLocationState = [AppLocation, SetAppLocation];
/**
 * Hook getting App Location State from the current AppLocationContext
 * The app must be inside a AppLocationContext.
 *
 * @see AppLocationContext
 *
 * @example
 *
 *  import { AppLocationContext, useAppLocationState } from '@react-admin/ra-navigation';
 *  import { Admin, Resource } from 'react-admin';
 *
 *  const PathViewer = () => {
 *    const [location] = useAppLocationState();
 *    return <h1>{`You're on the ${location.path} path!`}</h1>;
 *  };
 *
 *  const MyLayout = ({ children }) => (
 *    <AppLocationContext>
 *      <PathViewer />
 *      {children}
 *    </AppLocationContext>
 *  );
 *
 *  const App = () => (
 *    <Admin dataProvider={dataProvider} layout={MyLayout}>
 *      <Resource
 *        name="posts"
 *        list={PostList}
 *        edit={PostEdit}
 *        show={PostShow}
 *        create={PostCreate}
 *      />
 *    </Admin>
 *  );
 *
 * The page title will be respectively equal to:
 *   - "You're on the posts.list path!" on Post List page
 *   - "You're on the posts.show path!" on Post Show page
 *   - "You're on the posts.edit path!" on Post Edit page
 *   - "You're on the posts.create path!" on Post Create page
 *
 * The "location.values" will also contains { record: {<Post>} } on Post Edit and post Show Pages.
 *
 * You can also set a custom app location on "non-resource" pages
 *
 * @example
 *
 *  import React from 'react';
 *  import { AppLocationContext, useAppLocationState } from '@react-admin/ra-navigation';
 *  import { Admin, Resource } from 'react-admin';
 *  import { Route } from 'react-router-dom';
 *
 *  const Foo = () => {
 *    const [_, setLocation] = useAppLocationState();
 *
 *    useEffect(() => {
 *      setLocation('path.to.the.foo');
 *    }, []);
 *
 *    return <span>It's Foo!</span>;
 *  };
 *
 *  const routes = [
 *    <Route exact path="/foo" component={Foo} />,
 *  ];
 *
 *  const PathViewer = () => {
 *    const [location] = useAppLocationState();
 *    return <h1>{`You're on the ${location.path} path!`}</h1>;
 *  };
 *
 *  const MyLayout = ({ children }) => (
 *    <AppLocationContext>
 *      <PathViewer />
 *      {children}
 *    </AppLocationContext>
 *  );
 *
 *  const App = () => (
 *    <Admin dataProvider={dataProvider} customRoutes={routes} layout={MyLayout}>
 *      <Resource
 *        name="posts"
 *        list={PostList}
 *        edit={PostEdit}
 *        show={PostShow}
 *        create={PostCreate}
 *      />
 *    </Admin>
 *  );
 *
 * The page title will be equal to "You're on the path.to.the.foo path!" on "/foo";
 */
export declare const useAppLocationState: () => AppLocationState;
export {};
