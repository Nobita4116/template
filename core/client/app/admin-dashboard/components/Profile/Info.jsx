import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {validateMobile} from '../../../libs/utils';
import {updateInfo, updateUser} from '../../actions/users';
import {showErrorMessage, showSuccessMessage} from '../../actions/notification';
import ButtonLoader from '../../../common/Button/ButtonLoader';
import InputForm from '../Common/InputForm'
import Radio from '../Common/Radio'
import DateInput from '../Common/DateInput'
import SelectProvince from '../Common/SelectProvince'
import {showErrorMessage, showSuccessMessage} from '../../actions/notification'
import {makeRequest} from '../../../libs/request'
import {Link} from 'react-router-dom'

class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingInfo: false,
            name: props.users.profile.name,
            email: props.users.profile.email,
            mobile: props.users.profile.mobile,
            code_parent: '',
            gender: 0,
            birthday: new Date(),
            time_encroll: new Date(),
            password: '',
            confirm_password: '',
            cmnd: '',
            image_cmnd: [],
            cmnd_date: '',
            address: '',
            error_code: '',
            agency_data: '',
            cmnd_address: '',
            success: false
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.users.profile !== this.props.users.profile) {
            this.setState({
                name: nextProps.users.profile.name,
                mobile: nextProps.users.profile.mobile
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
                <fieldset className="panel-body pb-10">
                    <h4 className="fontBold">Điền thông tin cá nhân</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label fontBold">Họ tên: <span className="text-danger">*</span></label>
                                <InputForm 
                                    placeholder=""
                                    name="name"
                                    required
                                    changeInput={this.changeInput}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label fontBold">Số điện thoại: <span className="text-danger">*</span></label>
                                <InputForm 
                                    placeholder=""
                                    name="mobile"
                                    required
                                    changeInput={this.changeInput}
                                />
                            </div>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label fontBold display-block">Giới tính: <span className="text-danger">*</span></label>
                                <Radio 
                                    value={0}
                                    title="Nữ"
                                    isCheck={gender == 0 ? true : false}
                                    name="gender"
                                    changeRadio={this.changeGender}
                                />
                                <Radio 
                                    value={1}
                                    title="Nam"
                                    isCheck={gender == 1 ? true : false}
                                    name="gender"
                                    changeRadio={this.changeGender}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label fontBold">Ngày sinh: <span className="text-danger">*</span></label>
                                <div className="form-group">
                                    <DateInput timeInput={''} name="birthday" changeDate={this.changeDate.bind(this)}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label fontBold">Địa chỉ liên hệ: <span className="text-danger">*</span></label>
                                <InputForm 
                                    placeholder=""
                                    name="address"
                                    required
                                    changeInput={this.changeInput}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label fontBold">Ngày gia nhập hệ thống: <span className="text-danger">*</span></label>
                                <div className="form-group">
                                    <DateInput timeInput={''} name="time_encroll" changeDate={this.changeDate.bind(this)}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label fontBold">Số cmnd: <span className="text-danger">*</span></label>
                                <InputForm 
                                    placeholder=""
                                    name="cmnd"
                                    required
                                    changeInput={this.changeInput}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label fontBold">Ngày cấp: <span className="text-danger">*</span></label>
                                <div className="form-group">
                                    <DateInput timeInput={''} name="cmnd_date" changeDate={this.changeDate.bind(this)}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label fontBold">Nơi cấp : <span className="text-danger">*</span></label>
                                <SelectProvince 
                                    changeProvince={this.changeProvince}
                                />
                            </div>
                        </div>
                        
                    </div>
                    
                </fieldset>
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