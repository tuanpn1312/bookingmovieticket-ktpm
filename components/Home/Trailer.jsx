import React from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
export default function TrailerModal({ show, setShow, trailer }) {
  return (
    <Modal className="bg-none"
      centered
      bodyStyle={{ padding: 0 }}
      visible={show}
      closable={false}
      onOk={() => setShow(false)}
      onCancel={() => setShow(false)}
      footer={null}
      width={868}
    >
      <div className="relative">
        <iframe className="p-0" width="100%" height="475" src={trailer}
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>

        <div className="absolute -top-5 -right-5" onClick={() => setShow(false)}><CloseOutlined style={{ fontSize: 35, color: '#fff' }} /> </div>
      </div>


    </Modal>

  );
}
