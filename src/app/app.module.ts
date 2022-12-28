import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//IMPORTS

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

//COMPONENTS
import { NavbarComponent } from './components/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';

import { AlumnoDashboardComponent } from './pages/alumno/alumno-dashboard/alumno-dashboard.component';
import { authInterceptorProviders } from './services/interceptors/auth.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { AddCursoComponent } from './pages/admin/add-curso/add-curso.component';
import { AddAlumnoComponent } from './pages/admin/add-alumno/add-alumno.component';
import { VerCursosComponent } from './pages/admin/ver-cursos/ver-cursos.component';
import { VerProfesoresComponent } from './pages/admin/ver-profesores/ver-profesores.component';
import { VerAlumnosComponent } from './pages/admin/ver-alumnos/ver-alumnos.component';
import { AddProfesorComponent } from './pages/admin/add-profesor/add-profesor.component';
import { ActualizarCursoComponent } from './pages/admin/actualizar-curso/actualizar-curso.component';
import { ProfesorDashboardComponent } from './pages/profesor/profesor-dashboard/profesor-dashboard.component';
import { HomeProfesorComponent } from './pages/profesor/home-profesor/home-profesor.component';
import { SidebarProfesorComponent } from './pages/profesor/sidebar-profesor/sidebar-profesor.component';
import { VerMisAlumnosComponent } from './pages/profesor/ver-mis-alumnos/ver-mis-alumnos.component';
import { AddExamenComponent } from './pages/profesor/add-examen/add-examen.component';
import { AddPreguntaComponent } from './pages/profesor/add-pregunta/add-pregunta.component';
import { ActualizarExamenComponent } from './pages/profesor/actualizar-examen/actualizar-examen.component';
import { ActualizarPreguntaComponent } from './pages/profesor/actualizar-pregunta/actualizar-pregunta.component';
import { VerExamenesComponent } from './pages/profesor/ver-examenes/ver-examenes.component';
import { VerPreguntasComponent } from './pages/profesor/ver-preguntas/ver-preguntas.component';
import { InstruccionesComponent } from './pages/alumno/instrucciones/instrucciones.component';
import { SidebarAlumnoComponent } from './pages/alumno/sidebar-alumno/sidebar-alumno.component';
import { CargarExamenComponent } from './pages/alumno/cargar-examen/cargar-examen.component';
import { EmpezarExamenComponent } from './pages/alumno/empezar-examen/empezar-examen.component';
import { PerfilAlumnoComponent } from './pages/alumno/perfil-alumno/perfil-alumno.component';
import { PerfilProfesorComponent } from './pages/profesor/perfil-profesor/perfil-profesor.component';
import { ActualizarPerfilComponent } from './pages/profesor/actualizar-perfil/actualizar-perfil.component';
import { ActualizarPerfilAlumnonComponent } from './pages/alumno/actualizar-perfil-alumnon/actualizar-perfil-alumnon.component';
import {ActualizarPerfilAdminComponent} from './pages/admin/actualizar-perfil-admin/actualizar-perfil-admin.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ActualizarProfesorAlumnoComponent } from './pages/admin/actualizar-profesor-alumno/actualizar-profesor-alumno.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader/public-api';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminDashboardComponent,
    AlumnoDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    HomeComponent,
    AddCursoComponent,
    AddAlumnoComponent,
    VerCursosComponent,
    VerProfesoresComponent,
    VerAlumnosComponent,
    AddProfesorComponent,
    ActualizarCursoComponent,
    ProfesorDashboardComponent,
    HomeProfesorComponent,
    SidebarProfesorComponent,
    VerMisAlumnosComponent,
    AddExamenComponent,
    AddPreguntaComponent,
    ActualizarExamenComponent,
    ActualizarPreguntaComponent,
    VerExamenesComponent,
    VerPreguntasComponent,
    InstruccionesComponent,
    SidebarAlumnoComponent,
    CargarExamenComponent,
    EmpezarExamenComponent,
    PerfilAlumnoComponent,
    PerfilProfesorComponent,
    ActualizarPerfilComponent,
    ActualizarPerfilAlumnonComponent,
    ActualizarPerfilAdminComponent,
    ActualizarProfesorAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground : true
    })
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
