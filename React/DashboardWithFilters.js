import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import Drawer from "rc-drawer";
import AddLead from "./AddLead";
import LeadModal from "./LeadModal";
import CustomScrollbars from "../../util/CustomScrollbars";
import LeadList from "./LeadList";
import { connect } from "react-redux";
import { handleInputChange } from "../../_C58/OfficeList/HandleClick";
import { getAllLeads, searchLeads } from "../../services/lead.service";
import Paginator from "../Components/Paginator";
import download from "../../assets/images/download.png";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../styles/timeblocks/react-datepicker.css";

class LeadDashboard extends React.Component {
  state = {
    leadId: null,
    leads: [],
    searchString: "",
    dateCreated: "",
    pageIndex: 0,
    pageSize: 8,
    totalPages: 0,
    totalCount: 0,
    inEditMode: false,
    drawerState: false,
    UserId: null,
    searchUser: "",
    filterOption: "All leads",
    selectedLead: null,
    addContactState: false,
    resetLeadList: false,
    startDate: moment().local(),
    endDate: moment().local(),
    statusId: "",
    isCanceled: false,
    open: false,
    advancedSearch: false,
    searchStartDate: "",
    searchEndDate: ""
  };

  latestCallCount = 0;

  componentDidMount() {
    this.showAllLeads();
  }

  //====Get All Leads===//
  showAllLeads() {
    const leadListShowPromise = getAllLeads(0, 10);

    leadListShowPromise
      .then(response => {
        this.setState(prevState => ({
          leads: response.data.item.pagedItems,
          totalCount: response.data.item.totalCount,
          totalPages: Math.ceil(
            response.data.item.totalCount / prevState.pageSize
          )
        }));
      })
      .catch(err => {
        console.error(err);
      });
  }

  //==============Search Bar & Filters===//

  executeQuery = (
    searchString,
    currentPage = 0,
    pageSize = 10,
    searchStartDate,
    searchEndDate,
    statusId
  ) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      const promise = searchLeads(
        searchString,
        currentPage,
        pageSize,
        searchStartDate,
        searchEndDate,
        statusId
      );

      const currentCallCount = ++this.latestCallCount;

      promise.then(response => {
        if (currentCallCount == this.latestCallCount) {
          const result = response.data.item;
          this.setState(prevState => ({
            leads: result.pagedItems,
            lead: null,
            totalCount: result.totalCount,
            totalPages: Math.ceil(result.totalCount / prevState.pageSize)
          }));
        }
      });
      this.timeout = null;
    }, 500);
  };

  clearSearch = () => {
    this.setState({
      leads: [],
      searchString: "",
      searchStartDate: "",
      searchEndDate: "",
      statusId: ""
    });
    const leadListShowPromise = getAllLeads(0, 10);

    leadListShowPromise
      .then(response => {
        const result = response.data.item;
        this.setState(prevState => ({
          leads: response.data.item.pagedItems,
          totalCount: response.data.item.totalCount,
          totalPages: Math.ceil(result.totalCount / prevState.pageSize)
        }));
      })
      .catch(err => {
        console.error(err);
      });
  };

  formatDate = date =>
    moment(date)
      .local()
      .format("YYYY-MM-DD");

  onAdvancedSearchSelect = () => {
    this.setState({
      advancedSearch: !this.state.advancedSearch
    });
  };

  //=============Search  bar functions===//
  onSearchChange = e => {
    //---triggers auto search while typing
    this.setState(
      {
        searchString: e.target.value
      },
      () => {
        this.executeQuery(
          this.state.searchString,
          this.state.pageIndex,
          this.state.pageSize,
          this.state.searchStartDate,
          this.state.searchEndDate,
          this.state.statusId
        );
      }
    );
  };

  goToPage = pageIndex => {
    this.setState(
      prev => ({ pageIndex }),
      () => {
        this.executeQuery(
          this.state.searchString,
          this.state.pageIndex,
          this.state.pageSize,
          this.state.searchStartDate,
          this.state.searchEndDate,
          this.state.statusId
        );
      }
    );
  };

  onSearchClick = () => {
    //---search button for advanced filters
    this.executeQuery(
      this.state.searchString,
      this.state.pageIndex,
      this.state.pageSize,
      this.state.searchStartDate,
      this.state.searchEndDate,
      this.state.statusId
    );
  };

  selectDateCreated = event => {
    this.setState({ datecreated: event.target.value });
  };

  selectStatus = event => {
    this.setState({ statusId: event.target.value });
  };

  //===========Input box function===//
  handleInputChange = handleInputChange.bind(this);

  //===========Side Bar/Sub Nav Menu======//
  ContactSideBar = lead => {
    return (
      <div className="module-side">
        <div className="module-side-header">
          <div className="module-logo">
            <i className="zmdi zmdi-account-box mr-4" />
            <span>Leads</span>
          </div>
        </div>

        <div className="module-side-content">
          <CustomScrollbars
            className="module-side-scroll scrollbar"
            style={{
              height:
                this.props.width >= 1200
                  ? "calc(100vh - 200px)"
                  : "calc(100vh - 80px)"
            }}
          >
            <div class="d-flex justify-content-between" />
            <div className="module-add-task">
              <Button
                className="btn-block jr-btn"
                color="primary"
                onClick={this.addNewLead}
              >
                <i className="zmdi zmdi-account-add zmdi-hc-fw" />
                <span>Add New Lead</span>
              </Button>
            </div>
            <div class="d-flex justify-content-between" />
            <div className="module-side-nav">
              <ul className="module-nav">
                {" "}
                <li>
                  <a href="javascript:void(0)">
                    <i className={`zmdi zmdi-menu`} />
                    <span onClick={this.clearSearch}>All Leads</span>
                  </a>
                </li>
              </ul>
            </div>
          </CustomScrollbars>
        </div>
      </div>
    );
  };

  //=============Lead Modal Handlers===========//

  showModal = show => {
    this.setState({
      addContactState: show
    });
  };

  onCancel = () => {
    console.log("parent");
    this.setState({ addContactState: false, inEditMode: false });
    this.toggleLeadList();
  };

  addNewLead = () => {
    console.log("activate modal form");
    this.setState({
      addContactState: !this.state.addContactState,
      selectedId: null
    });
  };

  toggleLeadList = () => {
    this.showAllLeads();
  };

  //============end modal===//

  activeEditMode = id => {
    this.setState({ inEditMode: !this.state.inEditMode, selectedId: id });
  };

  //====Sidebar/Subnav drawer Toggle in mobile view===//
  onToggleDrawer() {
    this.setState({
      drawerState: !this.state.drawerState
    });
  }

  render() {
    const {
      lead,
      drawerState,
      searchString,
      startDate,
      endDate,
      advancedSearch
    } = this.state;

    return (
      <div className="app-wrapper">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="d-block d-xl-none">
            <Drawer
              touch={true}
              transitions={true}
              enableDragHandle={true}
              open={drawerState}
              onOpenChange={this.onToggleDrawer.bind(this)}
              sidebar={this.ContactSideBar(lead)}
            />
          </div>
          <div className="app-module-sidenav d-none d-xl-flex">
            {this.ContactSideBar()}
          </div>

          <div className="module-box">
            <div className="module-box-header">
              <span
                className="icon-btn drawer-btn d-flex d-xl-none"
                onClick={this.onToggleDrawer.bind(this)}
              >
                <i className="zmdi zmdi-menu" />
              </span>

              <div className="module-box-header-inner">
                <div
                  className="search-bar right-side-icon bg-transparent
                 d-none d-sm-block"
                >
                  <button className="search-icon" onClick={this.onSearchClick}>
                    <i className="zmdi zmdi-search zmdi-hc-lg" />
                  </button>
                  <div className="form-group">
                    <input
                      className="form-control border-0"
                      type="search"
                      name="searchString"
                      value={searchString}
                      onChange={e => this.onSearchChange(e)}
                    />
                  </div>

                  <a
                    onClick={this.onAdvancedSearchSelect}
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    <a href={this.advancedSearch}>+Advanced Search</a>
                  </a>

                  {advancedSearch && (
                    <div className="jr-card row">
                      <div>
                        <h1 style={{ fontSize: "14px", fontWeight: "bold" }}>
                          Status Level:
                        </h1>
                        <ButtonGroup>
                          <Button
                            className="jr-btn jr-btn-default"
                            color="default"
                            style={{ backgroundColor: "primary" }}
                            value={1}
                            onClick={this.selectStatus}
                          >
                            Hot
                          </Button>
                          <Button
                            className="jr-btn jr-btn-default"
                            color="default"
                            value={2}
                            onClick={this.selectStatus}
                          >
                            Warm
                          </Button>
                          <Button
                            className="jr-btn jr-btn-default"
                            color="default"
                            value={3}
                            onClick={this.selectStatus}
                          >
                            Cold
                          </Button>
                        </ButtonGroup>{" "}
                        <br />
                        <div className="mr-auto" style={{ paddingTop: "20px" }}>
                          <h1 style={{ fontSize: "14px", fontWeight: "bold" }}>
                            Date Created Range:
                          </h1>
                          <div className="col-10">
                            <span>
                              <DatePicker
                                selected={startDate}
                                popperPlacement={"right-start"}
                                onChange={date => {
                                  if (date > endDate) {
                                    this.setState({
                                      startDate: date,
                                      endDate: date,
                                      searchStartDate: this.formatDate(date),
                                      searchEndDate: this.formatDate(date)
                                    });
                                  } else {
                                    this.setState({
                                      startDate: date,
                                      searchStartDate: this.formatDate(date)
                                    });
                                  }
                                }}
                                className="form-control text-center"
                                dateFormat="MMM D, YYYY"
                                disabled={this.state.isCanceled}
                                maxDate={moment()}
                              />
                            </span>
                            <span>
                              <DatePicker
                                selected={endDate}
                                popperPlacement={"right-start"}
                                onChange={date => {
                                  this.setState({
                                    endDate: date,
                                    searchEndDate: this.formatDate(date)
                                  });
                                  if (startDate > date) {
                                    this.setState({
                                      startDate: date,
                                      endDate: date,
                                      searchStartDate: this.formatDate(date),
                                      searchEndDate: this.formatDate(date)
                                    });
                                  }
                                }}
                                className="form-control text-center"
                                dateFormat="MMM D, YYYY"
                                disabled={this.state.isCanceled}
                                maxDate={moment()}
                              />
                              <br />
                              <div className="row">
                                <Button
                                  style={{ fontSize: "12px" }}
                                  color="primary"
                                  onClick={this.onSearchClick}
                                >
                                  Search
                                </Button>
                                <Button
                                  color="default"
                                  style={{ backgroundColor: "white" }}
                                  size="sm"
                                  onClick={this.clearSearch}
                                >
                                  Clear Results
                                </Button>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {advancedSearch || this.props.width < 500 ? (
                  <div />
                ) : (
                  <div className="module-box-header-right">
                    <span>
                      <label>
                        <a href="/api/leads/file">
                          <img
                            src={download}
                            className=""
                            style={{
                              height: "15px",
                              width: "auto",
                              maxWidth: "15px"
                            }}
                          />
                          Export List
                        </a>
                      </label>
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="module-box-content">
              <CustomScrollbars
                className="module-list-scroll scrollbar"
                style={{
                  height:
                    this.props.width >= 1200
                      ? "calc(100vh - 265px)"
                      : "calc(100vh - 245px)"
                }}
              >
                {this.state.leads && this.state.leads.length > 0 ? (
                  <LeadList
                    resetLeads={this.toggleLeadList}
                    getAll={this.state.leads}
                    history={this.props.history}
                    editLead={this.activeEditMode}
                  />
                ) : (
                  <h3 className="d-flex justify-content-center">
                    No leads here :(
                  </h3>
                )}
                <div>
                  <LeadModal
                    className="col-md-4"
                    toggle={e => this.showModal(false)}
                    modal={this.state.addContactState || this.state.inEditMode}
                    caption={
                      <div style={{ color: "white", fontSize: "20px" }}>
                        Lead
                      </div>
                    }
                  >
                    <AddLead
                      key={this.state.leadData}
                      leadData={lead}
                      onCancel={this.onCancel}
                      addLead={this.addLead}
                      resetLeads={this.toggleLeadList}
                      leadId={this.state.selectedId}
                    />
                  </LeadModal>
                </div>
              </CustomScrollbars>

              <div className="app-footer">
                <div className="d-flex flex-row justify-content-between" />
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <Paginator
                    currentPage={this.state.pageIndex}
                    totalPages={this.state.totalPages}
                    goTo={this.goToPage}
                    buttonCount={5}
                  />
                </div>
                <div className="d-flex justify-content-between" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ settings }) => {
  const { width } = settings;
  return { width };
};

export default connect(mapStateToProps)(LeadDashboard);
