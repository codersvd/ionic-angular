import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {HomePage} from './home.page';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../auth/Auth.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

class MockBarcodeScanner {
  public static scan(): Promise<any> {
    return new Promise((resolve, reject) => resolve({
      cancelled: false,
      format: 'QR_CODE',
      text: 'apiserver:https://localhost/;user:user;password:123'
    }));
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [HomePage],
      imports: [],
      providers: [
        AuthenticationService,
        Router,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
