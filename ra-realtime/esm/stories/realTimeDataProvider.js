import fakeRestProvider from 'ra-data-fakerest';
import { addLocksMethodsBasedOnALockResource, addRealTimeMethodsInLocalBrowser, addRealTimeMethodsBasedOnMercure, } from '../src/dataProvider/builder';
var description = "\nAn h1 header\n============\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n  * this one\n  * that one\n  * the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it's all\nin chapters 12--14\"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. \u263A\n";
var JWT = 'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdfX0.SWKHNF9wneXTSjBg81YN5iH8Xb2iTf_JwhfUY5Iyhsw';
var dataProvider = fakeRestProvider({
    posts: [
        { id: 1, title: 'Lorem Ipsum', description: description },
        { id: 2, title: 'Sic dolor amet', description: 'Almost empty' },
    ],
    locks: [
        {
            id: 1,
            resource: 'posts',
            recordId: 1,
            identity: 'luigi',
            createdAt: new Date(),
        },
    ],
}, true);
var mercureDataProvider = addLocksMethodsBasedOnALockResource(addRealTimeMethodsBasedOnMercure(dataProvider, 'http://localhost/.well-known/mercure', JWT));
var baseDataProvider = addLocksMethodsBasedOnALockResource(addRealTimeMethodsInLocalBrowser(dataProvider));
var localBrowserDataProvider = new Proxy(baseDataProvider, {
    get: function (target, name, self) {
        if (name === 'then') {
            return self;
        }
        return function (resource, params) {
            return new Promise(function (resolve) {
                return setTimeout(
                // @ts-ignore
                function () { return resolve(baseDataProvider[name](resource, params)); }, 200);
            });
        };
    },
});
export { localBrowserDataProvider, mercureDataProvider };
