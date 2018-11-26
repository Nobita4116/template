import React, { Component } from 'react';

class StatusOrder extends Component {
    render() {
        let {status, bsClass} = this.props
        bsClass = bsClass || ''
        if (status == 1) {
            return <span className={`label label-success ${bsClass}`}>Đã xác nhận</span>
        } else if (status == 2) {
            return <span className={`label label-error ${bsClass}`}>Bị hủy bỏ</span>
        } else {
            return <span className={`label label-danger ${bsClass}`}>Chờ xác nhận</span>
        }
    }
}

export default StatusOrder;