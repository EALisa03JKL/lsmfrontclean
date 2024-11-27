import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UiComponent } from './createaccount/ui/ui.component'; // Asegúrate de importar tu componente
import { ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule

@NgModule({
  declarations: [
    UiComponent, // Declara tu componente
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Asegúrate de agregar FormsModule en imports
  ]
})
export class AppModule {}
