import { Injectable } from '@angular/core';
import { CanActivate ,Router} from '@angular/router';
import { CommonService } from './common.service';


@Injectable()
export class AuthgaurdService implements CanActivate {

  constructor(private CS: CommonService,private router:Router) { }
  canActivate() {
    return this.CS.isLoggedIn()
  }
}
