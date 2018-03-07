import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AlertifyService } from '../../_service/alertify.service';
import { RelationService } from '../../_service/relation.service';
import { Relation } from '../../_model/Relation';
import { CommonService } from '../../_service/common.service';
import { AuthService } from '../../_service/auth.service';


@Component({
  selector: 'app-relation-edit',
  templateUrl: './relation-edit.component.html',
  styleUrls: ['./relation-edit.component.css']
})
export class RelationEditComponent implements OnInit {
  @Input() relationEdit: Relation;
  @Input() public search: Function;
  @ViewChild('closeTag') closeTag: ElementRef;
  relationForm: FormGroup;
  relation: Relation;

  autoCompleteList;

  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private relationService: RelationService,
    private commonService: CommonService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createRelationForm();
    this.commonService.getRelationType().subscribe(r => this.autoCompleteList = r);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    console.log('changes');
    if (this.relationEdit) {
      this.setRelationForm();
    }
  }

  setRelationForm() {
    this.createRelationForm();

    for (let i = 0; i < this.relationEdit.subjects.length - 1; i++) {
      (<FormArray>this.relationForm.controls['subjects']).push(
        this.fb.group(
          {
            name: [''],
            idNumber: ['', Validators.minLength(8)],
            memo: [[]]
          },
          { validator: this.checkValidate('name', 'idNumber') }
        )
      );
    }

    for (let i = 0; i < this.relationEdit.objects.length - 1; i++) {
      (<FormArray>this.relationForm.controls['objects']).push(
        this.fb.group(
          {
            name: [''],
            idNumber: ['', Validators.minLength(8)],
            relationType: [[], Validators.required],
            memo: [[]]
          },
          {
            validator: Validators.compose([
              this.checkValidate('name', 'idNumber'),
              this.checkMemo('relationType', 'memo')
            ])
          }
        )
      );
    }

    this.relationForm.controls['subjects'].setValue(this.relationEdit.subjects);
    this.relationForm.controls['objects'].setValue(this.relationEdit.objects);
    this.relationForm.controls['reason'].setValue(this.relationEdit.reason);
    console.log(this.relationForm.value);
  }

  createRelationForm() {
    this.relationForm = this.fb.group({
      subjects: this.fb.array([
        this.fb.group(
          {
            name: [''],
            idNumber: ['', Validators.minLength(8)],
            memo: [[]]
          },
          { validator: this.checkValidate('name', 'idNumber') }
        )
      ]),
      objects: this.fb.array([
        this.fb.group(
          {
            name: [''],
            idNumber: ['', Validators.minLength(8)],
            relationType: [[], Validators.required],
            memo: [[]]
          },
          {
            validator: Validators.compose([
              this.checkValidate('name', 'idNumber'),
              this.checkMemo('relationType', 'memo')
            ])
          }
        )
      ]),
      reason: ['', Validators.required],
      user: [{value: this.authService.currentUser, disabled: true}, Validators.required]
    });
  }

  addObject() {
    // add address to the list
    const control = <FormArray>this.relationForm.controls['objects'];
    control.push(
      this.fb.group(
        {
          name: [''],
          idNumber: ['', Validators.minLength(8)],
          relationType: [[], Validators.required],
          memo: [[]]
        },
        {
          validator: Validators.compose([
            this.checkValidate('name', 'idNumber'),
            this.checkMemo('relationType', 'memo')
          ])
        }
      )
    );
  }

  addSubject() {
    // add address to the list
    const control = <FormArray>this.relationForm.controls['subjects'];
    control.push(
      this.fb.group(
        {
          name: [''],
          idNumber: ['', Validators.minLength(8)],
          memo: [[]]
        },
        { validator: this.checkValidate('name', 'idNumber') }
      )
    );
  }

  remove(i: number, target: string) {
    // remove address from the list
    const control = <FormArray>this.relationForm.controls[target];
    control.removeAt(i);
  }

  addRelation() {
    this.relation = Object.assign({}, this.relationForm.value);

    this.relationService.addRelation(this.relation).subscribe(
      request => {
        this.alertify.success('relation created');
      },
      error => {
        this.alertify.error('failed');
      }
    );
    // console.log(this.relationForm.value);
  }

  clearForm() {
    this.createRelationForm();
  }

  checkValidate(nameKey: string, idnumberKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const name = group.controls[nameKey];
      const idnumber = group.controls[idnumberKey];
      if (name.value.trim() === '' && idnumber.value.trim() === '') {
        return {
          checkValidate: true
        };
      }
    };
  }

  checkMemo(relationType: string, memo: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const r = group.controls[relationType];
      const m = group.controls[memo];
      if (r.value.includes('其他') && m.value.trim() === '') {
        return {
          checkMemo: true
        };
      }
    };
  }

  delete() {
    const id = this.relationEdit._id;
    const user = this.relationForm.controls['user'].value;

    if (confirm("確定要刪除?")) {
      this.relationService.deleteRelation(id, user).subscribe(
        () => {
          this.alertify.success('relation deleted');
        },
        error => {
          console.log(error);
        },
        () => {
          this.search();
          this.closeTag.nativeElement.click();
        }
      );
    }

  }

  saveChange() {
    this.relationEdit = Object.assign(
      {},
      this.relationEdit,
      this.relationForm.getRawValue()
    );

    this.relationEdit.objects.forEach(object => {
      object.relationType = object.relationType.map(r => {
        if (r.value) {
          return r.value;
        } else {
          return r;
        }
      });
    });

    this.relationEdit.objects.forEach(object => {
      object.relationType = object.relationType.map(r => {
        if (r.value) {
          return r.value;
        } else {
          return r;
        }
      });
      object.memo = object.memo.map(r => {
        if (r.value) {
          return r.value;
        } else {
          return r;
        }
      });
    });

    this.relationEdit.subjects.forEach(subject => {
      subject.memo = subject.memo.map(r => {
        if (r.value) {
          return r.value;
        } else {
          return r;
        }
      });
    });

    this.relationEdit.status = 'lived';

    this.relationService.updateRelation(this.relationEdit).subscribe(
      () => {
        this.alertify.success('relation updated');
      },
      error => {
        console.log(error);
      },
      () => {
        this.search();
        this.closeTag.nativeElement.click();
      }
    );
  }
}
