import { instrumentPlan2Path } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '生命周期', dataIndex: 'lifeCycle', valueType: 'text', colSize: 1 },
    { title: '名称', dataIndex: 'name', valueType: 'text', colSize: 1 },
    { title: '资产类别', dataIndex: 'categoryName', valueType: 'text', colSize: 1 },
    { title: '数量', dataIndex: 'number', valueType: 'text', colSize: 1 },
    { title: '价格', dataIndex: 'price', valueType: 'text', hideInSearch: true },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={instrumentPlan2Path} columns={columns} search={{ span: 8 }}
  />
}
