import React, { Component } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

class Table extends Component {
  render() {
    const { sortColumn, onSort, data, columns } = this.props;
    return (
      <table className="table">
        <TableHeader
          sortColumn={sortColumn}
          onSort={onSort}
          columns={columns}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
