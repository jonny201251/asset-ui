import { instrumentInPath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '设备编号', dataIndex: 'code', valueType: 'text', colSize: 1 },
    { title: '设备名称', dataIndex: 'name', valueType: 'text', colSize: 1 },
    { title: '设备类别', dataIndex: 'categoryName', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={instrumentInPath} columns={columns} search={{ span: 8 }}
  />
}
