import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/labResults`;

export function getLabResult() {
    return http.get(`${apiEndpoint}/${limit}`);
}

export function getLabResults(resultId) {
    return http.get(`${apiEndpoint}/${resultId}`);
}

export function saveLabResult(result) {
    if (result.id) {
        return http.put(apiEndpoint, result);
    }
    return http.post(apiEndpoint, result);
}

export function deleteLabResult(resultId) {
    return http.delete(`${apiEndpoint}/${resultId}`);
}

export function filterLabResults(query) {
    return http.get(`${apiEndpoint}/${query}`);
}
