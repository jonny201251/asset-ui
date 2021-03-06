import { message, Modal, Space } from 'antd'
import { get, post, processDesignPath } from '../utils'
import { FormButtonGroup, FormDialog } from '@formily/antd'
import { LoadingButton } from './index'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default (props) => {
  const { record, path, actionRef, rowKey, from } = props
  let width = path.width || 520

  const formButton = (buttonList, dialog, form, type) => {
    let btnArr = []
    buttonList.forEach(buttonName => {
      btnArr.push(
        <LoadingButton
          onClick={async () => {
            const formValue = await form.submit()
            if (formValue) {
              let list = formValue.list
              delete formValue.list
              let values = { formValue, list, buttonName, type, path: path.flag }
              const data = await post(path.btnHandle, values)
              if (data) {
                actionRef.current.clearSelected()
                actionRef.current.reload()
                dialog.close()
                message.success('操作成功')
              }
            }
          }}
          type={'primary'}
        >
          {buttonName.replace(/\w+_/i, '')}
        </LoadingButton>,
      )
    })
    return btnArr
  }

  const onClick = async (type) => {
    let params = {}
    params[rowKey || 'id'] = record[rowKey || 'id']

    if (type === 'edit') {
      const dbRecord = await get(path.get, params)
      const processFormBefore = await post(processDesignPath.getProcessFormBefore, { path: path.flag, type })
      if (dbRecord && processFormBefore) {
        let dialog = FormDialog(
          { title: '编辑', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return <>
              <path.EditForm form={form} type={type} record={dbRecord} dialog={dialog}/>
              <FormDialog.Footer>
                <FormButtonGroup gutter={16} align={'center'}>
                  {formButton(processFormBefore.buttonList, dialog, form, type)}
                </FormButtonGroup>
              </FormDialog.Footer>
            </>
          },
        )
        dialog.open()
      }
    } else if (type === 'view') {
      const dbRecord = await get(path.get, params)
      if (dbRecord) {
        let dialog = FormDialog(
          { title: '查看', footer: null, keyboard: false, maskClosable: false, width },
          (form) => {
            form.setValues(dbRecord)
            return <path.ViewForm form={form} type={type} record={dbRecord} dialog={dialog}/>
          },
        )
        dialog.open()
      }
    } else if (type === 'recall') {
      Modal.error({
        okText: '确定', closable: true, width: 450,
        icon: <QuestionCircleOutlined/>,
        content: <p style={{ fontSize: 16 }}> 确定要撤回-{record.processInst.businessName}</p>,
        onOk: async (close) => {
          let values = { formValue: record, buttonName: '申请人撤回', type, path: path.flag }
          const data = await post(path.btnHandle, values)
          if (data) {
            actionRef.current.clearSelected()
            actionRef.current.reload()
            close()
            message.success('撤回成功')
          }
        },
      })
    } else if (type === 'delete') {
      console.log(record)
      Modal.error({
        okText: '确定', closable: true, width: 450,
        icon: <QuestionCircleOutlined/>,
        content: <p style={{ fontSize: 16 }}> 确定要删除-{record?.processInst?.businessName || record.checkName}</p>,
        onOk: async (close) => {
          let values = { formValue: record, buttonName: '申请人删除', type, path: path.flag }
          const data = await post(path.btnHandle, values)
          if (data) {
            actionRef.current.clearSelected()
            actionRef.current.reload()
            close()
            message.success('删除成功')
          }
        },
      })
    }
  }

  const render = () => {
    let arr = []
    let processStatus = record?.processInst?.processStatus
    let version = record?.processInst?.businessVersion
    if (processStatus) {
      if (processStatus === '审批中') {
        arr.push(<a onClick={() => onClick('view')}>查看</a>)
        arr.push(<a onClick={() => onClick('recall')}>撤回</a>)
      } else if (processStatus === '完成') {
        arr.push(<a onClick={() => onClick('view')}>查看</a>)
      } else if (processStatus === '退回' || processStatus === '退回申请人' || processStatus === '申请人撤回') {
        arr.push(<a onClick={() => onClick('view')}>查看</a>)
        arr.push(<a onClick={() => onClick('delete')}>删除</a>)
      }
    } else {
      //草稿
      arr.push(<a onClick={() => onClick('edit')}>编辑</a>)
      arr.push(<a onClick={() => onClick('delete')}>删除</a>)
    }
    return <Space size={'middle'}>{arr}</Space>
  }

  return <>{render()}</>
}
