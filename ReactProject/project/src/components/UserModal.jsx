// src/components/UserModal.jsx
import { Modal, Form, Input, Dropdown, Button } from 'semantic-ui-react';

const statusOptions = [
  { key: true, text: '啟用', value: true },
  { key: false, text: '停用', value: false }
];

const UserModal = ({
  open,
  updateOpen,
  onClose,
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  userRole,
  setUserRole,
  roleOptions,
  status,
  setStatus,
  editingUserId
}) => (
  <Modal open={open} onClose={onClose} size="small" closeIcon>
    <Modal.Header>{updateOpen ? '修改使用者' : '新增使用者'}</Modal.Header>
    <Modal.Content>
      <Form onSubmit={onSubmit}>
        {updateOpen && (
          <>
            <Form.Field>
              <label>使用者ID</label>
              <Input type="text" value={editingUserId} disabled readOnly />
            </Form.Field>
            <Form.Field>
              <label>使用者名稱</label>
              <Input type="text" value={username} disabled readOnly />
            </Form.Field>
          </>
        )}
        {!updateOpen && (
          <Form.Field>
            <label>使用者名稱</label>
            <Input
              type="text"
              maxLength={10}
              placeholder="請輸入使用者名稱"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Field>
        )}
        <Form.Field>
          <label>{updateOpen ? '修改密碼' : '密碼'}</label>
          <Input
            type="password"
            maxLength={10}
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>{updateOpen ? '修改角色' : '角色'}</label>
          <Dropdown
            selection
            placeholder="請選擇角色"
            options={roleOptions}
            value={userRole}
            onChange={(e, { value }) => setUserRole(value)}
          />
        </Form.Field>
        <Form.Field>
          <label>狀態</label>
          <Dropdown
            selection
            options={statusOptions}
            value={status}
            onChange={(e, { value }) => setStatus(value)}
          />
        </Form.Field>
        <Button type="submit" color="blue">{updateOpen ? '修改使用者' : '新增'}</Button>
        <Button type="button" color="red" onClick={onClose}>取消</Button>
      </Form>
    </Modal.Content>
  </Modal>
);

export default UserModal;
