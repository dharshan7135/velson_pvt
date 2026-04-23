// ═══════════════════════════════════════════════════════════════
//  API Service — connects frontend to Velson backend (port 5000)
//  Every CRUD call returns the backend response (flattened JSONB)
// ═══════════════════════════════════════════════════════════════

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ── Generic fetch wrapper ────────────────────────────────────
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  // Handle non-JSON error responses
  const contentType = res.headers.get('content-type');
  if (!res.ok) {
    let errorMsg = `${res.status} ${res.statusText}`;
    if (contentType && contentType.includes('application/json')) {
      const err = await res.json();
      errorMsg = err.message || errorMsg;
    }
    throw new Error(errorMsg);
  }

  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════
//  Public API
// ═══════════════════════════════════════════════════════════════

/**
 * Fetch ALL entities in one shot via /api/bulk
 * Returns { companies: [...], employees: [...], ... }
 */
export async function fetchAll() {
  return request(`${API_BASE}/bulk`);
}

/**
 * Fetch all records for a single entity
 * GET /api/{entity}
 */
export async function fetchEntity(entity) {
  return request(`${API_BASE}/${entity}`);
}

/**
 * Fetch a single record by ID
 * GET /api/{entity}/{id}
 */
export async function fetchById(entity, id) {
  return request(`${API_BASE}/${entity}/${id}`);
}

/**
 * Create a new record
 * POST /api/{entity}
 * Returns the created record (with server-generated id)
 */
export async function createRecord(entity, data) {
  // Strip the client-side id — server will assign one
  const { id, createdAt, updatedAt, ...payload } = data;
  return request(`${API_BASE}/${entity}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Update an existing record
 * PUT /api/{entity}/{id}
 * Returns the updated record
 */
export async function updateRecord(entity, id, data) {
  // Strip metadata — backend handles createdAt/updatedAt
  const { createdAt, updatedAt, ...payload } = data;
  return request(`${API_BASE}/${entity}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

/**
 * Delete a record
 * DELETE /api/{entity}/{id}
 */
export async function deleteRecord(entity, id) {
  return request(`${API_BASE}/${entity}/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Soft-delete: sets status to 'D' via PUT
 */
export async function softDeleteRecord(entity, id) {
  return updateRecord(entity, id, { status: 'D' });
}

/**
 * Un-delete: sets status to 'A' via PUT
 */
export async function undeleteRecord(entity, id) {
  return updateRecord(entity, id, { status: 'A' });
}
