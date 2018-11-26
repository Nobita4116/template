import React, { Component } from 'react';

class ModalNotifyHeader extends Component {
    render() {
        let {notify} = this.props
        return (
            <div id="modal_notify_header" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-info">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h6 className="modal-title">Thông báo</h6>
                        </div>

                        <div className="modal-body">
                            <h5 className="fontBold">{notify.title}</h5>
                            <p>{notify.content}</p>
                            <hr/>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-link" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalNotifyHeader;