import Visibility from '../../../enums/RepositoryVisibility.enum';

export class RepositoryDTO {
  repositoryName: string;
  visibility: Visibility;
  protected: boolean;
}
