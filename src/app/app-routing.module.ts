import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarCursoComponent } from './pages/admin/actualizar-curso/actualizar-curso.component';
import { ActualizarPerfilAdminComponent } from './pages/admin/actualizar-perfil-admin/actualizar-perfil-admin.component';
import { ActualizarProfesorAlumnoComponent } from './pages/admin/actualizar-profesor-alumno/actualizar-profesor-alumno.component';
import { AddAlumnoComponent } from './pages/admin/add-alumno/add-alumno.component';
import { AddCursoComponent } from './pages/admin/add-curso/add-curso.component';
import { AddProfesorComponent } from './pages/admin/add-profesor/add-profesor.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { VerAlumnosComponent } from './pages/admin/ver-alumnos/ver-alumnos.component';
import { VerCursosComponent } from './pages/admin/ver-cursos/ver-cursos.component';
import { VerProfesoresComponent } from './pages/admin/ver-profesores/ver-profesores.component';
import { ActualizarPerfilAlumnonComponent } from './pages/alumno/actualizar-perfil-alumnon/actualizar-perfil-alumnon.component';
import { AlumnoDashboardComponent } from './pages/alumno/alumno-dashboard/alumno-dashboard.component';
import { CargarExamenComponent } from './pages/alumno/cargar-examen/cargar-examen.component';
import { EmpezarExamenComponent } from './pages/alumno/empezar-examen/empezar-examen.component';
import { InstruccionesComponent } from './pages/alumno/instrucciones/instrucciones.component';
import { PerfilAlumnoComponent } from './pages/alumno/perfil-alumno/perfil-alumno.component';
import { LoginComponent } from './pages/login/login.component';
import { ActualizarExamenComponent } from './pages/profesor/actualizar-examen/actualizar-examen.component';
import { ActualizarPerfilComponent } from './pages/profesor/actualizar-perfil/actualizar-perfil.component';
import { ActualizarPreguntaComponent } from './pages/profesor/actualizar-pregunta/actualizar-pregunta.component';
import { AddExamenComponent } from './pages/profesor/add-examen/add-examen.component';
import { AddPreguntaComponent } from './pages/profesor/add-pregunta/add-pregunta.component';
import { HomeProfesorComponent } from './pages/profesor/home-profesor/home-profesor.component';
import { PerfilProfesorComponent } from './pages/profesor/perfil-profesor/perfil-profesor.component';
import { ProfesorDashboardComponent } from './pages/profesor/profesor-dashboard/profesor-dashboard.component';
import { VerExamenesComponent } from './pages/profesor/ver-examenes/ver-examenes.component';
import { VerMisAlumnosComponent } from './pages/profesor/ver-mis-alumnos/ver-mis-alumnos.component';
import { VerPreguntasComponent } from './pages/profesor/ver-preguntas/ver-preguntas.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminGuard } from './services/guards/admin.guard';
import { AlumnoGuard } from './services/guards/alumno.guard';
import { ProfesorGuard } from './services/guards/profesor.guard';

const routes: Routes = [

  {path: '',component:LoginComponent,pathMatch:'full'},
  {path: 'login',component:LoginComponent,pathMatch:'full'},
  {path: 'admin',component:AdminDashboardComponent,canActivate:[AdminGuard],
                children:[
                  {path:'', component:HomeComponent},
                  {path:'perfil/:username', component:ProfileComponent},
                  {path:'actualizar-perfil', component:ActualizarPerfilAdminComponent},
                  {path:'ver-cursos', component:VerCursosComponent},
                  {path:'add-curso', component:AddCursoComponent},
                  {path:'actualizar-curso', component:ActualizarCursoComponent},
                  {path:'ver-profesores', component:VerProfesoresComponent},
                  {path:'add-profesor', component:AddProfesorComponent},
                  {path:'ver-alumnos', component:VerAlumnosComponent},
                  {path:'add-alumno', component:AddAlumnoComponent},
                  {path:'actualizar-datos', component:ActualizarProfesorAlumnoComponent}
                ]
              },
  {path: 'profesor',component:ProfesorDashboardComponent,canActivate:[ProfesorGuard],
                children:[
                  {path: '',component:HomeProfesorComponent},
                  {path: 'perfil/:username',component:PerfilProfesorComponent},
                  {path: 'mis-alumnos',component:VerMisAlumnosComponent},
                  {path: 'ver-examenes',component:VerExamenesComponent},
                  {path: 'add-examen',component:AddExamenComponent},
                  {path: 'actualizar-examen',component:ActualizarExamenComponent},
                  {path: 'ver-preguntas/:id/:titulo',component:VerPreguntasComponent},
                  {path: 'add-pregunta/:id/:titulo',component:AddPreguntaComponent},
                  {path: 'actualizar-pregunta',component:ActualizarPreguntaComponent},
                  {path: 'actualizar-perfil',component:ActualizarPerfilComponent}
                ]},
  {path: 'alumno',component:AlumnoDashboardComponent,canActivate:[AlumnoGuard],
                children:[
                  {path: '',component:CargarExamenComponent},
                  {path: 'perfil/:username',component:PerfilAlumnoComponent},
                  {path:'actualizar-perfil', component:ActualizarPerfilAlumnonComponent},
                  {path: 'curso/:id',component:CargarExamenComponent},
                  {path: 'instrucciones',component:InstruccionesComponent}
                  
                ]},
  {path: 'empezar-examen/:id',component:EmpezarExamenComponent,canActivate:[AlumnoGuard]},
  {path: '**', redirectTo: '',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
