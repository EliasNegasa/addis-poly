import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/testCategory`;

export function getTestCategories() {
    return http.get(`${apiEndpoint}/${limit}`);
}

export function getTestCategory(categoryId) {
    return http.get(`${apiEndpoint}/${categoryId}`);
}

export function saveTestCategory(category) {
    if (category.id) {
        return http.put(apiEndpoint, category);
    }
    return http.post(apiEndpoint, category);
}

export function deleteTestCategory(categoryId) {
    return http.delete(`${apiEndpoint}/${categoryId}`);
}

export function filterTestCategories(query) {
    return http.get(`${apiEndpoint}/${query}`);
}
