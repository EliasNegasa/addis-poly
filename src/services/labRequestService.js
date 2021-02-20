import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/labRequests`;

export function getLabRequests() {
    return http.get(`${apiEndpoint}/${limit}`);
}

export function getLabRequest(requestId) {
    return http.get(`${apiEndpoint}/${requestId}`);
}

export function saveLabRequest(request) {
    if (request.id) {
        return http.put(apiEndpoint, request);
    }
    return http.post(apiEndpoint, request);
}

export function deleteLabRequest(requestId) {
    return http.delete(`${apiEndpoint}/${requestId}`);
}

export function filterLabRequests(query) {
    return http.get(`${apiEndpoint}/${query}`);
}
