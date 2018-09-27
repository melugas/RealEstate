import React from "react";
import {
  getById,
  putOffice,
  postOffice,
  getAllOffices
} from "../../services/Office.service";
import { handleInputChange } from "./HandleClick";
import { Container } from "reactstrap";

class OfficeEditor extends React.Component {
  state = {
    id: null,
    officeList: [],
    name: "",
    email: "",
    phone: "",
    website: "",
    managerUserId: "",
    managerName: "",
    street: "",
    suite: "",
    city: "",
    state: "",
    zipCode: "",
    inEditMode: false
  };

  componentDidMount() {
    const officeId = this.props.match.params.id;
    const getAllOfficesPromise = getAllOffices();

    if (officeId) {
      getById(officeId).then(response => {
        this.setState(response.data);
        this.setState({ inEditMode: true });
        console.log(response.data);
      });
    } else {
      getAllOfficesPromise.then(response => {
        this.setState({ officeList: response.data.item.pagedItems });
      });
    }
  }

  handleOfficeSelector = e => {
    console.log(e.target.value);
    console.log(this.state.officeList[e.target.value]);

    const value = e.target.value;
    console.log(value);

    this.setState({
      id: this.state.officeList[value].id,
      name: this.state.officeList[value].name,
      email: this.state.officeList[value].email,
      phone: this.state.officeList[value].phone,
      website: this.state.officeList[value].website,
      managerUserId: this.state.officeList[value].managerUserId,
      street: this.state.officeList[value].street,
      suite: this.state.officeList[value].suite,
      city: this.state.officeList[value].city,
      state: this.state.officeList[value].state,
      zipCode: this.state.officeList[value].zipCode
    });
  };

  handleButtonClick = e => {
    e.preventDefault();
    const officeId = this.props.match.params.id;
    const {
      id,
      name,
      email,
      phone,
      website,
      managerUserId,
      street,
      suite,
      city,
      state,
      zipCode
    } = this.state;

    if (officeId) {
      const officeEditPromise = putOffice(
        id,
        name,
        phone,
        email,
        website,
        managerUserId,
        street,
        suite,
        city,
        state,
        zipCode
      );

      officeEditPromise
        .then(response => {
          console.log(response.data);
          this.setState(response.data.message);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      const officeCreatePromise = postOffice(
        name,
        phone,
        email,
        website,
        managerUserId,
        street,
        suite,
        city,
        state,
        zipCode
      );

      officeCreatePromise
        .then(response => {
          console.log(response.data);
          this.setState(response.data.message);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  handleInputChange = handleInputChange.bind(this);

  render() {
    const {
      name,
      email,
      phone,
      website,
      managerUserId,
      managerName,
      street,
      suite,
      city,
      state,
      zipCode
    } = this.state;

    return (
      <Container className="d-flex justify-content-center h-100">
        <div className="app-wrapper">
          <div className="animated slideInUpTiny animation-duration-3">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-md-8 col-sm-7 col-12">
                  {this.state.inEditMode ? (
                    <form action="" className="contact-form jr-card">
                      <div className="jr-card-header">
                        <h1 className="card-heading">Office</h1>
                        <div className="sub-heading">Your Office Info</div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">Office Name:</label>
                            <select
                              className="form-control form-control-lg"
                              name="name"
                              color="primary"
                              onChange={e => this.handleOfficeSelector(e)}
                              value={this.state.id}
                            >
                              <option>Select An Office</option>
                              {this.state.officeList &&
                                this.state.officeList.map((office, index) => {
                                  return (
                                    <option value={index} key={office.id}>
                                      {office.name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="ManagerUserId">Manager Name:</label>
                            <select
                              className="form-control form-control-lg"
                              id="mangerUserId"
                              type="text"
                              name="managerUserId"
                              value={managerUserId}
                            >
                              <option key={managerUserId} value={managerUserId}>
                                {managerName}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">Office Name:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Name"
                              type="text"
                              name="name"
                              value={name}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">Website:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Website"
                              type="text"
                              placeholder="www.yourofficeurl.com"
                              name="website"
                              value={website}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Phone">Phone:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Phone"
                              type="text"
                              name="phone"
                              value={phone}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">Email:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Email"
                              type="email"
                              name="email"
                              value={email}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Street">Street Address Line 1:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Street"
                              type="text"
                              name="street"
                              value={street}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">
                              Street Address Line 2(Suite/Floor/Etc):
                            </label>
                            <input
                              className="form-control form-control-lg"
                              id="suite"
                              type="text"
                              name="suite"
                              value={suite}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="City">City</label>
                            <input
                              className="form-control form-control-lg"
                              id="City"
                              type="text"
                              name="city"
                              value={city}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-2 col-12">
                          <div className="form-group">
                            <label form="State">State:</label>
                            <input
                              className="form-control form-control-lg"
                              id="state"
                              type="text"
                              name="state"
                              value={state}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-12">
                          <div className="form-group">
                            <label form="Zip">Zip Code:</label>
                            <input
                              className="form-control form-control-lg"
                              id="zip"
                              type="text"
                              name="zipCode"
                              value={zipCode}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group mb-10">
                            <button
                              type="submit"
                              className="btn btn-primary float-right"
                              onClick={this.handleButtonClick}
                            >
                              {(this.state.inEditMode && "Update") || "Submit"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <form action="" className="contact-form jr-card">
                      <div className="jr-card-header">
                        <h1 className="card-heading">Office</h1>
                        <div className="sub-heading">Add New Office</div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">Office Name:</label>
                            <select
                              className="form-control form-control-lg"
                              name="name"
                              color="primary"
                              onChange={e => this.handleOfficeSelector(e)}
                              value={this.state.id}
                            >
                              <option>Select An Office</option>
                              {this.state.officeList &&
                                this.state.officeList.map((office, index) => {
                                  return (
                                    <option value={index} key={office.id}>
                                      {office.name}
                                    </option>
                                  );
                                })}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="ManagerUserId">Manager Name:</label>
                            <select
                              className="form-control form-control-lg"
                              id="mangerUserId"
                              type="text"
                              name="managerUserId"
                              value={managerUserId}
                            >
                              <option key={managerUserId} value={managerUserId}>
                                {managerName}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">Office Name:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Name"
                              type="text"
                              name="name"
                              value={name}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">Website:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Website"
                              type="text"
                              placeholder="www.yourofficeurl.com"
                              name="website"
                              value={website}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Phone">Phone:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Phone"
                              type="text"
                              name="phone"
                              value={phone}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">Email:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Email"
                              type="email"
                              name="email"
                              value={email}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Street">Street Address Line 1:</label>
                            <input
                              className="form-control form-control-lg"
                              id="Street"
                              type="text"
                              name="street"
                              value={street}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="Name">
                              Street Address Line 2(Suite/Floor/Etc):
                            </label>
                            <input
                              className="form-control form-control-lg"
                              id="suite"
                              type="text"
                              name="suite"
                              value={suite}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div className="form-group">
                            <label form="City">City</label>
                            <input
                              className="form-control form-control-lg"
                              id="City"
                              type="text"
                              name="city"
                              value={city}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-2 col-12">
                          <div className="form-group">
                            <label form="State">State:</label>
                            <input
                              className="form-control form-control-lg"
                              id="state"
                              type="text"
                              name="state"
                              value={state}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-12">
                          <div className="form-group">
                            <label form="Zip">Zip Code:</label>
                            <input
                              className="form-control form-control-lg"
                              id="zip"
                              type="text"
                              name="zipCode"
                              value={zipCode}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group mb-10">
                            <button
                              type="submit"
                              className="btn btn-primary float-right"
                              onClick={this.handleButtonClick}
                            >
                              {(this.state.inEditMode && "Update") || "Submit"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
export default OfficeEditor;
