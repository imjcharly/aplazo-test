import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

// ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { counterReducer } from './components/counter/counter.reducer';
import { paginatorReducer } from './reducers/paginator.reducer';

// Components
import { SonComponent } from './components/counter/son/son.component';
import { GrandsonComponent } from './components/counter/grandson/grandson.component';
import { CounterPrincipalComponent } from './components/counter-principal/counter-principal.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { characterReducer } from './reducers/character.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SonComponent,
    GrandsonComponent,
    CounterPrincipalComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        characters: characterReducer
      },
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
