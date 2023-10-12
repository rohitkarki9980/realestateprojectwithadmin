export const arrDistrict = [
    'Province One',
    'Province Two',
    'Bagmati Province',
    'Lumbini Province',
    'Karnali Province',
    'SudarPaschim Province'
];

export const districtToIdx = (district) => {
    if (typeof district !== 'string') {
        // Handle the case where district is not a valid string, e.g., it's undefined or not a string.
        return -1; // You can return -1 or another appropriate value as needed.
    }

    return arrDistrict.findIndex((cont) => cont.toLowerCase() === district.toLowerCase());
};

export const idxToDistrict = (idx) => {
    return arrDistrict[idx];
};