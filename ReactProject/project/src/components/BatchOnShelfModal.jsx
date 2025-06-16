import React, { useState } from "react";
import { Modal, Button, Form, Dropdown } from "semantic-ui-react";

const statusOptions = [
  { key: "all", value: "all", text: "全部" },
  { key: "on", value: "on", text: "只顯示上架" },
  { key: "off", value: "off", text: "只顯示下架" },
];

const BatchOnShelfModal = ({
  open,
  onClose,
  menuOptions,
  selectedMenuIds,
  setSelectedMenuIds,
  onSubmit,
  loading,
}) => {
  // 狀態篩選 state
  const [statusFilter, setStatusFilter] = useState("all");

  // 依 shopId 去重複
  const uniqueShopOptions = Array.from(
    new Map(menuOptions.map((item) => [item.shopId, item])).values()
  );

  // 根據篩選條件過濾
  const filteredShopOptions = uniqueShopOptions.filter((item) => {
    if (statusFilter === "all") return true;
    // 統一轉成字串來比對
    const statusStr =
      item.status === true || item.status === "上架" ? "on" : "off";
    return statusFilter === statusStr;
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="large"
      closeIcon
      className="custom-modal"
    >
      <Modal.Header>選擇要上架的餐廳</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label style={{ fontWeight: 600, marginBottom: 20 }}>
              狀態篩選
            </label>
            <Dropdown
              options={statusOptions}
              value={statusFilter}
              onChange={(e, { value }) => setStatusFilter(value)}
              selection
              style={{ marginBottom: 20 }}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontWeight: 600, marginBottom: 20 }}>
              請選擇店家（可複選）
            </label>
            <Dropdown
              placeholder="請選擇店家"
              fluid
              multiple
              selection
              search
              options={filteredShopOptions.map((item) => ({
                key: item.shopId,
                value: item.shopId,
                text: item.shopName,
              }))}
              value={selectedMenuIds}
              onChange={(e, { value }) => setSelectedMenuIds(value)}
            />
          </Form.Field>
          <div
            style={{ display: "flex", justifyContent: "right", marginTop: 150 }}
          >
            <Button
              color="blue"
              onClick={onSubmit}
              loading={loading}
              disabled={selectedMenuIds.length === 0}
            >
              送出上架
            </Button>
            <Button type="button" color="red" onClick={onClose}>
              取消
            </Button>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
export default BatchOnShelfModal;
