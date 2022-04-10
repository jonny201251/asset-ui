import { officeToolPlan2Path, proTableRequest } from '../../utils'
import ProTable from '@ant-design/pro-table'
import { useRef } from 'react'
import OperateButton from './OperateButton'
import ToolBarButton from './ToolBarButton'

export default () => {
  const actionRef = useRef()
  const formRef = useRef()
  const columns = [
    {
      title: '年份', dataIndex: 'year', valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '该字段是必填字段'}]
      }
    },
    { title: '生命周期', dataIndex: 'lifeCycle', valueType: 'text' },
    { title: '名称', dataIndex: 'name', valueType: 'text' },
    { title: '设备类别', dataIndex: 'categoryName', valueType: 'text' },
    { title: '数量', dataIndex: 'number', valueType: 'text' },
    { title: '价格', dataIndex: 'price', valueType: 'text' },
    { title: '优先级别', dataIndex: 'level', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '申请部门', dataIndex: 'startDeptName', valueType: 'text' },
    { title: '申请时间', dataIndex: 'level', valueType: 'text' },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <OperateButton record={record} path={officeToolPlan2Path} actionRef={actionRef}/>,
      ],
    },
  ]

  return <ProTable
    bordered
    rowKey="id"
    actionRef={actionRef}
    formRef={formRef}
    form={{ ignoreRules: false}}
    columns={columns}
    columnEmptyText={true}
    //列表数据
    params={{ list: officeToolPlan2Path.list }}
    request={proTableRequest}
    //
    options={{ density: false }}
    search={true}
    //
    headerTitle={
      <ToolBarButton path={officeToolPlan2Path} actionRef={actionRef} formRef={formRef}/>
    }
  />
}
