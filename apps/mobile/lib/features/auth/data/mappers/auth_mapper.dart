import '../../domain/entities/user_entity.dart';
import '../models/user_dto.dart';

class AuthMapper {
  static User toEntity(UserDto dto, {List<String>? permissions}) {
    return User(
      id: dto.id,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      fullName: dto.fullName,
      permissions: permissions ?? [],
    );
  }
}
