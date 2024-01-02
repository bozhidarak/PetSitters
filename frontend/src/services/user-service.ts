import { Injectable } from '@angular/core';
import { User, UserInfo } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: firebase.default.User | null) {
    console.log('User set: ', user);
    const firebaseUser = user;
      if (firebaseUser !== null) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          phoneNumber: firebaseUser.phoneNumber,
          isAnonymous: firebaseUser.isAnonymous,
          providerData: firebaseUser.providerData as UserInfo[],
          providerId: firebaseUser.providerId,
          refreshToken: firebaseUser.refreshToken,
          metadata: firebaseUser.metadata,
          tenantId: firebaseUser.tenantId,
          delete: firebaseUser.delete,
          getIdToken: firebaseUser.getIdToken,
          getIdTokenResult: firebaseUser.getIdTokenResult,
          toJSON: firebaseUser.toJSON,
          reload: firebaseUser.reload,
          // Add other properties you need
        };
    this.userSubject.next(user);
  }
  }
}