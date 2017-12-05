import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { Field } from 'redux-form'
import { Router } from 'routes';
import { FormInput, ItemWrapper } from 'src/components/form/parts'
import { List, HorizontalView, ButtonsBox, ImageContainer } from 'src/components/styled';

const VendorInfo = ({ vendor, editMode, onEdit, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit}>
      <HorizontalView width='90%' height='170px' maxWidth="850px" noborder>
        <ImageContainer size='130px'>
          <img src={vendor.picture} />
        </ImageContainer>
        {editMode
          ? (<List width='300px'>
              <List width='300px'>
                <Field label="fullname: " component={FormInput} name="fullname" type="text" />
                <Field label="email: " component={FormInput} name="email" type="text" />
                <Field label="address: " component={FormInput} name="address" type="text" />
              </List>
              <ButtonsBox top='0em' inherit width="300px" height="25px">
                <button type="submit">Submit</button>
                <button onClick={onCancel}>Cancel</button>
              </ButtonsBox>
            </List>)
          : (<List width="300px">
              <ItemWrapper label="Name: " value={vendor.fullname} />
              <ItemWrapper label="Email: " value={vendor.email} />
              <ItemWrapper label="Address: " value={vendor.address || ''} />
              <FlatButton label="Edit" onClick={onEdit} style={{marginRight: 12}}/>
            </List>)}
      </HorizontalView>
    </form>
  );
};

VendorInfo.propTypes = {
  editMode: PropTypes.bool,
  vendor: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default VendorInfo;
