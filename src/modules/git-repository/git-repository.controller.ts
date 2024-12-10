import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseEnumPipe,
  Put,
  Query,
} from '@nestjs/common';
import { GitRepositoryService } from './git-repository.service';
import Visibility from '../../enums/RepositoryVisibility.enum';
import { UpdateProtectedRepositoryPayload } from './payloads/updateProtectedRepository.payload';
import { RepositoryNotFound } from '../../utils/errors/RepositoryNotFound.error';

@Controller('repository')
export class GitRepositoryController {
  constructor(private readonly repositoryService: GitRepositoryService) {}

  @Get()
  getRepositories(
    @Query(
      'visibilityFilter',
      new ParseEnumPipe(Visibility, {
        optional: true,
      }),
    )
    visibilityFilter?: Visibility,
  ) {
    return this.repositoryService.getAllRepositories(visibilityFilter);
  }

  @Put('/:repositoryName')
  async updateProtectedRepository(
    @Param('repositoryName') repositoryName: string,
    @Body() payload: UpdateProtectedRepositoryPayload,
  ) {
    try {
      await this.repositoryService.safelyUpdateProtectedRepository(
        repositoryName,
        payload.protected,
      );
    } catch (error: unknown) {
      if (error instanceof RepositoryNotFound) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(
        `Failed to update ${repositoryName} with: ${payload}`,
      );
    }
  }
}
