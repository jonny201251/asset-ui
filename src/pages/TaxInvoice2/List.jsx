import { taxInvoicePath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '资产名称', dataIndex: 'assetName', valueType: 'text' },
    { title: '资产类别', dataIndex: 'categoryName', valueType: 'text' },
    { title: '发票名称', dataIndex: 'name', valueType: 'text' },
    { title: '发票代码', dataIndex: 'code', valueType: 'text' },
    { title: '发票号码', dataIndex: 'code2', valueType: 'text' },
    { title: '开票日期', dataIndex: 'startDate', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text' },
    { title: '状态', dataIndex: 'status', valueType: 'text' },
  ]

  return <BaseProTable2 path={taxInvoicePath} columns={columns} search={true}/>
}
