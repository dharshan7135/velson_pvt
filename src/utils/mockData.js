// ═══════════════════════════════════════════════════════════════
//  Utility helpers — NO mock data
//  Data now comes from the backend via AppContext / api.js
// ═══════════════════════════════════════════════════════════════

/**
 * Filter reference-group values by group ID
 * Usage:  getRefValuesByGroup(state.referenceGroupValues, 3)
 */
export function getRefValuesByGroup(values, groupId) {
  return (values || []).filter((v) => v.RG_iID === groupId && v.status === 'A');
}

/**
 * Generate the next sequential code for a given prefix
 * Scans existing items to find the highest numeric suffix
 *
 * Usage:  generateNextCode('D', existingDepts, 'RGV_vCode')  → 'D0006'
 */
export function generateNextCode(prefix, existingItems, codeField) {
  const max = (existingItems || []).reduce((m, item) => {
    const code = item[codeField] || '';
    const num = parseInt(code.replace(/\D/g, ''), 10) || 0;
    return Math.max(m, num);
  }, 0);
  return `${prefix}${String(max + 1).padStart(4, '0')}`;
}

/**
 * Generate the next quotation number based on financial year
 *
 * Usage:  generateQuotationNumber(state.quotations)  → '25-26/Q00003'
 */
export function generateQuotationNumber(existingQuotations) {
  const now = new Date();
  const fy = now.getMonth() >= 3
    ? `${String(now.getFullYear() % 100).padStart(2, '0')}-${String((now.getFullYear() + 1) % 100).padStart(2, '0')}`
    : `${String((now.getFullYear() - 1) % 100).padStart(2, '0')}-${String(now.getFullYear() % 100).padStart(2, '0')}`;
  const prefix = `${fy}/Q`;
  const max = (existingQuotations || []).reduce((m, q) => {
    if (q.PO_No && q.PO_No.startsWith(prefix)) {
      const num = parseInt(q.PO_No.split('Q')[1], 10) || 0;
      return Math.max(m, num);
    }
    return m;
  }, 0);
  return `${prefix}${String(max + 1).padStart(5, '0')}`;
}
