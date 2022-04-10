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
  DatePicker,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, LoadingButton, NumberPicker } from '../../components'
import { session } from '../../utils'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

//文本框+按钮
const InputButton = (props) => {
  const index = ArrayTable.useIndex()
  const row = ArrayTable.useRecord()
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
    NumberPicker, FormGrid, DatePicker,
  },
})

export default (props) => {
  let { form, type } = props
  useEffect(async () => {
    if (type === 'add') {
      const user = session.getItem('user')
      form.setValues({
        userId: user.id, displayName: user.displayName, loginName: user.loginName,
        deptId: user.deptId, deptName: user.deptName,
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
        <SchemaField.Array
          name="list" x-decorator="FormItem" x-component="ArrayTable"
          x-component-props={{ size: 'small', sticky: true }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 80, title: '序号', align: 'center' }}>
              <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '生命周期', align: 'center' }}>
              <SchemaField.String
                name="lifeCycle" required x-decorator="FormItem" x-component="Select"
                enum={[
                  { label: '新购', value: '新购' },
                  { label: '维修', value: '维修' },
                  { label: '保养', value: '保养' },
                  { label: '检测', value: '检测' },
                ]}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 200, title: '资产名称', align: 'center' }}>
              <SchemaField.String
                name="assetName" x-decorator="FormItem" x-component="InputButton"
                x-component-props={{ onClick: onClick, form: form }}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '资产类别', align: 'center' }}>
              <SchemaField.String name="categoryName" required x-decorator="FormItem" x-component="Input"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '发票名称', align: 'center' }}>
              <SchemaField.String name="name" required x-decorator="FormItem" x-component="Input"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '发票代码', align: 'center' }}>
              <SchemaField.String name="code" required x-decorator="FormItem" x-component="Input"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '发票号码', align: 'center' }}>
              <SchemaField.String name="code2" required x-decorator="FormItem" x-component="Input"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 130, title: '开票日期', align: 'center' }}>
              <SchemaField.String name="startDate" required x-decorator="FormItem" x-component="DatePicker"/>
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
      </SchemaField>
    </Form>
  </ConfigProvider>
}
