import React, { Component } from 'react'
//css modules 会自动化对样式选择器进行重新命名
import styles from './index.module.scss'
import { Layout, Menu, Popconfirm, message } from 'antd'
import { Switch, Route, Link } from 'react-router-dom'
import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import Home from 'pages/Home'
import ArticalList from 'pages/ArticalList'
import ArticalPublish from 'pages/ArticalPublish'
import { removeToken } from 'utils/storage'
import { getUserProfile } from 'api/user'

const { Header, Content, Sider } = Layout
const menuItems = [
  {
    key: '/home',
    icon: <HomeOutlined />,
    label: <Link to="/home">数据概览</Link>,
  },
  {
    key: '/home/list',
    icon: <DiffOutlined />,
    label: <Link to="/home/list">内容管理</Link>,
  },
  {
    key: '/home/publish',
    icon: <EditOutlined />,
    label: <Link to="/home/publish"> 发布文章</Link>,
  },
]
// const items2 = [HomeOutlined, DiffOutlined, EditOutlined].map((icon, index) => {
//   const key = String(index)
//   const context = ['数据概览', '内容管理', '发布文章']
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: context[`${key}`],
//   }
// })
export default class LayoutComponent extends Component {
  state = {
    profile: {},
  }
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>{this.state.profile.name}</span>
              <span>
                <Popconfirm
                  title="确定退出系统吗?"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={this.onConfirm}
                >
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={[this.props.location.pathname]}
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
                items={menuItems}
              ></Menu>
            </Sider>
            <Layout
              style={{
                padding: '24px',
              }}
            >
              <Content className="site-layout-background">
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route path="/home/list" component={ArticalList}></Route>
                  <Route
                    path="/home/publish"
                    component={ArticalPublish}
                  ></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
  async componentDidMount() {
    const res = await getUserProfile()
    this.setState({
      profile: res.data,
    })
  }
  onConfirm = () => {
    console.log('点击了确定按钮')
    // localStorage.removeItem('token')
    removeToken()
    this.props.history.push('/login')
    message.success('退出成功')
  }
}
