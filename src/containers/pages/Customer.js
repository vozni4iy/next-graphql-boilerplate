import React, { Component } from 'react'
import { ListWrapper } from 'src/components/styled'
import { CustomerInfo } from 'src/components/main'
import { Router } from 'routes'
import { loadCustomer } from 'src/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { graphql, compose } from 'react-apollo';
import { customerQuery } from 'src/lib/graphql/queries'
import { updateCustomerMutation } from 'src/lib/graphql/mutations'
import { validate } from 'src/validation/NameValidation'
import PropTypes from 'prop-types';

class Customer extends Component {
  static propTypes = {
    loadCustomer: PropTypes.func.isRequired,
    updateCustomerMutation: PropTypes.func,
    handleSubmit: PropTypes.func,
    customer: PropTypes.object,
    customerQuery: PropTypes.object,
    initialValues: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      editMode: false
    }
  }

  componentDidMount() {
    let { customerQuery } = this.props
    let customer = customerQuery.customer;
    if ((customerQuery.networkStatus === 7) && customer) {
      this.props.loadCustomer(customer)
    }
  }

  componentWillReceiveProps(nextProps) {
    let customer = nextProps.customerQuery.customer
    if (customer && (customer !== this.props.customerQuery.customer)) {
      nextProps.loadCustomer(customer);
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

  handleFormSubmit = customer => {
    this.props.loadCustomer(customer)
    this.props.updateCustomerMutation({
        variables: {
          _id: customer._id,
          fullname: customer.fullname,
          email: customer.email,
          picture: customer.picture,
          address: customer.address
        }
      })
      .then( res => {
        console.log('update customer succeed: ', res);
        this.onCancel()
      })
      .catch(e => {
        console.log('update customer failed: ', e.message);
        this.onCancel()
      })
  }

  render () {
    const { handleSubmit, customer } = this.props
    const { editMode } = this.state
    return (
      <ListWrapper>
        {customer && <CustomerInfo
          customer={customer}
          editMode={editMode}
          onEdit={this.onEdit}
          onCancel={this.onCancel}
          onSubmit={handleSubmit(this.handleFormSubmit)}/>}
      </ListWrapper>
    )
  }
}

export default compose(
  graphql(customerQuery, {
    name: 'customerQuery',
    options: (props) => ({
      variables: {
        _id: props.url.query.id
      },
      pollInterval: 0,
      fetchPolicy: 'cache-and-network'
    })
  }),
  graphql(updateCustomerMutation, {
    name: 'updateCustomerMutation',
    options: { pollInterval: 0  }
  }),
  connect ((state, props) => {
      return {
        customer: state.customer.data,
        initialValues: state.customer.data,
        enableReinitialize: true,
        store: props.store
      }
    },
    dispatch => bindActionCreators({
      loadCustomer
    }, dispatch)))(reduxForm({
      form: 'updatecustomerform',
      validate
    })(Customer))
