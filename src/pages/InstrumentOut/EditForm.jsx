import { DatePicker, Form, FormGrid, FormItem, FormLayout, Input, Select, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { File, NumberPicker } from '../../components'
import { session } from '../../utils'
import styles from '../table-placeholder.less'
import zhCN from 'antd/lib/locale/zh_CN'


const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, Select,
    NumberPicker, FormGrid, DatePicker, File, TreeSelect,
  },
})

export default (props) => {
  let { form, type } = props

  useEffect(() => {
    form.setPattern('disabled')
  }, [])

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={100} labelWrap={true} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="创建人" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="deptName" title="创建部门" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="创建时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="code" title="设备编号"  x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="name" title="设备名称"  x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="categoryId" title="设备类别"  x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="number" title="数量"  x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String name="startMoney" title="原值" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useDate" title="启用日期"  x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String name="location" title="使用地点" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useDeptName" title="使用部门" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useLoginName" title="使用人"  x-decorator="FormItem"
                              x-component="Select" x-component-props={{ showSearch: true }}
                              enum={session.getItem('userList')}/>

          <SchemaField.String name="remark" title="备注" x-component="Input.TextArea"
                              x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}/>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}
