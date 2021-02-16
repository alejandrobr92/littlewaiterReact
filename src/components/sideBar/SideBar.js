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
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Órdenes" onClick={(e) => setComponent('Ordenes')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Menu" onClick={(e) => setComponent('Menu')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Categorías" onClick={(e) => setComponent('Categorias')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Promociones" onClick={(e) => setComponent('Promociones')} />
      </ListItem>
      <ListItem button>
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
