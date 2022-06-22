import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Layout, Menu, Tabs } from 'antd';
import * as ICONS from '@ant-design/icons';
import {
  CloseOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './backLayout.less';
//全局样式
import './global.less';

import _ from 'lodash';
import { history, useModel } from 'umi';
import * as utils from '../utils';
import ChangePassword from './ChangePassword';

import MyList from '../pages/ProcessInst/MyList';

const { Header, Sider, Content } = Layout;

//为了解决关闭tab,setActiveKey没有起作用问题
let flagKey;

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const { tabPanes, setTabPanes, activeKey, setActiveKey } =
    useModel('useTabPanes');
  const [openKeys, setOpenKeys] = useState([]);

  let rootSubmenuKeys = [];

  const onClick = ({ key }) => {
    setActiveKey(key);
    if (tabPanes.indexOf(key) >= 0) {
    } else {
      let arr = [...tabPanes];
      arr.push(key);
      setTabPanes(arr);
    }
  };

  const renderMenu = (menuList) => {
    if (utils.env === 'dev') {
      openKeys.push('xxxx');
      return (
        <Menu.SubMenu
          key="xxxx"
          icon={<SettingOutlined />}
          title="xxx"
          onClick={onClick}
        >
          <Menu.Item key="10-流程设计-processDesignPath">流程设计</Menu.Item>
          <Menu.Item key="1-数据字典-sysDicPath">数据字典</Menu.Item>
          <Menu.Item key="2-部门管理-sysDeptPath">部门管理</Menu.Item>
          <Menu.Item key="3-角色管理-sysRolePath">角色管理</Menu.Item>
          <Menu.Item key="3-用户管理-sysUserPath">用户管理</Menu.Item>
          <Menu.Item key="4-权限管理-sysDicPath">权限管理</Menu.Item>
          <Menu.Item key="4-公司主管领导-chargeDeptLeaderPath">
            公司主管领导
          </Menu.Item>
          <Menu.Item key="4-固定资产类别-categoryPath">固定资产类别</Menu.Item>
          <Menu.SubMenu title="年度计划" key="年度计划">
            <Menu.Item key="1-办公营具计划-officeToolPlanPath">
              办公营具计划
            </Menu.Item>
            <Menu.Item key="22-办公营具汇总-officeToolPlan2Path">
              办公营具汇总
            </Menu.Item>
            <Menu.Item key="22-办公营具预算-officeToolPlan3Path">
              办公营具预算
            </Menu.Item>
            <Menu.Item key="11-设备仪器仪表计划-instrumentPlanPath">
              设备仪器仪表计划
            </Menu.Item>
            <Menu.Item key="33-设备仪器仪表汇总-instrumentPlan2Path">
              设备仪器仪表汇总
            </Menu.Item>
            <Menu.Item key="33-设备仪器仪表预算-instrumentPlan3Path">
              设备仪器仪表预算
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="1-办公营具购置-assetBuy1Path">办公营具购置</Menu.Item>
          <Menu.Item key="1-设备仪器仪表购置-assetBuy2Path">
            设备仪器仪表购置
          </Menu.Item>
          <Menu.Item key="4-新购发票-taxInvoicePath">新购发票</Menu.Item>
          <Menu.SubMenu title="设备转固" key="设备转固">
            <Menu.Item key="1-入库-instrumentInPath">入库</Menu.Item>
            <Menu.Item key="11-出库-instrumentOutPath">出库</Menu.Item>
            <Menu.Item key="11-设备卡片-instrumentCardPath">设备卡片</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4-办公营具登记卡片-officeToolCardPath">
            办公营具卡片
          </Menu.Item>
          <Menu.Item key="4-房屋及构建筑物卡片-houseCardPath">
            房屋及构建筑物卡片
          </Menu.Item>
          <Menu.SubMenu title="维保检管理" key="维保检管理">
            <Menu.Item key="1-维修申请-assetRepairPath">维保检申请</Menu.Item>
            <Menu.Item key="11-维保检验收-assetAcceptPath">
              维保检验收
            </Menu.Item>
            <Menu.Item key="11-维保检发票-taxInvoicePath">维保检发票</Menu.Item>
            <Menu.Item key="11-维修记录单-sysDicPath">维修记录单-sap</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4-设备移动-assetMovePath">设备移动</Menu.Item>
          <Menu.Item key="4-设备调拨-assetTurnPath">设备调拨</Menu.Item>
          <Menu.SubMenu title="报废管理" key="报废管理">
            <Menu.Item key="11-报废鉴定项目-assetScrapProject1Path">
              报废鉴定项目
            </Menu.Item>
            <Menu.Item key="1-报废申请-assetScrapPath">报废申请</Menu.Item>
            <Menu.Item key="11-报废处置-assetScrapValuePath">
              报废处置
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4-资产查询-sysDicPath">资产查询</Menu.Item>
          <Menu.Item key="4-盘点管理-sysDicPath">盘点管理</Menu.Item>
          <Menu.Item key="4-折旧管理-assetLostPath">折旧管理</Menu.Item>
          <Menu.SubMenu title="统计" key="统计">
            <Menu.Item key="11-车辆情况-assetScrapProject1Path">
              车辆情况
            </Menu.Item>
            <Menu.Item key="1-房屋情况-assetScrapPath">房屋情况</Menu.Item>
            <Menu.Item key="1-资产台账-assetScrapPath">资产台账</Menu.Item>
            <Menu.Item key="1-资产报废-assetScrapPath">资产报废</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      );
    }
    return (
      menuList &&
      menuList.map((item) => {
        if (item.children) {
          rootSubmenuKeys.push(item.id + '');
          return (
            <Menu.SubMenu
              key={item.id}
              icon={React.createElement(ICONS[item.icon])}
              title={item.name}
              onClick={onClick}
            >
              {renderMenu(item.children)}
            </Menu.SubMenu>
          );
        }
        return (
          <Menu.Item key={item.id + '-' + item.name + '-' + item.path}>
            {item.name}
          </Menu.Item>
        );
      })
    );
  };

  const closeTabPane = () => {
    let arr = [...tabPanes];
    //找到下一个tab
    let index = _.findIndex(arr, (key) => key === activeKey);
    if (index === 0) {
      if (arr.length > 1) {
        flagKey = arr[index + 1];
      } else {
        flagKey = '我的桌面';
      }
    } else {
      flagKey = arr[index - 1];
    }
    _.remove(arr, (key) => key === activeKey);
    setTabPanes(arr);
    //设置不起作用
    // setActiveKey(flagKey)
  };

  const renderTabPane = () => {
    if (flagKey) {
      setActiveKey(flagKey);
      flagKey = undefined;
    }
    return tabPanes.map((key) => {
      let [id, name, path] = key.split('-');
      let realPath = utils[path];
      let tab = name;
      if (activeKey === key) {
        tab = (
          <span>
            {name}
            <a onClick={closeTabPane}>
              <CloseOutlined
                style={{
                  color: 'rgba(0,0,0,.45)',
                  marginRight: 0,
                  marginLeft: 6,
                }}
              />
            </a>
          </span>
        );
      }
      return (
        <Tabs.TabPane tab={tab} key={key}>
          <div style={{ padding: '0px 12px' }}>
            <realPath.List />
          </div>
        </Tabs.TabPane>
      );
    });
  };

  useEffect(async () => {
    setOpenKeys(rootSubmenuKeys);
    //
    // await utils.get(utils.checkUserPath.haveLogin)
  }, []);

  const DropdownMenu = (
    <Menu>
      <Menu.Item>
        <div style={{ float: 'left', width: 20 }}>
          <EditOutlined />
        </div>
        <ChangePassword />
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header style={{ backgroundColor: '#1890ff', padding: 0, color: '#fff' }}>
        <span className={collapsed ? 'left-none' : 'left-block'}>
          {collapsed ? 'A' : 'Asset'}
        </span>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: () => {
              setCollapsed(!collapsed);
            },
          },
        )}
        <span className="web-name">固定资产系统</span>
        <div className="right">
          <Dropdown overlay={DropdownMenu} className="user">
            <span>
              <UserOutlined style={{ paddingRight: 5, fontSize: 20 }} />
              {utils.env === 'dev' ? 'xxx' : utils.session.getItem('name')}
            </span>
          </Dropdown>
          <span className="user">
            <Button
              type={'link'}
              style={{ color: '#fff', fontSize: 16 }}
              onClick={async () => {
                const data = await utils.get(utils.sysUserPath.logout);
                if (data) {
                  history.push('/login');
                }
              }}
            >
              <LogoutOutlined />
              退出登录
            </Button>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: '#fff' }}
          width={200}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[activeKey]}
            openKeys={openKeys}
            onOpenChange={(openkeys) => setOpenKeys(openkeys)}
          >
            {renderMenu(utils.session.getItem('menuList'))}
          </Menu>
        </Sider>
        <Content style={{ minHeight: document.body.clientHeight - 70 }}>
          <Tabs
            tabBarStyle={{ background: '#fff', height: 60 }}
            tabBarGutter={0}
            animated={false}
            activeKey={activeKey}
            onTabClick={(key) => setActiveKey(key)}
          >
            <Tabs.TabPane tab="我的桌面" key="我的桌面">
              <div style={{ padding: '0px 12px' }}>
                <MyList />
              </div>
            </Tabs.TabPane>
            {renderTabPane()}
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};
