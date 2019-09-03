import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { ToastrService } from 'ngx-toastr';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { ITreeOptions, TreeComponent } from 'angular-tree-component';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';


@Component({
  templateUrl: './userprofiling.component.html',
  styleUrls: ['./userprofiling.component.scss']
})

export class UserProfilingComponent implements OnInit {
  //@ViewChild('permissionsTree') permissionsTree: TreeViewComponent;
  @ViewChildren('permissionsTree') allTreesNodes !: QueryList<TreeViewComponent>;
  isTreeLoaded = false;
  treesArray = [];
  allCurrentChildIds = [];
  assign = true;
  unassign = false;


  public treeFields: any = {
      dataSource: [],
      id: 'id',
      text: 'name',
      child: 'children',
      title: 'name'
  };

  innerMostChildrenNodeIds = [];
  gatheredData = {
    usersList: [],
    rolesList: [],
    assignedPermissions: []
  }
  permissionsData: any;
  contractsData: any;
  kpisData: any;
  kpisId = [];
  storedIds = [];
  saveKpisData =  {
    userId:0,
    contractId:0,
    kpiIds:[]
  }
  selectedData = {
    userid: null,
    permid: null,
    name: '',
    contractParty: '',
    contractName: '',
    checked: null,
    selected: null
  }
 
  filters: any = {
    searchUsersText: '',
    searchPermissionsText: ''
  }

  loading = {
    users: false,
    roles: false
  }
  selectedUserObj = {};
  selectedContractsObj = {};
  selectedKpisObj = {};

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {

    this.loading.roles = true;
    this.apiService.getCatalogoUsers().subscribe((res)=>{
      console.log('getCatalogoUsers ==> ', res);
      this.gatheredData.usersList = res;
      this.loading.roles = false;
      this.selectedData.userid = res.ca_bsi_user_id;
    }, err => {this.loading.roles = true; this.toastr.warning('Connection error', 'Info')});

    // this.apiService.getAllKpiHierarchy().subscribe(data=>{
    //   console.log('getAllKpiHierarchy ==> ', data);
    //   //this.treeFields.dataSource = data;
    //   this.createTrees(data);
    // }, err => {this.isTreeLoaded = true; this.toastr.warning('Connection error', 'Info')});
  }

  populatePermission(data){
    this.selectedData.permid = data.id;
    console.log('Contract Party ID ==> ', this.selectedData.permid);
  }

  selectRoleItem(user, $event) {
    this.selectedUserObj = user;
    if($event){
      $('.role-permissions-lists ul.users-list li').removeClass('highlited-user');
      $($event.target).addClass('highlited-user');
    }
    this.selectedData.userid = user.ca_bsi_user_id;
    this.selectedData.name = user.userid + ' - ' + user.name + ' ' + user.surname + '[' + user.ca_bsi_account + ']';
    
    if(this.selectedData.userid){
      this.apiService.getAllKpiHierarchy(this.selectedData.userid).subscribe(data=>{
        this.permissionsData = data;
        console.log('getFirstLevelHierarchy ==> ', data);
      });
    } else {
      this.permissionsData = [];
      //this.uncheckAllTrees();
    }
  }

  getContracts(data){
    this.selectedContractsObj = data;
    this.selectedData.permid = data.id;
    this.selectedData.contractParty = data.name;
    console.log('getContracts ==> ', this.selectedData.userid,this.selectedData.permid);
    this.apiService.getContracts(this.selectedData.userid,this.selectedData.permid).subscribe(data => {
      this.contractsData = data;
    });
  }
  
  getKpis(data){
    this.selectedKpisObj = data;
    this.selectedData.permid = data.id;
    this.selectedData.contractName = data.name;
    console.log('getKpis ==> ', this.selectedData.userid,this.selectedData.permid);
    this.apiService.getKpis(this.selectedData.userid,this.selectedData.permid).subscribe(data => {
      this.kpisData = data;
      // initially add ids of checked kpis
      this.kpisId = [];
      data.forEach((item)=>{ 
        item.code == '1' ? this.kpisId.push(item.id) : null;
      });

    });
  }

  assignedPermissions(data){
    this.selectedData.permid = data.id;
    console.log('assignedPermissions ==> ', this.selectedData.userid,this.selectedData.permid,this.assign);
    this.apiService.assignContractParty(this.selectedData.userid,this.selectedData.permid).subscribe(data => {
      this.toastr.success('Saved', 'Success');
      this.selectRoleItem(this.selectedUserObj, null);
    }, error => {
      this.toastr.error('Not Saved', 'Error');
    });
  }

  unAssignedPermissions(data){
    this.selectedData.permid = data.id;
    console.log('unAssignedPermissions ==> ', this.selectedData.userid,this.selectedData.permid,this.unassign);
    this.apiService.unassignContractParty(this.selectedData.userid,this.selectedData.permid).subscribe(data => {
      this.toastr.success('Saved', 'Success');
      this.selectRoleItem(this.selectedUserObj, null);
    }, error => {
      this.toastr.error('Not Saved', 'Error');
    });
  }

  assignedContracts(data){
    this.selectedData.permid = data.id;
    console.log('assignedContracts ==> ', this.selectedData.userid,this.selectedData.permid,this.assign);
    this.apiService.assignContracts(this.selectedData.userid,this.selectedData.permid).subscribe(data => {
      this.toastr.success('Saved', 'Success');
      this.getContracts(this.selectedContractsObj);
      this.selectRoleItem(this.selectedUserObj, null);
    }, error => {
      this.toastr.error('Not Saved', 'Error');
    });
  }

  unAssignedContracts(data){
    this.selectedData.permid = data.id;
    console.log('unAssignedContracts ==> ', this.selectedData.userid,this.selectedData.permid,this.unassign);
    this.apiService.unassignContracts(this.selectedData.userid,this.selectedData.permid).subscribe(data => {
      this.toastr.success('Saved', 'Success');
      this.getContracts(this.selectedContractsObj);
      this.selectRoleItem(this.selectedUserObj, null);
    }, error => {
      this.toastr.error('Not Saved', 'Error');
    });
  }

  storeKpis(data, event){
    // event.target.checked
    if(!event.target.checked){
      let idx = this.kpisId.indexOf(data.id);
      if(idx>-1){
        this.kpisId.splice(idx, 1);
      }
    } else {
      if(!this.kpisId.includes(data.id)){
        this.kpisId.push(data.id);
      }
    }
    console.log('storedKpis ==> ', this.kpisId);
  }
  
  assignKpis(){
    this.saveKpisData.userId = this.selectedData.userid;
    this.saveKpisData.contractId = this.selectedData.permid;
    this.saveKpisData.kpiIds = this.kpisId;

    this.apiService.assignKpistoUser(this.saveKpisData).subscribe(data => {
      this.toastr.success('Saved', 'Success');
      this.selectRoleItem(this.selectedUserObj, null);
    }, error => {
      this.toastr.error('Not Saved', 'Error');
    }); 
    console.log('assignKpis ==> ', this.saveKpisData);
  }


  addLoaderToTrees(add = true){
    let load = false;
    if(add === false){
      load = true;
    }
    this.treesArray.forEach((itm:any) => {
      itm.loaded = load;
    });
  }


  // createTrees(treesData){
  //   treesData.forEach((itm:any)=>{
  //     let settings = { dataSource: [itm], id: 'id', text: 'name', title: 'name', child: 'children', hasChildren: 'children' };
  //     this.treesArray.push({
  //       name: itm.name,
  //       settings: settings,
  //       checkedNodes: [],
  //       id: itm.id,
  //       elementId: `permissions_tree_${itm.id}`,
  //       loaded: true
  //      });
  //   });

  //   this.isTreeLoaded = true;
  // }



  // updateTrees(selectedNodesIdsArray){
  //   console.log('in update fun => ', new Date().toISOString());
  //   let _selectedData = selectedNodesIdsArray;
  //   this.treesArray.forEach((itm:any)=>{
  //     this.allCurrentChildIds = [];
  //     this.getAllLeafNodesIds(itm.settings.dataSource);
  //     let filteredIds = _selectedData.filter( value => this.allCurrentChildIds.indexOf(+value)>-1);
  //     // check if it is needed anymore
  //     filteredIds = filteredIds.map(function(item) {
  //       return parseInt(item, 10);
  //     });
  //     if(!filteredIds.length){
  //       //this.treesArray.forEach((tre:any)=>{
  //         itm.loaded = true;
  //       //});
  //     }
  //     itm.checkedNodes = filteredIds;
  //     //console.log(itm, _selectedData, filteredIds, this.allCurrentChildIds);
  //   });
  //   console.log('end update fun => ', new Date().toISOString());
  // }


  
  // saveAssignedPermissions(){
  //   console.log('this.treesArray ', this.treesArray);
  //   if(this.selectedData.userid) {
  //     let allChkd = [];
  //     // this.treesArray.forEach((tre:any)=>{
  //     //   allChkd = [...allChkd, ...tre.checkedNodes];
  //     // });
  //     this.allTreesNodes.forEach((tre:any) => {
  //       allChkd = [...allChkd, ...tre.checkedNodes];
  //     });
  //     allChkd = allChkd.map(function(item) {
  //       return parseInt(item, 10);
  //     });

  //     let dataToPost = {Id: this.selectedData.userid, Ids: allChkd};
  //     console.log('dataToPost ', dataToPost);
  //     this.apiService.assignGlobalRulesToUserId(dataToPost).subscribe(data => {
  //       this.toastr.success('Saved', 'Success');
  //       //this.apiService.getGlobalRulesByUserId(this.selectedData.userid).subscribe(data=>{
  //         //console.log('getGlobalRulesByUserId ==> ', data);
  //         //this.selectedData.checked = data;
  //       //});
  //     }, error => {
  //       this.toastr.error('Not Saved', 'Error');
  //     });
  //   }
  // }



  // uncheckAllTrees(){
  //   //this.updateTrees([]);
  //   this.addLoaderToTrees(false);
  //   this.allTreesNodes.forEach((itm:any) => {
  //     itm.uncheckAll();
  //   });
  // }


  // syncSelectedNodesArray(event, treeRef){
  //   console.log('chekedddddddddddddddd ');//, treeRef);
  //   treeRef.loaded = true;
  //   //this.selectedData.checked = this.permissionsTree.checkedNodes;
  // }


  // getAllLeafNodesIds(complexJson) {
  //   if (complexJson) {
  //     complexJson.forEach((item:any)=>{
  //       if (item.children) {
  //         this.getAllLeafNodesIds(item.children);
  //       } else {
  //           this.allCurrentChildIds.push(item.id);
  //       }
  //     });
  //   }
  // }


}
