import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/users`;

// http.setContentType('application/json');

export function getUsers() {
    return http.get(`${apiEndpoint}/${limit}`);
}

export function getUser(userId) {
    return http.get(`${apiEndpoint}/${userId}`);
}

export function saveUser(user) {
    if (user.id) {
        return http.put(apiEndpoint, user);
    }
    // const password = "password@app";
    // user.append('password', password);
    // user.password = user.firstName.substring(0, 1).toUpperCase() + user.lastName.substring(0, 1) + "@app"
    return http.post(apiEndpoint, user);
}

export function deleteUser(userId) {
    return http.delete(`${apiEndpoint}/${userId}`);
}

export function filterUsers(query) {
    return http.get(`${apiEndpoint}/${query}`);
}