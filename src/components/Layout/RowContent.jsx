import { Row } from "antd";

export default function RowContent(props) {
  const { children, alignBottom = false, colGutter = 16 } = props;

  return (
    <Row
      align={alignBottom ? "bottom" : "top"}
      gutter={[colGutter, 16]}
      style={{
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      {children}
    </Row>
  );
}
