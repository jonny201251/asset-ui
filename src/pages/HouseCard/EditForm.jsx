import {
  ArrayTable,
  DatePicker,
  Form,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
  Select,
  TreeSelect,
  PreviewText,
} from '@formily/antd'
import { createSchemaField } from '@formily/react'
import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { ArrayTableAddition, ArrayTableIndex, ArrayTableRemove, File, NumberPicker, MyCard } from '../../components'
import { session } from '../../utils'
import styles from '../table-placeholder.less'
import zhCN from 'antd/lib/locale/zh_CN'


const SchemaField = createSchemaField({
  components: {
    FormLayout, FormItem, Input, ArrayTable, Select, PreviewText,
    ArrayTableAddition, ArrayTableIndex, ArrayTableRemove,
    NumberPicker, FormGrid, DatePicker, File, TreeSelect,
    MyCard,
  },
})

export default (props) => {
  let { form, type, record } = props

  useEffect(() => {
    console.log(record)
  }, [])

  return <ConfigProvider locale={zhCN}>
    <Form form={form} labelWidth={100} labelWrap={true} className={styles.placeholder}>
      <SchemaField>
        <SchemaField.Void x-component="MyCard" x-component-props={{ title: '基本信息' }}>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
            <SchemaField.String name="code" title="编号" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="name" title="名称" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="categoryId" title="类别" x-decorator="FormItem" x-component="TreeSelect"
                                x-component-props={{ treeDefaultExpandAll: true }}
                                enum={session.getItem('houseCategoryTreeSelect')}/>
            <SchemaField.String name="structure" title="结构" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="area" title="面积" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="number" title="数量" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="startMoney" title="原值" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="startLoseMoney" title="基数折旧" x-component="PreviewText"
                                x-decorator="FormItem" x-decorator-props={{ tooltip: '截止至累计折旧(2020-12-31)' }}/>
            <SchemaField.String name="endMoney" title="净值" x-decorator="FormItem" x-component="PreviewText"/>
            <SchemaField.String name="useYear" title="使用年限" x-decorator="FormItem" x-component="PreviewText"/>
            <SchemaField.String name="getDate" title="取得日期" x-decorator="FormItem" x-component="DatePicker"/>
            <SchemaField.String name="getStyle" title="取得方式" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="location" title="使用地点" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="useDeptName" title="使用部门" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="useLoginName" title="使用人" x-decorator="FormItem"
                                x-component="Select" x-component-props={{ showSearch: true }}
                                enum={session.getItem('userList')}/>
            <SchemaField.String name="financeCode" title="凭证号" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="remark" title="备注" x-component="Input.TextArea"
                                x-decorator="FormItem" x-decorator-props={{ gridSpan: 2 }}/>
            <SchemaField.String name="haveOld" title="新旧数据" x-decorator="FormItem" x-component="PreviewText"/>
            <SchemaField.String name="haveFull" title="提满折旧" x-decorator="FormItem" x-component="PreviewText"/>
            <SchemaField.String name="useStatus" title="使用状况" x-decorator="FormItem" x-component="PreviewText"/>
          </SchemaField.Void>
        </SchemaField.Void>
        <SchemaField.Void x-component="MyCard" x-component-props={{ title: '权属情况' }}>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 3, strictAutoFit: true }}>
            <SchemaField.String name="own1" title="房屋权属证明" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="own2" title="权属人" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="own3" title="发证日期" x-decorator="FormItem" x-component="DatePicker"/>
            <SchemaField.String name="own4" title="所有权证号" x-decorator="FormItem" x-component="Input"/>
            <SchemaField.String name="own5" title="权属面积" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="own6" title="权属性质" x-decorator="FormItem" x-component="Input"/>
          </SchemaField.Void>
        </SchemaField.Void>
        <SchemaField.Void x-component="MyCard" x-component-props={{ title: '办公用房' }}>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
            <SchemaField.String name="office1" title="在用" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="office2" title="出租出借" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="office3" title="闲置" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="office4" title="待处置(待报废、毁损等)" x-decorator="FormItem" x-component="NumberPicker"/>
          </SchemaField.Void>
        </SchemaField.Void>
        <SchemaField.Void x-component="MyCard" x-component-props={{ title: '业务用房' }}>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
            <SchemaField.String name="business1" title="在用" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="business2" title="出租出借" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="business3" title="闲置" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="business4" title="待处置(待报废、毁损等)" x-decorator="FormItem" x-component="NumberPicker"/>
          </SchemaField.Void>
        </SchemaField.Void>
        <SchemaField.Void x-component="MyCard" x-component-props={{ title: '其他用房' }}>
          <SchemaField.Void x-component="FormGrid" x-component-props={{ maxColumns: 4, strictAutoFit: true }}>
            <SchemaField.String name="other1" title="在用" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="other2" title="出租出借" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="other3" title="闲置" x-decorator="FormItem" x-component="NumberPicker"/>
            <SchemaField.String name="other4" title="待处置(待报废、毁损等)" x-decorator="FormItem" x-component="NumberPicker"/>
          </SchemaField.Void>
        </SchemaField.Void>
      </SchemaField>
    </Form>
  </ConfigProvider>
}
