import { instrumentOutPath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '设备编号', dataIndex: 'code', valueType: 'text' },
    { title: '设备名称', dataIndex: 'name', valueType: 'text' },
    { title: '设备类别', dataIndex: 'categoryName', valueType: 'text' },
    { title: '数量', dataIndex: 'number', valueType: 'text' },
    { title: '原值', dataIndex: 'startMoney', valueType: 'text' },
    { title: '使用地点', dataIndex: 'location', valueType: 'text' },
    { title: '启用日期', dataIndex: 'useDate', valueType: 'text' },
    { title: '状态', dataIndex: 'status', valueType: 'text' },
  ]

  return <BaseProTable2 path={instrumentOutPath} columns={columns} search={true}/>
}
