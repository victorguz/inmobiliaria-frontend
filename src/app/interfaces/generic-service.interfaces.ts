import { Observable } from 'rxjs';
import { GenericResponse } from './generic-response.interfaces';
import { HttpClient } from '@angular/common/http';

interface GenericService<
  ListRequestDto,
  FindRequestDto,
  CreateRequestDto,
  UpdateRequestDto,
  DeleteRequestDto,
  ListResponseDto,
  FindResponseDto,
  CreateResponseDto,
  UpdateResponseDto,
  DeleteResponseDto
> {
  listUrl?: string;
  findUrl?: string;
  createUrl?: string;
  updateUrl?: string;
  deleteUrl?: string;

  list: (body?: ListRequestDto) => Observable<GenericResponse<ListResponseDto>>;
  find: (body?: FindRequestDto) => Observable<GenericResponse<FindResponseDto>>;
  create: (
    body?: CreateRequestDto
  ) => Observable<GenericResponse<CreateResponseDto>>;
  update: (
    body?: UpdateRequestDto
  ) => Observable<GenericResponse<UpdateResponseDto>>;
  delete: (
    body?: DeleteRequestDto
  ) => Observable<GenericResponse<DeleteResponseDto>>;
}

export class GenericServiceI<
  ListRequestDto,
  FindRequestDto,
  CreateRequestDto,
  UpdateRequestDto,
  DeleteRequestDto,
  ListResponseDto,
  FindResponseDto,
  CreateResponseDto,
  UpdateResponseDto,
  DeleteResponseDto
> implements
    GenericService<
      ListRequestDto,
      FindRequestDto,
      CreateRequestDto,
      UpdateRequestDto,
      DeleteRequestDto,
      ListResponseDto,
      FindResponseDto,
      CreateResponseDto,
      UpdateResponseDto,
      DeleteResponseDto
    >
{
  listUrl = 'list';
  findUrl = 'find';
  createUrl = 'create';
  updateUrl = 'update';
  deleteUrl = 'delete';

  constructor(
    protected readonly http: HttpClient,
    protected readonly apiUrl: string
  ) {}

  list(body?: ListRequestDto | undefined) {
    return this.http.post<GenericResponse<ListResponseDto>>(
      `${this.apiUrl}/${this.listUrl}`,
      body
    );
  }
  find(body?: FindRequestDto | undefined) {
    return this.http.post<GenericResponse<FindResponseDto>>(
      `${this.apiUrl}/${this.findUrl}`,
      body
    );
  }
  create(body?: CreateRequestDto | undefined) {
    return this.http.post<GenericResponse<CreateResponseDto>>(
      `${this.apiUrl}/${this.createUrl}`,
      body
    );
  }
  update(body?: UpdateRequestDto | undefined) {
    return this.http.post<GenericResponse<UpdateResponseDto>>(
      `${this.apiUrl}/${this.updateUrl}`,
      body
    );
  }
  delete(body?: DeleteRequestDto | undefined) {
    return this.http.post<GenericResponse<DeleteResponseDto>>(
      `${this.apiUrl}/${this.deleteUrl}`,
      body
    );
  }
}
