import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import GitHubVisibility from './enums/GithubVisibility.enum';
import { GitHubRepositoryResponseDTO } from './responseDTOs/github-response';
import { UpdateRepositoryPayload } from './payloads/UpdateRepositoryPayload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GitHubHttpService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private readonly baseHeaders = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${this.configService.get<string>('GITHUB_BEARER_TOKEN')}`,
  };

  public async getAllRepositories(visibilityFilter?: GitHubVisibility) {
    const headers = this.baseHeaders;
    let url = 'https://api.github.com/orgs/aqua-ssc-challenge-2/repos';

    if (visibilityFilter) url += '?type=' + visibilityFilter;

    const { data } = await firstValueFrom(
      this.httpService.get<GitHubRepositoryResponseDTO[]>(url, {
        headers,
      }),
    );

    return data;
  }

  public async updateRepository(
    repositoryName: string,
    payload: UpdateRepositoryPayload,
  ) {
    const url = `https://api.github.com/repos/aqua-ssc-challenge-2/${repositoryName}`;
    const headers = this.baseHeaders;
    const body = JSON.stringify(payload);

    return await firstValueFrom(
      this.httpService.patch(url, body, {
        headers,
      }),
    );
  }
}
