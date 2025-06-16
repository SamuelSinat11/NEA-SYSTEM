import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd"; // ✅ Added Space and message
import { request } from "../../util/request";
import MainPage from "../../components/layout/MainPage";

function SupplierPage() {
  const [state, setState] = useState({
    list: [],
  });

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await request("supplier", "get");
      if (res && res.list) {
        setState((prev) => ({ ...prev, list: res.list }));
      } else {
        message.warning("No supplier data returned.");
      }
    } catch (error) {
      message.error("Error fetching supplier list.");
    }
  };

  const save = async () => {
    const params = {
      name: "Samuel",
      code: "SUP003",
      tel: "01234634345278",
      email: "test@samuel.com",
      address: "Phnom Penh",
      website: "https://example.com",
      note: "Test note",
      // remove `create_by` if your backend sets it from auth
    };

    try {
      const res = await request("supplier", "post", params);
      message.success("Saved successfully!");
      getList(); // Refresh list
    } catch (error) {
      message.error("Failed to save supplier.");
    }
  };

  return (
    <MainPage loading={false}>
      <Button onClick={save} type="primary" style={{ marginBottom: 16 }}>
        Save
      </Button>
      <Table
        dataSource={state.list}
        rowKey="id"
        columns={[
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "email",
            title: "Email",
            dataIndex: "email",
          },
          {
            key: "tel",
            title: "Phone",
            dataIndex: "tel",
          },
          {
            key: "code",
            title: "Code",
            dataIndex: "code",
          },
          {
            key: "address",
            title: "Address",
            dataIndex: "address",
          },
          {
            key: "action",
            title: "Action",
            render: (_, record) => (
              <Space>
                <Button type="primary" onClick={() => console.log("Edit", record)}>
                  Edit
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => console.log("Delete", record)}
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </MainPage>
  );
}

export default SupplierPage;
