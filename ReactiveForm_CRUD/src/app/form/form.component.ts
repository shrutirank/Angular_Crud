import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder, FormControl,Validators,FormArray} from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myform!:FormGroup;
  
  checkboxJson=[{
    id:1,
    label:'Reading',
    checked:false
},
{
  id:2,
  label:'dancing',
  checked:false
},
{
  id:3,
  label:'playing',
  checked:false
},
{
  id:4,
  label:'Singing',
  checked:false
},
];
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

  }

  form(){
    this.myform=new FormGroup({
      name:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      gender:new FormControl('',[Validators.required]),
      cars:new FormControl('',[Validators.required]),
      date:new FormControl('',[Validators.required]),
      subject:new FormControl(''),
      subjectname:new FormControl('',[Validators.required]),
      marks:new FormControl('',[Validators.required])
      
    })
  }

}
