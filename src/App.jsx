import React from "react";
import { menuItems } from "./constants/menu";
import { Layout, Menu, theme } from "antd";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Stock from "./apps/stocks";
import Order from "./apps/orders";
import { DialogSuccess } from "./components/DialogSuccess";
import { FetchApiProvider } from "@Contexts/FetchApi.jsx";

const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();

  const getKeyByPath = (path) => {
    const item = menuItems.find((m) => m.path === path);
    return item ? item.key : null;
  };

  const getNameByPath = (path) => {
    const item = menuItems.find((m) => m.path === path);
    return item ? item.label : null;
  };

  return (
    <FetchApiProvider>
      <Layout hasSider>
        <Sider style={siderStyle}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={getKeyByPath(location.pathname)}
            items={menuItems}
            onClick={(item) => {
              const path = menuItems.find((m) => m.key === item.key)?.path;
              if (path) navigate(path);
            }}
          />
        </Sider>
        <Layout>
          <Header style={{ background: colorBgContainer }}>
            <h1 className="text-center text-3xl mt-3 p-0 font-bold">
              {getNameByPath(location.pathname)}
            </h1>
          </Header>
          <Content style={{ margin: "12px 12px 0", overflow: "initial" }}>
            <Routes>
              <Route path="/" element={<Navigate to="/stock" replace />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Nong ©{new Date().getFullYear()} Created
          </Footer>
          <DialogSuccess />
        </Layout>
      </Layout>
    </FetchApiProvider>
  );
};
export default App;
