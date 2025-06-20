import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  Container,
  Header,
  Input,
  Message,
  Pagination,
} from "semantic-ui-react";
import { handleExport } from "../utils/exportOrderExcel";
import { groupOrderStats } from "../utils/groupOrderStats";
import { getOrderList } from "../services/MenuOrderList";

const ITEMS_PER_PAGE = 15;

function MenuOrderList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const result = await getOrderList();
      setData(result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let result = data;

    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      result = result.filter(
        (row) =>
          (row.username && row.username.toLowerCase().includes(keyword)) ||
          (row.shopname && row.shopname.includes(keyword)) ||
          (row.name && row.name.includes(keyword)) ||
          (row.customized && row.customized.includes(keyword))
      );
    }

    if (dateFrom) {
      result = result.filter((row) => row.created_at >= dateFrom);
    }
    if (dateTo) {
      result = result.filter((row) => row.created_at <= dateTo);
    }

    setFiltered(result);
    setActivePage(1); // 搜尋或篩選時自動回到第一頁
  }, [search, dateFrom, dateTo, data]);

  // 分頁資料
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (activePage - 1) * ITEMS_PER_PAGE;
  const pageData = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const pageTotalCount = pageData.length;

  // 只算當前頁合計
  const pageTotalQuantity = pageData.reduce(
    (sum, list) => sum + Number(list.quantity),
    0
  );
  const pageTotalPrice = pageData.reduce(
    (sum, list) => sum + Number(list.totalprice),
    0
  );

  // 全部資料合計（給匯出用）
  const totalQuantity = filtered.reduce(
    (sum, list) => sum + Number(list.quantity),
    0
  );
  const totalPrice = filtered.reduce(
    (sum, list) => sum + Number(list.totalprice),
    0
  );

  // 分組統計
  const shopStats = groupOrderStats(filtered);

  // 匯出 Excel
  const onExport = () => {
    if (filtered.length === 0) {
      alert("查無資料，無法匯出！");
      return;
    }
    handleExport({
      filtered,
      totalQuantity,
      totalPrice,
      shopStats,
    });
  };

  function formatDateTime(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }

  return (
    <Container style={{ marginTop: "2em" }}>
      <Header as="h2" textAlign="center">
        餐點訂單查詢
      </Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>關鍵字搜尋</label>
            <Input
              icon="search"
              placeholder="使用者/餐廳名稱/餐點/備註"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>起始日期</label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>結束日期</label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Form.Field>
          <Form.Field style={{ display: "flex", alignItems: "flex-end" }}>
            <Button
              primary
              icon="file excel"
              content="匯出 Excel"
              onClick={onExport}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>使用者名稱</Table.HeaderCell>
            <Table.HeaderCell>餐廳名稱</Table.HeaderCell>
            <Table.HeaderCell>餐點名稱</Table.HeaderCell>
            <Table.HeaderCell>數量</Table.HeaderCell>
            <Table.HeaderCell>單價</Table.HeaderCell>
            <Table.HeaderCell>總價</Table.HeaderCell>
            <Table.HeaderCell>備註</Table.HeaderCell>
            <Table.HeaderCell>建立日期</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pageData.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan="8">
                <Message warning content="查無資料" />
              </Table.Cell>
            </Table.Row>
          ) : (
            pageData.map((list) => (
              <Table.Row
                key={`${list.username}_${list.shopname}_${list.name}_${list.created_at}`}
              >
                <Table.Cell>{list.username}</Table.Cell>
                <Table.Cell>{list.shopname}</Table.Cell>
                <Table.Cell>{list.name}</Table.Cell>
                <Table.Cell>{list.quantity}</Table.Cell>
                <Table.Cell>{list.price}</Table.Cell>
                <Table.Cell>{list.totalprice}</Table.Cell>
                <Table.Cell>{list.customized}</Table.Cell>
                <Table.Cell>{formatDateTime(list.created_at)}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              <b>筆數：{pageTotalCount}</b>
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell textAlign="center">
              <b>合計</b>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <b>{pageTotalQuantity}</b>
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>
              <b>{pageTotalPrice}</b>
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan="8" textAlign="center">
              {totalPages > 1 && (
                <Pagination
                  activePage={activePage}
                  totalPages={totalPages}
                  onPageChange={(_, data) => setActivePage(data.activePage)}
                  size="small"
                  siblingRange={1}
                  boundaryRange={1}
                  ellipsisItem={null}
                />
              )}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  );
}

export default MenuOrderList;
