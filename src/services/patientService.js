import http from "./httpService";
import { apiUrl, limit } from "../config.json";

const apiEndpoint = `${apiUrl}/api/patients`;

export function getPatients() {
  return http.get(`${apiEndpoint}/${limit}`);
}

export function getPatient(patientId) {
  return http.get(`${apiEndpoint}/${patientId}`);
}

export function savePatient(patient) {
  if (patient.id) {
    return http.put(apiEndpoint, patient);
  }

  return http.post(apiEndpoint, patient);
}

export function deletePatient(patientId) {
  return http.delete(`${apiEndpoint}/${patientId}`);
}

export function filterPatients(query) {
  return http.get(`${apiEndpoint}/${query}`);
}