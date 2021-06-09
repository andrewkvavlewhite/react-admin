"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppLocationState = void 0;
var react_1 = require("react");
var AppLocationContext_1 = require("./AppLocationContext");
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
exports.useAppLocationState = function () {
    var _a = react_1.useContext(AppLocationContext_1.LocationContext), location = _a[0], setLocation = _a[1];
    if (typeof setLocation !== 'function') {
        throw new Error("\n            You've tried to access app location outside <AppLocationContext />.\n            Please wrap your code with it first.\n            ");
    }
    var setAppLocation = react_1.useCallback(function (path, values) {
        if (values === void 0) { values = {}; }
        setLocation({ path: path, values: values });
    }, [setLocation]);
    return [location, setAppLocation];
};
