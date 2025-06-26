import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  // Formulario template
  /*
  public user: any = {
    name: '',
    email: '',
  };

  enviar() {
    console.log(this.user);
  }
  */

  // Formulario reactivo
  formularioContacto: FormGroup;
  /*
  usuarioActivo: any = {
    name: 'Pedro',
    lastName: 'Perez',
    dni: '123456789',
  };
  */
  tipoDni: string = 'DNI';

  constructor(private form: FormBuilder) {
    this.formularioContacto = this.form.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [''],
      tipoDni: ['DNI', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Otra forma de pasar validadores
    this.formularioContacto
      .get('lastName')
      ?.setValidators([Validators.required, Validators.minLength(3)]);

    //this.formularioContacto.get('name')?.setValue(this.usuarioActivo);
    /*
    this.formularioContacto.patchValue({
      name: this.usuarioActivo.name,
      lastName: this.usuarioActivo.lastName,
      dni: this.usuarioActivo.dni,
    });

    this.formularioContacto.get('name')?.disable();
    this.formularioContacto.get('lastName')?.disable();
    this.formularioContacto.get('dni')?.disable();
    */

    /*
    this.formularioContacto.valueChanges.subscribe((value) => {
      console.log(value);
    });
    */

    this.formularioContacto.get('tipoDni')?.valueChanges.subscribe((value) => {
      console.log(value);
      this.tipoDni = value;
    });
  }

  enviar() {
    console.log(this.formularioContacto);
  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.formularioContacto.get(controlName)?.hasError(errorType) &&
      this.formularioContacto.get(controlName)?.touched
    );
  }
}
