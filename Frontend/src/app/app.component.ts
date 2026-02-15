import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CamelService } from './services/camel.service';
import { Camel } from './model/camel.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'camel-app';
  camels: Camel[] = [];
  camelForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  editingCamel: Camel | null = null; 

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private camelService: CamelService) {
    this.camelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      humpCount: [1, [Validators.required, Validators.min(1), Validators.max(2)]],
      color: [''], 
      lastFed: [this.getCurrentDateTime()] 
    });
  }

  ngOnInit(): void {
    this.loadCamels();
  }

  loadCamels(): void {
    this.camelService.getCamels().subscribe({
      next: (data) => this.camels = data,
      error: () => this.errorMessage = 'Error loading camels!'
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.camelForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.camelForm.invalid) {
      this.camelForm.markAllAsTouched();
      return;
    }

    const formData = this.camelForm.value;

    if (this.isEditing && this.editingId !== null && this.editingCamel) {
      const updatedCamel: Camel = {
        ...this.editingCamel,
        ...formData 
      };

      this.camelService.updateCamel(this.editingId, updatedCamel).subscribe({
        next: () => this.onSuccess('Camel updated successfully!'),
        error: () => this.errorMessage = 'Error updating camel!'
      });
    } else {
      this.camelService.createCamel(formData as Camel).subscribe({
        next: () => this.onSuccess('Camel created successfully!'),
        error: () => this.errorMessage = 'Error creating camel!'
      });
    }
  }

  editCamel(camel: Camel): void {
    this.isEditing = true;
    this.editingId = camel.id!;
    this.editingCamel = camel; 
    
    this.camelForm.patchValue({
      name: camel.name,
      humpCount: camel.humpCount,
      color: camel.color || '',
      lastFed: camel.lastFed ? new Date(camel.lastFed).toISOString().slice(0, 16) : this.getCurrentDateTime()
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.editingCamel = null; 
    this.camelForm.reset({ 
      humpCount: 1, 
      color: '', 
      lastFed: this.getCurrentDateTime() 
    });
    this.errorMessage = null;
  }

  private onSuccess(message: string): void {
    this.successMessage = message;
    this.cancelEdit();
    this.loadCamels();

    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16); 
  }
}