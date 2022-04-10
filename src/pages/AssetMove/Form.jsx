import {
  ArrayTable,
  DatePicker,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  PreviewText,
  Radio,
  Select,
  TreeSelect,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, ConfigProvider, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  LoadingButton,
  NumberPicker,
} from '../../components'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'
import zhCN from 'antd/lib/locale/zh_CN'
import { get, session, sysDeptPath } from '../../utils'

//文本框+按钮
const InputButton = (props) => {
  const index = ArrayTable.useIndex()
  const row = ArrayTable.useRecord()
  props.form.query('list.' + index + '.*(categoryName,code,number,startMoney)').forEach(field => field.setPattern('disabled'))
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
    FormLayout, FormItem, Input, ArrayTable, Select, Radio,
    ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, InputButton,
    NumberPicker, FormGrid, DatePicker, File, TreeSelect, PreviewText,
  },
})

export default (props) => {
  let { form, type } = props
  useEffect(async () => {
    form.query('*(createDatetime,displayName,deptName,code,categoryName,useDeptName,oldDisplayName)').forEach(field => field.setPattern('disabled'))
    if (type === 'add') {
      const user = session.getItem('user')
      form.setValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        displayName: user.displayName,
        loginName: user.loginName,
        deptId: user.deptId,
        deptName: user.deptName,
      })
    }
  }, [])


  const onClick = (index, row) => {
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
                    form.setValues({
                      code: selectedRow.code,
                      name: selectedRow.name,
                      categoryId: selectedRow.categoryId,
                      categoryName: selectedRow.categoryName,
                      guid: selectedRow.guid,
                      oldLocation: selectedRow.location,
                      useDeptId: selectedRow.useDeptId,
                      useDeptName: selectedRow.useDeptName,
                      oldLoginName: selectedRow.useLoginName,
                      oldDisplayName: selectedRow.useDisplayName,
                    })
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
  }

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={100} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="deptName" title="申请部门" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="code" title="资产编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="name" required title={'资产名称'} x-decorator="FormItem" x-component="InputButton"
            x-component-props={{ onClick: onClick, form: form }}
          />
          <SchemaField.String name="categoryName" title={'资产类别'} x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useDeptName" title="使用部门" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="oldDisplayName" title="原使用人" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="newDisplayName" required title="新使用人" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="moveDate" required title="移动日期" x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String
            name="remark" title="备注" x-decorator="FormItem"
            x-component="Input.TextArea"
            x-component-props={{ rows: 2 }} x-decorator-props={{ gridSpan: 2 }}
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}
