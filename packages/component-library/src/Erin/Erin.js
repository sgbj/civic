import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const Erin = ({listItems= ['one', 'two', 'three']}) => {
    return (
        <ul>
            {listItems.map(item => {
                return <li>{item}</li>
            })}
        </ul>
    )
}
 
export default Erin;