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
          <SchemaField.String name="code" title="设备编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="name" title="设备名称" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="categoryId" title="设备类别" x-decorator="FormItem" x-component="TreeSelect"
                              enum={session.getItem('categoryTreeSelect')}/>
          <SchemaField.String name="modelSpec" title="型号规格" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="factory" title="生产厂商" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="brand" title="品牌" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="moneyFrom" title="资金来源" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="buyDate" title="购置日期" x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String name="useDate" title="启用日期" x-decorator="FormItem" x-component="DatePicker"/>
          <SchemaField.String
            name="unit" title="单位" x-decorator="FormItem" x-component="Select"
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
          <SchemaField.String name="number" title="数量" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String name="price" title="单价" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String name="moveMoney" title="运输费" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String
            name="installMoney" title="安装费" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String name="startMoney" title="原值" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="endMoney" title="净值" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="a" title="累计折旧" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="b" title="基数折旧" x-component="Input"
                              x-decorator="FormItem" x-decorator-props={{ tooltip: '截止至累计折旧(2020-12-31)' }}/>
          <SchemaField.String name="c" title="年折旧率" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="d" title="本年折旧" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="e" title="月折旧率" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="f" title="月折旧" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useYear" title="使用年限" x-decorator="FormItem" x-component="NumberPicker"/>
          <SchemaField.String name="getStyle" title="取得方式" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="location" title="使用地点" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useDeptName" title="使用部门" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useLoginName" title="使用人" x-decorator="FormItem"
                              x-component="Select" x-component-props={{ showSearch: true }}
                              enum={session.getItem('userList')}/>
          <SchemaField.String name="remark" title="备注" x-component="Input.TextArea"
                              x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}/>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}
