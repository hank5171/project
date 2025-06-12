import React from 'react';
import { Modal, Button, Form, Dropdown } from 'semantic-ui-react';

const BatchOnShelfModal = ({
  open,
  onClose,
  menuOptions,
  selectedMenuIds,
  setSelectedMenuIds,
  onSubmit,
  loading
}) => {
    // 依 shopId 去重複
    const uniqueShopOptions = Array.from(
      new Map(menuOptions.map(item => [item.shopId, item])).values()
    );

  return (
    <Modal open={open} onClose={onClose} size="small" closeIcon>
      <Modal.Header>選擇要上架的餐廳</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>請選擇店家（可複選）</label>
            <Dropdown
              placeholder="請選擇店家"
              fluid
              multiple
              selection
              options={uniqueShopOptions.map(item => ({
                key: item.shopId,
                value: item.shopId,
                text: item.shopName
              }))}
              value={selectedMenuIds}
              onChange={(e, { value }) => setSelectedMenuIds(value)}
            />
          </Form.Field>
          <Button
            color="green"
            onClick={onSubmit}
            loading={loading}
            disabled={selectedMenuIds.length === 0}
          >
            送出上架
          </Button>
          <Button type="button" color="grey" onClick={onClose} style={{ marginLeft: 10 }}>
            取消
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default BatchOnShelfModal;
