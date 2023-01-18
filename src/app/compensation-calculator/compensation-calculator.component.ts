import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-compensation-calculator',
  templateUrl: './compensation-calculator.component.html',
  styleUrls: ['./compensation-calculator.component.css']
})
export class CompensationCalculatorComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) {
    this.initForm()
    this.initResults()
  }

  private hasTuberculosis: boolean = false
  public isSubmitted: boolean = false
  public compensationForm: FormGroup = new FormGroup<any>({})
  public incomeValue: number = 1500
  public sickDaysValue: number = 7
  public compensationResults: ICompensationSchema | undefined

  ngOnInit(): void {
  }

  public toggleHasTuberculosis(): void {
    this.hasTuberculosis = !this.hasTuberculosis
    this.initForm()
  }

  private initForm(): void {
    this.compensationForm = this.fb.group({
      incomeForm: [this.incomeValue, [Validators.required, Validators.min(1)]],
      sickDaysForm: [this.sickDaysValue, [Validators.required, Validators.max(this.hasTuberculosis ? 240 : 182), Validators.min(1)]]
    })
  }

  private initResults(): void {
    this.compensationResults = {
      employerDays: 0,
      employerCompensation: 0,
      compensationTotal: 0,
      insuranceDays: 0,
      insuranceCompensation: 0
    }
  }

  private isFormValid(): boolean {
    return this.compensationForm.controls['incomeForm'].invalid || this.compensationForm.controls['sickDaysForm'].invalid
  }

  public onFormChange(): void {
    this.isSubmitted = false
  }

  public submitForm(): void {
    this.isSubmitted = true
    if (this.isFormValid() || this.sickDaysValue <= 3) {
      this.initResults()
      return
    }
    const employerDays = this.sickDaysValue > 8 ? 4 : this.sickDaysValue - 3
    const insuranceDays = this.sickDaysValue >= 8 ? this.sickDaysValue - 3 - employerDays : 0
    const employerCompensation = (this.incomeValue*0.7 /30 *0.8) * employerDays
    const insuranceCompensation = (this.incomeValue*0.7 /30 *0.8) * insuranceDays
    const totalCompensation = employerCompensation + insuranceCompensation
    this.compensationResults = {
      employerDays: employerDays,
      insuranceDays: insuranceDays,
      employerCompensation: employerCompensation,
      insuranceCompensation: insuranceCompensation,
      compensationTotal: totalCompensation
    }
  }
}

interface ICompensationSchema {
  employerDays: number,
  employerCompensation: number,
  insuranceDays: number,
  insuranceCompensation: number,
  compensationTotal: number
}
