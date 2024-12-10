import Visibility from '../../enums/RepositoryVisibility.enum';
import GitHubVisibility from '../../modules/github-http/enums/GithubVisibility.enum';
import { Repository } from '../../modules/github-http/responseDTOs/github-response/repository';
import { RepositoryDTO } from '../../modules/git-repository/dtos/Repository.dto';

export const convertVisibilityToGitHubVisibility = (
  visibility: Visibility,
): GitHubVisibility => {
  switch (visibility) {
    case Visibility.PUBLIC:
      return GitHubVisibility.PUBLIC;
    case Visibility.PRIVATE:
      return GitHubVisibility.PRIVATE;
  }
};

export const convertRepositoryToPartialDTO = ({
  name: repositoryName,
  private: isPrivateRepository,
}: Repository): Required<Omit<RepositoryDTO, 'protected'>> => ({
  repositoryName,
  visibility: isPrivateRepository ? Visibility.PRIVATE : Visibility.PUBLIC,
});
