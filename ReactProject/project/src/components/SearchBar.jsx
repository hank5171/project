// src/components/SearchBar.jsx
import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "請輸入關鍵字搜尋...",
  loading = false,
  disabled = false
}) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20
  }}>
    <Input
      icon="search"
      size="large"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      loading={loading}
      disabled={disabled}
      style={{ flex: 1, minWidth: 200 }}
      onKeyDown={e => {
        if (e.key === 'Enter') onSearch();
      }}
    />
    <Button
      primary
      size="large"
      icon="search"
      content="搜尋"
      onClick={onSearch}
      disabled={disabled}
      style={{ borderRadius: 8, fontWeight: 600, letterSpacing: 1 }}
    />
  </div>
);

export default SearchBar;
