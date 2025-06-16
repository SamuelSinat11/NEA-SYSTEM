import React, { useEffect, useState } from "react";
import { request } from "../../util/request";
import {
  Button,
  Space,
  Table,
  Tag,
  Input,
  Modal,
  Form,
  Select,
  message,
} from "antd"; // ✅ Added Form, Select, message

function UserPage() {
  const [state, setState] = useState({
    list: [],
    role: [
      {
        label : "Admin", 
        value : 1, 
      }, 
      {
        label : "IT", 
        value : 2,
      }
    ],
    loading: false,
    visible: false,
  });

  const [form] = Form.useForm(); // ✅ Form instance

  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await request("auth/get-list", "get");
      if (res && !res.error) {
        setState((prevState) => ({ ...prevState, list: res.list, role: res.role, }));
      }
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const clickBtnEdit = (item) => {
    console.log("Edit item:", item);
  };

  const clickBtnDelete = (item) => {
    console.log("Delete item:", item);
  };

  const handleCloseModal = () => {
    setState((prev) => ({
      ...prev,
      visible: false,
    }));
    form.resetFields(); // Clear form when modal is closed
  };

  const handleOpenModal = () => {
    setState((prev) => ({
      ...prev,
      visible: true,
    }));
  };

  const handleSubmit = async (values) => {
    try {
      const res = await request("auth/register", "post", {
        ...values,
        role_id: 2, // You can make this dynamic or hardcoded
        create_by: 1, // Replace with actual creator's ID if needed
      });

      if (res && !res.error) {
        message.success("User created successfully");
        form.resetFields();
        handleCloseModal();
        getList();
      } else {
        message.error("Failed to create user");
      }
    } catch (err) {
      console.error("Create error:", err);
      message.error("An error occurred");
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <div>
          <Button type="primary" onClick={handleOpenModal}>
            New
          </Button>
        </div>

        <Input.Search
          style={{ width: 250 }}
          placeholder="Search users..."
          onSearch={(value) => console.log(value)}
          enterButton
        />
      </div>

      <Modal
        title="New User"
        open={state.visible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="role_id" label="Role" rules={[{ required: true }]}>
            <Select
              placeholder="Select Role"
              options={state.role}
            />
          </Form.Item>

          <Form.Item name="is_active" label="Status" rules={[{ required: true }]}>
            <Select
              options={[
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 },
              ]}
            />
          </Form.Item>

          <Form.Item>
              <Space>
                <Button onClick={handleCloseModal}> Cancel</Button>
                <Button type="primary" htmlType="submit"> Save </Button>
              </Space>
          </Form.Item>

          
        </Form>
      </Modal>

      <Table
        dataSource={state.list}
        loading={state.loading}
        rowKey="id"
        columns={[
          {
            key: "no",
            title: "No",
            render: (text, record, index) => index + 1,
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
              value ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
          },
          {
            key: "action",
            title: "Action",
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
