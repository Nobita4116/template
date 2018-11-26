import React, { Component } from 'react';

class SelectProvince extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: ""
        }
    }

    changeSelect = (e) => {
        let value = e.target.value
        this.setState({
            address: value
        })

        this.props.changeProvince(value)
    }

    componentDidMount() {
        $('.bootstrap-select').selectpicker();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.address != this.state.address) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <select className="bootstrap-select" value={this.state.address} onChange={this.changeSelect} data-live-search="true" data-width="100%">
                <option value="">Chọn tỉnh thành</option>
                <option value="An Giang">An Giang</option>
                <option value="Bà Rịa Vũng Tàu">Bà Rịa Vũng Tàu</option>
                <option value="Bình Dương">Bình Dương</option>
                <option value="Bình Phước">Bình Phước</option>
                <option value="Bình Thuận">Bình Thuận</option>
                <option value="Bình Định">Bình Định</option>
                <option value="Bạc Liêu">Bạc Liêu</option>
                <option value="Bắc Cạn">Bắc Cạn</option>
                <option value="Bắc Giang">Bắc Giang</option>
                <option value="Bắc Ninh">Bắc Ninh</option>
                <option value="Bến Tre">Bến Tre</option>
                <option value="Cao Bằng">Cao Bằng</option>
                <option value="Cà Mau">Cà Mau</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Đăk Lăk">Đăk Lăk</option>
                <option value="Điện Biên">Điện Biên</option>
                <option value="Đồng Nai">Đồng Nai</option>
                <option value="Đồng Tháp">Đồng Tháp</option>
                <option value="Gia Lai">Gia Lai</option>
                <option value="Hà Giang">Hà Giang</option>
                <option value="Hà Nam">Hà Nam</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hà Tĩnh">Hà Tĩnh</option>
                <option value="Hòa Bình">Hòa Bình</option>
                <option value="Hưng Yên">Hưng Yên</option>
                <option value="Hải Dương">Hải Dương</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Khánh Hòa">Khánh Hòa</option>
                <option value="Kiên Giang">Kiên Giang</option>
                <option value="Kon Tum">Kon Tum</option>
                <option value="Lai Châu">Lai Châu</option>
                <option value="Long An">Long An</option>
                <option value="Lào Cai">Lào Cai</option>
                <option value="Lâm Đồng">Lâm Đồng</option>
                <option value="Lạng Sơn">Lạng Sơn</option>
                <option value="Nam Định">Nam Định</option>
                <option value="Nghệ An">Nghệ An</option>
                <option value="Ninh Bình">Ninh Bình</option>
                <option value="Ninh Thuận">Ninh Thuận</option>
                <option value="Phú Thọ">Phú Thọ</option>
                <option value="Phú Yên">Phú Yên</option>
                <option value="Quảng Bình">Quảng Bình</option>
                <option value="Quảng Nam">Quảng Nam</option>
                <option value="Quảng Ngãi">Quảng Ngãi</option>
                <option value="Quảng Ninh">Quảng NinhQuảng Ninh</option>
                <option value="Quảng Trị">Quảng Trị</option>
                <option value="Sóc Trăng">Sóc Trăng</option>
                <option value="Sơn La">Sơn La</option>
                <option value="Thanh Hóa">Thanh Hóa</option>
                <option value="Thái Bình">Thái Bình</option>
                <option value="Thái Nguyên">Thái Nguyên</option>
                <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                <option value="Tiền Giang">Tiền Giang</option>
                <option value="Trà Vinh">Trà Vinh</option>
                <option value="Tuyên Quang">Tuyên Quang</option>
                <option value="Tây Ninh">Tây Ninh</option>
                <option value="Vĩnh Long">Vĩnh Long</option>
                <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                <option value="Yên Bái">Yên Bái</option>
                </select>
        );
    }
}

export default SelectProvince;