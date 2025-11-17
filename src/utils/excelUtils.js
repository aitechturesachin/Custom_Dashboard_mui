// Utility helpers for reading Excel files on the client and
// transforming them into MUI X Charts friendly data.
//
// Uses the `xlsx` library (already in package.json).

import * as XLSX from 'xlsx';

/**
 * Read a File (from <input type="file" />) into an ArrayBuffer.
 */
const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Parse an uploaded Excel file and return basic metadata:
 * - sheetNames: array of sheet names
 * - rowsBySheet: { [sheetName]: array of row objects }
 */
export const parseExcelFile = async (file) => {
  const buffer = await readFileAsArrayBuffer(file);
  const workbook = XLSX.read(buffer, { type: 'array' });

  const sheetNames = workbook.SheetNames || [];
  const rowsBySheet = {};

  sheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });
    rowsBySheet[sheetName] = rows;
  });

  return { sheetNames, rowsBySheet };
};

/**
 * Given rows and chosen columns, build a Bar/Line chart dataset:
 * - xKey: column used for x-axis labels
 * - yKeys: one or more numeric columns used as series
 *
 * Returns an object compatible with @mui/x-charts BarChart / LineChart.
 */
export const buildAxisChartData = (rows, xKey, yKeys) => {
  if (!rows || rows.length === 0 || !xKey || !yKeys?.length) {
    return null;
  }

  const xData = rows.map((row) => row[xKey]);

  const series = yKeys.map((key) => ({
    label: String(key),
    data: rows.map((row) => {
      const value = row[key];
      const num = typeof value === 'number' ? value : Number(value);
      return Number.isFinite(num) ? num : 0;
    }),
  }));

  return {
    xAxis: [
      {
        scaleType: 'band',
        data: xData,
      },
    ],
    series,
  };
};

/**
 * Build a PieChart dataset from:
 * - labelKey: category/label column
 * - valueKey: numeric value column
 *
 * Returns an array of items suitable for @mui/x-charts PieChart.
 */
export const buildPieChartData = (rows, labelKey, valueKey) => {
  if (!rows || rows.length === 0 || !labelKey || !valueKey) {
    return [];
  }

  return rows.map((row, index) => {
    const label = row[labelKey];
    const raw = row[valueKey];
    const num = typeof raw === 'number' ? raw : Number(raw);

    return {
      id: index,
      label: String(label ?? `Item ${index + 1}`),
      value: Number.isFinite(num) ? num : 0,
    };
  });
};


