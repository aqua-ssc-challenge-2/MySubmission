import { WebhookAction } from '../../../enums/WebhookAction';
import { WebhookRepositoryPayload } from './WebhookRepositoryPayload';
import { WebhookSenderPayload } from './webhookSenderPayload';

/** @desc (made by Adir) Generated by ChatGPT using 2 json example files, one is the payload of private -> public,
 * and the second is the other way around (public -> private) */
export interface WebhookPayload {
  action: WebhookAction;
  repository: WebhookRepositoryPayload;
  sender: WebhookSenderPayload;
}
