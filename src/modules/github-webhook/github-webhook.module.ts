import { Module } from '@nestjs/common';
import { GitHubWebhookController } from './github-webhook.controller';
import { GitHubWebhookService } from './github-webhook.service';
import { GitRepositoryModule } from '../git-repository/git-repository.module';

@Module({
  imports: [GitRepositoryModule],
  controllers: [GitHubWebhookController],
  providers: [GitHubWebhookService],
})
export class GitHubWebhookModule {}
