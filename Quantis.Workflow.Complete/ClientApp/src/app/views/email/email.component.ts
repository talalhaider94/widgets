import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ApiService } from '../../_services/api.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

declare var $;
var $this;

@Component({
  templateUrl: './email.component.html'
})

export class EmailComponent implements OnInit {
  @ViewChild('ConfigurationTable') block: ElementRef;
  // @ViewChild('searchCol1') searchCol1: ElementRef;
  @ViewChild(DataTableDirective) private datatableElement: DataTableDirective;
  key: any = '';
  value: any =  '';
  owner: any = '';
  isenable: boolean =  false;
  description: any =  '';

  dtOptions: DataTables.Settings = {
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
    email_body: ''
  };
  
  addData = {
    key: '',
    value: '',
    owner: '',
    isenable: false,
    description: ''
  };

  dtTrigger: Subject<any> = new Subject();
  ConfigTableBodyData: any = [
    {
      type: '',
      user_domain: '',
      period: '',
      form_name: '',
      notify_date: ''
    }
  ]

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
  ) {
    $this = this;
  }

  monthVar: any;
  yearVar: any;
  loading:boolean = true;

  ngOnInit() {
    this.monthVar = moment().format('MM');
   this.yearVar = moment().format('YY');
   this.populateDateFilter();

    console.log(this.monthVar+'/'+this.yearVar);
  }

  populateModalData(data) {
    this.modalData.email_body = data.email_body;
  }

  populateDateFilter() {
    this.loading = true;
    this.apiService.getEmails(this.monthVar, this.yearVar).subscribe((data: any) => {
      this.ConfigTableBodyData = data;
      this.rerender();
    
    // this.numeroContratti();
    // this.addChildren();
    // },error=>{

    //   this.toastr.error("errore di connessione al sever");

  }, (err) => {
    this.ConfigTableBodyData = [];
    this.loading = false;
  });
}

  addConfig() {
    this.addData.key = this.key;
    this.addData.owner = this.owner;
    this.addData.value = this.value;
    this.addData.isenable = this.isenable;
    this.addData.description = this.description;

    this.toastr.info('Valore in aggiornamento..', 'Info');
    this.apiService.addConfig(this.addData).subscribe(data => {
        this.getCOnfigurations(); // this should refresh the main table on page
        this.toastr.success('Valore Aggiornato', 'Success');
        $('#addConfigModal').modal('toggle').hide();
    }, error => {
        this.toastr.error('Errore durante add.', 'Error');
        $('#addConfigModal').modal('toggle').hide();
    });
  }

  updateConfig() {
    this.toastr.info('Valore in aggiornamento..', 'Info');
    this.apiService.updateConfig(this.modalData).subscribe(data => {
      this.getCOnfigurations(); // this should refresh the main table on page
      this.toastr.success('Valore Aggiornato', 'Success');
      $('#configModal').modal('toggle').hide();
    }, error => {
      this.toastr.error('Errore durante update.', 'Error');
      $('#configModal').modal('toggle').hide();
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dtTrigger.next();

    this.setUpDataTableDependencies();
    this.getCOnfigurations();

    /*this.apiService.getConfigurations().subscribe((data:any)=>{
      this.ConfigTableBodyData = data;
      this.rerender();
    });*/
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
      this.loading = false;
    });
  }

  // getConfigTableRef(datatableElement: DataTableDirective): any {
  //   return datatableElement.dtInstance;
  //   // .then((dtInstance: DataTables.Api) => {
  //   //     console.log(dtInstance);
  //   // });
  // }

  setUpDataTableDependencies(){
    // $(this.searchCol1.nativeElement).on( 'keyup', function () {
    //   $this.datatableElement.dtInstance.then((datatable_Ref: DataTables.Api) => {
    //   datatable_Ref
    //     .columns( 0 )
    //     .search( this.value )
    //     .draw();
    // });
    // });

  }

  strip_tags(html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent||tmp.innerText;
  }

  getCOnfigurations() {
    this.loading = true;
    this.apiService.getEmails(this.monthVar,this.yearVar).subscribe((data) =>{
      this.ConfigTableBodyData = data;
      console.log('Emails Data ', data);
      this.rerender();
    }, (err) => {
      this.ConfigTableBodyData = [];
      this.loading = false;
    });
  }

 /* getCOnfigurations1() {
    this.apiService.getConfigurations().subscribe((data: any) => {
    });

  }*/
}
