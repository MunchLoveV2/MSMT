import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


function WorkOrderTable(props) {


    const columns = [
        {
            dataField: 'issue',
            text: 'Issue'
        }, 
        {
            dataField: 'category',
            text: 'Category'
        }, 
        {
            dataField: 'location',
            text: 'Location'
        },
        {
            dataField: 'image',
            text: 'Image'
        },
        {
            dataField: 'dateCreated',
            text: 'Date Created'
        },
    ];


    return (
        <div>
            <BootstrapTable keyField='id' data={ props.workOrders } columns={ columns } />
        </div>
    );
}

export default WorkOrderTable;