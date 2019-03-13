import React from 'react';
import { connect } from 'dva';
import { Card, Input, Icon, Row, Col, Button, Form, Layout, Divider, Avatar, Progress, Tabs, Tag, List, Badge } from 'antd';
import { formItemLayout } from "../components/BaseLayout";
import style from './resume.less';

const Password = Input.Password;
const FormItem = Form.Item;
const { TabPane } = Tabs;
const { Content, Sider } = Layout;

class Resume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPerson() {
    const rowGutter = { xs: 8, sm: 16, md: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8 };

    return <Card title="个人简介">
      <Row gutter={rowGutter}>
        <Col {...colSpan}>
          <Avatar shape="square"/>
        </Col>
        <Col {...colSpan}>
          <FormItem {...formItemLayout} label="姓名">邓康</FormItem>
          <FormItem {...formItemLayout} label="性别">男</FormItem>
          <FormItem {...formItemLayout} label="意向">前端工程师</FormItem>
        </Col>
      </Row>
    </Card>
  }

  renderSimpleInfo() {
    return <Card title="个人信息">
      <FormItem {...formItemLayout} label="手机"><a href="tel:13556130815">135-5613-0815</a></FormItem>
      <FormItem {...formItemLayout} label="地址">天河区广东金融学院</FormItem>
      <FormItem {...formItemLayout} label="邮箱"><a href="mailto:dkplus.js@gmail.com">dkplus.js@gmail.com</a></FormItem>
      <FormItem {...formItemLayout} label="Github"><a href="https://github.com/dk-plus">https://github.com/dk-plus</a></FormItem>
    </Card>
  }

  renderSkill() {
    const skills = [{
      title: 'HTML',
      value: 80,
    }, {
      title: 'CSS',
      value: 80,
    }];
    return <Card title="个人技能">
      {
        skills.map(skill =>
          <FormItem {...formItemLayout} label={skill.title}>
            <Progress successPercent={skill.value} />
          </FormItem>
        )
      }
    </Card>
  }

  renderTag() {
    return <Card title="个人标签"></Card>
  }

  renderSchool() {
    return <Card title="校园经历"></Card>
  }

  renderCompany() {
    return <Card title="实习经历"></Card>
  }

  renderProject() {
    return <Card title="项目经历"></Card>
  }

  renderMyself() {
    return <Card title="个人自述"></Card>
  }

  renderTab() {
    const info = [{
      title: '教育经历',
      data: [{
        title: '广东金融学院-电子商务-本科',
        description: '主修课程：信息技术导论、计算机网络、数据结构与算法、信息安全技术、Java程序设计、数据库原理与设计、其他管理学科等',
        time: '2015.09-2019.06',
        tags: ['标签1','标签2','标签3'],
        content: [
          '加入爪哇部落，大三担任前端组组长，参与大学生创新创业项目，负责前端开发', 
          '参与动画设计，用PPT进行类AE转场的动画设计，为前端动画创意设计打下基础', 
        ],
      }]
    }, {
      title: '实习经历',
      data: [{
        title: '阿里巴巴-豌豆荚-前端开发',
        description: '一年的阿里前端开发经验',
        time: '2018.01.09-至今',
        tags: ['标签1', '标签2', '标签3'],
        content: [
          '负责阿里应用分发旗下PP助手、豌豆荚的相关业务，前期主要为H5活动页的制作，后期主要为运营后台的迁移和新增功能，另外负责豌豆荚站点的部分功能，以及对外内容创造平台的开发', 
          '懂得主动与产品、运营、服务端、设计交流，高质完成任务', 
          '能很好的理解PRD，关注用户体验问题',
          '关注开发体验和效率问题，提炼业务可复用代码作为模块、组件，提高开发效率、改善组件使用体验',
        ],
      }]
    }, {
      title: '项目经历',
      data: [{
        title: '豌豆荚运营后台',
        description: '开发了新后台一半以上的功能',
        time: '2018.06-至今',
        tags: ['标签1', '标签2', '标签3'],
        content: [
          '完成旧运营后台往新后台的逐步迁移，对新后台新增功能', 
          '使用Egg+Dva+antd作为前端技术栈，改善开发体验', 
          'UI交互使用ant-design，大大改善使用者操作体验',
          '改造和提炼了许多React基础组件与业务组件，提高开发效率',
        ],
      }, {
        title: '内容创作平台',
        description: '从无到有开始一个项目',
        time: '2018-12',
        tags: ['标签1', '标签2', '标签3'],
        content: [
          '提供一个内容创作平台给外部人士编写文章，运营后台的延伸功能', 
          '运营后台分发任务，创作平台领取并完成任务，最后运营后台审核', 
          '使用Egg+Dva+antd作为前端技术栈，使用阿里内部的RPC协议与服务端通讯',
          '部分组件复用了运营后台的',
        ],
      }]
    }];

    return <Card>
      <Tabs>
        {
          info.map((exp, index) => <TabPane tab={exp.title} key={index}>
            <List
              itemLayout="vertical"
              dataSource={exp.data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>{item.title}</div> 
                        <div>{item.time}</div>
                      </div>
                    }
                    description={item.description}
                  />
                  {item.content.map((con, index) => <div>{index+1}、{con}</div>)}
                </List.Item>
              )}
            />
          </TabPane>)
        }
      </Tabs>
    </Card>
    
  }

  render() {
    const rowGutter = { xs: 8, sm: 16, md: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8 };

    return (
      <Card>
        {this.renderPerson()}
        {this.renderSimpleInfo()}
        {this.renderSkill()}
        {this.renderTab()}
      </Card>
    );
  }
}

export default Resume;
