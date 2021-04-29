import React from 'react';
import * as PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

function SideBar(props) {
  const { toolTip, setComponent } = props;

  return (
    <div>
      <Tooltip
        TransitionComponent={Zoom}
        title={toolTip ? 'Órdenes' : ''}
        placement="right"
        TransitionProps={{ timeout: 2000 }}
      >
        <ListItem button onClick={(e) => setComponent('Ordenes')}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Órdenes" />
        </ListItem>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title={toolTip ? 'Menú' : ''}
        placement="right"
        TransitionProps={{ timeout: 2000 }}
      >
        <ListItem button onClick={(e) => setComponent('Menu')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Menú" />
        </ListItem>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title={toolTip ? 'Categorías' : ''}
        placement="right"
        TransitionProps={{ timeout: 2000 }}
      >
        <ListItem button onClick={(e) => setComponent('Categorias')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Categorías" />
        </ListItem>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title={toolTip ? 'Promociones' : ''}
        placement="right"
        TransitionProps={{ timeout: 2000 }}
      >
        <ListItem button onClick={(e) => setComponent('Promociones')}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Promociones" />
        </ListItem>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title={toolTip ? 'Estadísticas' : ''}
        placement="right"
        TransitionProps={{ timeout: 2000 }}
      >
        <ListItem button onClick={(e) => setComponent('Estadisticas')}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Estadísticas" />
        </ListItem>
      </Tooltip>
    </div>
  );
}

SideBar.propTypes = {
  setComponent: PropTypes.func,
  toolTip: PropTypes.bool,
};
export default SideBar;
