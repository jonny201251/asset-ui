import {
  ArrayTable,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
  TreeSelect,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  LoadingButton,
  NumberPicker,
} from '../../components'
import { session } from '../../utils'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'

//文本框+按钮
const InputButton = (props) => {
  const index = ArrayTable.useIndex()
  const row = ArrayTable.useRecord()
  props.form.query('list.' + index + '.*(!planType,fileList,money,remark,name)').forEach(field => field.setPattern('disabled'))
  return <div style={{ display: 'inline-flex', width: '100%' }}>
    <Input {...props} style={{ ...props.style }} disabled/>
    <Button onClick={(e) => {
      if (props.onClick) {
        props.onClick(index, row)
      }
    }} icon={<SearchOutlined/>} type={'primary'}/>
  </div>
}

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, ArrayTable, Select,
    ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, InputButton,
    NumberPicker, FormGrid, TreeSelect, File,
  },
})

export default (props) => {
  let { form, type } = props
  useEffect(async () => {
    form.query('*(startDatetime,displayName,deptName)').forEach(field => field.setPattern('disabled'))
    if (type === 'add') {
      const user = session.getItem('user')
      form.setValues({
        checkName: new Date().Format('yyyyMMdd') + '的报废申请',
        startDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        userId: user.id,
        displayName: user.displayName,
        loginName: user.loginName,
        deptId: user.deptId,
        deptName: user.deptName,
        list: [{ planType: '计划内' }],
      })
    }
  }, [])

  const onClick = (index, row) => {
    if (row?.planType) {
      let dialog2 = FormDialog({ footer: null, keyboard: false, maskClosable: false, width: 800 },
        (form2) => {
          return <>
            <DialogList form={form2} dialog={dialog2} selectedId={row?.id}/>
            <FormDialog.Footer>
              <FormButtonGroup gutter={16} align={'right'}>
                <Button onClick={() => dialog2.close()}>取消</Button>
                <LoadingButton
                  onClick={async () => {
                    const values = await form2.submit()
                    if (values.selectedRow) {
                      //
                      let selectedRow = values.selectedRow
                      row['code'] = selectedRow.code
                      row['name'] = selectedRow.name
                      row['categoryName'] = selectedRow.categoryName
                      row['modelSpec'] = selectedRow.modelSpec
                      row['buyDate'] = selectedRow.buyDate
                      row['useDate'] = selectedRow.useDate
                      row['location'] = selectedRow.location
                      row['useDeptName'] = selectedRow.useDeptName
                      row['guid'] = selectedRow.guid
                      dialog2.close()
                    } else {
                      message.error('选择一条数据')
                    }
                  }}
                  type={'primary'}
                >
                  确定
                </LoadingButton>
              </FormButtonGroup>
            </FormDialog.Footer>
          </>
        },
      )
      dialog2.open({})
    } else {
      form.query('list.' + index + '.*(planType)').forEach(field => field.validate())
    }
  }

  const showComment = () => {
    if (type === 'check') {
      return <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
        <SchemaField.String
          name="comment" title="审批意见" x-decorator="FormItem"
          x-component="Input.TextArea" x-component-props={{ placeholder: '请输入意见' }}
        />
      </SchemaField.Void>
    }
  }

  return <Form form={form} labelWidth={100} className={styles.placeholder}>
    <SchemaField>
      <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
        <SchemaField.String name="checkName" required title="报废名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="deptName" title="申请部门" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="startDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
      </SchemaField.Void>
      <SchemaField.Array
        name="list" x-decorator="FormItem" x-component="ArrayTable"
        x-component-props={{ size: 'small', sticky: true }}
      >
        <SchemaField.Object>
          <SchemaField.Void x-component="ArrayTable.Column"
                            x-component-props={{ width: 110, title: '计划类别', align: 'center' }}>
            <SchemaField.String
              name="planType" required x-decorator="FormItem" x-component="Select"
              enum={[
                { label: '计划内', value: '计划内' },
                { label: '计划外', value: '计划外' },
              ]}
            />
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column"
                            x-component-props={{ width: 160, title: '资产类别', align: 'center' }}>
            <SchemaField.String name="categoryName" required x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '资产编号', align: 'center' }}>
            <SchemaField.Number name="code" required x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '资产名称', align: 'center' }}>
            <SchemaField.String
              name="name" required x-decorator="FormItem" x-component="InputButton"
              x-component-props={{ onClick: onClick, form: form }}
            />
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '型号规格', align: 'center' }}>
            <SchemaField.String name="modelSpec" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>

          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '购置日期', align: 'center' }}>
            <SchemaField.String name="buyDate" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '使用日期', align: 'center' }}>
            <SchemaField.String name="useDate" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '使用部门', align: 'center' }}>
            <SchemaField.String name="useDeptName" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '使用地点', align: 'center' }}>
            <SchemaField.String name="location" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '报废说明', align: 'center' }}>
            <SchemaField.String name="remark" required x-decorator="FormItem" x-component="Input.TextArea"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '附件', align: 'center' }}>
            <SchemaField.String name="fileList" x-decorator="FormItem" x-component="File"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column"
                            x-component-props={{ width: 80, title: '操作', dataIndex: 'operations' }}>
            <SchemaField.Void x-component="FormItem">
              <SchemaField.Void x-component="ArrayTableRemove"/>
            </SchemaField.Void>
          </SchemaField.Void>
        </SchemaField.Object>
        <SchemaField.Void x-component="ArrayTableAddition" x-component-props={{ width: 80 }}/>
      </SchemaField.Array>
      {showComment()}
    </SchemaField>
  </Form>
}
