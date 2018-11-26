import React, {Component, PropTypes} from 'react';
import Select from '../../../common/Select/Select'
import {makeRequest} from '../../../libs/request'

class BaseSelectProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProduct: [],
            product: ''
        }
    }

    componentWillMount() {
        makeRequest('get', '/product/getProduct')
            .then(result => {
                if(result.signal){
                    let allProduct = result.data
                    this.setState({
                        allProduct
                    })
                }
            })
    }

    handleChangeProduct = (e) => {
        let product = e.target.value
        this.setState({
            product
        })

        this.props.handleChange(this.props.name, product)
    }

    render() {
        let {product, allProduct} = this.state
        let contentOpts = allProduct.map((item, idx) => {
            return <option value={item.id} key={'opts-'+idx}>{item.name}</option>
        });
        return (
            <select name="select" className="form-control" value={product} onChange={this.handleChangeProduct}>
                <option value="">Chọn sản phẩm</option>
                {contentOpts}
            </select>
        )
    }
}

export default BaseSelectProduct;