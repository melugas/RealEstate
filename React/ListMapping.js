import React from "react";
import LeadCell from "./LeadCell";

class LeadList extends React.Component {
  render() {
    return (
      <div className="contact-main-content">
        {this.props.getAll.map((lead, index) => (
          <LeadCell
            key={index}
            lead={lead}
            resetLeads={this.props.resetLeads}
            getAll={this.props.leads}
            history={this.props.history}
            editLead={this.props.editLead}
            deleteLead={this.props.deleteLead}
          />
        ))}
      </div>
    );
  }
}

export default LeadList;
