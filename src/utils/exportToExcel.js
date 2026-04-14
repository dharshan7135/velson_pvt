import * as XLSX from 'xlsx';

/**
 * Export data to an Excel (.xlsx) file.
 * @param {Array<Object>} data - Array of row objects
 * @param {Array<{key: string, label: string}>} columns - Column definitions with key and label
 * @param {string} fileName - Name for the downloaded file (without extension)
 */
export const exportToExcel = (data, columns, fileName = 'Export') => {
    if (!data || data.length === 0) {
        alert('No data available to export.');
        return;
    }

    // Build worksheet data using column labels as headers
    const headers = columns.map((col) => col.label);
    const rows = data.map((row) =>
        columns.map((col) => {
            const val = row[col.key];
            return val != null ? val : '';
        })
    );

    const wsData = [headers, ...rows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Auto-size columns based on content width
    ws['!cols'] = columns.map((col, idx) => {
        const maxLen = Math.max(
            col.label.length,
            ...rows.map((r) => String(r[idx] ?? '').length)
        );
        return { wch: Math.min(maxLen + 4, 50) };
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};
