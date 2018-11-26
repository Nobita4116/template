import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listMenu: [
                {
                    id: 1,
                    name: 'Dashboard',
                    icon: 'icon-home5',
                    url: '/dashboard',
                    path: '/dashboard',
                    level: 1,
                    child: []
                },
                {
                    id: 2,
                    name: 'Hệ thống nhà phân phối',
                    icon: 'icon-office',
                    url: '/distributor',
                    path: '/distributor',
                    level: 1,
                    child: [
                        {
                            name: 'Tạo mới',
                            url: '/distributor/new',
                            path: 'new',
                            parent: 2,
                        },
                        {
                            name: 'Danh sách',
                            url: '/distributor/list',
                            path: 'list',
                            parent: 2,
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Hệ thống nhà cung cấp',
                    icon: 'icon-office',
                    url: '/provider',
                    path: '/provider',
                    level: 1,
                    child: [
                        {
                            name: 'Tạo mới',
                            url: '/provider/new',
                            path: 'new',
                            parent: 2,
                        },
                        {
                            name: 'Danh sách',
                            url: '/provider/list',
                            path: 'list',
                            parent: 2,
                        }
                    ]
                },
                {
                    id: 4,
                    name: 'Hệ thống sản phẩm',
                    icon: 'icon-delicious',
                    url: '/product',
                    path: '/product',
                    level: 1,
                    child: [
                        {
                            name: 'Tạo mới',
                            url: '/product/new',
                            path: 'new',
                            parent: 2,
                        },
                        {
                            name: 'Danh sách',
                            url: '/product/list',
                            path: 'list',
                            parent: 2,
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Hệ thống siêu thị',
                    icon: 'icon-store',
                    url: '/supermarket',
                    path: '/supermarket',
                    level: 1,
                    child: [
                        {
                            name: 'Tạo mới',
                            url: '/supermarket/new',
                            path: 'new',
                            parent: 2,
                        },
                        {
                            name: 'Danh sách',
                            url: '/supermarket/list',
                            path: 'list',
                            parent: 2,
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Hệ thống kho hàng',
                    icon: 'icon-grid5',
                    url: '/container',
                    path: '/container',
                    level: 1,
                    child: [
                        {
                            name: 'Tạo mới',
                            url: '/container/new',
                            path: 'new',
                            parent: 2,
                        },
                        {
                            name: 'Danh sách',
                            url: '/container/list',
                            path: 'list',
                            parent: 2,
                        },
                        {
                            name: 'Thông kê',
                            url: '/container/report',
                            path: 'report',
                            parent: 2,
                        }
                    ]
                },
                {
                    id: 6,
                    name: 'Quản lý đơn hàng',
                    icon: 'icon-cart',
                    url: '/order',
                    path: '/container',
                    level: 1,
                    child: [
                        {
                            name: 'Nhập hàng hóa',
                            url: '/order/receiver',
                            path: 'receiver',
                            parent: 2,
                        },
                        {
                            name: 'Đặt hàng',
                            url: '/order/order',
                            path: 'order',
                            parent: 2,
                        },
                        {
                            name: 'Xuất hàng',
                            url: '/order/export',
                            path: 'export',
                            parent: 2,
                        }
                    ]
                },
            ],
            idMenu: 1,
            idxActive: 0
        }
    }

    componentDidMount() {
        let { location } = this.props
        let { pathname } = location
        let { listMenu } = this.state

        let idMenu = 1, idxActive = 0;
        listMenu.map((menu) => {
            if (pathname.indexOf(menu.path) >= 0) {
                idMenu = menu.id
                menu.child.map((child, idx) => {
                    if (pathname.indexOf(child.path) >= 0) {
                        idxActive = idx
                    }
                })
            }
        })

        this.setState({
            idMenu,
            idxActive
        })
    }

    clickMenu(menu, idx, e) {
        e.preventDefault()
        let { history } = this.props
        let { idMenu } = this.state

        if (!menu.level || (menu.level == 1 && !menu.child.length && menu.id != idMenu)) {
            history.push(menu.url)
        }

        this.setState({
            idMenu: menu.id || menu.parent,
            idxActive: idx
        })
    }

    renderListMenu() {
        let { listMenu, idMenu, idxActive } = this.state

        let contentMenu = listMenu.map((item, idx) => {
            let nameMain = item.name_agency ? item.name_agency : item.name

            let children = item.child.map((child, child_idx) => {
                let nameChildMain = (child.name_agency) ? child.name_agency : child.name

                let classActive = ''
                if (item.id == idMenu && idxActive == child_idx) {
                    classActive = 'active'
                }
                return (
                    <li key={'child-' + child_idx} className={classActive}><a href={child.url} onClick={this.clickMenu.bind(this, child, child_idx)}>{nameChildMain}</a></li>
                )
            })

            return (
                <li className={(item.id == idMenu) ? 'active' : ''} key={'menu-parent-' + idx}>
                    {item.child.length ? (
                        <a href='#' className={item.number_child ? "has-ul" : ''} onClick={this.clickMenu.bind(this, item, 0)}><i className={item.icon}></i> <span>{nameMain}</span></a>
                    ) : (
                            <a href={item.url} onClick={this.clickMenu.bind(this, item, 0)}><i className={item.icon}></i> <span>{nameMain}</span></a>
                        )}

                    {item.child.length ? (
                        <ul className={item.id == idMenu ? "" : 'hidden-ul'}>
                            {children}
                        </ul>
                    ) : ''}
                </li>
            )
        })

        return contentMenu
    }
    render() {
        return (
            <div className="sidebar-category sidebar-category-visible">
                <div className="category-content no-padding">
                    <ul className="navigation navigation-main navigation-accordion">
                        {this.renderListMenu()}
                    </ul>
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

export default withRouter(connect(mapStateToProps)(Navigation));