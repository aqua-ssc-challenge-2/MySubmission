import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GitHubWebhookService } from './github-webhook.service';
import { WebhookPayload } from '../../types/github/github-webhook-payload';
import { ConfigService } from '@nestjs/config';
import { GithubWebhookGuard } from '../../utils/guards/github-webhook.guard';

@Controller('github-webhook')
@UseGuards(GithubWebhookGuard)
export class GitHubWebhookController {
  constructor(
    private readonly githubWebhookService: GitHubWebhookService,
    private readonly configService: ConfigService,
  ) {}

  private readonly BOT_USERNAME =
    this.configService.get<string>('GITHUB_BOT_USER');

  @Post('/repository')
  public githubWebhookReceiver(@Body() payload: WebhookPayload) {
    if (!payload.action || payload.sender.login === this.BOT_USERNAME) return;

    return this.githubWebhookService.verifyRepositoryProtectedState(
      payload.action,
      payload.repository.name,
    );
  }
}
