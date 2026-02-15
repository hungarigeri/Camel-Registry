import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CamelService } from './services/camel.service';
import { of } from 'rxjs';

describe('AppComponent - Űrlap Validáció Tesztek', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  
  const mockCamelService = {
    getCamels: jasmine.createSpy('getCamels').and.returnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule],
      providers: [
        { provide: CamelService, useValue: mockCamelService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //ngOnInit calls here, which calls loadCamels()
  });

  it('1. the form should be invalid because there is no name', () => {
    expect(component.camelForm.valid).toBeFalse();
  });

  it('2. the name field validation should work correctly', () => {
    const nameControl = component.camelForm.get('name');
    
    // if name is empty tehen invalid
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalse();

    //if name is less than 2 characters then invalid
    nameControl?.setValue('A');
    expect(nameControl?.valid).toBeFalse();

    // if name is 2 or more characters then valid
    nameControl?.setValue('Lajos');
    expect(nameControl?.valid).toBeTrue();
  });

  it('3. the humpCount field validation should work correctly', () => {
    const humpControl = component.camelForm.get('humpCount');
    
    // if humpCount is less than 1 then invalid
    humpControl?.setValue(0);
    expect(humpControl?.valid).toBeFalse();

    // if humpCount is greater than 2 then invalid
    humpControl?.setValue(3);
    expect(humpControl?.valid).toBeFalse();

    // if humpCount is 1 or 2 then valid
    humpControl?.setValue(1);
    expect(humpControl?.valid).toBeTrue();
    
    humpControl?.setValue(2);
    expect(humpControl?.valid).toBeTrue();
  });
});