var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/* eslint-disable no-console */
import fakeRestProvider from 'ra-data-fakerest';
import { addSearchMethod } from '../src';
var data = {
    songs: [
        {
            id: 1,
            rank: 1,
            artist_id: 1,
            title: 'Like a Rolling Stone',
            writer: 'Bob Dylan',
            producer: 'Tom Wilson',
            released: new Date('1965-07-01'),
            recordCompany: 'Columbia',
        },
        {
            id: 2,
            rank: 2,
            artist_id: 2,
            title: '(I Can’t Get No) Satisfaction',
            writer: 'Mick Jagger, Keith Richards',
            producer: 'Andrew Loog Oldham',
            released: new Date('1965-05-01'),
            recordCompany: 'London',
        },
        {
            id: 3,
            rank: 3,
            artist_id: 3,
            title: 'Imagine',
            writer: 'John Lennon',
            producer: 'Lennon, Phil Spector, Yoko Ono',
            released: new Date('1971-10-01'),
            recordCompany: 'Apple',
        },
        {
            id: 4,
            rank: 4,
            artist_id: 4,
            title: 'What’s Going On',
            writer: 'Gaye, Renaldo Benson, Al Cleveland',
            producer: 'Gaye',
            released: new Date('1971-02-01'),
            recordCompany: 'Tamla',
        },
    ],
    artists: [
        {
            id: 1,
            name: 'Bob Dylan',
            description: 'American singer-songwriter, author, and visual artist',
            type: ['Rock', 'Folk Rock'],
        },
        {
            id: 2,
            name: 'The Rolling Stones',
            description: 'English rock band formed in London in 1962',
            type: ['Rock', 'Pop Rock'],
        },
        {
            id: 3,
            name: 'John Lennon',
            description: 'English singer, songwriter, and peace activist',
            type: ['Rock', 'Pop Rock'],
        },
        {
            id: 4,
            name: 'Marvin Gaye',
            description: 'American singer, songwriter, and record producer',
            type: ['Jazz', 'RB'],
        },
    ],
};
export var baseDataprovider = fakeRestProvider(data, true);
// search only in song title and artist name
export var dataProvider = __assign(__assign({}, baseDataprovider), { search: function (query, options) {
        var songResults = data.songs
            .filter(function (song) {
            return song.title.toLowerCase().includes(query.toLowerCase());
        })
            .map(function (song) { return ({
            id: "song_" + song.id,
            url: "/songs/" + song.id,
            type: 'songs',
            content: {
                label: song.title,
                description: song.writer,
            },
        }); });
        var artistResults = data.artists
            .filter(function (artist) {
            return artist.name.toLowerCase().includes(query.toLowerCase());
        })
            .map(function (artist) { return ({
            id: "artist_" + artist.id,
            url: "/artists/" + artist.id,
            type: 'artists',
            content: {
                label: artist.name,
                description: artist.description,
            },
        }); });
        var response = {
            data: __spreadArrays(songResults, artistResults),
            total: songResults.length + artistResults.length,
        };
        console.groupCollapsed('search', JSON.stringify(query), JSON.stringify(options));
        console.log(response);
        console.groupEnd();
        return Promise.resolve(response);
    } });
export var dataProviderWithAutoSearch = addSearchMethod(baseDataprovider, {
    artists: {},
    songs: {
        description: function (record) {
            return "Released in " + new Date(record.released).getFullYear() + " by " + record.recordCompany;
        },
    },
});
