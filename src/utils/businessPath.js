import { contextPath } from './unknown'
import ProcessDesignForm from '../pages/ProcessDesign/Form'
import ProcessDesignList from '../pages/ProcessDesign/List'
import ChargeDeptLeaderForm from '../pages/ChargeDeptLeader/Form'
import ChargeDeptLeaderList from '../pages/ChargeDeptLeader/List'
//
import CategoryForm from '../pages/Category/Form'
import CategoryList from '../pages/Category/List'
import OfficeToolPlanList from '../pages/OfficeToolPlan/List'
import OfficeToolPlanAddForm from '../pages/OfficeToolPlan/AddForm'
import OfficeToolPlanViewForm from '../pages/OfficeToolPlan/ViewForm'
import OfficeToolPlan2List from '../pages/OfficeToolPlan2/List'
import OfficeToolPlan2Form from '../pages/OfficeToolPlan2/Form'
import InstrumentPlanList from '../pages/InstrumentPlan/List'
import InstrumentPlanAddForm from '../pages/InstrumentPlan/AddForm'
import InstrumentPlanViewForm from '../pages/InstrumentPlan/ViewForm'
import InstrumentPlan2List from '../pages/InstrumentPlan2/List'
import InstrumentPlan2Form from '../pages/InstrumentPlan2/Form'

import AssetBuy1List from '../pages/AssetBuy1/List'
import AssetBuy1AddForm from '../pages/AssetBuy1/AddForm'
import AssetBuy1ViewForm from '../pages/AssetBuy1/ViewForm'
import AssetBuy2List from '../pages/AssetBuy2/List'
import AssetBuy2AddForm from '../pages/AssetBuy2/AddForm'
import AssetBuy2ViewForm from '../pages/AssetBuy2/ViewForm'
import TaxInvoiceForm from '../pages/TaxInvoice/Form'
import TaxInvoiceEditForm from '../pages/TaxInvoice/EditForm'
import TaxInvoiceList from '../pages/TaxInvoice/List'
import InstrumentInForm from '../pages/InstrumentIn/Form'
import InstrumentInEditForm from '../pages/InstrumentIn/EditForm'
import InstrumentInViewForm from '../pages/InstrumentIn/ViewForm'
import InstrumentInList from '../pages/InstrumentIn/List'
import InstrumentOutForm from '../pages/InstrumentOut/Form'
import InstrumentOutEditForm from '../pages/InstrumentOut/EditForm'
import InstrumentOutViewForm from '../pages/InstrumentOut/ViewForm'
import InstrumentOutList from '../pages/InstrumentOut/List'
import InstrumentCardForm from '../pages/InstrumentCard/Form'
import InstrumentCardEditForm from '../pages/InstrumentCard/EditForm'
import InstrumentCardViewForm from '../pages/InstrumentCard/ViewForm'
import InstrumentCardList from '../pages/InstrumentCard/List'
import OfficeToolCardForm from '../pages/OfficeToolCard/Form'
import OfficeToolCardEditForm from '../pages/OfficeToolCard/EditForm'
import OfficeToolCardViewForm from '../pages/OfficeToolCard/ViewForm'
import OfficeToolCardList from '../pages/OfficeToolCard/List'

import HouseCardForm from '../pages/HouseCard/Form'
import HouseCardEditForm from '../pages/HouseCard/EditForm'
import HouseCardViewForm from '../pages/HouseCard/ViewForm'
import HouseCardList from '../pages/HouseCard/List'

import AssetRepairList from '../pages/AssetRepair/List'
import AssetRepairAddForm from '../pages/AssetRepair/AddForm'
import AssetRepairViewForm from '../pages/AssetRepair/ViewForm'
import AssetAcceptForm from '../pages/AssetAccept/Form'
import AssetAcceptEditForm from '../pages/AssetAccept/EditForm'
import AssetAcceptViewForm from '../pages/AssetAccept/ViewForm'
import AssetAcceptList from '../pages/AssetAccept/List'
import AssetScrapList from '../pages/AssetScrap/List'
import AssetScrapAddForm from '../pages/AssetScrap/AddForm'
import AssetScrapViewForm from '../pages/AssetScrap/ViewForm'
import AssetScrapValueList from '../pages/AssetScrapValue/List'
import AssetScrapValueAddForm from '../pages/AssetScrapValue/AddForm'
import AssetScrapValueViewForm from '../pages/AssetScrapValue/ViewForm'
import AssetScrapProject1Form from '../pages/AssetScrapProject1/Form'
import AssetScrapProject1EditForm from '../pages/AssetScrapProject1/EditForm'
import AssetScrapProject1ViewForm from '../pages/AssetScrapProject1/ViewForm'
import AssetScrapProject1List from '../pages/AssetScrapProject1/List'
import AssetMoveForm from '../pages/AssetMove/Form'
import AssetMoveList from '../pages/AssetMove/List'
import AssetTurnAddForm from '../pages/AssetTurn/AddForm'
import AssetTurnViewForm from '../pages/AssetTurn/ViewForm'
import AssetTurnList from '../pages/AssetTurn/List'
//flag、导出名称、sysPermission.path,三个地方名称一样
export const processDesignPath = {
  flag: 'processDesignPath', width: '95%', Form: ProcessDesignForm, List: ProcessDesignList,
  list: contextPath + '/processDesign/list',
  get: contextPath + '/processDesign/get',
  add: contextPath + '/processDesign/add',
  edit: contextPath + '/processDesign/edit',
  delete: contextPath + '/processDesign/delete',
  getProcessFormBefore: contextPath + '/processDesign/getProcessFormBefore',
  getBpmnXml: contextPath + '/processDesign/getBpmnXml',
}
export const processInstPath = {
  flag: 'processInstPath',
  list: contextPath + '/processInst/list',
  getRunTaskKeyList: contextPath + '/processInst/getRunTaskKeyList',
  myList: contextPath + '/processInst/myList',
}
export const processInstNodePath = {
  flag: 'processInstPath',
  list: contextPath + '/processInstNode/list',
}
export const chargeDeptLeaderPath = {
  flag: 'chargeDeptLeaderPath', width: 820, Form: ChargeDeptLeaderForm, List: ChargeDeptLeaderList,
  list: contextPath + '/chargeDeptLeader/list',
  get: contextPath + '/chargeDeptLeader/get',
  add: contextPath + '/chargeDeptLeader/add',
  edit: contextPath + '/chargeDeptLeader/edit',
  delete: contextPath + '/chargeDeptLeader/delete',
  getChargeDeptLeader: contextPath + '/chargeDeptLeader/getChargeDeptLeader',
  getDeptVL: contextPath + '/chargeDeptLeader/getDeptVL',
}
//
export const categoryPath = {
  flag: 'categoryPath', Form: CategoryForm, List: CategoryList,
  list: contextPath + '/category/list',
  get: contextPath + '/category/get',
  add: contextPath + '/category/add',
  edit: contextPath + '/category/edit',
  delete: contextPath + '/category/delete',
  getTreeSelect: contextPath + '/category/getTreeSelect',
}
/*
  新增流程：AddForm，编辑：EditForm，审批流程：CheckForm，查看：ViewForm
  撤回流程
 */
export const officeToolPlanPath = {
  flag: 'officeToolPlanPath', width: 1600, List: OfficeToolPlanList,
  AddForm: OfficeToolPlanAddForm, EditForm: OfficeToolPlanAddForm,
  CheckForm: OfficeToolPlanAddForm, ViewForm: OfficeToolPlanViewForm,
  list: contextPath + '/officeToolPlan/list',
  get: contextPath + '/officeToolPlan/get',
  btnHandle: contextPath + '/officeToolPlan/btnHandle',
}
export const officeToolPlan2Path = {
  flag: 'officeToolPlan2Path', List: OfficeToolPlan2List,Form: OfficeToolPlan2Form,
  list: contextPath + '/officeToolPlan2/list',
  get: contextPath + '/officeToolPlan2/get',
}
export const instrumentPlanPath = {
  flag: 'instrumentPlanPath', width: 1600, List: InstrumentPlanList,
  AddForm: InstrumentPlanAddForm, EditForm: InstrumentPlanAddForm,
  CheckForm: InstrumentPlanAddForm, ViewForm: InstrumentPlanViewForm,
  list: contextPath + '/instrumentPlan/list',
  get: contextPath + '/instrumentPlan/get',
  btnHandle: contextPath + '/instrumentPlan/btnHandle',
}
export const instrumentPlan2Path = {
  flag: 'instrumentPlan2Path', List: InstrumentPlan2List,Form: InstrumentPlan2Form,
  list: contextPath + '/instrumentPlan2/list',
  get: contextPath + '/instrumentPlan2/get',
}
export const assetBuy1Path = {
  flag: 'assetBuy1Path', width: 1600, List: AssetBuy1List,
  AddForm: AssetBuy1AddForm, EditForm: AssetBuy1AddForm,
  CheckForm: AssetBuy1AddForm, ViewForm: AssetBuy1ViewForm,
  list: contextPath + '/assetBuy1/list',
  get: contextPath + '/assetBuy1/get',
  btnHandle: contextPath + '/assetBuy1/btnHandle',
}
export const assetBuy2Path = {
  flag: 'assetBuy2Path', width: 1600, List: AssetBuy2List,
  AddForm: AssetBuy2AddForm, EditForm: AssetBuy2AddForm,
  CheckForm: AssetBuy2AddForm, ViewForm: AssetBuy2ViewForm,
  list: contextPath + '/assetBuy2/list',
  get: contextPath + '/assetBuy2/get',
  btnHandle: contextPath + '/assetBuy2/btnHandle',
}
export const taxInvoicePath = {
  flag: 'taxInvoicePath', width: 1200, Form: TaxInvoiceForm, List: TaxInvoiceList,
  EditForm: TaxInvoiceEditForm, ViewForm: TaxInvoiceEditForm,
  list: contextPath + '/taxInvoice/list',
  get: contextPath + '/taxInvoice/get',
  add: contextPath + '/taxInvoice/add',
  edit: contextPath + '/taxInvoice/edit',
  delete: contextPath + '/taxInvoice/delete',
}
export const instrumentInPath = {
  flag: 'instrumentInPath', width: '98%', width2: 1000, Form: InstrumentInForm, List: InstrumentInList,
  EditForm: InstrumentInEditForm, ViewForm: InstrumentInViewForm,
  list: contextPath + '/instrumentIn/list',
  get: contextPath + '/instrumentIn/get',
  add: contextPath + '/instrumentIn/add',
  edit: contextPath + '/instrumentIn/edit',
}
export const instrumentOutPath = {
  flag: 'instrumentOutPath', width: 1200, width2: 1000, Form: InstrumentOutForm, List: InstrumentOutList,
  EditForm: InstrumentOutEditForm, ViewForm: InstrumentOutViewForm,
  list: contextPath + '/instrumentOut/list',
  get: contextPath + '/instrumentOut/get',
  add: contextPath + '/instrumentOut/add',
  edit: contextPath + '/instrumentOut/edit',
}
export const instrumentCardPath = {
  flag: 'instrumentCardPath', width: 1000, width2: 1000, Form: InstrumentCardForm, List: InstrumentCardList,
  EditForm: InstrumentCardEditForm, ViewForm: InstrumentCardViewForm,
  list: contextPath + '/instrumentCard/list',
  get: contextPath + '/instrumentCard/get',
  add: contextPath + '/instrumentCard/add',
  edit: contextPath + '/instrumentCard/edit',
}
export const officeToolCardPath = {
  flag: 'officeToolCardPath', width: 1000, width2: 1000, Form: OfficeToolCardForm, List: OfficeToolCardList,
  EditForm: OfficeToolCardEditForm, ViewForm: OfficeToolCardViewForm,
  list: contextPath + '/officeToolCard/list',
  get: contextPath + '/officeToolCard/get',
  add: contextPath + '/officeToolCard/add',
  edit: contextPath + '/officeToolCard/edit',
}
export const houseCardPath = {
  flag: 'houseCardPath', width: 1000, width2: 1000, Form: HouseCardForm, List: HouseCardList,
  EditForm: HouseCardEditForm, ViewForm: HouseCardViewForm,
  list: contextPath + '/houseCard/list',
  get: contextPath + '/houseCard/get',
  add: contextPath + '/houseCard/add',
  edit: contextPath + '/houseCard/edit',
}
export const assetRepairPath = {
  flag: 'assetRepairPath', width: 1600, List: AssetRepairList,
  AddForm: AssetRepairAddForm, EditForm: AssetRepairAddForm,
  CheckForm: AssetRepairAddForm, ViewForm: AssetRepairViewForm,
  list: contextPath + '/assetRepair/list',
  get: contextPath + '/assetRepair/get',
  btnHandle: contextPath + '/assetRepair/btnHandle',
}
export const assetRepairDialogPath = {
  list: contextPath + '/assetRepair/dialogList',
}
export const assetAcceptPath = {
  flag: 'assetAcceptPath', width: 1200, width2: 900, Form: AssetAcceptForm, List: AssetAcceptList,
  EditForm: AssetAcceptEditForm, ViewForm: AssetAcceptViewForm,
  list: contextPath + '/assetAccept/list',
  get: contextPath + '/assetAccept/get',
  add: contextPath + '/assetAccept/add',
  edit: contextPath + '/assetAccept/edit',
}

export const assetScrapPath = {
  flag: 'assetScrapPath', width: 1600, List: AssetScrapList,
  AddForm: AssetScrapAddForm, EditForm: AssetScrapAddForm,
  CheckForm: AssetScrapAddForm, ViewForm: AssetScrapViewForm,
  list: contextPath + '/assetScrap/list',
  get: contextPath + '/assetScrap/get',
  btnHandle: contextPath + '/assetScrap/btnHandle',
}
export const assetScrapDialogPath = {
  list: contextPath + '/assetScrap/dialogList',
}
export const assetScrapValuePath = {
  flag: 'assetScrapValuePath', width: 1600, List: AssetScrapValueList,
  AddForm: AssetScrapValueAddForm, EditForm: AssetScrapValueAddForm,
  CheckForm: AssetScrapValueAddForm, ViewForm: AssetScrapValueViewForm,
  list: contextPath + '/assetScrapValue/list',
  get: contextPath + '/assetScrapValue/get',
  btnHandle: contextPath + '/assetScrapValue/btnHandle',
}
export const assetScrapValueDialogPath = {
  list: contextPath + '/assetScrapValue/dialogList',
}
export const assetScrapProject1Path = {
  flag: 'assetScrapProject1Path', width: 1000, width2: 1000, Form: AssetScrapProject1Form, List: AssetScrapProject1List,
  EditForm: AssetScrapProject1EditForm, ViewForm: AssetScrapProject1ViewForm,
  list: contextPath + '/assetScrapProject1/list',
  get: contextPath + '/assetScrapProject1/get',
  add: contextPath + '/assetScrapProject1/add',
  edit: contextPath + '/assetScrapProject1/edit',
}
export const assetMovePath = {
  flag: 'assetMovePath', width: 850, Form: AssetMoveForm, List: AssetMoveList,
  list: contextPath + '/assetMove/list',
  get: contextPath + '/assetMove/get',
  add: contextPath + '/assetMove/add',
  edit: contextPath + '/assetMove/edit',
}
export const assetTurnPath = {
  flag: 'assetTurnPath', width: 850, List: AssetTurnList,
  AddForm: AssetTurnAddForm, EditForm: AssetTurnAddForm,
  CheckForm: AssetTurnAddForm, ViewForm: AssetTurnViewForm,
  list: contextPath + '/assetTurn/list',
  get: contextPath + '/assetTurn/get',
  btnHandle: contextPath + '/assetTurn/btnHandle',
}
