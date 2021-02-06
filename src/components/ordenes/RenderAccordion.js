import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import * as PropTypes from 'prop-types';
import AccordionDetail from '@material-ui/core/AccordionDetails';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const RenderAccordion = ({ summary, details }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>{summary}</AccordionSummary>
    <AccordionDetail>
      <div>
        {details.map((data, i) => {
          //   return <ListItemText key={i}>{data[Object.keys(data)[0]]}</ListItemText>;
          return <ListItemText key={i}>{Object.keys(data)[0]}</ListItemText>;
        })}
        <IconButton color="primary" component="span">
          <EditIcon />
        </IconButton>
      </div>
    </AccordionDetail>
  </Accordion>
);

RenderAccordion.propTypes = {
  summary: PropTypes.string,
  details: PropTypes.array,
};

export default RenderAccordion;
