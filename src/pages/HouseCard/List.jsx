import { houseCardPath } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '编号', dataIndex: 'code', valueType: 'text' },
    { title: '名称', dataIndex: 'name', valueType: 'text' },
    { title: '类别', dataIndex: 'categoryName', valueType: 'text' },
    { title: '结构', dataIndex: 'structure', valueType: 'text' },
    { title: '面积', dataIndex: 'area', valueType: 'text' },
    { title: '权属面积', dataIndex: 'own5', valueType: 'text' },
    { title: '数量', dataIndex: 'number', valueType: 'text' },
    { title: '原值', dataIndex: 'startMoney', valueType: 'text' },
    { title: '净值', dataIndex: 'endMoney', valueType: 'text' },
    { title: '使用地点', dataIndex: 'location', valueType: 'text' },
    { title: '取得日期', dataIndex: 'getDate', valueType: 'text' },
    { title: '取得方式', dataIndex: 'getStyle', valueType: 'text' },
    { title: '使用部门', dataIndex: 'useDeptName', valueType: 'text' },
    { title: '新旧数据', dataIndex: 'haveOld', valueType: 'text' },
    { title: '提满折旧', dataIndex: 'haveFull', valueType: 'text' },
    { title: '使用状况', dataIndex: 'useStatus', valueType: 'text' },
  ]

  return <BaseProTable2 path={houseCardPath} columns={columns} search={true}/>
}
