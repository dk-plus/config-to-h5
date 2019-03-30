import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Button, Divider, Form, message, Row, Col, Input, Select, DatePicker, Icon, InputNumber } from 'antd';
import moment from 'moment';
import { ONLINE_STATUS } from '../../utils/enum';
import { getParentPath } from '../../utils/utils';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

class ActivityEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    modules: [],
  }

  componentDidMount() {
    const { dispatch, location: { query } } = this.props;

    this.loadData(query);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/initState',
    });
  }

  // 加载数据
  loadData(params) {
    const { dispatch } = this.props;

    if (!params.id) {
      return;
    }

    dispatch({
      type: 'template/getDetail',
      payload: params.id
    }).then(res => {
      if (res && res.returnCode === '0' && res.returnValue) {
        const modules = res.returnValue.modules;
        this.setState({
          modules
        });
      }
    })
  }

  // 返回上一层
  backToUrl() {
    const { location, dispatch } = this.props;
    let pathname = getParentPath(location);

    dispatch(routerRedux.push({ pathname }));
  }

  // 提交
  handleSubmit = (e) => {
    e && e.preventDefault();

    const { dispatch, form, location: { query } } = this.props;

    form.validateFieldsAndScroll((err, formValue) => {
      if (err) {
        message.warn('表单校验不通过');
        return;
      }

      const params = {
        ...formValue,
      }

      // 处理时间
      if (params.activeTime && params.activeTime.length > 0) {
        params.beginTime = params.activeTime[0].startOf('day').valueOf();
        params.endTime = params.activeTime[1].endOf('day').valueOf();
        delete params.activeTime;
      }

      let url = 'template/create';

      if (query.id) {
        url = 'template/update';
      }

      dispatch({
        type: url,
        payload: { 
          id: query.id || '',
          params 
        }
      }).then(res => {
        if (res.returnCode === '0') {
          message.success('保存成功');
          this.backToUrl();
        }
      });
    });
  }

  // 切换编辑模式
  handleChangeEditMode(index, mode) {
    const { modules } = this.state;
    modules[index].editMode = mode;
    this.setState({
      modules
    });
  }

  // 添加模块
  handleSaveModule(index, id) {
    const { dispatch, form, location: { query } } = this.props;
    const { getFieldValue } = form;
    let url = 'module/create';
    if (id) {
      url = 'module/update';
    }

    const params = getFieldValue('module')[index];
    params.activityId = query.id;
    console.log(params)
    dispatch({
      type: url,
      payload: { 
        id: params.id || '',
        params 
      }
    }).then(res => {
      if (res.returnCode === '0') {
        message.success('保存成功');
        this.loadData(query);
        // this.backToUrl();
      }
    });
  }

  // 添加空模块
  handleAddNullMoudle() {
    const { modules } = this.state;
    modules.push({});
    this.setState({
      modules
    });
  }

  // 渲染单个模块
  renderSingleModule(moduleItem, index) {
    const { getFieldDecorator } = this.props.form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8, lg: 8 };
    return <Card 
      title={`模块${index+1}`} 
      key={index} 
      style={{marginBottom: '5px'}}
      extra={
        moduleItem.editMode &&
        <>
          <Button type="primary" size="small" onClick={() => {
            this.handleChangeEditMode(index, false);
            this.handleSaveModule(index, moduleItem.id);
          }}>保存</Button>
          <Divider type="vertical" />
          <Button size="small" onClick={() => {
            this.handleChangeEditMode(index, false);
          }}>取消</Button>
        </> ||
        <Button type="dashed" size="small" onClick={() => {
          this.handleChangeEditMode(index, true);
        }}>编辑</Button>
      }
    >
      <Row gutter={rowGutter}>
      {
        moduleItem.id &&
        <Col {...colSpan}>
          <Form.Item label="ID">
          {getFieldDecorator(`module[${index}].id`,{
            initialValue: moduleItem.id,
          })(
            moduleItem.editMode &&
            <Input disabled /> ||
            <span>{moduleItem.id}</span>
          )}
          </Form.Item>
        </Col>
      }
      </Row>
      <Row gutter={rowGutter}>
        <Col {...colSpan}>
          <Form.Item label="标题">
          {getFieldDecorator(`module[${index}].title`,{
            initialValue: moduleItem.title,
          })(
            moduleItem.editMode &&
            <Input placeholder="请输入标题" /> ||
            <span>{moduleItem.title}</span>
          )}
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="类型">
          {getFieldDecorator(`module[${index}].type`,{
            initialValue: moduleItem.type,
          })(
            moduleItem.editMode &&
            <InputNumber style={{width: '100%'}} placeholder="请输入类型" /> ||
            <span>{moduleItem.type}</span>
          )}
          </Form.Item>
        </Col>
        <Col {...colSpan}>
          <Form.Item label="排序">
          {getFieldDecorator(`module[${index}].sort`,{
            initialValue: moduleItem.sort,
          })(
            moduleItem.editMode &&
            <InputNumber style={{width: '100%'}} placeholder="请输入排序" /> ||
            <span>{moduleItem.sort}</span>
          )}
          </Form.Item>
        </Col>
      </Row>
    </Card>
  }

  // 渲染模块
  renderModule() {
    const { modules } = this.state;
    return <Card title="模块信息" actions={[
      <Button type="dashed" size="large" onClick={() => {this.handleAddNullMoudle()}}>
        <Icon type="plus"/>添加模块
      </Button>
    ]}>
      {
        modules.map((module, index) => this.renderSingleModule(module, index))
      }
    </Card>
  }

  renderForm() {
    const { template: { detail }, location: { pathname }, form, editLoading } = this.props;
    const { getFieldDecorator } = form;
    const rowGutter = { xs: 8, sm: 16, md: 16, lg: 24 };
    const colSpan = { xs: 24, sm: 12, md: 8, lg: 8 };
    return <Fragment>
      <Form onSubmit={this.handleSubmit}>
        <Card title="基本信息" style={{marginBottom: '15px'}}>
          {
            detail.id && 
            <Row gutter={rowGutter}>
              <Col {...colSpan}>
                <Form.Item label="活动ID">{detail.id || '无'}</Form.Item>
              </Col>
              <Col {...colSpan}>
                <Form.Item label="创建时间">{detail.createdAt && moment(detail.createdAt).format('YYYY-MM-DD HH:mm:ss') || '无'}</Form.Item>
              </Col>
              <Col {...colSpan}>
                <Form.Item label="修改时间">{detail.updatedAt && moment(detail.updatedAt).format('YYYY-MM-DD HH:mm:ss') || '无'}</Form.Item>
              </Col>
            </Row>
          }
          <Row gutter={rowGutter}>
            <Col {...colSpan}>
              <Form.Item label="活动名称">
                {getFieldDecorator('name',{
                  rules: [{
                    required: true,
                    message: '请输入活动名称',
                  }],
                  initialValue: detail.name,
                })(
                  <Input placeholder="请输入活动名称" />
                )}
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item label="活动标题">
                {getFieldDecorator('title',{
                  initialValue: detail.title,
                })(
                  <Input placeholder="请输入活动标题" />
                )}
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item label="活动链接">
                {getFieldDecorator('url',{
                  initialValue: detail.url,
                })(
                  <Input placeholder="请输入活动链接" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={rowGutter}>
            <Col {...colSpan}>
              <Form.Item label="活动时间">
                {getFieldDecorator('activeTime',{
                  initialValue: detail.beginTime && detail.endTime && [moment(detail.beginTime), moment(detail.endTime)],
                })(
                  <RangePicker
                    disabledDate={(current) => {
                      return current && current < moment().startOf('day');
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item label="活动类型">
                {getFieldDecorator('type',{
                  initialValue: detail.type,
                })(
                  <Select placeholder="请选择类型" allowClear>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item label="状态">
                {getFieldDecorator('status',{
                  initialValue: detail.status,
                })(
                  <Select placeholder="请选择状态" allowClear>
                    <Option key={ONLINE_STATUS.ONLINE} value={ONLINE_STATUS.ONLINE}>上线</Option>
                    <Option key={ONLINE_STATUS.OFFLINE} value={ONLINE_STATUS.OFFLINE}>下线</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={rowGutter}>
            <Col {...colSpan}>
              <Form.Item label="描述">
                {getFieldDecorator('description',{
                  initialValue: detail.description,
                })(
                  <TextArea placeholder="请输入活动描述" rows={4}/>
                )}
              </Form.Item>
            </Col>
            <Col {...colSpan}>
              <Form.Item label="规则">
                {getFieldDecorator('rule',{
                  initialValue: detail.rule,
                })(
                  <TextArea placeholder="请输入活动规则" rows={4}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row type="flex" justify="end" style={{marginTop: '20px'}}>
            <Col>
              <Button type="primary" htmlType="submit" loading={editLoading}>提交</Button>
              <Divider type="vertical"/>
              <Button onClick={() => { this.backToUrl() }}>取消</Button>
            </Col>
          </Row>
        </Card>
        {
          this.renderModule()
        }
      </Form>
    </Fragment>
  }

  render() {
    const { template: { detail }, location: { pathname }, loading } = this.props;
    return (
      <Card bordered={false} bodyStyle={{padding: 0}} loading={loading}>
        {this.renderForm()}
      </Card>
    )
  }
}

function mapStateToProps({ template, module, loading }) {
  return {
    template,
    module,
    loading: loading.effects['template/getDetail'],
    editLoading: loading.effects['template/create', 'template/update'],
    saveModuleLoading: loading.effects['module/create', 'module/update'],
  }
}

export default Form.create()(connect(mapStateToProps)(ActivityEdit));