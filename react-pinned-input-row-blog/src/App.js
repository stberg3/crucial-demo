import { AgGridReact } from 'ag-grid-react';
import React, { useState, useCallback } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './style.css';
import 'ag-grid-enterprise';

import DatePicker from './DatePicker.js';

const App = () => {
  const [rowData, setRowData] = useState(null);
  const [inputRow, setInputRow] = useState({});

  const [columnDefs] = useState([
    { field: 'id', editable: false},
    { field: 'firstName' , editable: true},
    { field: 'lastName' , editable: true},
    { field: 'birthdate', cellEditor: DatePicker , editable: true},
    { field: 'shoeSize' , editable: true},
  ]);

  const [defaultColDef] = useState({
    flex: 1,
    editable: true,
    valueFormatter: (params) =>
      isEmptyPinnedCell(params)
        ? createPinnedCellPlaceholder(params)
        : undefined,
  });

  const getRowStyle = useCallback(
    ({ node }) =>
      node.rowPinned ? { fontWeight: 'bold', fontStyle: 'italic' } : {},
    []
  );

  const onCellEditingStopped = useCallback(
    (params) => {
      if (params.rowPinned !== 'top') {
        fetch(`/users/${params.data.id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
          headers: {
            'Content-Type': 'application/json'
          },
        });
        console.log(`inputRow: ${JSON.stringify(params.data)}`);
        return;
      }
      else if (isPinnedRowDataCompleted()) {
        setRowData([...rowData, inputRow]);
        setInputRow({});
        fetch('/users', {
          method: 'POST',
          body: JSON.stringify(inputRow),
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((r) => {
          console.log("Created a user: ");
          console.log(JSON.stringify(r.json()));
        });
        console.log(`inputRow: ${JSON.stringify(inputRow)}`);
      }
    },
    [rowData, inputRow]
  );

  const onRowValueChanged = useCallback(
    (params) => {
        setRowData([...rowData, inputRow]);
        setInputRow({});        
    },
    [rowData, inputRow]
  );

  const onGridReady = () => {
    fetch('/users')
      .then((resp) => resp.json())
      .then((rowData) => setRowData(rowData._embedded.users));
  };

  return (
    <div style={{ height: '100%', width: '100%' }} className="ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        getRowStyle={getRowStyle}
        pinnedTopRowData={[inputRow]}
        onGridReady={onGridReady}
        onCellEditingStopped={onCellEditingStopped}
        onRowValueChanged={onRowValueChanged}
      ></AgGridReact>
    </div>
  );

  function isEmptyPinnedCell(params) {
    return (
      (params.node.rowPinned === 'top' && params.value == null) ||
      (params.node.rowPinned === 'top' && params.value === '')
    );
  }

  function createPinnedCellPlaceholder({ colDef }) {
    return colDef.field[0].toUpperCase() + colDef.field.slice(1) + '...';
  }

  function isPinnedRowDataCompleted() {    
    return columnDefs.filter(col => col.editable).every((def) => inputRow[def.field]);
  }
};

export default App;
