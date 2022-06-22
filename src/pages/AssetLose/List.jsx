import { assetLostPath } from '../../utils';
import { Button, Card, ConfigProvider } from 'antd';
import moment from 'moment';
import {
  Checkbox,
  DatePicker,
  Form,
  FormButtonGroup,
  FormDialog,
  FormGrid,
  FormItem,
  FormLayout,
  Input,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import zhCN from 'antd/lib/locale/zh_CN';
import { LoadingButton } from '../../components';
import qs from 'qs';
import _ from 'lodash';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    Checkbox,
    DatePicker,
    FormGrid,
    FormDialog,
    FormButtonGroup,
  },
});

const form = createForm();
// form.setValues({yearMonth:['2022-01']})

export default () => {
  const disabledDate = (current) => {
    return current && current <= moment('2022-01', 'YYYY-MM');
  };

  return (
    <div>
      <Card title={'提满折旧'}>
        <Button
          onClick={() => {
            window.location.href = assetLostPath.fullLose;
          }}
          type={'primary'}
        >
          下载
        </Button>
      </Card>
      <div style={{ margin: 15 }} />
      <Card title={'计提折旧'}>
        <ConfigProvider locale={zhCN}>
          <Form form={form}>
            <SchemaField>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 3, strictAutoFit: true }}
              >
                <SchemaField.String
                  name="type"
                  title="折旧类别"
                  required
                  enum={[
                    { label: '办公营具', value: '办公营具' },
                    { label: '仪器仪表', value: '仪器仪表' },
                    { label: '房屋及构建筑物', value: '房屋及构建筑物' },
                    {
                      label: '办公设备+信息化设备+其他设备',
                      value: '办公设备+信息化设备+其他设备',
                    },
                    { label: '生产设备+传导管线', value: '生产设备+传导管线' },
                    { label: '运输工具', value: '运输工具' },
                  ]}
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 3 }}
                  x-component="Checkbox.Group"
                />
                <SchemaField.String
                  name="yearMonth"
                  title="选择年月"
                  required
                  x-decorator="FormItem"
                  x-component="DatePicker.RangePicker"
                  x-component-props={{
                    picker: 'month',
                    disabledDate: disabledDate,
                  }}
                />
              </SchemaField.Void>
            </SchemaField>
          </Form>
          <FormButtonGroup gutter={16}>
            <Button onClick={() => form.reset()}>重置</Button>
            <LoadingButton
              onClick={async () => {
                const values = await form.submit();
                if (values) {
                  window.location.href =
                    assetLostPath.haveLose +
                    '?type=' +
                    values['type'].join(',') +
                    '&yearMonth=' +
                    values['yearMonth'].join(',');
                }
              }}
              type={'primary'}
            >
              下载
            </LoadingButton>
          </FormButtonGroup>
        </ConfigProvider>
      </Card>
    </div>
  );
};
