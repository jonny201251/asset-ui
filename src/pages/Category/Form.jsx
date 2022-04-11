import { Form, FormItem, FormLayout, Input, TreeSelect } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { useEffect } from 'react'
import { categoryPath, get } from '../../utils'
import { NumberPicker } from '../../components'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input, TreeSelect, NumberPicker },
})

export default (props) => {
  let { form, record } = props

  useEffect(async () => {
    const data = await get(categoryPath.getTreeSelect)
    if (data) {
      form.query('pid').take().dataSource = data
    }
  }, [])

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.Number
          name="pid" title="上级名称" x-decorator="FormItem"
          x-component="TreeSelect" x-component-props={{ treeDefaultExpandAll: true }}/>
        <SchemaField.String name="name" required title="资产类别" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="useYear" required title="使用年限" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="codePrefix"  title="资产编号前缀" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number name="sort" x-decorator="FormItem" title="排序" x-component="NumberPicker"/>
        <SchemaField.String
          name="remark" title="备注" x-decorator="FormItem"
          x-component="Input.TextArea" x-component-props={{ rows: 2 }}
        />
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

