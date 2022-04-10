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
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { Button, ConfigProvider, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  LoadingButton,
  NumberPicker,
  File,
} from '../../components'
import { session } from '../../utils'
import styles from '../table-placeholder.less'
import DialogList from './DialogList'
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


  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={100} labelWrap={true} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
          <SchemaField.String name="displayName" title="创建人" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="deptName" title="创建部门" x-component="Input" x-decorator="FormItem"/>
          <SchemaField.String name="createDatetime" title="创建时间" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="code" title="设备编号" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="name" title="设备名称" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="categoryName" title="设备类别" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="modelSpec" title="型号规格" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="factory" title="生产厂商" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="brand" title="品牌" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="moneyFrom" title="资金来源" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="buyDate" title="购置日期" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="unit" title="单位" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="number" title="数量" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="price" title="单价" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="moveMoney" title="运输费" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="installMoney" title="安装费" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="startMoney" title="原值" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="fileNumber" title="资料份数" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="useYear" title="使用年限" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="getStyle" title="取得方式" x-decorator="FormItem" x-component="Input"/>
          <SchemaField.String name="fileList" title="附件" x-decorator="FormItem" x-component="File"/>
          <SchemaField.String name="fileList" title="附件" x-component="File"
                              x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}/>
          <SchemaField.String name="remark" title="备注" x-component="Input.TextArea"
                              x-decorator="FormItem" x-decorator-props={{ gridSpan: 3 }}/>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}
