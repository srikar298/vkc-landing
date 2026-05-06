import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_entity.freezed.dart';

@freezed
class User with _$User {
  const factory User({
    required String id,
    String? email,
    String? phoneNumber,
    String? fullName,
    @Default([]) List<String> permissions,
  }) = _User;
}
