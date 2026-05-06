import 'package:json_annotation/json_annotation.dart';

part 'user_dto.g.dart';

@JsonSerializable()
class UserDto {
  final String id;
  final String? email;
  final String? phoneNumber;
  final String? fullName;

  const UserDto({
    required this.id,
    this.email,
    this.phoneNumber,
    this.fullName,
  });

  factory UserDto.fromJson(Map<String, dynamic> json) => _$UserDtoFromJson(json);
  Map<String, dynamic> toJson() => _$UserDtoToJson(this);
}
