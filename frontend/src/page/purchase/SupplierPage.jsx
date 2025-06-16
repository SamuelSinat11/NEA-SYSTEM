import React, { useEffect, useState } from "react";
import { Table } from "antd"; // ✅ Import Table
import { request } from "../../util/request";
import MainPage from "../../components/layout/MainPage";

function SupplierPage() {
  const [state, setState] = useState({
    list: [],
    loading: false,
  });

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const res = await request("supplier", "get");
      if (res && !res.error) {
        setState((prev) => ({ ...prev, list: res.list || [] }));
      }
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <MainPage>
      <Table
        dataSource={state.list}
        loading={state.loading}
        rowKey="id" // ✅ Ensure each row has a unique key
        columns={[
          {
            key: "name",
            title: "Name",
            dataIndex: "name", // ✅ Proper field from data
          },
          {
            key: "email",
            title: "Email",
            dataIndex: "email",
          },
          {
            key: "phone",
            title: "Phone",
            dataIndex: "phone",
          },
        ]}
      />
    </MainPage>
  );
}

export default SupplierPage;
