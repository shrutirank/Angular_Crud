import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  myprop!: string;
  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

}
