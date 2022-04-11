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
  TreeSelect,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  LoadingButton,
  File,
  NumberPicker,
} from '../../components'
import { session } from '../../utils'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'

//文本框+按钮
const InputButton = (props) => {
  const index = ArrayTable.useIndex()
  const row = ArrayTable.useRecord()
  if (!row.planType || row.planType === '计划外') {
    props.form.query('list.' + index + '.*(planType)').forEach(field => {
      if (!field.value) {
        field.setValue('计划外')
      }
    })
    props.form.query('list.' + index + '.*(!planType,remark,categoryId,fileList,moneyFrom)').forEach(field => {
      field.setPattern('editable')
    })
    return <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }}/>
    </div>
  } else {
    props.form.query('list.' + index + '.*(!planType,remark,name,categoryId,fileList,moneyFrom)').forEach(field => field.setPattern('disabled'))
    return <div style={{ display: 'inline-flex', width: '100%' }}>
      <Input {...props} style={{ ...props.style }} readOnly/>
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
    NumberPicker, FormGrid, TreeSelect, File,
  },
})

export default (props) => {
  let { form, type } = props
  useEffect(async () => {
    form.query('*(startDatetime,displayName,deptName)').forEach(field => field.setPattern('disabled'))
    if (type === 'add') {
      const user = session.getItem('user')
      form.setValues({
        checkName: new Date().Format('yyyy年MM月dd日') + '的设备仪器仪表购置',
        startDatetime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
        userId: user.id,
        displayName: user.displayName,
        loginName: user.loginName,
        deptId: user.deptId,
        deptName: user.deptName,
        list: [{ planType: '计划内' }],
      })
    }
  }, [])

  const onClick = (index, row) => {
    if (row?.planType && row?.planType !== '计划外') {
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
                      row['name']=values.selectedRow.name
                      row['categoryId']=values.selectedRow.categoryId
                      row['categoryName']=values.selectedRow.categoryName
                      row['unit']=values.selectedRow.unit
                      row['number']=values.selectedRow.number
                      row['price']=values.selectedRow.price
                      row['factory']=values.selectedRow.factory
                      row['brand']=values.selectedRow.brand
                      row['guid']=values.selectedRow.guid
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

  const showComment = () => {
    if (type === 'check') {
      return <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
        <SchemaField.String
          name="comment" title="审批意见" x-decorator="FormItem"
          x-component="Input.TextArea" x-component-props={{ placeholder: '请输入意见' }}
        />
      </SchemaField.Void>
    }
  }

  return <Form form={form} labelWidth={100} className={styles.placeholder}>
    <SchemaField>
      <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
        <SchemaField.String name="checkName" required title="购置名称" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="deptName" title="申请部门" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="displayName" title="申请人" x-decorator="FormItem" x-component="Input"/>
        <SchemaField.String name="startDatetime" title="申请时间" x-decorator="FormItem" x-component="Input"/>
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
          <SchemaField.Void x-component="ArrayTable.Column"
                            x-component-props={{ width: 110, title: '计划类别', align: 'center' }}>
            <SchemaField.String
              name="planType" required x-decorator="FormItem" x-component="Select"
              enum={[
                { label: '计划内', value: '计划内' },
                { label: '计划外', value: '计划外' },
              ]}
            />
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column"
                            x-component-props={{ width: 160, title: '设备类别', align: 'center' }}>
            <SchemaField.String name="categoryId" required x-decorator="FormItem" x-component="TreeSelect"
                                enum={session.getItem('categoryTreeSelect')}/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '名称', align: 'center' }}>
            <SchemaField.String
              name="name" required x-decorator="FormItem" x-component="InputButton"
              x-component-props={{ onClick: onClick, form: form }}
            />
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '型号规格', align: 'center' }}>
            <SchemaField.String name="modelSpec" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '技术要求', align: 'center' }}>
            <SchemaField.String name="techReq" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayTable.Column" x-component-props={{ width: 100, title: '单位', align: 'center' }}>
            <SchemaField.String
              name="unit" required x-decorator="FormItem" x-component="Select"
              enum={[
                { label: '次', value: '次' },
                { label: '个', value: '个' },
                { label: '根', value: '根' },
                { label: '块', value: '块' },
                { label: '辆', value: '辆' },
                { label: '台', value: '台' },
                { label: '套', value: '套' },
                { label: '组', value: '组' },
                { label: '座', value: '座' },
              ]}
            />
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayTable.Column" x-component-props={{ width: 100, title: '数量', align: 'center' }}>
            <SchemaField.Number name="number" x-decorator="FormItem" x-component="NumberPicker"/>
          </SchemaField.Void>
          <SchemaField.Void
            x-component="ArrayTable.Column" x-component-props={{ width: 100, title: '单价', align: 'center' }}>
            <SchemaField.Number name="price" x-decorator="FormItem" x-component="NumberPicker"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '生产厂商', align: 'center' }}>
            <SchemaField.String name="factory" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '品牌', align: 'center' }}>
            <SchemaField.String name="brand" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '资金来源', align: 'center' }}>
            <SchemaField.String name="moneyFrom" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
          <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '购置理由', align: 'center' }}>
            <SchemaField.String name="remark" x-decorator="FormItem" x-component="Input"/>
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
      {showComment()}
    </SchemaField>
  </Form>
}
