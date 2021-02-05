import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/testType`;

export function getTestTypes() {
    return http.get(`${apiEndpoint}/${limit}`);
}

export function getTestType(typeId) {
    return http.get(`${apiEndpoint}/${typeId}`);
}

export function saveTestType(type) {
    if (type.id) {
        return http.put(apiEndpoint, type);
    }
    return http.post(apiEndpoint, type);
}

export function deleteTestType(typeId) {
    return http.delete(`${apiEndpoint}/${typeId}`);
}

export function filterTestTypes(query) {
    return http.get(`${apiEndpoint}/${query}`);
}
