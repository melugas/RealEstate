import React from "react";
import { handleClick } from "./HandleClick";
import { withRouter } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { deleteOffice } from "../../services/Office.service";

class OfficeDirectoryTable extends React.Component {
  handleCurrentUserEdit = () => {
    if (this.props.office.id) {
      console.log("edit mode active");
      this.props.history.push("/app/offices/" + this.props.office.id);
    }
  };
  handleCurrentDelete = () => {
    const deleteCurrentOffice = deleteOffice(this.props.office.id);

    deleteCurrentOffice.then(response => {
      console.log("deleted", response.data.message);
      this.setState({ deleteOffice: response.data.message });
    });
    return this.props.history.push("/app/officeDirectory");
  };

  handleClick = handleClick.bind(this);

  render() {
    const office = this.props.office;

    return (
      <React.Fragment>
        <tr>
          <td>{office.name}</td>
          <td>
            {office.street} {office.suite}
            <br />
            {office.city}, {office.state} {office.zipCode}
          </td>
          <td>{office.phone}</td>
          <td>{office.email}</td>
          <td>{office.managerName}</td>
          <td>
            <a href={"http://" + office.website}>{office.website}</a>
          </td>
          <td>
            <div className="col-auto px-1 actions d-none d-sm-flex">
              <UncontrolledDropdown>
                <DropdownToggle tag="span">
                  <span className="icon-btn text-grey pointer">
                    <i className="zmdi zmdi-more-vert zmdi-hc-lg" />
                  </span>
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem
                    onClick={() => this.handleCurrentUserEdit(office.id)}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => this.handleCurrentDelete(office.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default withRouter(OfficeDirectoryTable);
