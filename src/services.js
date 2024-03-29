export function getFromLocal(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function setToLocal(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getCards() {
  return fetch("/api/cards").then(res => res.json());
}

export function postCard(data) {
  return fetchCard("POST", data);
}

export function deleteCard(id) {
  return fetchCard("DELETE", null, id);
}

export function patchCard(data, id) {
  return fetchCard("PATCH", data, id);
}

function fetchCard(method, data, id = "") {
  return fetch("/api/cards/" + id, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: data ? JSON.stringify(data) : undefined
  }).then(res => res.json());
}
