import fakeRestProvider from 'ra-data-fakerest';
export default fakeRestProvider({
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
            type: ['Rock', 'Folk Rock'],
        },
        {
            id: 2,
            name: 'The Rolling Stones',
            type: ['Rock', 'Pop Rock'],
        },
        {
            id: 3,
            name: 'John Lennon',
            type: ['Rock', 'Pop Rock'],
        },
        {
            id: 4,
            name: 'Marvin Gaye',
            type: ['Jazz', 'RB'],
        },
    ],
}, true);
