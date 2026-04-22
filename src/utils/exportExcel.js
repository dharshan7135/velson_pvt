import * as XLSX from 'xlsx';

export function exportToExcel(data, columns, filename = 'export') {
  const headers = columns.map((c) => c.label);
  const rows = data.map((row) =>
    columns.map((c) => (c.render ? c.render(row[c.key], row) : row[c.key] ?? ''))
  );

  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
}
