import { Injectable } from '@nestjs/common';
import { GitRepositoryService } from '../git-repository/git-repository.service';
import { WebhookAction } from '../../enums/WebhookAction';
import Visibility from '../../enums/RepositoryVisibility.enum';

@Injectable()
export class GitHubWebhookService {
  constructor(private readonly gitRepositoryService: GitRepositoryService) {}

  async verifyRepositoryProtectedState(
    action: WebhookAction,
    repositoryName: string,
  ) {
    const isProtected =
      this.gitRepositoryService.isProtectedRepository(repositoryName);

    if (!isProtected) {
      console.log(`${repositoryName} has been ${action} and IS NOT PROTECTED`);
      return;
    }

    console.log(
      `${repositoryName} has been ${action} and IS PROTECTED, reverting to previous state...`,
    );

    switch (action) {
      case WebhookAction.PRIVATIZED:
        await this.revertToPublic(repositoryName);
        break;
      case WebhookAction.PUBLICIZED:
        await this.revertToPrivate(repositoryName);
        break;
    }
  }

  private async revertToPublic(repositoryName: string) {
    try {
      await this.gitRepositoryService.updateGitRepositoryVisibility(
        repositoryName,
        Visibility.PUBLIC,
      );

      console.log(`Successfully reverted ${repositoryName} back to public`);
    } catch (error: unknown) {
      console.error(
        `Failed to revert ${repositoryName} back to public, with error: ${error}`,
      );
    }
  }

  private async revertToPrivate(repositoryName: string) {
    try {
      await this.gitRepositoryService.updateGitRepositoryVisibility(
        repositoryName,
        Visibility.PRIVATE,
      );

      console.log(`Successfully reverted ${repositoryName} back to private`);
    } catch (error: unknown) {
      console.error(
        `Failed to revert ${repositoryName} back to private, with error: ${error}`,
      );
    }
  }
}
