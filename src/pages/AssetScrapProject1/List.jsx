import { assetScrapProject1Path } from '../../utils'
import { BaseProTable2 } from '../../components'

export default () => {
  const columns = [
    { title: '资产编号', dataIndex: 'code', valueType: 'text' },
    { title: '资产名称', dataIndex: 'name', valueType: 'text' },
    { title: '资产类别', dataIndex: 'categoryName', valueType: 'text' },
    { title: '鉴定结论', dataIndex: 'result', valueType: 'text' },
  ]

  return <BaseProTable2 path={assetScrapProject1Path} columns={columns} search={true}/>
}
