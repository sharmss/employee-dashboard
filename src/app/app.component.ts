import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private s:ServiceService){
    this.getData();
  }
  user:any;
  userId:any;

  myForm= new FormGroup ({
    username:new FormControl('',[
      Validators.required,
      Validators.pattern('^[A-Z][a-z]+$')
      ]),
    email:new FormControl('',[
      Validators.required,Validators.email
      // Validators.pattern('^(?=(?:.*\\d){2,})(?=(?:.*[@$!%*?&]){2,}).{20}$')
    ]),
    age:new FormControl('',[
      Validators.required,
      Validators.min(18),
      Validators.max(65)
  ]),
    password:new FormControl('',[
    Validators.required,
    Validators.pattern('^[A-Za-z0-9@#$%^&*!]{5}$')
  ]),
    retypepass:new FormControl('',[
    Validators.required
    ]),
    gender:new FormControl('',[
    Validators.required
    ]),
    java:new FormControl(false),
    python:new FormControl(false),
    csharp:new FormControl(false),
    angular:new FormControl(false),
})
getData(){
  this.s.loadUser().subscribe((res)=>
{
  this.user=res;
})
}
 patch(data:any){
  this.userId=data.id;
  this.myForm.patchValue({
      username:data.username,
      email:data.email,
      age:data.age,
      password:data.password,
      retypepass:data.retypepass,
      gender:data.gender,
})
 }
 delete(userId:any){

  this.s.deleteUser(userId).subscribe(()=>{

    alert("deleted")
    this.getData()
  })
 }



submit(){
  if (this.myForm.valid)

  if(this.userId){
    this.s.updateUser(this.myForm.value,this.userId).subscribe(()=>{
      console.log("posted")
      this.userId=null;
      this.myForm.reset();
      this.getData();
    })

  }
  else{
  console.log(this.myForm.value);
  alert("Posted")
  this.s.getUser(this.myForm.value).subscribe((res)=>{
    console.log(res);
    this.getData();
  });
}

  
  if(this.myForm.invalid){
    this.myForm.markAllAsTouched();
    // alert("Please fill all fields correctly");
    return;
  }

  if(
    !this.myForm.value.java &&
    !this.myForm.value.python &&
    !this.myForm.value.csharp &&
    !this.myForm.value.angular
  ){
    alert("please select at least one course");
    return
  }
 

  if(this.myForm.value.password !== this.myForm.value.retypepass){
    alert("Password do not match");
    return;

  }
  console.log(this.myForm.value);
  // this.myForm.reset()
}
  
}