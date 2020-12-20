import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input, notification, Icon } from 'antd';
import TagsService from './TagsService.js'

import './tag.css';

const FormItem = Form.Item;

class CreateKnowledgeTagComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tags: [],
      visible: false,
      tag: {
        value: ''
      },
    }
  }

  componentDidMount() {
    TagsService.getAllTags()
      .then(response => {
        this.setState({ tags: response.data })
      })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
      tag: {
        value: ''
      }
    });

    const tag = {
      name: this.state.tag.value
    }

    TagsService.createNewtag(tag)
      .then(response => {
        TagsService.getAllTags()
          .then(response => {
            this.setState({ tags: response.data })
          })

        notification.success({
          message: 'Taskit',
          description: `Tag ${response.data.name} created`,
          duration: 2
        });
      })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
      tag: {
        value: ''
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: {
        value: event.target.value
      }
    });
  }

  deleteTag = (record) => {
    TagsService.deleteTag(record.id)
      .then(() => {
        TagsService.getAllTags()
          .then(response => {
            this.setState({ tags: response.data })
          })
      }).catch(() => {
        notification.error({
          message: 'Taskit',
          description: 'Sorry! Something went wrong. Please try again later!',
          duration: 2
        });
      })
  }

  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <div>{'#' + text}</div>,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Delete',
        key: 'Delete',
        align: 'center',
        render: (record) => (
          <Icon
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            type="delete"
            onClick={() => this.deleteTag(record)} />
        )
      }];

    return (
      <div className="CreateKnowledgeTagComponent">
        <div className="div-bot">
          <h1 style={{ float: 'left' }}>
            <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
            <p style={{ display: 'inline', color: '#696969' }}>Manage knowledge tags</p>
            <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
          </h1>
          <Button
            style={{ float: 'right' }}
            className="button-su"
            onClick={() => this.showModal()}> Create knowledge tag</Button>
        </div>
        <Table
          scroll={{ y: 460 }}
          size="small"
          pagination={{ pageSize: 10, position: 'bottom', size: 'small' }}
          className="table-tasks"
          columns={columns}
          rowKey="id"
          dataSource={this.state.tags} />
        <Modal
          title={
            <h3>
              <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
              <p style={{ display: 'inline', color: '#696969' }}>Add knowledge tag</p>
              <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
            </h3>
          }
          centered={true}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Form>
            <FormItem
              hasFeedback
              className="form-group"
              validateStatus={this.state.tag.validateStatus}
              help={this.state.tag.errorMsg}>
              <Input
                size="large"
                name="tag"
                type="text"
                autoComplete="off"
                placeholder="Tag"
                value={this.state.tag.value}
                onChange={(event) => this.handleChange(event)} />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default CreateKnowledgeTagComponent;
