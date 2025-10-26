import { Skeleton, Space, Spin, Card } from "antd";
import styled from "styled-components";

function LoadingSkeleton({ type }) {
  if (type === "image") {
    return (
      <Space>
        <Skeleton.Image active />
        <Skeleton.Image active />
        <Skeleton.Image active />
      </Space>
    );
  }

  return (
    <div
      id="div-loading"
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        marginTop: "15px",
        marginLeft: "5px",
        marginBottom: "15px",
      }}
    >
      <Spin size="large" />
    </div>
  );
}

function Content({ loading, type, child }) {
  return (
    <>
      {loading && <LoadingSkeleton type={type} />}
      {!loading && <>{child}</>}
    </>
  );
}

export const BoxStyled = styled.div`
  background: #fff;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
`;

export default function BoxContent(props) {
  const {
    id,
    children,
    margin = "auto",
    padding = "12px",
    loading = false,
    type,
    width = "100%",
    height,
  } = props;

  return (
    <div
      className="shadow-sm rounded-lg bg-white"
      id={id}
      style={{ margin, padding, width, height, ...props.style }}
    >
      <Content child={children} type={type} loading={loading} />
    </div>
  );
}
