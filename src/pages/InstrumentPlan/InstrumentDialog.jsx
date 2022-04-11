import { instrumentCardPath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '资产编号', dataIndex: 'code', valueType: 'text', colSize: 1 },
    { title: '资产名称', dataIndex: 'name', valueType: 'text', colSize: 1 },
    { title: '资产类别', dataIndex: 'categoryName', valueType: 'text', colSize: 1 },
    { title: '型号规格', dataIndex: 'modelSpec', valueType: 'text', hideInSearch: true },
    { title: '价格', dataIndex: 'price', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={instrumentCardPath} columns={columns} search={{ span: 8 }}
  />
}
