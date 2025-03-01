import { getDatasource } from "@api/datasources";
import {
  BaseResponseDto,
  CreateBaseDto,
  PatchBaseDto,
  PutBaseDto,
} from "@api/dtos/base";
import { BaseEntity } from "@api/entities/base";
import { NotFoundError } from "@api/errors/not-found";

const baseRepository = getDatasource().getRepository(BaseEntity);
class BaseService {
  async list() {
    const entities = await baseRepository.find();
    return entities.map((entity) => BaseResponseDto.fromEntity(entity));
  }

  async getById(id: number) {
    const entity = await this.getEntityById(id);
    return BaseResponseDto.fromEntity(entity);
  }

  async create(dto: CreateBaseDto) {
    const entity = dto.toEntity();
    const savedEntity = await baseRepository.save(entity);
    return BaseResponseDto.fromEntity(savedEntity);
  }

  async patch(id: number, dto: PatchBaseDto) {
    const entity = await this.getEntityById(id);
    const newEntity = await baseRepository.save(entity.patch(dto));
    return BaseResponseDto.fromEntity(newEntity);
  }

  async put(id: number, dto: PutBaseDto) {
    const entity = await this.getEntityById(id);
    const newEntity = await baseRepository.save(entity.patch(dto));
    return BaseResponseDto.fromEntity(newEntity);
  }

  private async getEntityById(id: number) {
    const entity = await baseRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundError(`base not found for id: ${id}`);
    }
    return entity;
  }
}

const baseService = new BaseService();
export default baseService;
