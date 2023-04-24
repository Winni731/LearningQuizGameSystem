import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    FileAddOutlined,
    AuditOutlined,
    TeamOutlined,
    StarOutlined,
    FundViewOutlined,
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useEffect, useState, useContext } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import PersonalInfo from "./PersonalInfo";
  import UserFieldsContext from "../context/UserFieldsContext";
  
  function SideMenu() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
    const { userFields } = useContext(UserFieldsContext);
    
  
    useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(pathName);
    }, [location.pathname]);
  
    const navigate = useNavigate();
    return (
      <div className="SideMenu" style={{height: "87vh"}}>
        <div style={{height: "330px"}}>
            <PersonalInfo />
        </div>
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={
            userFields?.role === "teacher"?
             ([
            {
              label: "Dashboard",
              icon: <AppstoreOutlined />,
              key: "/user/dashboard",
            },
            {
                label: "Profile",
                key: "/user/profile",
                icon: <UserOutlined />,
              },
            {
              label: "Owned Quiz",
              key: "/user/ownedquiz",
              icon: <AuditOutlined />,
            },
            {
                label: "Create Quiz",
                key: "/user/dashboard/edit-quiz/new",
                icon: <FileAddOutlined />,
              },
              { 
                label: "History Result",
                key: "/user/dashboard/history",
                icon: <FundViewOutlined />,
              },
              {
                label: "BookMark",
                key: "/user/dashboard/bookmark",
                icon: <StarOutlined />,
              },
            // {
            //   label: "Paticipants",
            //   key: "/user/paticipants",
            //   icon: <TeamOutlined />,
            // },
          ]) : ([
                {
                  label: "Dashboard",
                  icon: <AppstoreOutlined />,
                  key: "/user/dashboard",
                },
                {
                  label: "Profile",
                  key: "/user/profile",
                  icon: <UserOutlined />,
                },
                {
                    label: "BookMark",
                    key: "/user/dashboard/bookmark",
                    icon: <StarOutlined />,
                },
                { 
                    label: "History Result",
                    key: "/user/dashboard/history",
                    icon: <FundViewOutlined />,
                },
              ]
          )}
        ></Menu>
      </div>
    );
  }
  export default SideMenu;