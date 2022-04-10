import { instrumentInPath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '资产编号', dataIndex: 'code', valueType: 'text', colSize: 1 },
    { title: '资产名称', dataIndex: 'name', valueType: 'text', colSize: 1 },
    { title: '资产类别', dataIndex: 'categoryName', valueType: 'text', hideInSearch: true },
    { title: '数量', dataIndex: 'number', valueType: 'text', hideInSearch: true },
    { title: '单价', dataIndex: 'price', valueType: 'text', hideInSearch: true },
    { title: '原值', dataIndex: 'startMoney', valueType: 'text', hideInSearch: true },
    { title: '使用年限', dataIndex: 'useYear', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={instrumentInPath} columns={columns} search={{ span: 8 }}
  />
}
