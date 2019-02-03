import { Modal } from "antd";
import * as React from "react";

interface IProps {
  errors: any;
}
export default (props: IProps): JSX.Element => {
  const [visible, setVisible] = React.useState<boolean>(true);

  const onOk = () => {
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {visible} ? (
        <Modal centered visible={visible} onOk={onOk} onCancel={onCancel}>
          <p>{JSON.stringify(props.errors, null, 2)}</p>
        </Modal>
      ) : null}
    </>
  );
};
