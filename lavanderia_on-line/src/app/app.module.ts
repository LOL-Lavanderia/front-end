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
import { RelatoriosComponent } from './funcionario/relatorios/relatorios.component';
import { RelatorioReceitasComponent } from './funcionario/relatorio-receitas/relatorio-receitas.component';
import { RelatorioClientesComponent } from './funcionario/relatorio-clientes/relatorio-clientes.component';
import { RelatorioFieisComponent } from './funcionario/relatorio-fieis/relatorio-fieis.component';
import { VisualizarPedidosComponent } from './funcionario/visualizar-pedidos/visualizar-pedidos.component';
import { DatePipe } from '@angular/common';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
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
    RelatoriosComponent,
    RelatorioReceitasComponent,
    RelatorioClientesComponent,
    RelatorioFieisComponent,
    VisualizarPedidosComponent

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
    NgxMaskPipe,
    CurrencyMaskModule,
    DatePipe
  ],
  exports: [
    MaterialModule,
    DatePipe,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig},

    //provideEnvironmentNgxMask(),
    //provideNgxMask(),
    MatDatepickerModule,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), // Fix: Call the withFetch function directly,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
