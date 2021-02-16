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
function SideBar(props) {
  const { setComponent } = props;

  return (
    <div>
      <ListItem button onClick={(e) => setComponent('Menu')}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Órdenes" onClick={(e) => setComponent('Ordenes')} />
      </ListItem>
      <ListItem button onClick={(e) => setComponent('Ordenes')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Menu" onClick={(e) => setComponent('Menu')} />
      </ListItem>
      <ListItem button onClick={(e) => setComponent('Categorias')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Categorías" onClick={(e) => setComponent('Categorias')} />
      </ListItem>
      <ListItem button onClick={(e) => setComponent('Promociones')}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Promociones" />
      </ListItem>
      <ListItem button onClick={(e) => setComponent('Estadisticas')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Estadísticas" onClick={(e) => setComponent('Estadisticas')} />
      </ListItem>
    </div>
  );
}

SideBar.propTypes = {
  setComponent: PropTypes.func,
};
export default SideBar;
