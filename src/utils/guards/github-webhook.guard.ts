import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubWebhookGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  private readonly GITHUB_SECRET =
    this.configService.get<string>('GITHUB_SECRET');

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const githubSignature = request.headers['x-hub-signature-256'];
    const payload = request.body;

    const validWebhookRequest = this.validatePayload(payload, githubSignature);

    if (!validWebhookRequest) {
      console.log('Request failed validation...');
    }

    return validWebhookRequest;
  }

  /**
   * @desc Just to make it clear, only this function is sourced from the medium article, the thinking to put
   *  it as a guard (as it should have been is by me).
   * @source https://medium.com/@moiserushanika2006/implementing-a-secure-nestjs-webhook-with-payload-validation-and-packaging-as-a-dependency-548b5b73dfb0
   * */
  private validatePayload(payload: any, signature: string): boolean {
    const expectedSignature =
      'sha256=' +
      crypto
        .createHmac('sha256', this.GITHUB_SECRET)
        .update(JSON.stringify(payload))
        .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'ascii'),
      Buffer.from(signature, 'ascii'),
    );
  }
}
