import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Student } from '../form/form.model';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  data!: Student[];

  constructor(private router: Router, private employeeService: EmployeeService, private route: ActivatedRoute,
    private dialog: MatDialog) {
  
    // this.route.params.subscribe((data) => {
    //   console.log(data);
    // });
  }

  ngOnInit(): void {
    this.getEmployee();
  }
  //show data
  getEmployee() {
    this.employeeService.getEmployeeList().subscribe(data1 => {
      this.data = data1
    })
  }
  //delete data
  deleteEmployee(id: number) {

    this.employeeService.deleteEmployee(id).subscribe(data1 => {
      console.log(data1);
      this.getEmployee();

    })
  }

  //Edit
  updateEmployee(id: number) {
    if (id) {
      this.router.navigate(['/form'], { queryParams: { id: id } });

    }
    else {
      this.router.navigate(['/form']);
    }
  }


  //view 
 
  viewsubject(subject: any,name:any) {
    subject.uname=name
      this.dialog.open(DialogComponent, {
        data: subject
      });
    }




}
