import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from "./components/error/error.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { VideoNewComponent } from "./components/video-new/video-new.component";

import { IdentityGuard } from "./services/identity.guard";
import { VideoEditComponent } from "./components/video-edit/video-edit.component";
import { VideoDetailComponent } from "./components/video-detail/video-detail.component";

const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "inicio", component: HomeComponent},
  {path: "inicio/:page", component: HomeComponent},
  {path: "registrarse", component: RegisterComponent},
  {path: "iniciar_sesion", component: LoginComponent},
  {path: "ajustes", canActivate:[IdentityGuard], component: UserEditComponent},
  {path: "video-favorito/guardar", canActivate:[IdentityGuard], component: VideoNewComponent},
  {path: "video-favorito/editar/:id", canActivate:[IdentityGuard], component: VideoEditComponent},
  {path: "video-favorito/:id", canActivate:[IdentityGuard], component: VideoDetailComponent},
  {path: "logout/:sure", component: LoginComponent},
  {path: "**", component: ErrorComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
