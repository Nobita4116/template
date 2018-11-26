import React, { Component } from 'react';
import InputGroup from '../Common/InputGroup'
import Success from './Success'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            password: '',
            confirm_password: '',
            success: false
        }
    }

    changeInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    submitRegister = (e) => {
        e.preventDefault()
        let { password, confirm_password, user_name } = this.state
        if (confirm_password != password) {
            return showErrorMessage('Mật khẩu xác nhận không đúng')
        }

        makeRequest('post', '/register', {
            user_name, password
        })
            .then(result => {
                if (result.signal) {
                    this.setState({
                        success: true
                    })
                } else {
                    showErrorMessage(result.message)
                }
            })
    }

    render() {
        let { success } = this.state;
        return (
            <form onSubmit={this.submitRegister}>
                {success ? (
                    <Success />
                ) : (
                        <div className="panel panel-body login-form">
                            <div className="text-center">
                                <div className="icon-object border-slate-300 text-slate-300">
                                    <i className="icon-reading"></i>
                                </div>
                                <h5 className="content-group">Tạo tài khoản đăng nhập</h5>
                            </div>
                            <div className="form-group has-feedback has-feedback-left" style={{ paddingTop: '0px' }}>
                                <div className="form-group">
                                    <label className="control-label fontBold">Tên tài khoản <span className="text-danger">*</span></label>
                                    <InputGroup
                                        placeholder=""
                                        name="user_name"
                                        required
                                        type="text"
                                        changeInput={this.changeInput}
                                        icon='icon-user'
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="control-label fontBold">Mật khẩu: <span className="text-danger">*</span></label>
                                    <InputGroup
                                        placeholder=""
                                        name="password"
                                        type="password"
                                        required
                                        changeInput={this.changeInput}
                                        icon="icon-lock2"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="control-label fontBold">Xác nhận mật khẩu: <span className="text-danger">*</span></label>
                                    <InputGroup
                                        placeholder=""
                                        type="password"
                                        name="confirm_password"
                                        required
                                        changeInput={this.changeInput}
                                        icon="icon-lock2"
                                    />
                                </div>

                                <div className="text-right">
                                    <Link to="/login" className="btn btn-link"><i className="icon-arrow-left13 position-left" /> Quay lại đăng nhập</Link>
                                    <button type="submit" className="btn bg-teal-400 btn-labeled btn-labeled-right ml-10"><b><i className="icon-plus3" /></b> Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    )}
            </form >
        );
    }
}

export default index;