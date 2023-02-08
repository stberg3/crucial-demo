import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

class ShoesizeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      birthdate: '',
      shoeSize: '',
      submitEnabled: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ 
      [name]: value
    });

    // this.setState({ 
    //   submitEnabled: this.state.birthdate != null && 
    //                   this.state.firstName.trim.length > 0 && 
    //                   this.state.lastName.trim.length > 0 && 
    //                   this.state.shoeSize > 0
    // });
    // console.log(`${name}:${value}`)
    // console.log(`birthdate != null: ${this.state.birthdate != null} [${this.state.birthdate}]`)
    // console.log(`firstName.trim.length > 0: ${this.state.firstName.trim.length > 0} [${this.state.firstName}]`)
    // console.log(`lastName.trim.length > 0: ${this.state.lastName.trim.length > 0} [${this.state.lastName}]`)
    // console.log(`shoeSize > 0: ${this.state.shoeSize > 0} [${this.state.shoeSize}]`)
    // console.log(`submitEnabled > 0: ${this.state.submitEnabled}`)
  }
  

  handleSubmit(event) {
    alert('A form was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const submitEnabled = this.state.birthdate != null && 
                          this.state.firstName.trim().length > 0 && 
                          this.state.lastName.trim().length > 0 && 
                          this.state.shoeSize > 0
    console.log(submitEnabled)
    console.log(`birthdate: [${new Date(this.state.birthdate)}] => ${new Date(this.state.birthdate) < new Date()}`)
    console.log(`firstName: [${this.state.firstName}] => ${this.state.firstName.trim().length > 0}`)
    console.log(`lastName: [${this.state.lastName}] => ${this.state.lastName.trim().length > 0}`)
    console.log(`shoeSize: [${this.state.shoeSize}] => ${this.state.shoeSize > 0}`)

    return (
      <form onSubmit={this.handleSubmit} style={{
        display: 'grid',
        // 'grid-template-columns': "1fr",
        gap: '10px',
        // 'grid-auto-rows': 'minmax(100px, auto)',
        }}>
        <label>
          First Name: 
          <input type="text" name='firstName' value={this.state.firstName} onChange={this.handleInputChange} />
        </label>
        <label>
          Last Name: 
          <input type="text" name='lastName' value={this.state.lastName} onChange={this.handleInputChange} />
        </label>
        <label>
          Birthdate: 
          <input type="date" name='birthdate' value={this.state.birthdate} onChange={this.handleInputChange} />
        </label>
        <label>
          Shoesize: 
          <input type="number" name='shoeSize' value={this.state.shoeSize} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" disabled={!submitEnabled}/>
      </form>
    );
  }
}


const App = () => {

 const gridRef = useRef(); // Optional - for accessing Grid's API
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'birthdate', filter: true},
   {field: 'shoeSize', filter: true},
   {field: 'name'}
 ]);


 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({ sortable: true }));

 // Example of consuming Grid Event
 const cellClickedListener = useCallback( event => {
   console.log('cellClicked', event);
 }, []);

// Example load data from sever
 useEffect(() => {
   fetch('/users')
   .then(result => result.json())
   .then(rowData => setRowData(rowData._embedded.users))
 }, []);

 // Example using Grid's API
 const buttonListener = useCallback( e => {
   gridRef.current.api.deselectAll();
 }, []);

 return (
   <div style={{
        display: 'grid',
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: '10px',
        gridAutoRows: 'minmax(100px, auto)',}}
    >

    <ShoesizeForm style={{gridColumn: 1}}/>

     {
     /* 
     On div wrapping Grid 
        a) specify theme CSS Class Class and 
        b) sets Grid size
      */
     }
     <div className="ag-theme-alpine" style={{height: 500, gridColumn: '2 / 4'}}>
       <AgGridReact
           ref={gridRef} // Ref for accessing Grid's API
           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
     </div>
   </div>
 );
};

export default App;
