import {Injectable} from '@angular/core';

@Injectable()
export class StateService {
	private _message = 'Hello Message';
  private _awesome = 'We are close to java';

  getMessage(): string {
    return this._message;
  };

  setMessage(newMessage: string): void {
    this._message = newMessage;
  };

  getAwesome(): string {
    return this._awesome;
  };
}
