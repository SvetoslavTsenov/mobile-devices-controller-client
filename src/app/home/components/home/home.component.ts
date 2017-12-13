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
        { name: "svs", url: "http://localhost:8700" },

    ];

    loading = false;
    displayedColumns = ['status', 'name', 'token']; 
    selectedRowIndex: any = -1;
    selectedHost: any; 
    selectedDevice :any;
    dataSource = new MatTableDataSource();
    searchedQuery: { platform, apiLevel, name, status } = { platform: undefined, apiLevel: undefined, name: undefined, status: undefined };

    constructor(private _context: ServiceContext) {
    }

    devices = [];

    ngOnInit() {
        this.selectedHost = this.hosts[0];
        this.hostChange(undefined);
    }

    find(any) {
        this.loading = true;
        this.dataSource = new MatTableDataSource();
        this._context.getDevicesByQuerry(this.selectedHost['url'], this.searchedQuery).subscribe(
            (data) => {
                this.dataSource = new MatTableDataSource(data);
                this.loading = false;
            }, (error) => {
                this.loading = false;
            }
        );
    }

    refresh(any) {
        this.loading = true;
        this.dataSource = new MatTableDataSource();
        this._context.refresh(this.selectedHost['url'], this.searchedQuery).subscribe(
            (data) => {
                this.dataSource = new MatTableDataSource(data);
                this.loading = false;
            }, (error) => {
                this.loading = false;
            }
        );
    }

    hostChange(value: any) {

    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    highlight(row) {
        this.selectedRowIndex = row.token;
        this.selectedDevice = row;
    }

    stop() {
        this._context.stopDevice(this.selectedHost['url'], 'platform', this.selectedDevice['platform'], 'token', this.selectedDevice['token'], "name", this.selectedDevice['name'])
            .subscribe((d) => {
                console.log(d);
                this.selectedDevice = d[0];
                this.dataSource.data.find((v) => { return v['token'] === d[0]['token'] })[0] = d
            }, (error) => {
                console.log(error);
            });
    }

    boot() {
        this._context.bootDevice(this.selectedHost['url'], 'platform', this.selectedDevice['platform'], 'token', this.selectedDevice['token'])
            .subscribe((d) => {
                this.selectedDevice = d[0];
                this.dataSource.data.find((v) => { return v['token'] === d[0]['token'] })[0] = d
                console.log(d[0]);
            }, (error) => {
                console.log(error);
            });
    }

    update() {
        this._context.update(this.selectedHost['url'], this.selectedDevice['token'],  this.selectedDevice)
            .subscribe((d) => {
                this.selectedDevice = d[0];
                this.dataSource.data.find((v) => { return v['token'] === d[0]['token'] })[0] = d
                console.log(d[0]);
            }, (error) => {
                console.log(error);
            });
    }
}
