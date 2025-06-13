import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const statusOptions = [
  { key: 'all', value: 'all', text: '全部' },
  { key: 'on', value: 'on', text: '只顯示上架' },
  { key: 'off', value: 'off', text: '只顯示下架' },
];

const FilterDropdown = ({ value, onChange }) => (
  <Dropdown
    selection
    options={statusOptions}
    value={value}
    onChange={(e, { value }) => onChange(value)}
    style={{ minWidth: 140, marginRight: 16 }}
  />
);

export default FilterDropdown;
