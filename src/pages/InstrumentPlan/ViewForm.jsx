import { ArrayTable, Form, FormGrid, FormItem, FormLayout, Input, Select } from '@formily/antd'
import { createSchemaField } from '@formily/react'
import { ArrayTableIndex, NumberPicker } from '../../components'
import { ConfigProvider, Tabs } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import ProcessDesignGraph from '../ProcessDesignGraph'
import ProcessInstNodeList from '../ProcessInstNode/List'

const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, ArrayTable, Select, ArrayTableIndex,
    NumberPicker, FormGrid,
  },
})

export default (props) => {
  let { form, record } = props

  return <ConfigProvider locale={zhCN}>
    <Tabs animated={false} size={'small'}>
      <Tabs.TabPane tab="表单数据" key="1">
        <Form form={form} labelWidth={100}>
          <SchemaField>
            <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
              <SchemaField.String name="checkName" title="计划名称" x-decorator="FormItem" x-component="Input"/>
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
                                  x-component-props={{ width: 100, title: '类别', align: 'center' }}>
                  <SchemaField.String name="lifeCycle" required x-decorator="FormItem" x-component="Input"/>
                </SchemaField.Void>
                <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '名称', align: 'center' }}>
                  <SchemaField.String name="name" x-decorator="FormItem" x-component="Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column" x-component-props={{ width: 100, title: '单位', align: 'center' }}>
                  <SchemaField.String name="unit" required x-decorator="FormItem" x-component="Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column" x-component-props={{ width: 100, title: '数量', align: 'center' }}>
                  <SchemaField.String name="number" x-decorator="FormItem" x-component="Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column" x-component-props={{ width: 100, title: '参考价格', align: 'center' }}>
                  <SchemaField.String name="price" x-decorator="FormItem" x-component="Input"/>
                </SchemaField.Void>
                <SchemaField.Void
                  x-component="ArrayTable.Column" x-component-props={{ width: 100, title: '优先级别', align: 'center' }}>
                  <SchemaField.String name="level" required x-decorator="FormItem" x-component="Input"/>
                </SchemaField.Void>
                <SchemaField.Void x-component="ArrayTable.Column"
                                  x-component-props={{ title: '申请理由', align: 'center' }}>
                  <SchemaField.String name="remark" x-decorator="FormItem" x-component="Input" default={'新购'}/>
                </SchemaField.Void>
              </SchemaField.Object>
            </SchemaField.Array>
          </SchemaField>
        </Form>
      </Tabs.TabPane>
      <Tabs.TabPane tab="流程图" key="2">
        <ProcessDesignGraph processInstId={record.processInstId}/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="审批记录" key="3">
        <ProcessInstNodeList processInstId={record.processInstId}/>
      </Tabs.TabPane>
    </Tabs>
  </ConfigProvider>
}
