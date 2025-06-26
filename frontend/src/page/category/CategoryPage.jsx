import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  message,
  Input,
  Modal,
  Form,
  Select,
} from "antd";
import { request } from "../../util/request";
import MainPage from "../../components/layout/MainPage";
import dayjs from "dayjs";

function CategoryPage() {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    list: [],
    visible: false,
    searchText: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await request("category", "get");
      if (res && res.list) {
        setState((prev) => ({ ...prev, list: res.list }));
      } else {
        message.warning("No category data returned.");
      }
    } catch (error) {
      message.error("Error fetching category list.");
    }
  };

  const handleSave = async (values) => {
    try {
      if (values.id) {
        await request(`category/${values.id}`, "put", values);
        message.success("Updated successfully!");
      } else {
        await request("category", "post", values);
        message.success("Saved successfully!");
      }

      closeModal();
      getList();
    } catch (error) {
      message.error("Failed to save category.");
    }
  };

  const openModal = () => {
    form.resetFields();
    setEditMode(false);
    setState((prev) => ({ ...prev, visible: true }));
  };

  const closeModal = () => {
    form.resetFields();
    setEditMode(false);
    setState((prev) => ({ ...prev, visible: false }));
  };

  const handleSearch = (value) => {
    setState((prev) => ({ ...prev, searchText: value }));
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      content: `Name: ${record.name}`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await request("category", "delete", { id: record.id });
          message.success("Deleted successfully!");
          getList();
        } catch (error) {
          message.error("Failed to delete category.");
        }
      },
    });
  };

  const filteredList = state.list.filter((category) => {
    const search = state.searchText.toLowerCase();
    return (
      category.name?.toLowerCase().includes(search) ||
      category.description?.toLowerCase().includes(search) ||
      String(category.status).toLowerCase().includes(search) ||
      (category.create_at && dayjs(category.create_at).format("DD/MM/YYYY").toLowerCase().includes(search))
    );
  });

  const onClickBtnEdit = (record) => {
    form.setFieldsValue(record);
    setEditMode(true);
    setState((prev) => ({ ...prev, visible: true }));
  };

  return (
    <MainPage loading={false}>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openModal}>
          New
        </Button>
        <Input.Search
          placeholder="Search by name, description, status..."
          style={{ width: 300, marginLeft: 16 }}
          allowClear
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          value={state.searchText}
        />
      </div>

      <Modal
        open={state.visible}
        title={editMode ? "Edit Category" : "New Category"}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={handleSave}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Status is required" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value={1}>Active</Select.Option>
              <Select.Option value={0}>Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editMode ? "Update" : "Save"}
            </Button>
          </Space>
        </Form>
      </Modal>

      <Table
        dataSource={filteredList}
        rowKey="id"
        columns={[
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "description",
            title: "Description",
            dataIndex: "description",
          },
          {
            key: "status",
            title: "Status",
            dataIndex: "status",
            render: (status) => (status === 1 ? "Active" : "Inactive"),
          },
          {
            key: "create_at",
            title: "Created At",
            dataIndex: "create_at",
            render: (value) => value ? dayjs(value).format("DD/MM/YYYY") : "-",
          },
          {
            key: "action",
            title: "Action",
            render: (_, record) => (
              <Space>
                <Button type="primary" onClick={() => onClickBtnEdit(record)}>
                  Edit
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(record)}
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

export default CategoryPage;
