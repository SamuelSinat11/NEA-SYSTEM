import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, message, Modal, Input, Upload, Select, DatePicker, Radio } from "antd";
import { request } from "../../util/request";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { UploadOutlined } from "@ant-design/icons";


const { Option } = Select;

const SeekersPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [state, setState] = useState({
        visibleModal: false,
        seekerData: {
            FullName: "",
            Gender: "",
            DOB: null,
            POB: "",
            PhoneNumber: "",
            AppliedFor: "",
            Skill: "",
            Education: "",
            Company: "",
            Position: "",
            ISIC4: "",
            CV: "",
            Salary: "",
            Remarks: "",
            Status: "",
            SuggestBy: "",
        }
    });

    // Education options
    const educationOptions = [
        "High School",
        "Associate Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "PhD",
        "Vocational Training",
        "Other"
    ];

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await request("seeker");
            if (res && res.list) {
                setList(res.list);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            setError("Failed to fetch seekers. Please try again.");
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (data) => {
        message.info(`Editing seeker: ${data.FullName}`);
    };

    const handleDelete = async (data) => {
        if (!window.confirm(`Are you sure you want to delete ${data.FullName}?`)) {
            return;
        }

        try {
            const res = await request(`seeker/delete`, "DELETE", { Roll_id: data.Roll_id });
            if (res.success) {
                message.success("Seeker deleted successfully.");
                getList();
            } else {
                message.error("Failed to delete seeker.");
            }
        } catch (err) {
            console.error("Delete Error:", err);
            message.error("Error deleting seeker.");
        }
    };

    const onClickAddBtn = () => {
        setState({
            ...state,
            visibleModal: true
        });
    };

    const onCloseModal = () => {
        setState({
            ...state,
            visibleModal: false,
            seekerData: {
                FullName: "",
                Gender: "",
                DOB: null,
                POB: "",
                PhoneNumber: "",
                AppliedFor: "",
                Skill: "",
                Education: "",
                Company: "",
                Position: "",
                ISIC4: "",
                CV: "",
                Salary: "",
                Remarks: "",
                Status: "",
                SuggestBy: "",
            }
        });
    };

    const handleInputChange = (e, field) => {
        setState({
            ...state,
            seekerData: {
                ...state.seekerData,
                [field]: e.target.value
            }
        });
    };

    const handleSelectChange = (value, field) => {
        setState({
            ...state,
            seekerData: {
                ...state.seekerData,
                [field]: value
            }
        });
    };

    const handleDateChange = (date, dateString) => {
        setState({
            ...state,
            seekerData: {
                ...state.seekerData,
                DOB: dateString
            }
        });
    };

    const handleGenderChange = (e) => {
        setState({
            ...state,
            seekerData: {
                ...state.seekerData,
                Gender: e.target.value
            }
        });
    };

    const handleCVUpload = (file) => {
        setState({
            ...state,
            seekerData: {
                ...state.seekerData,
                CV: file
            }
        });
        return false; // prevent automatic upload
    };

    const handleSave = () => {
        const { FullName, Gender, DOB, POB, PhoneNumber } = state.seekerData;
        if (!FullName || !Gender || !DOB || !PhoneNumber) {
            message.error("Please fill out all required fields.");
            return;
        }
        message.success("Seeker saved successfully.");
        // Call API to save data here
        onCloseModal();
    };

    return (
        <div>
            <Button className="mb-4" type="primary" icon={<MdAdd />} onClick={onClickAddBtn}>New</Button>

            <Modal
                open={state.visibleModal}
                title="New Seeker"
                footer={null}
                onCancel={onCloseModal}
                width={600}
            >
               <div className="form-container" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  {/* Form row with two columns */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Full Name:</label>
      <Input
        placeholder="Full Name"
        value={state.seekerData.FullName}
        onChange={(e) => handleInputChange(e, 'FullName')}
      />
    </div>
    
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Gender:</label>
      <Radio.Group onChange={handleGenderChange} value={state.seekerData.Gender}>
        <Radio value="Male">Male</Radio>
        <Radio value="Female">Female</Radio>
        <Radio value="Other">Other</Radio>
      </Radio.Group>
    </div>
  </div>
  
  {/* Form row with two columns */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Date of Birth:</label>
      <DatePicker 
        style={{ width: "100%" }}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        placeholder="Select date of birth"
      />
    </div>
    
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Place of Birth:</label>
      <Input
        placeholder="Place of Birth"
        value={state.seekerData.POB}
        onChange={(e) => handleInputChange(e, 'POB')}
      />
    </div>
  </div>
  
  {/* Form row with two columns */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Phone Number:</label>
      <Input
        placeholder="Phone Number"
        value={state.seekerData.PhoneNumber}
        onChange={(e) => handleInputChange(e, 'PhoneNumber')}
      />
    </div>
    
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Applied For:</label>
      <Input
        placeholder="Applied For"
        value={state.seekerData.AppliedFor}
        onChange={(e) => handleInputChange(e, 'AppliedFor')}
      />
    </div>
  </div>
  
  {/* Form row with two columns */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Skill:</label>
      <Input
        placeholder="Skill"
        value={state.seekerData.Skill}
        onChange={(e) => handleInputChange(e, 'Skill')}
      />
    </div>
    
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Education Level:</label>
      <Select
        placeholder="Select Education Level"
        style={{ width: "100%" }}
        value={state.seekerData.Education || undefined}
        onChange={(value) => handleSelectChange(value, 'Education')}
        allowClear
      >
        {educationOptions.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>
    </div>
  </div>
  
  {/* Form row with two columns */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Company:</label>
      <Input
        placeholder="Company"
        value={state.seekerData.Company}
        onChange={(e) => handleInputChange(e, 'Company')}
      />
    </div>
    
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Position:</label>
      <Input
        placeholder="Position"
        value={state.seekerData.Position}
        onChange={(e) => handleInputChange(e, 'Position')}
      />
    </div>
  </div>
  
  {/* Form row with two columns */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>ISIC4:</label>
      <Input
        placeholder="ISIC4"
        value={state.seekerData.ISIC4}
        onChange={(e) => handleInputChange(e, 'ISIC4')}
      />
    </div>
    
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Salary:</label>
      <Input
        placeholder="Salary"
        value={state.seekerData.Salary}
        onChange={(e) => handleInputChange(e, 'Salary')}
      />
    </div>
  </div>
  
  {/* Form row with two columns */}
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Remarks:</label>
      <Input.TextArea
        placeholder="Remarks"
        value={state.seekerData.Remarks}
        onChange={(e) => handleInputChange(e, 'Remarks')}
        rows={3}
      />
    </div>
    
    <div style={{ flex: "1 1 300px" }}>
      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Status:</label>
      <Select
        placeholder="Select Status"
        style={{ width: "100%" }}
        value={state.seekerData.Status || undefined}
        onChange={(value) => handleSelectChange(value, 'Status')}
      >
        <Option value="1">Active</Option>
        <Option value="0">Inactive</Option>
      </Select>
      
      <div style={{ marginTop: "16px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Suggest By:</label>
        <Input
          placeholder="Suggest By"
          value={state.seekerData.SuggestBy}
          onChange={(e) => handleInputChange(e, 'SuggestBy')}
        />
      </div>
    </div>
  </div>
  
  {/* CV Upload Field - Full width */}
  <div style={{ marginTop: "8px" }}>
    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>CV/Resume:</label>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Upload
        customRequest={handleCVUpload}
        showUploadList={false}
        accept=".pdf,.doc,.docx,.txt"
        maxCount={1}
      >
        <Button style={{ marginBottom: "8px" }} icon={<UploadOutlined />}>Upload CV</Button>
      </Upload>
      <div style={{ flex: "1 1 auto " }}>
        {state.seekerData.CV && <span>{state.seekerData.CV.name}</span>}
        {!state.seekerData.CV && <span className="text-gray-400">No file selected</span>}
      </div>
    </div>
  </div>
</div>

                <Space>
                    <Button onClick={onCloseModal}>Cancel</Button>
                    <Button type="primary" onClick={handleSave}>Save</Button>
                </Space>
            </Modal>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Table
                dataSource={list}
                columns={[
                    { key: "Roll_id", title: "ID", dataIndex: "Roll_id" },
                    { title: "Name", dataIndex: "FullName", key: "FullName" },
                    { title: "Gender", dataIndex: "Gender", key: "Gender" },
                    { title: "Date of Birth", dataIndex: "DOB", key: "DOB" },
                    { title: "Place of Birth", dataIndex: "POB", key: "POB" },
                    { title: "Phone Number", dataIndex: "PhoneNumber", key: "PhoneNumber" },
                    { title: "Applied For", dataIndex: "AppliedFor", key: "AppliedFor" },
                    { title: "Skill", dataIndex: "Skill", key: "Skill" },
                    {
                        title: "Status",
                        dataIndex: "Status",
                        key: "Status",
                        render: (Status) => (
                            <Tag color={Status === 1 ? "green" : "red"}>
                                {Status === 1 ? "Active" : "Inactive"}
                            </Tag>
                        ),
                    },
                    { 
                        title: "Date", 
                        dataIndex: "CreateAt", 
                        key: "CreateAt",
                    }, 
                    {
                        title: "Action",
                        key: "Action",
                        align: "center",
                        render: (data) => (
                            <Space>
                                <Button type="primary" icon={<MdEdit />} onClick={() => handleEdit(data)} />
                                <Button danger type="primary" icon={<MdDelete />} onClick={() => handleDelete(data)} />
                            </Space>
                        ),
                    },
                ]}
                loading={loading}
                rowKey="Roll_id"
                pagination={{ pageSize: 8 }}
            />
        </div>
    );
};

export default SeekersPage;