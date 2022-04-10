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
  PreviewText,
  Radio,
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
import { session } from '../../utils'
import { onFieldReact } from '@formily/core'

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
    form.query('*(createDatetime,displayName,deptName,code,categoryName)').forEach(field => field.setPattern('disabled'))
    if (type === 'add') {
      const user = session.getItem('user')
      form.setValues({
        createDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        userId: user.id,
        displayName: user.displayName,
        loginName: user.loginName,
        deptId: user.deptId,
        deptName: user.deptName,
        type: '一般设备',
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
                      categoryName: selectedRow.categoryName,
                      guid: selectedRow.guid,
                    })
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
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="deptName" title="申请部门" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="createDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="code" title="资产编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="name" required title={'资产名称'} x-decorator="FormItem" x-component="InputButton"
            x-component-props={{ onClick: onClick, form: form }}
          />
          <SchemaField.String name="categoryName" title={'资产类别'} x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String
            name="type" required title={'鉴定类别'} x-decorator="FormItem" x-component="Select"
            enum={[
              { label: '一般设备', value: '一般设备' },
              { label: '电气设备', value: '电气设备' },
              { label: '泵类设备', value: '泵类设备' },
              { label: '仪器仪表', value: '仪器仪表' },
            ]}
          />
        </SchemaField.Void>
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
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '项目', align: 'center' }}>
              <SchemaField.String name="projectName" required x-decorator="FormItem" x-component="PreviewText"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '检查项目及要求', align: 'center' }}>
              <SchemaField.String name="projectStandard" required x-decorator="FormItem" x-component="PreviewText"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '检查结果', align: 'center' }}>
              <SchemaField.String
                name="result" required x-decorator="FormItem" x-component="Radio.Group"
                enum={[
                  { label: '是', value: '是' },
                  { label: '否', value: '否' },
                  { label: '无此项', value: '无此项' },
                ]}
              />
            </SchemaField.Void>
          </SchemaField.Object>
        </SchemaField.Array>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String
            name="remark" title="情况说明" x-decorator="FormItem" x-component="Input.TextArea"
            x-decorator-props={{ gridSpan: 2 }}
          />
          <SchemaField.String
            name="result" required title="鉴定结果" x-decorator="FormItem" x-component="Input"
          />
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}
