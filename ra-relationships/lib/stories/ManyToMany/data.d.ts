declare const _default: {
    artists: {
        id: number;
        name: string;
    }[];
    bands: {
        id: number;
        name: string;
    }[];
    members: {
        id: number;
        band_id: number;
        artist_id: number;
    }[];
    performances: {
        id: number;
        band_id: number;
        venue_id: number;
        date: string;
    }[];
    venues: {
        id: number;
        name: string;
        location: string;
    }[];
};
export default _default;
