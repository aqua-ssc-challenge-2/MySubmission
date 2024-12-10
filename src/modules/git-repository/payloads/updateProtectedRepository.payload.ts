import { IsBoolean } from 'class-validator';

export class UpdateProtectedRepositoryPayload {
  @IsBoolean()
  protected: boolean;
}
