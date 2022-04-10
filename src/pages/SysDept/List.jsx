import { BaseProTable } from '../../components'
import { sysDeptPath } from '../../utils'

export default () => {
  let columns = [
    { title: '部门名称', dataIndex: 'name', valueType: 'text' },
    { title: '简称', dataIndex: 'prefix', valueType: 'text' },
    { title: '备注', dataIndex: 'remark', valueType: 'text' },
  ]

  return <BaseProTable path={sysDeptPath} columns={columns}/>
}
