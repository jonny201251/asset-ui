import { Form, FormItem, FormLayout, Input, Upload, ArrayTable, Select } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { createForm } from '@formily/core'
import { ArrayTableAddition, ArrayTableIndex, ArrayTableRemove } from '../components'
import { post, contextPath } from '../utils'


const NormalUpload = (props) => {
  return <Upload
    {...props}
    action={contextPath + '/uploadFile'}
    headers={{
      authorization: 'authorization-text',
    }}
  >
    <Button icon={<UploadOutlined/>}>上传文件</Button>
  </Upload>
}


//文本框+按钮
const InputButton2 = (props) => {
  const index = ArrayTable.useIndex()
  const row = ArrayTable.useRecord()
  if (props.form.pattern === 'editable') {
    if (!row.type || row.type === '新购') {
      props.form.query('list.' + index + '.*(!type,uploadList)').forEach(field => field.setPattern('editable'))
      return <div style={{ display: 'inline-flex', width: '100%' }}>
        <Input {...props} style={{ ...props.style }}/>
      </div>
    } else {
      props.form.query('list.' + index + '.*(!type,uploadList)').forEach(field => field.setPattern('disabled'))
      return <div style={{ display: 'inline-flex', width: '100%' }}>
        <Input {...props} style={{ ...props.style }} disabled/>
        <Button onClick={(e) => {
          if (props.onClick) {
            props.onClick(index, row)
          }
        }} icon={<SearchOutlined/>} type={'primary'}/>
      </div>
    }
  } else {
    return <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }} readOnly/>
    </div>
  }
}

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, NormalUpload, ArrayTable, Select,
    ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, InputButton2,
  },
})

let form = createForm()
export default (props) => {

  useEffect(async () => {
    form.setValues({ list: [{ uploadList: [{ name: 'aa', status: 'done', url: 'www.baidu.com' }] }] })
    // form.query('list.*').take().setPattern('readOnly')
    // form.setPattern('readPretty')
    // form.query('list').forEach(field=>field.setPattern('disabled'))
  }, [])

  const onClick = (index, row) => {
    console.log(row)
  }

  return (
    <Form form={form}>
      <Button onClick={async () => {
        const data = await post(contextPath + '/test', form.values)
      }}>提交</Button>
      <SchemaField>
        <SchemaField.Array
          name="list" x-decorator="FormItem" x-component="ArrayTable"
          x-component-props={{ size: 'small', sticky: true, pagination: { pageSize: 200 } }}
        >
          <SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ title: '排序', align: 'center' }}
            >
              <SchemaField.Void x-decorator="FormItem" x-component="ArrayTable.SortHandle"/>
            </SchemaField.Void>
            <SchemaField.Void
              x-component="ArrayTable.Column"
              x-component-props={{ width: 80, title: '序号', align: 'center' }}>
              <SchemaField.Void x-decorator="FormItem" x-component="ArrayTableIndex"/>
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '类别', align: 'center' }}>
              <SchemaField.String
                name="type" x-decorator="FormItem" x-component="Select"
                enum={[
                  { label: '新购', value: '新购' },
                  { label: '维修', value: '维修' },
                ]}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '评价指标', align: 'center' }}>
              <SchemaField.String
                name="a" x-decorator="FormItem" x-component="InputButton2"
                x-component-props={{ onClick: onClick, form: form }}
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '评价指标2', align: 'center' }}>
              <SchemaField.String
                name="b" x-decorator="FormItem" x-component="Input"
              />
            </SchemaField.Void>
            <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '附件' }}>
              <SchemaField.String
                name="uploadList" x-decorator="FormItem" x-component="NormalUpload"
              />
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
  )
};
