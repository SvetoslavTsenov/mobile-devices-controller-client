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

    displayedColumns = ['_status', '_name', '_token'];
    selectedRowIndex: any = -1;
    selectedDevice = {};
    dataSource = new MatTableDataSource();

    constructor(private _context: ServiceContext) { }

    devices = [];

    ngOnInit() {
        this._context.getDevices().subscribe(
            data => {
                this.dataSource = new MatTableDataSource(data);
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

    update() {
        console.log(this.selectedDevice);
    }
}
