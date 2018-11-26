import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {validateMobile} from '../../../libs/utils';
import {updateInfo, updateUser} from '../../actions/users';
import {showErrorMessage, showSuccessMessage} from '../../actions/notification';
import ButtonLoader from '../../../common/Button/ButtonLoader';

class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                data:props.users.profile.name,
                error: ''
            },
            mobile: {
                data: props.users.profile.mobile,
                error: ''
            },
            email: props.users.profile.email,
            loadingInfo: false
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.users.profile !== this.props.users.profile) {
            this.setState({
                name: {
                    data:nextProps.users.profile.name,
                    error: ''
                },
                mobile: {
                    data: nextProps.users.profile.mobile,
                    error: ''
                }
            });
        }
    }

    _onInputChangeValue(key, event) {
        let value  = event.target.value;
        this.setState({
            [key]: {
                data: value,
                error: ''
            } 
        });
    }

    getClassForm(key) {
        let dataForm = this.state[key];
        if (dataForm.error) {
            return 'form-group has-error'
        } else {
            return 'form-group';
        }
    }

    showErrorColumn(text, key) {
        this.setState({
            [key] : {
                ...this.state[key],
                error: text
            }
        });
    }

    updateUserInfo() {
        let self = this;
        const {t, dispatch} = this.props;
        let {name, mobile} = this.state;
        if (!name.data) {
            this.showErrorColumn("Vui lòng nhập họ tên", 'name');
            return;
        }

        if (mobile.data && !validateMobile(mobile.data)) {
            this.showErrorColumn("Vui lòng nhập số điện thoại", 'mobile');
            return;
        }

        this.setState({
            loadingInfo: true
        });

        updateInfo({
            name: name.data,
            mobile: mobile.data
        }).then(result => {
                self.setState({
                    loadingInfo: false
                });
                if (result.signal) {
                    showSuccessMessage("Cập nhật thông tin thành công");
                    dispatch(updateUser(result.data));
                } else {
                    showErrorMessage(result.message);
                }
                
            })
            .catch(err => {
                self.setState({
                    loadingInfo: false
                });
                showErrorMessage(err.message);
            });
    }

    render() {
        let {name, email, mobile} = this.state;
        let {users} = this.props;
        let {profile} = users;
        return (
            <div className="tab-pane fade in active" id="right-icon-tab1">
                <div className="form-group">
                    <p className="fontBold">Email</p>
                    <div className="input-group">
                    <span className="input-group-addon"><span className="icon-envelop3"></span></span>
                    <input
                        type='text'
                        className="form-control"
                        placeholder=""
                        value = {email}
                        readOnly={true}
                        />
                    </div>
                </div>
                <div className={this.getClassForm('name')}>
                    <p className="fontBold">Họ tên</p>
                    <div className="input-group">
                    <span className="input-group-addon"><span className="icon-user"></span></span>
                    <input
                        type='text'
                        className="form-control"
                        placeholder="Nhập họ tên"
                        value = {name.data}
                        onChange = {this._onInputChangeValue.bind(this, 'name')}
                        />
                        
                    </div>
                    {name.error ? (
                        <span className="help-block">{name.error}</span>
                        ) : ''}
                </div>
                <div className={this.getClassForm('mobile')}>
                    <p className="fontBold">Số điện thoại</p>
                    <div className="input-group">
                    <span className="input-group-addon"><span className="icon-phone"></span></span>
                    <input
                        type='text'
                        className="form-control"
                        placeholder="Nhập số điện thoại"
                        value = {mobile.data}
                        onChange = {this._onInputChangeValue.bind(this, 'mobile')}
                        />
                    </div>
                    {mobile.error ? (
                        <span className="help-block">{mobile.error}</span>
                    ) : ''}
                </div>
                <div className="form-group">
                    <ButtonLoader text="Cập nhật" clickFunc={this.updateUserInfo.bind(this)} loading={this.state.loadingInfo}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {users} = state;
    return {
        users
    };
}

export default connect(mapStateToProps)(ChangeInfo);