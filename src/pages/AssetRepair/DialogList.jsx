import { instrumentCardPath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '资产编号', dataIndex: 'code', valueType: 'text', colSize: 1 },
    { title: '资产名称', dataIndex: 'name', valueType: 'text', colSize: 1 },
    { title: '原值', dataIndex: 'money', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={instrumentCardPath} columns={columns} search={{ span: 8 }}
  />
}
