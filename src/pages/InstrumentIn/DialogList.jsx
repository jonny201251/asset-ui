import { taxInvoicePath } from '../../utils'
import { BaseList } from '../../components'

export default (props) => {
  const columns = [
    { title: '设备名称', dataIndex: 'name', valueType: 'text', colSize: 1 },
    { title: '设备类别', dataIndex: 'categoryName', valueType: 'text', hideInSearch: true },
    { title: '数量', dataIndex: 'number', valueType: 'text', colSize: 1 },
    { title: '价格', dataIndex: 'price', valueType: 'text', hideInSearch: true },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text', hideInSearch: true },
    { title: '申请部门', dataIndex: 'startDeptName', valueType: 'text', hideInSearch: true },
  ]

  return <BaseList
    form={props.form} selectedId={props.selectedId}
    path={taxInvoicePath} columns={columns} search={{ span: 8 }}
  />
}
