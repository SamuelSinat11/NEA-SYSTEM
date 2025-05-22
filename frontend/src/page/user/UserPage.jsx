import React, { useEffect, useState } from "react";
import { request } from "../../util/request";
import { Button, Space, Table, Tag, Input } from "antd"; // Import Input here!

function UserPage() {
  const [state, setState] = useState({
    list: [],
    loading: false,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await request("auth/get-list", "get");
      if (res && !res.error) {
        setState((prevState) => ({ ...prevState, list: res.list }));
      }
    } catch (error) {
      console.error("Failed to fetch user list:", error);
      // Handle error state if needed
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const clickBtnEdit = (item) => {
    console.log("Edit item:", item);
    // Implement your edit logic here, e.g., navigate to an edit form
  };

  const clickBtnDelete = (item) => {
    console.log("Delete item:", item);
    // Implement your delete logic here, e.g., show a confirmation modal
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <div>
          <h2>User List</h2> {/* Changed to h2 for better semantics */}
        </div>
        <Input.Search
          style={{ width: 250 }} // Give it a specific width
          placeholder="Search users..."
          onSearch={(value) => console.log(value)}
          enterButton
        />
      </div>
      <Table
        dataSource={state.list}
        loading={state.loading}
        columns={[
          {
            key: "no",
            title: "No",
            render: (text, record, index) => index + 1, // 'text' for dataIndex value, 'record' for the whole row object
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "username",
            title: "Username",
            dataIndex: "username",
          },
          {
            key: "role_name",
            title: "Role",
            dataIndex: "role_name",
          },
          {
            key: "is_active",
            title: "Status",
            dataIndex: "is_active",
            render: (value) =>
              value ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="red">Inactive</Tag>
              ),
          },
          {
            key: "action",
            title: "Action",
            // The render function receives (text, record, index)
            // 'record' is the entire data object for the current row
            render: (text, record) => (
              <Space>
                <Button onClick={() => clickBtnEdit(record)} type="primary">
                  Edit
                </Button>
                <Button onClick={() => clickBtnDelete(record)} danger>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </>
  );
}

export default UserPage;