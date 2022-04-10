import { assetMovePath } from '../../utils'
import { BaseProTable } from '../../components'

export default () => {
  const columns = [
    { title: '资产编号', dataIndex: 'code', valueType: 'text' },
    { title: '资产名称', dataIndex: 'name', valueType: 'text' },
    { title: '资产类别', dataIndex: 'categoryName', valueType: 'text' },
    { title: '使用部门', dataIndex: 'useDeptName', valueType: 'text' },
    { title: '使用地点', dataIndex: 'location', valueType: 'text' },
    { title: '移动日期', dataIndex: 'moveDate', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text' },
  ]

  return <BaseProTable path={assetMovePath} columns={columns} search={true}/>
}
