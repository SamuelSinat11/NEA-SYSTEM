import { useEffect, useState } from "react";
import { request } from "../../util/request";
import { Button, Space, Table, Tag, Input, message, Modal, Form } from "antd";

function RolePage() {
  const [state, setState] = useState({
    list: [],
    loading: false,
  });

  const [filteredData, setFilteredData] = useState([]); // For search filtering
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Role");
  const [editingItem, setEditingItem] = useState(null); // null for create, object for edit

  const [form] = Form.useForm();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const res = await request("role", "get");
      if (res && !res.error) {
        setState({ list: res.list, loading: false });
        setFilteredData(res.list); // initialize filtered data
      }
    } catch (error) {
      console.error("Failed to fetch role list:", error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const clickBtnAdd = () => {
    setEditingItem(null);
    setModalTitle("Add Role");
    form.resetFields();
    setIsModalVisible(true);
  };

  const clickBtnEdit = (item) => {
    setEditingItem(item);
    setModalTitle("Edit Role");
    form.setFieldsValue({
      code: item.code,
      name: item.name,
    });
    setIsModalVisible(true);
  };

  const clickBtnDelete = async (item) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: `Are you sure you want to delete the role "${item.name}"?`,
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await request(`role/${item.id}`, "delete");
          if (res && !res.error) {
            message.success("Role deleted successfully!");
            fetchList();
          } else {
            message.warning(res.error || "Something went wrong!");
          }
        } catch (error) {
          message.error("Failed to delete role!");
        }
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values) => {
    try {
      let res;
      if (editingItem) {
        res = await request(`role/${editingItem.id}`, "put", values);
      } else {
        res = await request("role", "post", values);
      }

      if (res && !res.error) {
        message.success(res.message || (editingItem ? "Role updated!" : "Role created!"));
        fetchList();
        handleCancel();
      } else {
        message.warning(res.error || "Something went wrong!");
      }
    } catch (error) {
      message.error("Failed to submit form!");
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      setFilteredData(state.list);
    } else {
      const filtered = state.list.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <h2>Role List</h2>
        <Input.Search
          style={{ width: 250 }}
          placeholder="Search roles..."
          allowClear
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          enterButton
        />
      </div>

      <Button onClick={clickBtnAdd} type="primary" style={{ marginBottom: "10px" }}>
        Add Role
      </Button>

      <Table
        dataSource={filteredData}
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
            key: "code",
            title: "Code",
            dataIndex: "code",
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

      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="code"
            label="Code"
            rules={[{ required: true, message: "Please input the role code!" }]}
          >
            <Input placeholder="Enter role code" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the role name!" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingItem ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default RolePage;
