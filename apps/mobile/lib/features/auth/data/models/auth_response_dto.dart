import 'package:json_annotation/json_annotation.dart';
import 'user_dto.dart';

part 'auth_response_dto.g.dart';

@JsonSerializable()
class AuthResponseDto {
  final UserDto user;
  final String accessToken;
  final String? refreshToken;
  final List<String>? permissions;

  const AuthResponseDto({
    required this.user,
    required this.accessToken,
    this.refreshToken,
    this.permissions,
  });

  factory AuthResponseDto.fromJson(Map<String, dynamic> json) => _$AuthResponseDtoFromJson(json);
  Map<String, dynamic> toJson() => _$AuthResponseDtoToJson(this);
}
