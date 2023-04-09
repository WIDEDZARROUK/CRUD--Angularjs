import { Component ,Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {

  Education: string[]= [
      'Baccalureate',
      'BTS certification',
      'Applied/Basic License',
      'Masters',
      'National Engineering'
  ]

  empForm:FormGroup;

  constructor
  (private _fb:FormBuilder,
   private _empService:EmployeeService,
   private _dialogRef:MatDialogRef<EmpAddEditComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _coreService:CoreService
   )
   {


// function hedhy ta5o l valeur lmawjod fil form 7aseb l formControlName
    this.empForm=this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      mobilenumber:'',
      city:'',
      education:'',
      experience:'',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  // l function hedhy ta3mil validation 3la les champs fil form ken s7a7 ta3ml alert w ta3ml l createmte3ha fil service
  //si non ta3ml error
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value)
         .subscribe({
          next:(val:any)=>
          {
            this._coreService.openSnackBar('Employee Updated !','done');
            this._dialogRef.close(true);
          },
          error:(err:any)=>
          {
            console.error(err);
          },
        }) ;
      }else{
        this._empService.createEmployee(this.empForm.value).subscribe({
          next:(val:any)=>
          {
            this._coreService.openSnackBar('Employee Created Seccessfully','done');
            this._dialogRef.close(true);
          },
          error:(err:any)=>
          {
            console.error(err);
          },
        }) ;
      }
      
    }
  }
}
