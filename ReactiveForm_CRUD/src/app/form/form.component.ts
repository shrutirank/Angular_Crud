import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Student, Subject } from './form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  data: Student = new Student();
  myForm!: FormGroup;
  id: any;

  checkboxJson: Array<any> = [{
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
  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService) { }

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

    //edit 
    this.id = this.route.snapshot.queryParams['id'];
    if (this.id) {
      this.employeeService.getEmployeeBYId(this.id).subscribe((response: any) => {
        this.myForm = new FormGroup({
          name: new FormControl(response['name']),
          address: new FormControl(response['address']),
          gender: new FormControl(response['gender']),
          cars: new FormControl(response['cars']),
          date: new FormControl(response['date']),

        })
        console.log(response);

        this.data = response;
      });
    }
  }


  onCheckbox(e: any) {
    const hobbie: FormArray = this.myForm.get('hobbie') as FormArray;

    if (e.target.checked) {
      hobbie.push(new FormControl(e.target.value));
    } else {
      const index = hobbie.controls.findIndex(x => x.value === e.target.value);

      hobbie.removeAt(index);
    }
  }

  saveEmployee() {
    this.data.name = this.myForm.value.name;
    this.data.address = this.myForm.value.address;
    this.data.gender = this.myForm.value.gender;
    this.data.cars = this.myForm.value.cars;
    this.data.date = this.myForm.value.date;
    this.data.hobbie = this.myForm.value.hobbie;

    //edit 
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

  save() {
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


  showdata() {
    this.router.navigate(['list']);
  }



}








