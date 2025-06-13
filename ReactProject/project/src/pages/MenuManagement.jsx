import React, { useEffect, useState, useMemo } from "react";
import MenuTable from "../components/MenuTable";
import MenuFormModal from "../components/MenuFormModal";
import {
  fetchMenuList,
  fetchShopList,
  addOrUpdateMenu,
  toggleMenuStatus,
  menuRemove,
} from "../services/menuManagementService.js";
import "../css/Menu.css";
import { checkLoginStatus } from "../services/authService.js";
import { Button, Message, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import BatchOnShelfModal from "../components/BatchOnShelfModal";
import { batchOnShelf } from "../services/menuManagementService.js";
import FilterDropdown from "../components/FilterDropdown.jsx";

const MenuManagement = () => {
  const [filterStatus, setFilterStatus] = useState("on");
  const [menuList, setMenuList] = useState([]);
  const [shopOptions, setShopOptions] = useState([]);
  const [shopName, setshopName] = useState("");
  const [shopId, setshopId] = useState("");
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);
  const [menuId, setMenuId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [batchOnShelfOpen, setBatchOnShelfOpen] = useState(false);
  const [selectedMenuIds, setSelectedMenuIds] = useState([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const navigate = useNavigate();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    // 先檢查登入狀態
    checkLoginStatus()
      .then((data) => {
        if (!data.status) {
          setIsLoggedIn(false);
        } else {
          // 已登入才載入資料
          fetchMenuList().then((data) => {
            const MenuList = data.map((item) => ({
              key: item.menuId,
              value: item.menuId,
              text: `${item.menuName}`,
              description: item.description,
              price: item.price,
              status: item.status ? "上架" : "下架",
              shopName: item.shopName,
              shopId: item.shopId, // 確保有 shopId 欄位
            }));
            setMenuList(MenuList);
          });
          fetchShopList().then((data) => {
            const ShopOptions = data.map((item) => ({
              key: item.shopId,
              value: item.shopName,
              text: item.shopName,
            }));
            setShopOptions(ShopOptions);
          });
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [navigate, refreshFlag]);

  // 假設 menuList 是所有資料
  const filteredMenuList = menuList.filter((item) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "on")
      return item.status === true || item.status === "上架";
    if (filterStatus === "off")
      return item.status === false || item.status === "下架";
    return true;
  });

  // 依 shopId 去重複，給一鍵上架用
  const uniqueShopOptions = useMemo(
    () =>
      Array.from(new Map(menuList.map((item) => [item.shopId, item])).values()),
    [menuList]
  );

  // 以下 CRUD 函式同你原本
  const handleAddNew = () => {
    setMenuId("");
    setshopName("");
    setshopId("");
    setMenuName("");
    setPrice("");
    setStatus(true);
    setDescription("");
    setUpdateOpen(false);
    setErrorMsg("");
    setSuccessMsg("");
    setModalOpen(true);
    {
      console.log("shopId:", shopId);
    }
  };

  const handleEdit = (item) => {
    setMenuId(item.value);
    setshopName(item.shopName);
    setMenuName(item.text);
    setPrice(item.price);
    setStatus(item.status === "上架");
    setDescription(item.description || "");
    setUpdateOpen(true);
    setErrorMsg("");
    setSuccessMsg("");
    setModalOpen(true);
  };

  const handleEditCancel = () => {
    setMenuId("");
    setshopName("");
    setMenuName("");
    setPrice("");
    setStatus(true);
    setDescription("");
    setUpdateOpen(false);
    setErrorMsg("");
    setSuccessMsg("");
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    if (!shopId || !menuName || !price) {
      setErrorMsg("請填寫所有必填欄位");
      return;
    }
    const payload = {
      shopId,
      menuName,
      price: parseInt(price, 10),
      status,
      description,
    };
    try {
      const res = await addOrUpdateMenu(payload, updateOpen, menuId);
      if (res.ok) {
        setSuccessMsg(updateOpen ? "更新菜單成功！" : "新增菜單成功！");
        fetchMenuList().then((data) => {
          const MenuList = data.map((item) => ({
            key: item.menuId,
            value: item.menuId,
            text: `${item.menuName}`,
            description: item.description,
            price: item.price,
            status: item.status ? "上架" : "下架",
            shopName: item.shopName,
            shopId: item.shopId,
          }));
          setMenuList(MenuList);
          setRefreshFlag((flag) => !flag);
        });
        setTimeout(() => {
          handleEditCancel();
        }, 800);
      } else {
        const data = await res.json();
        setErrorMsg(data.message || (updateOpen ? "更新失敗" : "新增失敗"));
      }
    } catch (err) {
      setErrorMsg("系統錯誤，請稍後再試");
    }
  };

  const handleRemove = async (item) => {
    try {
      const res = await toggleMenuStatus(item.value);
      if (res.ok) {
        fetchMenuList().then((data) => {
          const MenuList = data.map((item) => ({
            key: item.menuId,
            value: item.menuId,
            text: `${item.menuName}`,
            description: item.description,
            price: item.price,
            status: item.status ? "上架" : "下架",
            shopName: item.shopName,
            shopId: item.shopId,
          }));
          setMenuList(MenuList);
          setRefreshFlag((flag) => !flag);
        });
      } else {
        setErrorMsg("上下架失敗");
      }
    } catch {
      setErrorMsg("系統錯誤，請稍後再試");
    }
  };

  const handleBatchOffShelf = async () => {
    if (!window.confirm("確定要將全部商品下架嗎？")) return;
    try {
      await menuRemove();
      alert("全部商品已下架");
      fetchMenuList().then((data) => {
        const MenuList = data.map((item) => ({
          key: item.menuId,
          value: item.menuId,
          text: `${item.menuName}`,
          description: item.description,
          price: item.price,
          status: item.status ? "上架" : "下架",
          shopName: item.shopName,
          shopId: item.shopId,
        }));
        setMenuList(MenuList);
        setRefreshFlag((flag) => !flag);
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const handleBatchOnShelf = () => {
    setBatchOnShelfOpen(true);
    setSelectedMenuIds([]);
    console.log(menuList);
  };

  const handleBatchOnShelfSubmit = async () => {
    setBatchLoading(true);
    try {
      await batchOnShelf(selectedMenuIds); // selectedMenuIds 是多個 shopId 的陣列
      alert("所選商品已全部上架");
      setBatchOnShelfOpen(false);
      setSelectedMenuIds([]);
      fetchMenuList().then((data) => {
        const MenuList = data.map((item) => ({
          key: item.menuId,
          value: item.menuId,
          text: `${item.menuName}`,
          description: item.description,
          price: item.price,
          status: item.status ? "上架" : "下架",
          shopName: item.shopName,
          shopId: item.shopId,
        }));
        setMenuList(MenuList);
      });
    } catch (e) {
      alert(e.message);
    }
    setBatchLoading(false);
    setRefreshFlag((flag) => !flag);
  };

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
      <div className="menu-area">
        <div
          className="menu-header-row"
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          {/* 篩選器放最左邊 */}
          <FilterDropdown value={filterStatus} onChange={setFilterStatus} />
          <Button
            className="menu-add-btn"
            color="blue"
            icon="plus"
            content="新增菜單"
            onClick={handleAddNew}
          />
          <Button
            className="menu-add-btn"
            color="red"
            icon="plus"
            content="全商品下架"
            onClick={handleBatchOffShelf}
          />
          <Button
            className="menu-add-btn"
            color="green"
            icon="plus"
            content="一鍵上架"
            onClick={handleBatchOnShelf}
          />
        </div>
        <div className="menu-table-wrapper">
          <MenuTable
            menuList={filteredMenuList}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        </div>
      </div>
      <MenuFormModal
        open={modalOpen}
        onClose={handleEditCancel}
        onSubmit={handleSubmit}
        updateOpen={updateOpen}
        menuId={menuId}
        shopId={shopId}
        setshopId={setshopId}
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
      <BatchOnShelfModal
        open={batchOnShelfOpen}
        onClose={() => setBatchOnShelfOpen(false)}
        menuOptions={uniqueShopOptions}
        selectedMenuIds={selectedMenuIds}
        setSelectedMenuIds={setSelectedMenuIds}
        onSubmit={handleBatchOnShelfSubmit}
        loading={batchLoading}
      />
    </div>
  );
};

export default MenuManagement;
