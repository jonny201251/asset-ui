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
  LoadingButton,
  NumberPicker,
  File,
} from '../../components'
import { session } from '../../utils'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'
import zhCN from 'antd/lib/locale/zh_CN'

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
    FormLayout, FormItem, Input, ArrayTable, Select,
    ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, InputButton,
    NumberPicker, FormGrid, DatePicker, File, TreeSelect,
  },
})

export default (props) => {
  let { form, type } = props
  useEffect(async () => {

  }, [])


  const onClick = (index, row) => {
    console.log(row)
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
                    row['number'] = selectedRow.number
                    row['startMoney'] = selectedRow.startMoney
                    row['guid'] = selectedRow.guid

                    // form.query('list.' + index + '.number').take()?.setValidator({
                    //   minimum: 1,
                    //   maximum: selectedRow.number,
                    //   required: true,
                    // })
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
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '设备编号', align: 'center' }}>
              <SchemaField.String name="code" required x-decorator="FormItem" x-component="Input"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 250, title: '设备名称', align: 'center' }}>
              <SchemaField.String
                name="name" required x-decorator="FormItem" x-component="InputButton"
                x-component-props={{ onClick: onClick, form: form }}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 160, title: '设备类别', align: 'center' }}>
              <SchemaField.String name="categoryName" required x-decorator="FormItem" x-component="Input"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '数量', align: 'center' }}>
              <SchemaField.Number name="number" required x-decorator="FormItem" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '原值', align: 'center' }}>
              <SchemaField.Number name="startMoney" required x-decorator="FormItem" x-component="NumberPicker"/>
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
