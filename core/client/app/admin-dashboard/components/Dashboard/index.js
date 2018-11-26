import React, { Component } from 'react';
import { connect } from 'react-redux'
import DashboardAdmin from './DashboardAdmin'

class index extends Component {
    render() {
        let { users } = this.props
        return (
            <DashboardAdmin />
        )

    }
}

function mapStateToProps(state) {
    let { users } = state;
    return {
        users: users.profile
    };
}

export default connect(mapStateToProps)(index);