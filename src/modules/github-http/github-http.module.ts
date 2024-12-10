import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GitHubHttpService } from './github-http.service';

@Module({
  imports: [HttpModule],
  providers: [GitHubHttpService],
  exports: [GitHubHttpService],
})
export class GitHubHttpModule {}
