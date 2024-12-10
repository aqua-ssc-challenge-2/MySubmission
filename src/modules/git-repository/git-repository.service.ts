import { Injectable } from '@nestjs/common';
import Visibility from '../../enums/RepositoryVisibility.enum';
import {
  convertRepositoryToPartialDTO,
  convertVisibilityToGitHubVisibility,
} from '../../utils/converters/converters';
import { RepositoryNotFound } from '../../utils/errors/RepositoryNotFound.error';
import { GitHubHttpService } from '../github-http/github-http.service';
import { RepositoryDTO } from './dtos/Repository.dto';

@Injectable()
export class GitRepositoryService {
  private protectedRepositories: Record<string, boolean>;

  constructor(private readonly httpClient: GitHubHttpService) {
    this.protectedRepositories = {};
  }

  public async getAllRepositories(
    visibility?: Visibility,
  ): Promise<RepositoryDTO[]> {
    const gitHubVisibility = convertVisibilityToGitHubVisibility(visibility);
    const githubRepositories =
      await this.httpClient.getAllRepositories(gitHubVisibility);

    return githubRepositories.map((repository) => ({
      ...convertRepositoryToPartialDTO(repository),
      protected: this.isProtectedRepository(repository.name),
    }));
  }

  public updateGitRepositoryVisibility(
    repositoryName: string,
    updatedVisibility: Visibility,
  ) {
    const shouldPrivate = updatedVisibility === Visibility.PRIVATE;

    return this.httpClient.updateRepository(repositoryName, {
      private: shouldPrivate,
    });
  }

  public async safelyUpdateProtectedRepository(
    repositoryName: string,
    isProtected: boolean,
  ) {
    await this.validateRepositoryExists(repositoryName);

    this.updateProtectedRepository(repositoryName, isProtected);
  }

  public isProtectedRepository(repositoryName: string): boolean {
    return this.protectedRepositories[repositoryName] ?? false;
  }

  private updateProtectedRepository(
    repositoryName: string,
    isProtected: boolean,
  ) {
    this.protectedRepositories[repositoryName] = isProtected;

    console.log(
      repositoryName,
      'protection has been updated to: ',
      isProtected,
    );
  }

  private async validateRepositoryExists(repositoryName: string) {
    const repositories = await this.getAllRepositories();

    const repositoryExists = !!repositories.find(
      ({ repositoryName: name }) => name === repositoryName,
    );

    if (!repositoryExists)
      throw new RepositoryNotFound(
        `${repositoryName} does not exists in this organization`,
      );
  }
}
