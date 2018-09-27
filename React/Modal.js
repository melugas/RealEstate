import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

class LeadModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader className="bg-primary" toggle={this.toggle}>
            {this.props.caption}
          </ModalHeader>
          <ModalBody>{this.props.children}</ModalBody>
        </Modal>
      </div>
    );
  }
}

export default LeadModal;
