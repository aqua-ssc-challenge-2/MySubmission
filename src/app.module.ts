import { Module } from '@nestjs/common';
import { GitRepositoryModule } from './modules/git-repository/git-repository.module';
import { GitHubWebhookModule } from './modules/github-webhook/github-webhook.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GitRepositoryModule,
    GitHubWebhookModule,
  ],
})
export class AppModule {}
