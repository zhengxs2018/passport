import { IsString, IsOptional, IsUrl, Length } from 'class-validator'

/**
 * 密码注册表单验证
 */
export class RegisterPwdDto {
  @IsString({
    message: '$property 必须是个字符串'
  })
  @Length(2, 16, {
    message: '$property 长度为 2～16 个字符'
  })
  username: string

  @IsString({
    message: '$property 必须是个字符串'
  })
  @Length(2, 12, {
    message: '$property 长度为 2～12 个字符'
  })
  @IsOptional()
  nickname?: string

  @IsUrl(
    {},
    {
      message: '$property 必须为合法的 URL'
    }
  )
  @IsOptional()
  @Length(10, 512, {
    message: '$property 长度为 10～512 个字符'
  })
  @IsOptional()
  avatar?: string

  @IsString({
    message: '$property 必须是个字符串'
  })
  @Length(2, 12, {
    message: '$property 长度为 2～12 个字符'
  })
  @IsOptional()
  email?: string

  @IsString({
    message: '$property 必须是个字符串'
  })
  @Length(6, 18, {
    message: '$property 长度为 6～18 个字符'
  })
  password: string
}
