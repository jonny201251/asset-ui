import { Form, FormItem, FormLayout, Input } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { NumberPicker } from '../../components'

const SchemaField = createSchemaField({
  components: { FormLayout, FormItem, Input },
})

export default (props) => {
  let { form, record } = props

  useEffect(() => {
    if (record) {
      form.setValues(record)
    }
  }, [])

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.String name="type" required title="类别" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="name" required title="名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.Number name="sort" x-decorator="FormItem" title="排序" x-component="NumberPicker"/>
        <SchemaField.String
          name="remark" title="备注" x-decorator="FormItem"
          x-component="Input.TextArea"
          x-component-props={{ rows: 2 }}
        />
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

