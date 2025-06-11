import React, { useEffect, useState } from 'react';
import MenuTable from '../components/MenuTable';
import MenuFormModal from '../components/MenuFormModal';
import {
  fetchMenuList,
  fetchShopList,
  addOrUpdateMenu,
  toggleMenuStatus
} from '../services/menuManagementService.js';
import '../css/Menu.css';
import { checkLoginStatus } from '../services/authService.js';
import { Button, Message, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import FilterableMenuTable from '../components/FilterableMenuTable';


const MenuManagement = () => {
  const [menuList, setMenuList] = useState([]);
  const [shopOptions, setShopOptions] = useState([]);
  const [shopName, setshopName] = useState('');
  const [menuName, setMenuName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [updateOpen, setUpdateOpen] = useState(false);
  const [menuId, setMenuId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // 先檢查登入狀態
    checkLoginStatus()
      .then(data => {
        if (!data.status) {
          setIsLoggedIn(false);
          // 你也可以選擇自動導向登入頁
          // navigate('/login');
        } else {
          // 已登入才載入資料
          fetchMenuList().then(data => {
            const MenuList = data.map(item => ({
              key: item.menuId,
              value: item.menuId,
              text: `${item.menuName}`,
              description: item.description,
              price: item.price,
              status: item.status ? '上架' : '下架',
              shopName: item.shopName,
            }));
            setMenuList(MenuList);
          });
          fetchShopList().then(data => {
            const ShopOptions = data.map(item => ({
              key: item.shopId,
              value: item.shopName,
              text: item.shopName
            }));
            setShopOptions(ShopOptions);
          });
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [navigate]);

  // 以下 CRUD 函式同你原本
  const handleAddNew = () => {
    setMenuId('');
    setshopName('');
    setMenuName('');
    setPrice('');
    setStatus(true);
    setDescription('');
    setUpdateOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setMenuId(item.value);
    setshopName(item.shopName);
    setMenuName(item.text);
    setPrice(item.price);
    setStatus(item.status === '上架');
    setDescription(item.description || '');
    setUpdateOpen(true);
    setErrorMsg('');
    setSuccessMsg('');
    setModalOpen(true);
  };

  const handleEditCancel = () => {
    setMenuId('');
    setshopName('');
    setMenuName('');
    setPrice('');
    setStatus(true);
    setDescription('');
    setUpdateOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!shopName || !menuName || !price) {
      setErrorMsg('請填寫所有必填欄位');
      return;
    }
    const payload = {
      shopName,
      menuName,
      price: parseInt(price, 10),
      status,
      description
    };
    try {
      const res = await addOrUpdateMenu(payload, updateOpen, menuId);
      if (res.ok) {
        setSuccessMsg(updateOpen ? '更新菜單成功！' : '新增菜單成功！');
        fetchMenuList().then(data => {
          const MenuList = data.map(item => ({
            key: item.menuId,
            value: item.menuId,
            text: `${item.menuName}`,
            description: item.description,
            price: item.price,
            status: item.status ? '上架' : '下架',
            shopName: item.shopName,
          }));
          setMenuList(MenuList);
        });
        setTimeout(() => {
          handleEditCancel();
        }, 800);
      } else {
        const data = await res.json();
        setErrorMsg(data.message || (updateOpen ? '更新失敗' : '新增失敗'));
      }
    } catch (err) {
      setErrorMsg('系統錯誤，請稍後再試');
    }
  };

  const handleRemove = async (item) => {
    try {
      const res = await toggleMenuStatus(item.value);
      if (res.ok) {
        fetchMenuList().then(data => {
          const MenuList = data.map(item => ({
            key: item.menuId,
            value: item.menuId,
            text: `${item.menuName}`,
            description: item.description,
            price: item.price,
            status: item.status ? '上架' : '下架',
            shopName: item.shopName,
          }));
          setMenuList(MenuList);
        });
      } else {
        setErrorMsg('上下架失敗');
      }
    } catch {
      setErrorMsg('系統錯誤，請稍後再試');
    }
  };

  // 根據登入狀態顯示不同內容
  if (!isLoggedIn) {
    return (
      <div className="menu-container">
        <Segment>
          <Message warning>
            <Message.Header>尚未登入</Message.Header>
            <p>請先登入才能進行菜單管理。</p>
          </Message>
        </Segment>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <div className="menu-header">菜單管理</div>
      <div className="menu-table-area">
        <MenuTable menuList={menuList} onEdit={handleEdit} onRemove={handleRemove} />
        
        <Button
          className="menu-add-btn"
          color="green"
          icon="plus"
          content="新增菜單"
          onClick={handleAddNew}
        />
      </div>
      <MenuFormModal
        open={modalOpen}
        onClose={handleEditCancel}
        onSubmit={handleSubmit}
        updateOpen={updateOpen}
        menuId={menuId}
        shopName={shopName}
        setshopName={setshopName}
        shopOptions={shopOptions}
        menuName={menuName}
        setMenuName={setMenuName}
        price={price}
        setPrice={setPrice}
        status={status}
        setStatus={setStatus}
        description={description}
        setDescription={setDescription}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
    </div>
  );
};

export default MenuManagement;
