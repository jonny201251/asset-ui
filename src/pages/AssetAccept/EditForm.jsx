import { ArrayTable, DatePicker, Form, FormGrid, FormItem, FormLayout, Input, Select, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, File, NumberPicker } from '../../components'
import { session } from '../../utils'
import styles from '../table-placeholder.less'
import zhCN from 'antd/lib/locale/zh_CN'


const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, ArrayTable, Select,
    ArrayTableAddition, ArrayTableIndex, ArrayTableRemove,
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
          <SchemaField.String name="deptName" title="创建部门" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="createDatetime" title="创建时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="code" title="资产编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="name" title="资产名称" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="categoryId" title="资产类别" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="buyDate" title="购置日期" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useDate" title="启用日期" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="acceptDate" title="验收日期" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useDeptName" title="使用部门" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="location" title="使用地点" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="repairType" title="操作类型" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="remark" title="备注" x-component="Input.TextArea"
                              x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}/>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}
