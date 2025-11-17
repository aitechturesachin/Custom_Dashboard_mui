import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { parseExcelFile, buildAxisChartData, buildPieChartData } from '../../utils/excelUtils';

/**
 * High-level Excel upload + sheet/column picker component.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - onChartDataReady: (payload) => void
 *   payload: {
 *     chartType: 'axis' | 'pie',
 *     rawRows,
 *     config: { sheetName, xKey, yKeys } | { sheetName, labelKey, valueKey },
 *     chartData   // ready for MUI X Charts
 *   }
 */
const ExcelUploadDialog = ({ open, onClose, onChartDataReady }) => {
  const [file, setFile] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [rowsBySheet, setRowsBySheet] = useState({});
  const [selectedSheet, setSelectedSheet] = useState('');
  const [availableColumns, setAvailableColumns] = useState([]);

  const [chartType, setChartType] = useState('axis'); // 'axis' | 'pie'
  const [xKey, setXKey] = useState('');
  const [yKeys, setYKeys] = useState([]);
  const [labelKey, setLabelKey] = useState('');
  const [valueKey, setValueKey] = useState('');

  const resetState = () => {
    setFile(null);
    setSheetNames([]);
    setRowsBySheet({});
    setSelectedSheet('');
    setAvailableColumns([]);
    setChartType('axis');
    setXKey('');
    setYKeys([]);
    setLabelKey('');
    setValueKey('');
  };

  const handleClose = () => {
    resetState();
    onClose?.();
  };

  const handleFileChange = async (event) => {
    const selected = event.target.files?.[0];
    if (!selected) return;

    try {
      setFile(selected);
      const { sheetNames: names, rowsBySheet: rows } = await parseExcelFile(selected);
      setSheetNames(names);
      setRowsBySheet(rows);

      if (names.length > 0) {
        const firstSheet = names[0];
        setSelectedSheet(firstSheet);
        const firstRows = rows[firstSheet] || [];
        const cols = firstRows.length ? Object.keys(firstRows[0]) : [];
        setAvailableColumns(cols);
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Failed to read Excel file. Please make sure it is a valid .xlsx file.');
      console.error(error);
    }
  };

  const handleSheetChange = (event) => {
    const sheetName = event.target.value;
    setSelectedSheet(sheetName);

    const rows = rowsBySheet[sheetName] || [];
    const cols = rows.length ? Object.keys(rows[0]) : [];
    setAvailableColumns(cols);

    // Reset column selections
    setXKey('');
    setYKeys([]);
    setLabelKey('');
    setValueKey('');
  };

  const handleSubmit = () => {
    if (!selectedSheet) return;
    const rows = rowsBySheet[selectedSheet] || [];
    if (!rows.length) return;

    let payload = null;

    if (chartType === 'axis') {
      if (!xKey || !yKeys.length) return;
      const chartData = buildAxisChartData(rows, xKey, yKeys);
      payload = {
        chartType: 'axis',
        rawRows: rows,
        config: { sheetName: selectedSheet, xKey, yKeys },
        chartData,
      };
    } else {
      if (!labelKey || !valueKey) return;
      const chartData = buildPieChartData(rows, labelKey, valueKey);
      payload = {
        chartType: 'pie',
        rawRows: rows,
        config: { sheetName: selectedSheet, labelKey, valueKey },
        chartData,
      };
    }

    if (payload && onChartDataReady) {
      onChartDataReady(payload);
    }

    handleClose();
  };

  const currentCols = availableColumns;
  const fileName = file?.name || 'No file selected';

  const isSubmitDisabled = (() => {
    if (!file || !selectedSheet || !currentCols.length) return true;
    if (chartType === 'axis') {
      return !xKey || !yKeys.length;
    }
    return !labelKey || !valueKey;
  })();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload Excel Data</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {/* File input */}
          <Box>
            <Button variant="contained" component="label">
              Choose Excel File
              <input
                type="file"
                hidden
                accept=".xlsx,.xls"
                onChange={handleFileChange}
              />
            </Button>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              {fileName}
            </Typography>
          </Box>

          {/* Sheet select */}
          {sheetNames.length > 0 && (
            <FormControl fullWidth size="small">
              <InputLabel id="excel-sheet-label">Sheet</InputLabel>
              <Select
                labelId="excel-sheet-label"
                value={selectedSheet}
                label="Sheet"
                onChange={handleSheetChange}
              >
                {sheetNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Chart type selector */}
          {currentCols.length > 0 && (
            <FormControl fullWidth size="small">
              <InputLabel id="chart-type-label">Chart Type</InputLabel>
              <Select
                labelId="chart-type-label"
                value={chartType}
                label="Chart Type"
                onChange={(e) => setChartType(e.target.value)}
              >
                <MenuItem value="axis">Bar / Line (x + multiple y)</MenuItem>
                <MenuItem value="pie">Pie (label + value)</MenuItem>
              </Select>
            </FormControl>
          )}

          {/* Column selectors */}
          {chartType === 'axis' && currentCols.length > 0 && (
            <>
              <FormControl fullWidth size="small">
                <InputLabel id="x-key-label">X-Axis Column</InputLabel>
                <Select
                  labelId="x-key-label"
                  value={xKey}
                  label="X-Axis Column"
                  onChange={(e) => setXKey(e.target.value)}
                >
                  {currentCols.map((col) => (
                    <MenuItem key={col} value={col}>
                      {col}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel id="y-keys-label">Y Columns (series)</InputLabel>
                <Select
                  labelId="y-keys-label"
                  multiple
                  value={yKeys}
                  onChange={(e) => setYKeys(e.target.value)}
                  input={<OutlinedInput label="Y Columns (series)" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {currentCols.map((col) => (
                    <MenuItem key={col} value={col}>
                      <Checkbox checked={yKeys.indexOf(col) > -1} />
                      <ListItemText primary={col} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {chartType === 'pie' && currentCols.length > 0 && (
            <>
              <FormControl fullWidth size="small">
                <InputLabel id="label-key-label">Label Column</InputLabel>
                <Select
                  labelId="label-key-label"
                  value={labelKey}
                  label="Label Column"
                  onChange={(e) => setLabelKey(e.target.value)}
                >
                  {currentCols.map((col) => (
                    <MenuItem key={col} value={col}>
                      {col}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel id="value-key-label">Value Column</InputLabel>
                <Select
                  labelId="value-key-label"
                  value={valueKey}
                  label="Value Column"
                  onChange={(e) => setValueKey(e.target.value)}
                >
                  {currentCols.map((col) => (
                    <MenuItem key={col} value={col}>
                      {col}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {currentCols.length > 0 && (
            <Typography variant="caption" color="text.secondary">
              Tip: X-axis / label columns are usually text (e.g. month, category), and
              Y / value columns should be numeric to work well with charts.
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isSubmitDisabled}>
          Use in Charts
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExcelUploadDialog;


