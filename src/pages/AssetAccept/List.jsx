import { assetAcceptPath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '操作类型', dataIndex: 'repairType', valueType: 'text' },
    { title: '资产编号', dataIndex: 'code', valueType: 'text' },
    { title: '资产名称', dataIndex: 'name', valueType: 'text' },
    { title: '资产类别', dataIndex: 'categoryName', valueType: 'text' },
    { title: '购置日期', dataIndex: 'buyDate', valueType: 'text' },
    { title: '启用日期', dataIndex: 'useDate', valueType: 'text' },
    { title: '使用部门', dataIndex: 'useDeptName', valueType: 'text' },
    { title: '使用地点', dataIndex: 'location', valueType: 'text' },
    { title: '验收日期', dataIndex: 'acceptDate', valueType: 'text' },
    { title: '创建人', dataIndex: 'displayName', valueType: 'text' },
    { title: '创建部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '创建时间', dataIndex: 'createDatetime', valueType: 'text' },
  ]

  return <BaseProTable2 path={assetAcceptPath} columns={columns} search={true}/>
}
