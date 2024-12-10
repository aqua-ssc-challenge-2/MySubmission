import { Module } from '@nestjs/common';
import { GitRepositoryController } from './git-repository.controller';
import { GitRepositoryService } from './git-repository.service';
import { GitHubHttpModule } from '../github-http/github-http.module';

@Module({
  imports: [GitHubHttpModule],
  controllers: [GitRepositoryController],
  providers: [GitRepositoryService],
  exports: [GitRepositoryService],
})
export class GitRepositoryModule {}
