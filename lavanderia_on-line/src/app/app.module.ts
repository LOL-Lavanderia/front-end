import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './components/material/material.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ListagemPedidosComponent } from './cliente/listagem-pedidos/listagem-pedidos.component';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';
import { NovoPedidoComponent } from './cliente/novo-pedido/novo-pedido.component';
import { ConsultaPedidosComponent } from './cliente/consulta-pedidos/consulta-pedidos.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalFuncionarioComponent } from './funcionario/manter-funcionario/modal-funcionario/modal-funcionario.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ManterFuncionarioComponent } from './funcionario/manter-funcionario/manter-funcionario.component';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgxMaskPipe, provideEnvironmentNgxMask, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ModalRoupaComponent } from './funcionario/item-roupa/modal-roupa/modal-roupa/modal-roupa.component'
import { ItemRoupaComponent } from './funcionario/item-roupa/item-roupa.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    MainComponent,
    ListagemPedidosComponent,
    CadastroClienteComponent,
    NovoPedidoComponent,
    ConsultaPedidosComponent,
    PaginaInicialComponent,
    ModalFuncionarioComponent,
    ManterFuncionarioComponent,
    ModalRoupaComponent,
    ItemRoupaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MaterialModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ToastrModule.forRoot(),
    NgxMaskDirective,
    NgxMaskPipe

  ],
  exports: [
    MaterialModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    //provideEnvironmentNgxMask(),
    provideNgxMask(),
    MatDatepickerModule,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()) // Fix: Call the withFetch function directly
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
