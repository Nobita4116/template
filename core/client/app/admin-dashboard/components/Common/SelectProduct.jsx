import React, {Component, PropTypes} from 'react';
import Select from '../../../common/Select/Select'
import {makeRequest} from '../../../libs/request'

class SelectProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProduct: [],
            product: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.productEdit && nextProps.productEdit != this.props.productEdit) {
            let {allProduct} = this.state
            let product = allProduct.find(it => {
                return it.id == nextProps.productEdit
            })
            this.setState({
                product
            })
        }
    }

    componentWillMount() {
        makeRequest('get', '/product/getProduct')
            .then(result => {
                if(result.signal){
                    let allProduct = result.data
                    let product = allProduct.length ? allProduct[0] : ''
                    this.setState({
                        allProduct,
                        product
                    })

                    if(product) {
                        this.props.handleChange(product)
                    }
                }
            })
    }

    handleChangeProduct = (e) => {
        let {allProduct} = this.state
        let product = allProduct.find(it => {
            return it.id == e.target.value
        })
        this.setState({
            product
        })

        this.props.handleChange(product)
    }

    render() {
        let {notGroup} = this.props
        let {product, allProduct, title} = this.state
        title = title || "Chọn sản phẩm"
        let contentOpts = allProduct.map((item, idx) => {
            return <option value={item.id} key={'opts-'+idx}>{item.name}</option>
        });
        return (
            <div className="form-group">
                <label className="control-label fontBold">{title}</label>
                {notGroup ? (
                    <select name="select" className="form-control" value={product ? product.id : ''} onChange={this.handleChangeProduct}>
                        {contentOpts}
                    </select>
                ) : (
                    <div className="input-group">
                        <div className="input-group-addon">
                            <i className="icon-delicious"></i>
                        </div>
                        <select name="select" className="form-control" value={product ? product.id : ''} onChange={this.handleChangeProduct}>
                            {contentOpts}
                        </select>
                    </div>
                )}
                
            </div>
        )
    }
}

export default SelectProduct;