import { assetRepairDialogPath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '操作类型', dataIndex: 'repairType', valueType: 'text', colSize: 1 },
    { title: '资产编号', dataIndex: 'code', valueType: 'text', colSize: 1 },
    { title: '资产名称', dataIndex: 'name', valueType: 'text', colSize: 1 },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={assetRepairDialogPath} columns={columns} search={{ span: 8 }}
  />
}
