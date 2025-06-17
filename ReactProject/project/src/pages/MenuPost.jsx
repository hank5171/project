import React, { useState, useEffect } from "react";
import { Form, Button, Message, Container, Header } from "semantic-ui-react";
import { postMenuComment } from "../services/menuPost";
import { checkLoginStatus } from "../services/authService";

function MenuPost() {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 檢查登入狀態
    checkLoginStatus()
      .then((data) => {
        if (data.status) {
          setIsLoggedIn(true);
          setAuthor(data.username || "");
          setUserId(data.userId || "");
        } else {
          setIsLoggedIn(false);
          setAuthor("");
          setUserId("");
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setAuthor("");
        setUserId("");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!author.trim() || !message.trim()) {
      setError("請填寫姓名與留言內容");
      return;
    }

    try {
      await postMenuComment({ userId, message });
      setSuccess(true);
      setMessage(""); // 不清空 author，讓登入者持續顯示
    } catch (err) {
      setError("留言送出失敗，請稍後再試！");
    }
  };

  return (
    <Container style={{ marginTop: "2em", maxWidth: 500 }}>
      <Header as="h2" textAlign="center" style={{ marginBottom: "1.5em" }}>
        留言板
      </Header>
      <Form onSubmit={handleSubmit} error={!!error} success={success}>
        {/* 隱藏 userId 欄位 */}
        <input type="hidden" name="userId" value={userId} />
        <Form.Input
          label="姓名"
          placeholder="請輸入您的姓名"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          icon="user"
          iconPosition="left"
          readOnly={isLoggedIn} // 已登入時不可修改
        />
        <Form.TextArea
          label="留言內容"
          placeholder="請輸入您的留言"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ minHeight: 80 }}
        />
        <Message error content={error} />
        <Message success content="留言已成功送出，感謝您的回饋！" />
        <Button
          type="submit"
          primary
          icon="edit"
          content="送出留言"
          fluid
          disabled={isLoggedIn && !author} // 已登入但沒取得帳號時禁止送出
        />
      </Form>
    </Container>
  );
}

export default MenuPost;
