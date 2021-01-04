import React from 'react';
import { BarLoader as Loader } from 'react-spinners';
import * as PropTypes from 'prop-types';
const Barloader = (props) => {
  const { width, heigth, color, loading } = props;

  return (
    <div className="Loader">
      <Loader width={width} height={heigth} color={color} loading={loading} />
    </div>
  );
};

Barloader.propTypes = {
  width: PropTypes.string,
  heigth: PropTypes.string,
  color: PropTypes.string,
  loading: PropTypes.func,
};

export default Barloader;
