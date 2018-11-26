import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import {makeRequest} from '../../../libs/request'

class SelectSearchAgency extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    promiseOptions = (value) => {
        return new Promise((resolve) => {
            if (!value) {
                return resolve([])
            } else {
                makeRequest('get', '/agency/searchAgencyByName', {q: value})
                    .then(result => {
                        resolve(result.data)
                    })
            }
        })
    }

    handleChange = (value) => {
        this.setState({
            value
        })

        let agency_id = value.value || ''
        this.props.selectAgency(agency_id)
    }

    render() {
        return (
            <AsyncSelect value={this.state.value} loadOptions={this.promiseOptions} onChange={this.handleChange} isMulti={false}/>
        );
    }
}

export default SelectSearchAgency;