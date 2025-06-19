import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  Container,
  Header,
  Input,
  Message,
} from "semantic-ui-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getOrderList } from "../services/MenuOrderList";

function MenuOrderList() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filtered, setFiltered] = useState([]);

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
  }, [search, dateFrom, dateTo, data]);

  const totalQuantity = filtered.reduce(
    (sum, list) => sum + Number(list.quantity),
    0
  );

  const totalPrice = filtered.reduce(
    (sum, list) => sum + Number(list.totalprice),
    0
  );

  const shopTelList = Array.from(
    new Map(filtered.map((row) => [row.shopname + row.tel, row])).values()
  );

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

  const handleExport = () => {
    const exportData = filtered.map((list) => ({
      使用者名稱: list.username,
      餐廳名稱: list.shopname,
      餐點名稱: list.name,
      數量: list.quantity,
      單價: list.price,
      總價: list.totalprice,
      備註: list.customized,
      建立日期: list.created_at,
    }));
    exportData.push({
      使用者名稱: "",
      餐廳名稱: "",
      餐點名稱: "合計",
      數量: totalQuantity,
      單價: "",
      總價: totalPrice,
      備註: "",
      建立日期: "",
    });
    exportData.push({
      使用者名稱: "",
      餐廳名稱: "",
      餐點名稱: "",
      數量: "",
      單價: "",
      總價: "",
      備註: "",
      建立日期: "",
    });

    shopTelList.forEach((row) => {
      exportData.push({
        使用者名稱: "",
        餐廳名稱: `${row.shopname}`,
        餐點名稱: `${row.tel}`,
        數量: "",
        單價: "",
        總價: "",
        備註: "",
        建立日期: "",
      });
    });
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "訂單列表");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "訂單總覽.xlsx");
  };

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
              onClick={handleExport}
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
          {filtered.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan="8">
                <Message warning content="查無資料" />
              </Table.Cell>
            </Table.Row>
          ) : (
            filtered.map((list) => (
              <Table.Row key={list.id}>
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
            <Table.HeaderCell colSpan="3" textAlign="right">
              <b>合計</b>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <b>{totalQuantity}</b>
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>
              <b>{totalPrice}</b>
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  );
}

export default MenuOrderList;
