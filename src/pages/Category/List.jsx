import { BaseProTable } from '../../components'
import { categoryPath } from '../../utils'

export default () => {
  let columns = [
    { title: '资产类别', dataIndex: 'name', valueType: 'text' },
    { title: '使用年限', dataIndex: 'useYear', valueType: 'text' },
    { title: '资产编号前缀', dataIndex: 'codePrefix', valueType: 'text' },
    { title: '备注', dataIndex: 'remark', valueType: 'text' },
  ]

  return <BaseProTable path={categoryPath} columns={columns}/>
}
