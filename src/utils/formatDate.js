import moment from "moment";

export function formatDate(dd) {
    return moment(new Date(dd)).format("DD-MMM-YYYY").toString();
}

export function formatDateY(dd) {
    return moment(new Date(dd)).format("YYYY-MM-DD").toString();
}