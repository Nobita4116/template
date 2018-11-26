import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../Common/PageHeader'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import InputGroup from '../Common/InputGroup'
import SelectForm from '../Common/SelectForm'
import TextAreaForm from '../Common/TextAreaForm'

class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            category_id: 0,
            image,
            description: '',
            listCategory: []
        }
    }

    componentWillMount() {
        thiss.getListCategoryProduct()
    }

    getListCategoryProduct = () => {
        makeRequest('get', '/getListCategoryProduct', {})
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listCategory: result.data
                    })
                } else {
                    showErrorMessage(result.message)
                }
            }).catch(err => showErrorMessage(err))
    }

    uploadSuccess = (data) => {
        this.setState({
            image: data.url
        })
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let {image, name, price, category_id, description} = this.state
        if (!image) {
            return showErrorMessage('Vui lòng chọn ảnh sản phẩm')
        }
        if(!name) {
            return showErrorMessage('Vui lòng nhập trên sản phẩm')
        }
        if(!parseInt(price)){
            return showErrorMessage('Vui lòng nhập giá sản phẩm')
        }
        if(!category_id) {
            return showErrorMessage('Vui lòng lựa chọn kiể mặt hàng')
        }

        makeRequest('post', '/product/createProduct', {image, name, price, info})
            .then(result => {
                if(result.signal){
                    showSuccessMessage('Thêm sản phẩm mới thành công')
                    this.props.history.push('/product/list')
                } else {
                    showErrorMessage(result.message)
                }
            })
    }

    render() {
        let { image, category_id, listCategory } = this.state;
        return (
            <div>
                <PageHeader
                    title="Tạo sản phẩm"
                    breadcrumb={[
                        { title: 'Sản phẩm', link: '/product/list' },
                        { title: 'Tạo mới', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                            <fieldset className="panel-body pb-10">

                                <div className="form-group">
                                    <label className="control-label">Tên sản phẩm: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="name"
                                        placeholder=""
                                        icon="icon-user"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label">Giá sản phẩm (VNĐ): <span className="text-danger">*</span></label>
                                    <InputGroup
                                        name="price"
                                        type="number"
                                        placeholder=""
                                        icon="icon-cash"
                                        changeInput={this.handleInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Loại sản phẩm: <span className="text-danger">*</span></label>
                                    <SelectForm
                                        name="category_id"
                                        value={category_id}
                                        dataOpts={listCategory}
                                        icon="icon-cash"
                                        handleChange={this.handleInput}
                                    />
                                </div>

                                <ButtonUpload title="Upload ảnh sản phẩm" uploadSuccess={this.uploadSuccess} />
                                {image && (
                                    <div className="form-group">
                                        <div className="row"><img src={image} width="96" alt="" /></div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Thông tin thêm về sản phẩm:</label>
                                    <TextAreaForm 
                                        name='description'
                                        value={this.state.description}
                                        handleInput={this.handleInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-envelop2 position-left"></i>
                                        Tạo sản phẩm
                                    </button>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps,
)(NewProduct);