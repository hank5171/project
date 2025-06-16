// components/MenuFormModal.jsx
import {
  Modal,
  Form,
  Input,
  Dropdown,
  TextArea,
  Button,
  Message,
} from "semantic-ui-react";

const MenuFormModal = ({
  open,
  onClose,
  onSubmit,
  updateOpen,
  menuId,
  shopId,
  setshopId,
  shopName,
  setshopName,
  shopOptions,
  menuName,
  setMenuName,
  price,
  setPrice,
  status,
  setStatus,
  description,
  setDescription,
  errorMsg,
  successMsg,
}) => (
  <Modal open={open} onClose={onClose} size="small" closeIcon>
    <Modal.Header
      style={{ fontWeight: "bold", fontSize: "1.3em", letterSpacing: "2px" }}
    >
      {updateOpen ? "編輯菜單" : "新增菜單"}
    </Modal.Header>
    <Modal.Content>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{ padding: "1em 1.5em" }}
      >
        <Form.Group widths={2}>
          <Form.Field>
            <label>ID</label>
            <Input
              readOnly
              disabled
              value={shopId}
              placeholder="ID"
              style={{ background: "#f5f5f5" }}
            />
          </Form.Field>
          <Form.Field required>
            <label>餐廳名稱</label>
            <Dropdown
              placeholder="請選擇餐廳名稱"
              search
              fluid
              selection
              options={shopOptions}
              value={shopId}
              onChange={(e, { value }) => {
                setshopId(value);
                // 根據 value 找到對應的 shopName
                const selected = shopOptions.find(
                  (option) => option.value === value
                );
                setshopName(selected ? selected.text : "");
              }}
              style={{ minWidth: 0 }}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Field required>
            <label>餐點名稱</label>
            <Input
              placeholder="請輸入餐點名稱"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />
          </Form.Field>
          <Form.Field required>
            <label>價格</label>
            <Input
              type="number"
              min="0"
              placeholder="請輸入價格"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Field>
            <label>上架狀態</label>
            <Dropdown
              fluid
              selection
              options={[
                { key: true, value: true, text: "上架" },
                { key: false, value: false, text: "下架" },
              ]}
              value={status}
              onChange={(e, { value }) => setStatus(value)}
              style={{ minWidth: 0 }}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>描述</label>
          <TextArea
            placeholder="可輸入餐點描述"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ minHeight: 80 }}
          />
        </Form.Field>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1em",
            marginTop: "1.5em",
          }}
        >
          <Button type="submit" color="blue" size="large">
            {updateOpen ? "更新菜單" : "新增菜單"}
          </Button>
          <Button type="button" onClick={onClose} color="red" size="large">
            取消
          </Button>
        </div>
        {errorMsg && (
          <Message negative style={{ marginTop: "1em" }}>
            {errorMsg}
          </Message>
        )}
        {successMsg && (
          <Message positive style={{ marginTop: "1em" }}>
            {successMsg}
          </Message>
        )}
      </Form>
    </Modal.Content>
  </Modal>
);

export default MenuFormModal;
