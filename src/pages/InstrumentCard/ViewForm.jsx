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
} from '@formily/antd';
import { createSchemaField } from '@formily/react';
import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import {
  ArrayTableAddition,
  ArrayTableIndex,
  ArrayTableRemove,
  File,
  NumberPicker,
} from '../../components';
import { session } from '../../utils';
import styles from '../table-placeholder.less';
import zhCN from 'antd/lib/locale/zh_CN';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    ArrayTable,
    Select,
    ArrayTableAddition,
    ArrayTableIndex,
    ArrayTableRemove,
    NumberPicker,
    FormGrid,
    DatePicker,
    File,
    TreeSelect,
    PreviewText,
  },
});

export default (props) => {
  let { form, type, record } = props;

  useEffect(() => {}, []);

  const renderForm = () => {
    if (
      record.categoryName === '轿车' ||
      record.categoryName === '小型客车' ||
      record.categoryName === '大中型客车' ||
      record.categoryName === '其他车辆'
    ) {
      return (
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="code"
              title="设备编号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="name"
              title="设备名称"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="categoryId"
              title="设备类别"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="modelSpec"
              title="型号规格"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="buyDate"
              title="购置日期"
              x-decorator="FormItem"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="buy2Date"
              title="购置日期(旧)"
              x-decorator="FormItem"
              x-component="PreviewText"
            />
            <SchemaField.String
              name="brand"
              title="品牌"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="useDate"
              title="启用日期"
              x-decorator="FormItem"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="number"
              title="数量"
              x-decorator="FormItem"
              x-component="NumberPicker"
            />
            <SchemaField.String
              name="startMoney"
              title="原值"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="startLoseMoney"
              title="基数折旧"
              x-component="PreviewText"
              x-decorator="FormItem"
              x-decorator-props={{ tooltip: '截止至累计折旧(2020-12-31)' }}
            />
            <SchemaField.String
              name="endMoney"
              title="净值"
              x-decorator="FormItem"
              x-component="PreviewText"
            />
            <SchemaField.String
              name="getStyle"
              title="取得方式"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="useYear"
              title="使用年限"
              x-decorator="FormItem"
              x-component="NumberPicker"
            />
            <SchemaField.String
              name="location"
              title="使用地点"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="useDeptName"
              title="使用部门"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="useLoginName"
              title="使用人"
              x-decorator="FormItem"
              x-component="Select"
              x-component-props={{ showSearch: true }}
              enum={session.getItem('userList')}
            />
            <SchemaField.String
              name="carAir"
              title="排气量"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="carHaveDrive"
              title="车辆行驶证"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="carPerson"
              title="持证人"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="carCode"
              title="车牌号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="carUse"
              title="车辆用途"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="remark"
              title="备注"
              x-component="Input.TextArea"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 3 }}
            />
            <SchemaField.String
              name="haveOld"
              title="是否旧数据"
              x-decorator="FormItem"
              x-component="PreviewText"
            />
            <SchemaField.String
              name="useStatus"
              title="使用状况"
              x-decorator="FormItem"
              x-component="PreviewText"
            />
          </SchemaField.Void>
          <SchemaField.Array
            name="list"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{ size: 'small', sticky: true }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 80,
                  title: '序号',
                  align: 'center',
                }}
              >
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayTableIndex"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 150,
                  title: '类型',
                  align: 'center',
                }}
              >
                <SchemaField.String
                  name="type"
                  required
                  x-decorator="FormItem"
                  x-component="Select"
                  enum={[
                    { label: '新购', value: '新购' },
                    { label: '调拨', value: '调拨' },
                    { label: '报废', value: '报废' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '财务凭证号', align: 'center' }}
              >
                <SchemaField.String
                  name="financeCode"
                  required
                  x-decorator="FormItem"
                  x-component="Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 80,
                  title: '操作',
                  dataIndex: 'operations',
                }}
              >
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTableRemove" />
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTableAddition"
              x-component-props={{ width: 80 }}
            />
          </SchemaField.Array>
        </SchemaField>
      );
    } else {
      return (
        <SchemaField>
          <SchemaField.Void
            x-component="FormGrid"
            x-component-props={{ maxColumns: 3, strictAutoFit: true }}
          >
            <SchemaField.String
              name="code"
              title="设备编号"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="name"
              title="设备名称"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="categoryId"
              title="设备类别"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="modelSpec"
              title="型号规格"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="factory"
              title="生产厂商"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="brand"
              title="品牌"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="moneyFrom"
              title="资金来源"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="buyDate"
              title="购置日期"
              x-decorator="FormItem"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="buy2Date"
              title="购置日期(旧)"
              x-decorator="FormItem"
              x-component="PreviewText"
            />
            <SchemaField.String
              name="useDate"
              title="启用日期"
              x-decorator="FormItem"
              x-component="DatePicker"
            />
            <SchemaField.String
              name="unit"
              title="单位"
              x-decorator="FormItem"
              x-component="Select"
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
            <SchemaField.String
              name="number"
              title="数量"
              x-decorator="FormItem"
              x-component="NumberPicker"
            />
            <SchemaField.String
              name="price"
              title="单价"
              x-decorator="FormItem"
              x-component="NumberPicker"
            />
            <SchemaField.String
              name="moveMoney"
              title="运输费"
              x-decorator="FormItem"
              x-component="NumberPicker"
            />
            <SchemaField.String
              name="installMoney"
              title="安装费"
              x-decorator="FormItem"
              x-component="NumberPicker"
            />
            <SchemaField.String
              name="startMoney"
              title="原值"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="startLoseMoney"
              title="基数折旧"
              x-component="PreviewText"
              x-decorator="FormItem"
              x-decorator-props={{ tooltip: '截止至累计折旧(2020-12-31)' }}
            />
            <SchemaField.String
              name="endMoney"
              title="净值"
              x-decorator="FormItem"
              x-component="PreviewText"
            />
            <SchemaField.String
              name="useYear"
              title="使用年限"
              x-decorator="FormItem"
              x-component="PreviewText"
            />
            <SchemaField.String
              name="getStyle"
              title="取得方式"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="location"
              title="使用地点"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="useDeptName"
              title="使用部门"
              x-decorator="FormItem"
              x-component="Input"
            />
            <SchemaField.String
              name="useLoginName"
              title="使用人"
              x-decorator="FormItem"
              x-component="Select"
              x-component-props={{ showSearch: true }}
              enum={session.getItem('userList')}
            />
            <SchemaField.String
              name="remark"
              title="备注"
              x-component="Input.TextArea"
              x-decorator="FormItem"
              x-decorator-props={{ gridSpan: 3 }}
            />
            <SchemaField.String
              name="haveOld"
              title="是否旧数据"
              x-decorator="FormItem"
              x-component="PreviewText"
            />
            <SchemaField.String
              name="useStatus"
              title="使用状况"
              x-decorator="FormItem"
              x-component="PreviewText"
            />
          </SchemaField.Void>
          <SchemaField.Array
            name="list"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{ size: 'small', sticky: true }}
          >
            <SchemaField.Object>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 80,
                  title: '序号',
                  align: 'center',
                }}
              >
                <SchemaField.Void
                  x-decorator="FormItem"
                  x-component="ArrayTableIndex"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 150,
                  title: '类型',
                  align: 'center',
                }}
              >
                <SchemaField.String
                  name="type"
                  required
                  x-decorator="FormItem"
                  x-component="Select"
                  enum={[
                    { label: '新购', value: '新购' },
                    { label: '调拨', value: '调拨' },
                    { label: '报废', value: '报废' },
                  ]}
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{ title: '财务凭证号', align: 'center' }}
              >
                <SchemaField.String
                  name="financeCode"
                  required
                  x-decorator="FormItem"
                  x-component="Input"
                />
              </SchemaField.Void>
              <SchemaField.Void
                x-component="ArrayTable.Column"
                x-component-props={{
                  width: 80,
                  title: '操作',
                  dataIndex: 'operations',
                }}
              >
                <SchemaField.Void x-component="FormItem">
                  <SchemaField.Void x-component="ArrayTableRemove" />
                </SchemaField.Void>
              </SchemaField.Void>
            </SchemaField.Object>
            <SchemaField.Void
              x-component="ArrayTableAddition"
              x-component-props={{ width: 80 }}
            />
          </SchemaField.Array>
        </SchemaField>
      );
    }
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Form
        form={form}
        labelWidth={100}
        labelWrap={true}
        className={styles.placeholder}
      >
        {renderForm()}
      </Form>
    </ConfigProvider>
  );
};
