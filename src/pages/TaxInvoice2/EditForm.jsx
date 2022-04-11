import { ArrayTable, Form, FormButtonGroup, FormDialog, FormItem, FormLayout, Input, DatePicker } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import DialogList from './DialogList'
import { LoadingButton } from '../../components'


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
  components: { FormLayout, FormItem, Input, InputButton, DatePicker },
})

export default (props) => {
  let { form, record } = props

  useEffect(() => {

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

  return <Form form={form}>
    <SchemaField>
      <SchemaField.Void x-component="FormLayout" x-component-props={{ labelCol: 6, wrapperCol: 16 }}>
        <SchemaField.String
          name="assetName" title={'设备名称'} x-decorator="FormItem" x-component="InputButton"
          x-component-props={{ onClick: onClick, form: form }}
        />
        <SchemaField.String name="name" title={'发票名称'} required x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="code" title={'发票代码'} required x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="code2" title={'发票号码'} required x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="startDate" title={'开票日期'} required x-decorator="FormItem" x-component="DatePicker"/>
      </SchemaField.Void>
    </SchemaField>
  </Form>
}

