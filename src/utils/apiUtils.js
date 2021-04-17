const BASE_API_PATH = 'http://localhost:8080/';

/**
 * Set header
 */
function headers(image = false) {
  const header = new Headers({
    Accept: '*/*',
    'content-type': 'application/json; charset=utf-8',
  });
  return header;
}

/**
 * Get request
 * @param {object} request
 */
export async function getRequest(request) {
  const { url } = request;
  return await fetch(`${BASE_API_PATH}${url}`, {
    method: 'GET',
    headers: headers(),
    mode: 'cors'
  }).then(res => res.json());
}

/**
 * Post or Put request
 * @param {object} request
 */
export async function saveOrUpdateRequest(request) {
  const { url, data, method } = request;
  return await fetch(`${BASE_API_PATH}${url}`, {
    method,
    headers: headers(),
    mode: 'cors',
    body: JSON.stringify(data)
  });
}

/**
 * Delete request
 * @param {object} request
 */
export async function deleteRequest(request) {
  const { url, data } = request;
  return await fetch(`${BASE_API_PATH}${url}`, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
}

