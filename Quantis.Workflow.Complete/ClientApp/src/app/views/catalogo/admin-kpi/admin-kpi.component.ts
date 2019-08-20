import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { saveAs } from 'file-saver';
import { DataTableDirective } from 'angular-datatables';
import { ApiService } from '../../../_services/api.service';
import { LoadingFormService } from '../../../_services/loading-form.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

declare var $;
let $this;


@Component({
  selector: 'app-admin-kpi',
  templateUrl: './admin-kpi.component.html',
})
export class AdminKpiComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private LoadingFormService: LoadingFormService,
  ) {
    $this = this;
  }
  loading: boolean = true;
  public des = '';
  public ref: any[] ;
  public reft: string;
  public ref1: string;
  public ref2: string;
  public ref3: string;

  @ViewChild('kpiTable') block: ElementRef;
  @ViewChild(DataTableDirective) private datatableElement: DataTableDirective;

  dtOptions = {
    //'dom': 'rtip',
    language: {
      processing: "Elaborazione...",
      search: "Cerca:",
      lengthMenu: "Visualizza _MENU_ elementi",
      info: "Vista da _START_ a _END_ di _TOTAL_ elementi",
      infoEmpty: "Vista da 0 a 0 di 0 elementi",
      infoFiltered: "(filtrati da _MAX_ elementi totali)",
      infoPostFix: "",
      loadingRecords: "Caricamento...",
      zeroRecords: "La ricerca non ha portato alcun risultato.",
      emptyTable: "Nessun dato presente nella tabella.",
      paginate: {
        first: "Primo",
        previous: "Precedente",
        next: "Seguente",
        last: "Ultimo"
      },
      aria: {
        sortAscending: ": attiva per ordinare la colonna in ordine crescente",
        sortDescending: ":attiva per ordinare la colonna in ordine decrescente"
      }
    }
  };

  modalData = {
    id: 0,
    short_name: '',
    group_type: '',
    id_kpi: '',
    id_alm: '',
    id_form: '',
    kpi_description: '',
    kpi_computing_description: '',
    source_type: '',
    computing_variable: '',
    computing_mode: '',
    tracking_period: '',
    measure_unit: '',
    kpi_type: '',
    escalation: '',
    target: '',
    penalty_value: '',
    source_name: '',
    organization_unit: '',
    id_booklet: '',
    file_name: '',
    file_path: '',
    referent: '',
    referent_1: '',
    referent_2: '',
    referent_3: '',
    referent_4: '',
    frequency: '',
    month: '',
    day: '',
    daytrigger: '',
    monthtrigger: '',
    enable: '',
    enable_wf: '',
    enable_rm: '',
    contract: '',
    wf_last_sent: '',
    rm_last_sent: '',
    supply: '',
    primary_contract_party: '',
    secondary_contract_party: '',
    kpi_name_bsi: '',
    global_rule_id_bsi: '',
    sla_id_bsi: ''
  };

  dtTrigger: Subject<any> = new Subject();
  kpiTableHeadData = [
    {
      CONTRACT: 'CONTRACT',
      ID_KPI: 'ID_KPI',
      TITOLO_BREVE: 'TITOLO_BREVE',
      CARICAMENTO: 'CARICAMENTO',
      FREQUENZA: 'FREQUENZA',
      DATA_WF: 'DATA_WF',
      DATA_WM: 'DATA_WM',
      REFERENTI: 'REFERENTI',
      CALCOLO: 'CALCOLO',
      hide: 'hidden'
    }];

  kpiTableBodyData: any = [];
  allForms: any = [];

  coloBtn( id: string): void {
    this.des = id;
  }

  refren( idd: string): void {
    console.log(idd);
    console.log(this.kpiTableBodyData);
    for (const i of this.kpiTableBodyData) {
      if (i.id == idd) {
        this.reft = i.referent;
        this.ref1 = i.referent_1;
        this.ref2 = i.referent_2;
        this.ref3 = i.referent_3;
      }
    }
  }

  ngOnInit() {
    this.dtOptions = {
      language: {
        processing: "Elaborazione...",
        search: "Cerca:",
        lengthMenu: "Visualizza _MENU_ elementi",
        info: "Vista da _START_ a _END_ di _TOTAL_ elementi",
        infoEmpty: "Vista da 0 a 0 di 0 elementi",
        infoFiltered: "(filtrati da _MAX_ elementi totali)",
        infoPostFix: "",
        loadingRecords: "Caricamento...",
        zeroRecords: "La ricerca non ha portato alcun risultato.",
        emptyTable: "Nessun dato presente nella tabella.",
        paginate: {
          first: "Primo",
          previous: "Precedente",
          next: "Seguente",
          last: "Ultimo"
        },
        aria: {
          sortAscending: ": attiva per ordinare la colonna in ordine crescente",
          sortDescending: ":attiva per ordinare la colonna in ordine decrescente"
        }
      }
    };
    this.getForms();
  }


  populateModalData(data) {
    this.modalData.id = 0;
    this.modalData.short_name = data.short_name;
    this.modalData.group_type = data.group_type;
    this.modalData.id_kpi = data.id_kpi;
    this.modalData.id_alm = data.id_alm;
    this.modalData.id_form = data.id_form;
    this.modalData.kpi_description = data.rule_description;
    this.modalData.kpi_computing_description = data.kpi_computing_description;
    this.modalData.source_type = data.source_type;
    this.modalData.computing_variable = data.computing_variable;
    this.modalData.computing_mode = data.computing_mode;
    this.modalData.tracking_period = 'MENSILE';
    this.modalData.measure_unit = data.measure_unit;
    this.modalData.kpi_type = data.kpi_type;
    this.modalData.escalation = data.escalation;
    this.modalData.target = data.service_level_target;
    this.modalData.penalty_value = data.penalty_value;
    this.modalData.source_name = data.source_name;
    this.modalData.organization_unit = data.organization_unit;
    this.modalData.id_booklet = data.id_booklet;
    this.modalData.file_name = data.file_name;
    this.modalData.file_path = data.file_path;
    this.modalData.referent = data.referent;
    this.modalData.referent_1 = data.referent_1;
    this.modalData.referent_2 = data.referent_2;
    this.modalData.referent_3 = data.referent_3;
    this.modalData.referent_4 = data.referent_4;
    this.modalData.frequency = '0';
    this.modalData.month = '1,2,3,4,5,6,7,8,9,10,11,12';
    this.modalData.day = '1'; // forse non è usato
    this.modalData.daytrigger = '5'; // forse non è usato
    this.modalData.monthtrigger = '1,2,3,4,5,6,7,8,9,10,11,12';
    this.modalData.enable = data.enable;
    this.modalData.enable_wf = data.enable_wf;
    this.modalData.enable_rm = data.enable_rm;
    this.modalData.contract = data.sla_name;
    this.modalData.wf_last_sent = data.wf_last_sent;
    this.modalData.rm_last_sent = data.rm_last_sent;
    this.modalData.supply = data.supply;
    this.modalData.primary_contract_party = data.primary_contract_party_id;
    this.modalData.secondary_contract_party = data.secondary_contract_party_id;
    this.modalData.kpi_name_bsi = data.rule_name;
    this.modalData.global_rule_id_bsi = data.global_rule_id;
    this.modalData.sla_id_bsi = data.sla_id;
  }

  updateKpi(modal) {
    console.log(modal);
    this.toastr.info('KPI in aggiornamento..', 'Info');
    switch (this.modalData.tracking_period) {
      case 'MENSILE':
        this.modalData.month = '1,2,3,4,5,6,7,8,9,10,11,12';
        this.modalData.monthtrigger = '1,2,3,4,5,6,7,8,9,10,11,12';
        break;
      case 'TRIMESTRALE':
        this.modalData.month = '1,4,7,10';
        this.modalData.monthtrigger = '1,4,7,10';
        break;
      case 'QUADRIMESTRALE':
        this.modalData.month = '1,5,9';
        this.modalData.monthtrigger = '1,5,9';
        break;
      case 'SEMESTRALE':
        this.modalData.month = '1,7';
        this.modalData.monthtrigger = '1,7';
        break;
      case 'ANNUALE':
        this.modalData.month = '1';
        this.modalData.monthtrigger = '1';
        break;
      default:
        this.modalData.month = '1,2,3,4,5,6,7,8,9,10,11,12';
        this.modalData.monthtrigger = '1,2,3,4,5,6,7,8,9,10,11,12';
        break;
    }
    console.log(this.modalData);
    this.apiService.updateCatalogKpi(this.modalData).subscribe(data => {
      this.getTRules(); // this should refresh the main table on page
      this.toastr.success('KPI Consolidato', 'Success');
      if (modal == 'kpi') {
        $('#kpiModal').modal('toggle').hide();
      } else {
        $('#referentiModal').modal('toggle').hide();
      }
      
    }, error => {
      this.toastr.error('Errore durante consolidamento.', 'Error');
      if (modal == 'kpi') {
        $('#kpiModal').modal('toggle').hide();
      } else {
        $('#referentiModal').modal('toggle').hide();
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dtTrigger.next();
    this.setUpDataTableDependencies();
    this.getTRules();
    //this.getKpis();
    //this.rerender();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(); 
      this.setUpDataTableDependencies();
      
    });
    
  }

  setUpDataTableDependencies() {
/*
    // let datatable_Ref = $(this.block.nativeElement).DataTable({
    //   'dom': 'rtip'
    // });

    // #column3_search is a <input type="text"> element

    $this.datatableElement.dtInstance.then((datatable_Ref: DataTables.Api) => {
      datatable_Ref.columns(0).every( function () {
        const that = this;

        // Create the select list and search operation
        const select = $($this.searchCol4.nativeElement)
          .on( 'change', function () {
            that
              .search( $(this).val() )
              .draw();
          } );

        // Get the search data for the first column and add to the select list
        this
          .cache( 'search' )
          .sort()
          .unique()
          .each( function ( d ) {
            select.append( $('<option value="' + d + '">' + d + '</option>') );
          } );
      });
    });

    $this.datatableElement.dtInstance.then((datatable_Ref: DataTables.Api) => {
      datatable_Ref.columns(4).every( function () {
        const that = this;

        // Create the select list and search operation
        const select = $($this.searchCol5.nativeElement)
          .on( 'change', function () {
            that
              .search( $(this).val() )
              .draw();
          } );

        // Get the search data for the first column and add to the select list
        /*this
          .cache('search')
          .unique();
          .each( function ( d ) {
            select.append( $('<option value="' + d + '">' + d + '</option>') );
          } ); //***
      });
    });
*/
    
  }

  isNumber(val){
    return !isNaN(val);
  }
  table2csv(oTable, exportmode, tableElm) {
    var csv = '';
    var headers = [];
    var rows = [];

    // Get header names
    $(tableElm+' thead').find('th:not(.notExportCsv)').each(function() {
      var $th = $(this);
      var text = $th.text();
      var header = '"' + text + '"';
      // headers.push(header); // original code
      if(text != "") headers.push(header); // actually datatables seems to copy my original headers so there ist an amount of TH cells which are empty
    });
    csv += headers.join(',') + "\n";

    // get table data
    if (exportmode == "full") { // total data
      var totalRows = oTable.data().length;
      for(let i = 0; i < totalRows; i++) {
        //var row = oTable.row(i).data();
        //row = $this.strip_tags(row);
        //rows.push(row);
        rows.push(oTable.cells( oTable.row(i).nodes(), ':not(.notExportCsv)' ).data().join(','));
      }
    } else { // visible rows only
      $(tableElm+' tbody tr:visible').each(function(index) {
        var row = [];
        $(this).find('td:not(.notExportCsv)').each(function(){
          var $td = $(this);
          var text = $td.text();
          var cell = '"' +text+ '"';
          row.push(cell);
        });
        rows.push(row);
      })
    }
    csv += rows.join("\n");
    var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "ExportKPITable.csv");
  }

  strip_tags(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText;
  }

 /* getKpis1() {
    this.apiService.getCatalogoKpis().subscribe((data: any) => {
    });
  }

  getKpis() {
    this.loading = true;
    this.apiService.getCatalogoKpis().subscribe((data: any) => {
      this.kpiTableBodyData = data;
      console.log('Kpis ', data);
      this.rerender();
      this.loading = false;
    });
  }*/
  getTRules() {
    this.loading = true;
    this.apiService.getTRules().subscribe((data: any) => {
      this.kpiTableBodyData = data;
      console.log('Rules ', data);
      this.rerender();
      this.loading = false;
    });
  }
  getForms() {
    this.LoadingFormService.getLoadingForms().subscribe((data: any) => {
      this.allForms = data;
      console.log('forms ', data);
    });
  }
}
