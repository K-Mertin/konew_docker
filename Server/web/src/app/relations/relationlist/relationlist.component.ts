import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AlertifyService } from '../../_service/alertify.service';
import { RelationService } from '../../_service/relation.service';
import { Relation } from '../../_model/Relation';
import { environment } from '../../../environments/environment';
import { RELATIONTYPE } from '../../_data/RelationType';

@Component({
  selector: 'app-relationlist',
  templateUrl: './relationlist.component.html',
  styleUrls: ['./relationlist.component.css']
})
export class RelationlistComponent implements OnInit {

  private baseUrl = environment.apiUrl + '/relation';
  relationForm: FormGroup;
  relation: Relation;
  filePath: string;
  autoCompleteList = RELATIONTYPE;

  constructor(private fb: FormBuilder, private alertify: AlertifyService, private relationService: RelationService) { }

  ngOnInit() {
    this.createRelationForm();
  }

  createRelationForm() {
    this.relationForm = this.fb.group({
      subjects: this.fb.array([this.fb.group({
        name: [''],
        idNumber: [''],
        memo: ['']
      }, { validator: this.checkValidate('name', 'idNumber') })]),
      objects: this.fb.array([this.fb.group({
        name: [''],
        idNumber: [''],
        relationType: [[], Validators.required],
        memo: ['']
      }, { validator: this.checkValidate('name', 'idNumber') })]),
      reason: ['', Validators.required],
      user: ['', Validators.required]
    });
  }

  addObject() {
    // add address to the list
    const control = <FormArray>this.relationForm.controls['objects'];
    control.push(this.fb.group({
      name: [''],
      idNumber: [''],
      relationType: [[], Validators.required],
      memo: ['']
    }, { validator: this.checkValidate('name', 'idNumber')}));
  }

  addSubject() {
    // add address to the list
    const control = <FormArray>this.relationForm.controls['subjects'];
    control.push(this.fb.group({
      name: [''],
      idNumber: [''],
      memo: ['']
    }, { validator: this.checkValidate('name', 'idNumber') }));
  }

  remove(i: number, target: string) {
    // remove address from the list
    const control = <FormArray>this.relationForm.controls[target];
    control.removeAt(i);
  }


  addRelation() {

    this.relation = Object.assign({}, this.relationForm.value);

    this.relation.objects.forEach(object => {
      object.relationType=object.relationType.map(r=>r.value);
    });
    

    this.relationService.addRelation(this.relation).subscribe(request => {
      this.alertify.success('relation created');
      this.clearForm()
    }, error => {
      this.alertify.error('failed');
    });
    // console.log(this.relation);
  }


  clearForm() {
    this.createRelationForm();
  }


  checkValidate(nameKey: string, idnumberKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let name = group.controls[nameKey];
      let idnumber = group.controls[idnumberKey];
      if (name.value.trim() === '' && idnumber.value.trim() === '') {
        return {
          checkValidate: true
        };
      }
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let fileSize: number = fileList[0].size;
      if (fileSize <= 10485760) {
        let formData: FormData = new FormData();
        formData.append('Document', file);
        this.relationService.uplodaRelation(formData).subscribe(response => {
          if (response === 'success') {
            this.alertify.success(response);
          }  else {
            this.alertify.error(response);
          }
        }, error => {
          this.alertify.error(error);
        }, () => {
          event.target.value = '';
        });
      } else {
        this.alertify.error('File size is exceeded');
      }
    } else {
      this.alertify.error('Something went Wrong.');
    }
  }



}
