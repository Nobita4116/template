import React, { Component } from 'react';
import { connect } from 'react-redux'
import PageHeader from '../Common/PageHeader'

class DashboardAdmin extends Component {
    render() {
        let { users } = this.props
        return (
            <div>
                <PageHeader
                    title="Home - Dashboard"
                    breadcrumb={[
                        { title: 'Dashboard', link: '' }
                    ]}
                />
                <div className="content">

                    <div className="panel-heading">
                        <div className="clearfix">
                            <div className="pull-left">
                                <div className="text-uppercase fontBold font20 marginT5 marginR20">Tình hình kinh doanh đại lý của bạn</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { users } = state;
    return {
        users: users.profile
    };
}

export default connect(mapStateToProps)(DashboardAdmin);