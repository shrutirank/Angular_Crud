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
      hobbie: [''],
  
    })

    //edit GEttId
    this.id = this.route.snapshot.queryParams['id'];
    if (this.id) {
      this.getEmployeeById(this.id);
    }
  }

  //subject save
  initsubjectsrows(){
    return this.fb.group({
      subjectId:[''],
      subjectname:[''],
      marks:['']
    })
  }

  
  //edit
  getEmployeeById(id: number) {
    if (this.id) {
      this.employeeService.getEmployeeBYId(this.id).subscribe((response: any) => {
        if (response.hobbie) {
          this.hobbies = response.hobbie.split(',');
          for (let i = 0; i < this.hobbies.length; i++) {
            const index = this.checkboxJson.findIndex((p: any) => p.label == this.hobbies[i]);
            if (index != -1) {
              this.checkboxJson[index].checked = true;
            }
          }
        }
        // this.myForm = new FormGroup({
        //   name: new FormControl(response['name']),
        //   address: new FormControl(response['address']),
        //   gender: new FormControl(response['gender']),
        //   cars: new FormControl(response['cars']),
        //   date: new FormControl(response['date']),
        //   hobbie: new FormControl([''])
        // })

        //edit hobbies 
        response.hobbies = "";

        //all data edit
        this.myForm.patchValue(response);

        //hobbie edit
        this.myForm.value.hobbie = this.hobbies.join();


        this.data = response;
        console.log(this.myForm.value);

      })
    }
  }


  hobbies: string[] = []
  onCheckbox(e: any) {
    // const hobbie: FormArray = this.myForm.get('hobbie') as FormArray;
    if (e.target.checked) {
      console.log(e, 'e');
      this.hobbies.push(e.target.value);
    } else {
      this.hobbies = this.hobbies.filter(p => p !== e.target.value)
    }
    console.log(this.hobbies)
  }

  saveEmployee() {
    // this.data.name = this.myForm.value.name;
    // this.data.address = this.myForm.value.address;
    // this.data.gender = this.myForm.value.gender;
    // this.data.cars = this.myForm.value.cars;
    // this.data.date = this.myForm.value.date;
    // this.data.subject = this.myForm.value.subject;
    this.myForm.value.hobbie = this.hobbies.join();
    // console.log(this.myForm.value.hobbie, 'array')
    // this.data.hobbie = this.myForm.value.hobbie;

    //edit 
    if (this.id) {
      this.employeeService.updateEmployee(this.id, this.myForm.value).subscribe(data1 => {
        console.log(data1)
        this.showdata();
      }, error => console.log(error));

    }
    else {
      this.employeeService.createEmployee(this.myForm.value).subscribe(data1 => {
        console.log(data1)
        this.showdata();
      }, error => console.log(error));
    }


  }

  save() {
    console.log(this.myForm.value);
    this.saveEmployee();
  }

  get subjectArr() {
    return this.myForm.get('subject') as FormArray;
  }

  addSubject() {
    this.subjectArr.push(this.initsubjectsrows());
  }

  removeSubject(i: number) {
    this.subjectArr.removeAt(i);
  }


  showdata() {
    this.router.navigate(['list']);
  }



}








