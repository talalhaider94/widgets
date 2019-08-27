import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardService, EmitterService } from '../../_services';
import { forkJoin } from 'rxjs';
import { DateTimeService } from '../../_helpers';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-barchart',
	templateUrl: './barchart.component.html',
	styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
	@Input() widgetname: string;
	@Input() url: string;
	@Input() filters: Array<any>;
	@Input() properties: Array<any>;
	// this widgetid is from widgets Collection and can be duplicate
	// it will be used for common functionality of same component instance type
	@Input() widgetid: number;
	@Input() dashboardid: number;
	@Input() id: number; // this is unique id 

	loading: boolean = true;
	barChartWidgetParameters: any;
	setWidgetFormValues: any;
	editWidgetName: boolean = true;
	@Output()
	barChartParent = new EventEmitter<any>();
	constructor(
		private dashboardService: DashboardService,
		private emitter: EmitterService,
		private dateTime: DateTimeService,
		private router: Router
	) { }

	ngOnInit() {
		console.log('CURRENT ROUTE', this.router.url);
		if (this.router.url.includes('dashboard/public')) {
			this.editWidgetName = false;
		}
		console.log('BarchartComponent', this.widgetname, this.url, this.id, this.widgetid, this.filters, this.properties);
		if (this.url) {
			this.emitter.loadingStatus(true);
			// this.getWidgetParameters(this.url);
			// this.getWidgetIndex(this.url);
			this.getChartParametersAndData(this.url);
		}
		// coming from dashboard component
		this.emitter.getData().subscribe(result => {
			const { type, data } = result;
			if (type === 'barChart') {
				let currentWidgetId = data.barChartWidgetParameters.id;
				if (currentWidgetId === this.id) {
					// updating parameter form widget setValues 
					let barChartFormValues = data.barChartWidgetParameterValues;
					barChartFormValues.Filters.daterange = this.dateTime.buildRangeDate(barChartFormValues.Filters.daterange);
					this.setWidgetFormValues = barChartFormValues;
					this.updateChart(data.result.body, data, null);
				}
			}
		})
	}
	// invokes on component initialization
	getChartParametersAndData(url) {
		// these are default parameters need to update this logic
		// might have to make both API calls in sequence instead of parallel
		let myWidgetParameters = null;
		this.dashboardService.getWidgetParameters(url).pipe(
			mergeMap((getWidgetParameters: any) => {
				myWidgetParameters = getWidgetParameters;
				// Map Params for widget index when widgets initializes for first time
				let params = {
					GlobalFilterId: 0,
					Properties: {
						measure: Object.keys(getWidgetParameters.measures)[0],
						charttype: Object.keys(getWidgetParameters.charttypes)[0],
						aggregationoption: Object.keys(getWidgetParameters.aggregationoptions)[0]
					},
					Filters: {
						daterange: getWidgetParameters.defaultdaterange
					},
					Note: ''
				};
				/// To be used -> getWidgetIndex method ////
				return this.dashboardService.getWidgetIndex(url, params);
			})
		).subscribe(getWidgetIndex => {
			// populate modal with widget parameters
			console.log('getWidgetIndex', getWidgetIndex);
			console.log('myWidgetParameters', myWidgetParameters);
			let barChartParams;
			if (myWidgetParameters) {
				barChartParams = {
					type: 'barChartParams',
					data: {
						...myWidgetParameters,
						widgetname: this.widgetname,
						url: this.url,
						filters: this.filters, // this.filter/properties will come from individual widget settings
						properties: this.properties,
						widgetid: this.widgetid,
						dashboardid: this.dashboardid,
						id: this.id
					}
				}
				this.barChartWidgetParameters = barChartParams.data;
				// have to use setTimeout if i am not emitting it in dashbaordComponent
				// this.barChartParent.emit(barChartParams);
				// setting initial Paramter form widget values
				this.setWidgetFormValues = {
					GlobalFilterId: 0,
					Properties: {
						measure: Object.keys(this.barChartWidgetParameters.measures)[0],
						charttype: Object.keys(this.barChartWidgetParameters.charttypes)[0],
						aggregationoption: Object.keys(this.barChartWidgetParameters.aggregationoptions)[0]
					},
					Filters: {
						daterange: this.dateTime.buildRangeDate(this.barChartWidgetParameters.defaultdaterange),
						dateTypes: barChartParams.data.datetypes[0]
					},
					Note: ''
				}
			}
			// popular chart data
			if (getWidgetIndex) {
				const chartIndexData = getWidgetIndex.body;
				// third params is current widgets settings current only used when
				// widgets loads first time. may update later for more use cases
				this.updateChart(chartIndexData, null, barChartParams.data);
			}
			this.loading = false;
			this.emitter.loadingStatus(false);
		}, error => {
			this.loading = false;
			this.emitter.loadingStatus(false);
		});
	}

	// barChart
	public barChartData: Array<any> = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
	];

	public barChartLabels: Array<any> = [];
	public barChartOptions: any = {
		responsive: true,
		legend: { position: 'bottom' }
	};
	public barChartLegend: boolean = true;
	public barChartType: string = 'bar'; 

	// events
	public chartClicked(e: any): void {
		console.log("Bar Chart Clicked ->",e);
	}

	public chartHovered(e: any): void {
		// console.log(e);
	}

	openModal() {
		console.log('OPEN MODAL BAR CHART PARAMS', this.barChartWidgetParameters);
		console.log('OPEN MODAL BAR CHART VALUES', this.setWidgetFormValues)
		this.barChartParent.emit({
			type: 'openBarChartModal',
			data: {
				barChartWidgetParameters: this.barChartWidgetParameters,
				setWidgetFormValues: this.setWidgetFormValues
			}
		});
	}
	closeModal() {
		this.barChartParent.emit({ type: 'closeModal' });
	}
	// dashboardComponentData is result of data coming from 
	// posting data to parameters widget

	/// To be used ////
	updateChart(chartIndexData, dashboardComponentData, currentWidgetComponentData) {
		let label = 'Series';
		if (dashboardComponentData) {
			let measureIndex = dashboardComponentData.barChartWidgetParameterValues.Properties.measure;
			label = dashboardComponentData.barChartWidgetParameters.measures[measureIndex];
		}
		if (currentWidgetComponentData) {
			// setting chart label and type on first load
			label = currentWidgetComponentData.measures[0];
			this.barChartType = Object.keys(currentWidgetComponentData.charttypes)[0];
		}
		let allLabels = chartIndexData.map(label => label.xvalue);
		let allData = chartIndexData.map(data => data.yvalue);
		this.barChartData = [{ data: allData, label: label }]
		this.barChartLabels.length = 0;
		this.barChartLabels.push(...allLabels);
		this.closeModal();
	}

	widgetnameChange(event) {
		console.log('widgetnameChange', this.id, event);
		this.barChartParent.emit({
			type: 'changeBarChartWidgetName',
			data: {
				barChart: {
					widgetname: event,
					id: this.id,
					widgetid: this.widgetid
				}
			}
		});
	}
}
