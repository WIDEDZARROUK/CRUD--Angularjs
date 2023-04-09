import { Component , OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'mobilenumber',
    'city',
    'education',
    'experience',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService:EmployeeService, private _coreService:CoreService){}

  ngOnInit(): void {
    this.getEmplyeeList();
  }
  OpenAddEditEmpForm(){
   const dialogRef= this._dialog.open(EmpAddEditComponent);
   dialogRef.afterClosed().subscribe({
      next:(val)=>{
          if(val){
            this.getEmplyeeList();
          }
      },
      error : console.log,
   })
  }

  // read lil db.jsin : ya3ni ta9ra w taffichy les champ l3amarnehom fi table
  getEmplyeeList(){
    this._empService.readeEmployeelist().subscribe({
      next:(res)=>{
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },    
      error : console.log,
    })
  }

  //hdhy mn3rch
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //delete 7asb l id
  deleteEmployee(id:number){
    this._empService.deleteEmplyee(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar('Employee Deleted !','done');
        this.getEmplyeeList();
      },
      error: console.log,
    })
  }

  //edit
  openEditForm( data:any){
   const dialogRef= this._dialog.open(EmpAddEditComponent, {
     data,
   });
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
        if(val){
          this.getEmplyeeList();
        }
    },
    error : console.log,
 })

  }
}
