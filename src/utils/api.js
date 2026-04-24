// ── API Service Layer ──────────────────────────────────────────
// Connects the frontend to the Velson backend on Render

const API_BASE = 'https://velson-pvt.onrender.com/api';

async function request(url, options = {}) {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message || `API Error: ${res.status}`);
    }
    return res.json();
}

/** Fetch ALL entities + dropdown state in one call */
export const fetchAll = () => request(`${API_BASE}/bulk`);

/** Fetch all records for a single entity */
export const fetchEntity = (entity) => request(`${API_BASE}/${entity}`);

/** Create a new record */
export const createRecord = (entity, data) =>
    request(`${API_BASE}/${entity}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });

/** Update a record by id */
export const updateRecord = (entity, id, data) =>
    request(`${API_BASE}/${entity}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

/** Delete a record by id */
export const deleteRecord = (entity, id) =>
    request(`${API_BASE}/${entity}/${id}`, {
        method: 'DELETE',
    });

/** Save dropdown option overrides */
export const saveDropdownOption = (key, data) =>
    request(`${API_BASE.replace('/api', '')}/api/dropdownOptions/${key}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
