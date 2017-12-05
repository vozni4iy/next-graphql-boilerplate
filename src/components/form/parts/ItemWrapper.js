import React from 'react';
import PropTypes from 'prop-types';
import { ItemBox } from 'src/components/styled';

const ItemWrapper = ({ label, value }) => (
  <ItemBox>
    <label>{label}</label>
    <span>{value}</span>
  </ItemBox>
);

ItemWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default ItemWrapper;
