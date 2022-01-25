import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link } from 'react-router-dom';
import $  from 'jquery';
export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {business: []};
    }
    componentDidMount(){
        $('.titre').css("color","red");
      axios.get('/api/business')
        .then(response => {
          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.business.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <Link className="navbar-brand"  to={'/create'} className="nav-link"><i className="fa fa-plus"></i>Produits </Link>
          <h3 className="titre" align="center">Business List</h3>
          <table className="table datatable table-striped" style={{ textAlign:'center' }}>
            <thead>
              <tr>
                <th>Person name</th>
                <th>Business</th>
                <th>GST Number</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }