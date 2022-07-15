import React, { useState,useMemo,useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './test-grid-custom-theme.css';

const App = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Athlete',
      children: [
        { field: 'athlete', minWidth: 170, rowGroup: true },
        { field: 'age', rowGroup: true },
        { field: 'country' },
      ],
    },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);


  return (
    <div style={containerStyle} > 
    <div style={gridStyle} className="ag-theme-alpine">
      <AgGridReact 
      rowData={rowData}   
      rowSelection={'multiple'}       
      defaultColDef={defaultColDef}           
      sideBar={true}
      columnDefs={columnDefs}
      onGridReady={onGridReady}
      >
      </AgGridReact>
 </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));