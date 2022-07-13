import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Student,Subject } from './form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  data:Student=new Student();
  myForm!: FormGroup;
  id:any;

  checkboxJson = [{
    id: 1,
    label: 'Reading',
    checked: false
  },
  {
    id: 2,
    label: 'dancing',
    checked: false
  },
  {
    id: 3,
    label: 'playing',
    checked: false
  },
  {
    id: 4,
    label: 'Singing',
    checked: false
  },
  ];
  constructor(private fb: FormBuilder,private router: Router, private employeeService:EmployeeService) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: [''],
      address: [''],
      subject: this.fb.array([]),
      gender: [''],
      cars: [''],
      date: [''],
      hobbie: this.fb.array([]),
    })
  }
  saveEmployee(){
    if (this.id) {
      this.employeeService.updateEmployee(this.id, this.data).subscribe(data1 => {
        console.log(data1)
        this.showdata();
      }, error => console.log(error));

    }
    else {
      this.employeeService.createEmployee(this.data).subscribe(data1 => {
        console.log(data1)
        this.showdata();
      }, error => console.log(error));
    }

  }
  save(){  
    console.log(this.myForm.value);
    this.saveEmployee();
  }

  get subject() {
    return this.myForm.get('subject') as FormArray;
  }

  addSubject() {
    this.subject.push(this.fb.control(''));
  }

  removeSubject(i: number) {
    this.subject.removeAt(i);
  }

 
  showdata(){
    this.router.navigate(['list']);
  }

   }
  





  

