import React from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import { getServerStatus } from "../../../store/server.store";
import { Spin } from "antd";

const MainPage = ({ children, loading }) => {
    const navigate = useNavigate();
    const server_status = getServerStatus(); 
    const isServerError = ["500", "404", "403", "error"].includes(server_status);

    const info = {
        "404": {
            message: "404-Route Not Found",
            sub: "404-Route Not Found. Please confirm your current route that requests to the server."
        }, 
        "500": {
            message: "500-Server Error",
            sub: "500-Server Error. Please confirm your current route that requests to the server."
        }, 
        "403": {
            message: "403-Authorization Error",
            sub: "403-Forbidden. Please confirm your current route that requests to the server."
        },
        "error": {
            message: "Can't connect to the server",
            sub: "Network Error. Please confirm your current route that requests to the server."
        }
    };

    if (isServerError) {
        return ( 
            <Result 
                status={server_status}
                title={info[server_status].message}
                subTitle={info[server_status].sub}
                extra={<Button type="primary" onClick={() => navigate("/")}>Back Home</Button>}
            />
        ); 
    }

    return <div>
        <Spin spinning={loading} >
        {children}
        </Spin>
        </div>; 
};

export default MainPage;
