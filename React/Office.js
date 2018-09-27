import React from "react";
import { handleClick } from "./HandleClick";
import { withRouter } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

class Office extends React.Component {
  state = {
    pageIndex: [0]
  };

  handleCurrentUserEdit = () => {
    if (this.props.office.id) {
      console.log("edit mode active");
      this.props.history.push("/app/offices/" + this.props.office.id);
    } else {
      this.props.history.push("/officeEditor");
    }
  };

  handleClick = handleClick.bind(this);

  render() {
    const office = this.props.office;

    return (
      <div className="col-md-3">
        <div className="jr-card p-0 overflow-hidden">
          <div className="jr-card-header mb-0 p-4 bg-grey lighten-4">
            <h1 className="card-heading">{office.name}</h1>
            <p className="sub-heading">
              <a onClick={this.handleClick} style={{ cursor: "pointer" }}>
                <a href={"http://" + office.website}>{office.website}</a>
              </a>
            </p>
            <button
              className="btn btn-default pull-bottom"
              onClick={() => this.handleCurrentUserEdit(office.id)}
            >
              EDIT
            </button>
          </div>
          <div className="card-body">
            <ul className="contact-list list-unstyled">
              <li className="media">
                <i className="zmdi zmdi-account zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                <span className="media-body">{office.managerName}</span>
              </li>
              <li className="media">
                <i className="zmdi zmdi-phone zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                <span className="media-body">{office.phone}</span>
              </li>
              <li className="media">
                <i className="zmdi zmdi-email zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                <span className="media-body">{office.email}</span>
              </li>
              <li className="media">
                <i className="zmdi zmdi-pin zmdi-hc-fw zmdi-hc-lg text-primary align-self-center" />
                <span className="media-body">
                  {office.street}
                  <br />
                  {office.suite}
                  <br />
                  {office.city}, {office.state}
                  <br />
                  {office.zipCode}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Office);
