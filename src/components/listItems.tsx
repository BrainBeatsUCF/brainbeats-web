import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SearchIcon from '@material-ui/icons/Search';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LibraryMusicIcon />
      </ListItemIcon>
      <ListItemText primary="Your Library" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NewReleasesIcon />
      </ListItemIcon>
      <ListItemText primary="Discover" />
    </ListItem>
  </div>
);
