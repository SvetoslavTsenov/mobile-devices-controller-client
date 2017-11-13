import { Component, OnInit } from '@angular/core';
import { ServiceContext } from "../../../client/service-context";
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'seed-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    hosts = [
        { name: "svs", url: "http://localhost:8000" },
        { name: "svs1", url: "http://localhost:8001" },
        { name: "svs2", url: "http://localhost:8001" },
    ];

    loading = true;
    displayedColumns = ['_status', '_name', '_token'];
    selectedRowIndex: any = -1;
    selectedHost: any;
    selectedDevice = {};
    dataSource = new MatTableDataSource();

    constructor(private _context: ServiceContext) {
    }

    devices = [];

    ngOnInit() {
        this.selectedHost = this.hosts[0];
        this.hostChange(undefined);
    }

    hostChange(value: any) {
        this.loading = true;
        this.dataSource = new MatTableDataSource();
        this._context.getDevices(this.selectedHost['url']).subscribe(
            (data) => {
                this.dataSource = new MatTableDataSource(data);
                this.loading = false;
            },(error)=>{
                this.loading = false;
            }
        );

    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    highlight(row) {
        this.selectedRowIndex = row._token;
        this.selectedDevice = row;
    }

    stop() {
        this._context.stopDevice(this.selectedHost['url'], 'platform', this.selectedDevice['_platform'], 'token', this.selectedDevice['_token'], "name", this.selectedDevice['_name'])
            .subscribe((d) => {
                console.log(d);
            });
    }

    boot() {
        this._context.bootDevice(this.selectedHost['url'], 'platform', this.selectedDevice['_platform'], 'token', this.selectedDevice['_token'], "name", this.selectedDevice['_name'])
            .subscribe((d) => {
                this.selectedDevice = d[0];
                this.dataSource.data.find((v)=>{ return v === d[0]})[0] = d
                console.log(d[0]);
            });
    }
}
