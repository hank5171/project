import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { fetchShop, addShop, updateShop } from "../services/shopManagement";
import ShopTable from "../components/ShopTable.jsx";
import Modal from "../components/Modal";
import "../css/shop-management.css"; // 統一樣式

const emptyForm = { shopName: "", tel: "", shopAddress: "" };

const ShopManagement = () => {
  const [shops, setShops] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const data = await fetchShop();
      setShops(data);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateShop(form);
        alert("修改成功");
      } else {
        await addShop(form);
        alert("新增成功");
      }
      setForm(emptyForm);
      setEditing(false);
      setModalOpen(false);
      loadShops();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleEdit = (shop) => {
    setForm(shop);
    setEditing(true);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setEditing(false);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditing(false);
    setModalOpen(false);
  };

  return (
    <div className="menu-container">
      <div className="menu-header">餐廳管理</div>
      <div className="menu-area">
        <div className="menu-header-row">
          <Button
            className="menu-add-btn"
            color="blue"
            icon="plus"
            content="新增餐廳"
            onClick={handleAdd}
          />
        </div>
        <div className="menu-table-wrapper">
          <ShopTable shops={shops} onEdit={handleEdit} />
        </div>
      </div>
      <Modal open={modalOpen} onClose={handleCancel}>
        <form className="shop-form" onSubmit={handleSubmit}>
          <div className="shop-form-title">
            {editing ? "修改餐廳" : "新增餐廳"}
          </div>
          <div className="form-group">
            <label>餐廳名稱</label>
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              required
              maxLength={40}
              placeholder="請輸入店家名稱"
            />
          </div>
          <div className="form-group">
            <label>電話</label>
            <input
              name="tel"
              value={form.tel}
              onChange={handleChange}
              required
              maxLength={20}
              placeholder="請輸入電話"
            />
          </div>
          <div className="form-group">
            <label>地址</label>
            <input
              name="shopAddress"
              value={form.shopAddress}
              onChange={handleChange}
              required
              maxLength={80}
              placeholder="請輸入地址"
            />
          </div>
          <div className="shop-form-btns">
            <button type="submit">{editing ? "儲存修改" : "新增"}</button>
            <button type="button" onClick={handleCancel}>
              取消
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ShopManagement;
