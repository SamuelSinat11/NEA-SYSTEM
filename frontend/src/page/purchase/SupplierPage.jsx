import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  message,
  Input,
  Modal,
  Form,
} from "antd";
import { request } from "../../util/request";
import MainPage from "../../components/layout/MainPage";
import dayjs from "dayjs";

function SupplierPage() {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    list: [],
    visible: false,
    searchText: "",
  });
  const [editMode, setEditMode] = useState(false); // To determine edit vs new mode

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

  const handleSave = async (values) => {
    try {
      if (values.id) {
        await request(`supplier/${values.id}`, "put", values);
        message.success("Updated successfully!");
      } else {
        await request("supplier", "post", values);
        message.success("Saved successfully!");
      }

      closeModal();
      getList();
    } catch (error) {
      message.error("Failed to save supplier.");
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
      title: "Are you sure you want to delete this supplier?",
      content: `Name: ${record.name}`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await request("supplier", "delete", { id: record.id });
          message.success("Deleted successfully!");
          getList(); // refresh list
        } catch (error) {
          message.error("Failed to delete supplier.");
        }
      },
    });
  };

  const filteredList = state.list.filter((supplier) => {
    const search = state.searchText.toLowerCase();
    return (
      supplier.name?.toLowerCase().includes(search) ||
      supplier.email?.toLowerCase().includes(search) ||
      supplier.tel?.toLowerCase().includes(search) ||
      supplier.code?.toLowerCase().includes(search) ||
      supplier.address?.toLowerCase().includes(search)
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
          placeholder="Search by name, email, phone..."
          style={{ width: 300, marginLeft: 16 }}
          allowClear
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          value={state.searchText}
        />
      </div>

      <Modal
        open={state.visible}
        title={editMode ? "Edit Supplier" : "New Supplier"}
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
          <Form.Item
            name="code"
            label="Code"
            rules={[{ required: true, message: "Code is required" }]}
          >
            <Input placeholder="Enter supplier code" />
          </Form.Item>
          <Form.Item name="tel" label="Phone">
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input placeholder="Enter website URL" />
          </Form.Item>
          <Form.Item name="note" label="Note">
            <Input.TextArea rows={2} placeholder="Enter notes" />
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
            key: "create_at",
            title: "create_at", 
            dataIndex: "create_at",
            render:(value) => dayjs (value).format("DD/MM/YYYY"), 
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

export default SupplierPage;
