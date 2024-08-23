import * as polarisIcons from '@shopify/polaris-icons';
import { Icon } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import iconMetadata from '@shopify/polaris-icons/metadata';

const fuse = new Fuse(Object.values(iconMetadata), {
  threshold: 0.25,
  keys: [
    {name: 'name', weight: 3},
    {name: 'id', weight: 2},
    {name: 'keywords', weight: 2},
    {name: 'set', weight: 1},
    {name: 'fileName', weight: 1},
    {name: 'description', weight: 1},
  ],
});

const getIcons = (currentSearchText, set) => {
  const icons = currentSearchText
    ? fuse.search(currentSearchText).map((result) => result.item)
    : Object.values(iconMetadata);

  return icons.filter((x) => x.set === set);
};

function IconGridItem({
  icon,
}) {
  const { id } = icon;
  console.log({icon})

  return (
    <li key={id} className='icon'>
      <Icon source={(polarisIcons as any)[id]}/>
      <p>{id}</p>
    </li>
  );
}

function IconGrid() {
  const [minorIcons, setMinorIcons] = useState([]);
  const [majorIcons, setMajorIcons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMajorIcons(getIcons(searchTerm, 'major') as any);
    setMinorIcons(getIcons(searchTerm, 'minor') as any) ;
  }, [searchTerm]);

  return (
    <div className='icon-grid'>
      <div className='search-icon'>
        <label className='search-label' htmlFor="icon-name">Search Icon</label>
        <input
          id="icon-name"
          onChange={e => setSearchTerm(e.target.value)}
        ></input>
      </div>
      <h2> Major Icon</h2>
      <ul className='icon-grid-item major-icons'>
        {majorIcons.map((icon: any) => (
          <IconGridItem
            key={icon.id}
            icon={icon}
          />
        ))}
      </ul>
      <h2> Minor Icon</h2>
      <ul className='icon-grid-item minor-icons'>
        {minorIcons.map((icon: any) => (
          <IconGridItem
            key={icon.id}
            icon={icon}
          />
        ))}
      </ul>
    </div>
  );
}

export default IconGrid;
