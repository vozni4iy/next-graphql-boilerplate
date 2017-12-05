import React, { Component } from 'react'
import { ListWrapper } from 'src/components/styled'
import { VendorInfo } from 'src/components/main'
import { Router } from 'routes'
import { loadVendor } from 'src/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { graphql, compose } from 'react-apollo';
import { vendorQuery } from 'src/lib/graphql/queries'
import { updateVendorMutation } from 'src/lib/graphql/mutations'
import { validate } from 'src/validation/NameValidation'
import PropTypes from 'prop-types';

class Vendor extends Component {
  static propTypes = {
    loadVendor: PropTypes.func.isRequired,
    updateVendorMutation: PropTypes.func,
    handleSubmit: PropTypes.func,
    vendor: PropTypes.object,
    vendorQuery: PropTypes.object,
    initialValues: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      editMode: false
    }
  }

  componentDidMount() {
    let { vendorQuery } = this.props
    let vendor = vendorQuery.vendor;
    if ((vendorQuery.networkStatus === 7) && vendor) {
      this.props.loadVendor(vendor)
    }
  }

  componentWillReceiveProps(nextProps) {
    let vendor = nextProps.vendorQuery.vendor
    if (vendor && (vendor !== this.props.vendorQuery.vendor)) {
      nextProps.loadVendor(vendor);
    }
  }

  onEdit = () => {
    this.setState ({
      editMode: true
    })
  }

  onCancel = () => {
    this.setState ({
      editMode: false
    })
  }

  handleFormSubmit = vendor => {
    this.props.loadVendor(vendor)
    this.props.updateVendorMutation({
        variables: {
          _id: vendor._id,
          fullname: vendor.fullname,
          email: vendor.email,
          picture: vendor.picture,
          address: vendor.address
        }
      })
      .then( res => {
        console.log('update vendor succeed: ', res);
        this.onCancel()
      })
      .catch(e => {
        console.log('update vendor failed: ', e.message);
        this.onCancel()
      })
  }

  render () {
    const { handleSubmit, vendor } = this.props
    const { editMode } = this.state
    return (
      <ListWrapper>
        {vendor && <VendorInfo
          vendor={vendor}
          editMode={editMode}
          onEdit={this.onEdit}
          onCancel={this.onCancel}
          onSubmit={handleSubmit(this.handleFormSubmit)}/>}
      </ListWrapper>
    )
  }
}

export default compose(
  graphql(vendorQuery, {
    name: 'vendorQuery',
    options: (props) => ({
      variables: {
        _id: props.url.query.id
      },
      pollInterval: 0,
      fetchPolicy: 'cache-and-network'
    })
  }),
  graphql(updateVendorMutation, {
    name: 'updateVendorMutation',
    options: { pollInterval: 0  }
  }),
  connect ((state, props) => {
      return {
        vendor: state.vendor.data,
        initialValues: state.vendor.data,
        enableReinitialize: true,
        store: props.store
      }
    },
    dispatch => bindActionCreators({
      loadVendor
    }, dispatch)))(reduxForm({
      form: 'updatevendorform',
      validate
    })(Vendor))
