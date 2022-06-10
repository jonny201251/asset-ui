import { assetBuy1Path } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '名称', dataIndex: 'name', valueType: 'text', colSize: 1 },
    { title: '型号规格', dataIndex: 'modelSpec', valueType: 'text', colSize: 1 },
    { title: '数量', dataIndex: 'number', valueType: 'text', hideInSearch: true },
    { title: '单价', dataIndex: 'price', valueType: 'text', hideInSearch: true },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={assetBuy1Path} columns={columns} search={{ span: 8 }}
  />
}
