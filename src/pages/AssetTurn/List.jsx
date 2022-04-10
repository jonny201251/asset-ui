import { assetTurnPath } from '../../utils'
import { BaseProTableProcess } from '../../components'

export default () => {
  const columns = [
    { title: '资产编号', dataIndex: 'code', valueType: 'text' },
    { title: '资产名称', dataIndex: 'name', valueType: 'text' },
    { title: '资产类别', dataIndex: 'categoryName', valueType: 'text' },
    { title: '原使用部门', dataIndex: 'oldDeptName', valueType: 'text' },
    { title: '新使用部门', dataIndex: 'newDeptName', valueType: 'text' },
    { title: '原使用地点', dataIndex: 'oldLocation', valueType: 'text' },
    { title: '新使用地点', dataIndex: 'newLocation', valueType: 'text' },
    { title: '调转日期', dataIndex: 'turnDate', valueType: 'text' },
    { title: '申请人', dataIndex: 'displayName', valueType: 'text' },
    { title: '申请部门', dataIndex: 'deptName', valueType: 'text' },
    { title: '申请时间', dataIndex: 'createDatetime', valueType: 'text' },
    {
      title: '流程状态', valueType: 'text',
      renderText: (text, record) => (record.processInst ? record.processInst.processStatus : '草稿'),
      valueEnum: {
        草稿: { text: '草稿', status: 'Default' },
        审批中: { text: '审批中', status: 'Processing' },
        完成: { text: '完成', status: 'Success' },
        退回: { text: '退回', status: 'Error' },
        退回申请人: { text: '退回申请人', status: 'Error' },
        申请人撤回: { text: '申请人撤回', status: 'Error' },
      },
    },
    { title: '当前步骤', dataIndex: ['processInst', 'displayProcessStep'], valueType: 'text' },
  ]

  return <BaseProTableProcess path={assetTurnPath} columns={columns}/>
}
