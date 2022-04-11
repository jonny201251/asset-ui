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
  if (!row.getStyle || row.getStyle === '无偿转入') {
    props.form.query('list.' + index + '.*').forEach(field => {
      field.setPattern('editable')
    })
    return <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }}/>
    </div>
  } else {
    props.form.query('list.' + index + '.*(categoryId,unit,price)').forEach(field => field.setPattern('disabled'))
    return <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }} disabled/>
      <Button onClick={(e) => {
        if (props.onClick) {
          props.onClick(index, row)
        }
      }} icon={<SearchOutlined/>} type={'primary'}/>
    </div>
  }
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
    if (row?.getStyle && row?.getStyle !== '无偿转入') {
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
                      row['name'] = values.selectedRow.name
                      row['categoryId'] = values.selectedRow.categoryId
                      row['categoryName'] = values.selectedRow.categoryName
                      row['number'] = values.selectedRow.number
                      row['price'] = values.selectedRow.price
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
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 130, title: '取得方式', align: 'center' }}>
              <SchemaField.String
                name="getStyle" x-decorator="FormItem" x-component="Select"
                enum={[
                  { label: '新购', value: '新购' },
                  { label: '无偿转入', value: '无偿转入' },
                  { label: '在建工程转入', value: '在建工程转入' },
                ]}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 160, title: '设备类别', align: 'center' }}>
              <SchemaField.String name="categoryId" required x-decorator="FormItem" x-component="TreeSelect"
                                  enum={session.getItem('categoryTreeSelect')}/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column"
                              x-component-props={{ width: 200, title: '设备名称', align: 'center' }}>
              <SchemaField.String
                name="name" required x-decorator="FormItem" x-component="InputButton"
                x-component-props={{ onClick: onClick, form: form }}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '使用年限', align: 'center' }}>
              <SchemaField.Number name="useYear" required x-decorator="FormItem" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '数量', align: 'center' }}>
              <SchemaField.Number name="number" required x-decorator="FormItem" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '单价', align: 'center' }}>
              <SchemaField.Number name="price" required x-decorator="FormItem" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '运输费', align: 'center' }}>
              <SchemaField.Number name="moveMoney" required x-decorator="FormItem" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '安装费', align: 'center' }}>
              <SchemaField.Number name="installMoney" required x-decorator="FormItem" x-component="NumberPicker"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '资料份数', align: 'center' }}>
              <SchemaField.Number name="fileNumber" required x-decorator="FormItem" x-component="NumberPicker"/>
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
      </SchemaField>
    </Form>
  </ConfigProvider>
}
