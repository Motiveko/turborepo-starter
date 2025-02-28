import { getDatasource } from "@api/datasources";
import { BaseResponseDto, CreateBaseDto } from "@api/dtos/base";
import { BaseEntity } from "@api/entities/base";

const baseRepository = getDatasource().getRepository(BaseEntity);
class BaseService {
  async list() {
    const entities = await baseRepository.find();
    return entities.map((entity) => BaseResponseDto.fromEntity(entity));
  }

  async getById(id: number) {
    const entity = await baseRepository.findOne({ where: { id } });
    if (!entity) {
      return null;
    }
    return BaseResponseDto.fromEntity(entity);
  }

  async create(dto: CreateBaseDto) {
    const entity = dto.toEntity();
    const savedEntity = await baseRepository.save(entity);
    return BaseResponseDto.fromEntity(savedEntity);
  }

  update(id: string, dto: CreateBaseDto) {}
  delete(id: string) {}
}

const baseService = new BaseService();
export default baseService;
